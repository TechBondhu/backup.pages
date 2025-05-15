let selectedFile = null;
let editedImage = null;

const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');
const previewImage = document.getElementById('previewImage');
const editBtn = document.getElementById('editBtn');
const imageReviewModal = document.getElementById('imageReviewModal');
const reviewImage = document.getElementById('reviewImage');
const deleteImageBtn = document.getElementById('deleteImageBtn');
const editModal = document.getElementById('editModal');
const editCanvas = document.getElementById('editCanvas');
const cropX = document.getElementById('cropX');
const cropY = document.getElementById('cropY');
const cropWidth = document.getElementById('cropWidth');
const cropHeight = document.getElementById('cropHeight');
const brightness = document.getElementById('brightness');
const contrast = document.getElementById('contrast');
const backgroundColor = document.getElementById('bgColor');
const editCancelBtn = document.getElementById('cancelEdit');
const editApplyBtn = document.getElementById('editApplyBtn');

const ctx = editCanvas.getContext('2d');
let image = new Image();
let cropRect = { x: 0, y: 0, width: 200, height: 200 };
let brightnessValue = 0;
let contrastValue = 0;
let bgColor = 'white';

uploadBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
        selectedFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.src = e.target.result;
            previewContainer.style.display = 'flex';
            document.getElementById('userInput').style.paddingLeft = '110px';
        };
        reader.readAsDataURL(file);
    }
    fileInput.value = '';
});

previewImage.addEventListener('click', () => {
    reviewImage.src = previewImage.src;
    imageReviewModal.style.display = 'flex';
});

editBtn.addEventListener('click', () => {
    image.src = previewImage.src;
    image.onload = () => {
        editCanvas.width = image.width;
        editCanvas.height = image.height;
        cropRect.width = Math.min(200, image.width);
        cropRect.height = Math.min(200, image.height);
        drawImage();
        editModal.style.display = 'flex';
    };
});

cropX.addEventListener('input', () => {
    cropRect.x = parseInt(cropX.value);
    drawImage();
});

cropY.addEventListener('input', () => {
    cropRect.y = parseInt(cropY.value);
    drawImage();
});

cropWidth.addEventListener('input', () => {
    cropRect.width = parseInt(cropWidth.value);
    drawImage();
});

cropHeight.addEventListener('input', () => {
    cropRect.height = parseInt(cropHeight.value);
    drawImage();
});

brightness.addEventListener('input', () => {
    brightnessValue = parseInt(brightness.value);
    drawImage();
});

contrast.addEventListener('input', () => {
    contrastValue = parseInt(contrast.value);
    drawImage();
});

backgroundColor.addEventListener('change', () => {
    bgColor = backgroundColor.value;
    drawImage();
});

function drawImage() {
    ctx.clearRect(0, 0, editCanvas.width, editCanvas.height);
    ctx.fillStyle = bgColor === 'transparent' ? 'rgba(0,0,0,0)' : bgColor;
    ctx.fillRect(0, 0, editCanvas.width, editCanvas.height);

    ctx.filter = `brightness(${100 + brightnessValue}%) contrast(${100 + contrastValue}%)`;
    ctx.drawImage(image, 0, 0);

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.strokeRect(cropRect.x, cropRect.y, cropRect.width, cropRect.height);
    ctx.filter = 'none';
}

editApplyBtn.addEventListener('click', () => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = cropRect.width;
    tempCanvas.height = cropRect.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.fillStyle = bgColor === 'transparent' ? 'rgba(0,0,0,0)' : bgColor;
    tempCtx.fillRect(0, 0, cropRect.width, cropRect.height);
    tempCtx.filter = `brightness(${100 + brightnessValue}%) contrast(${100 + contrastValue}%)`;
    tempCtx.drawImage(image, cropRect.x, cropRect.y, cropRect.width, cropRect.height, 0, 0, cropRect.width, cropRect.height);

    editedImage = tempCanvas.toDataURL('image/jpeg');
    previewImage.src = editedImage;

    callRasaAPI("show_review");
    editModal.style.display = 'none';
});

editCancelBtn.addEventListener('click', () => {
    editModal.style.display = 'none';
});

imageReviewModal.addEventListener('click', (e) => {
    if (e.target === imageReviewModal || e.target === deleteImageBtn) {
        imageReviewModal.style.display = 'none';
    }
});

deleteImageBtn.addEventListener('click', () => {
    clearPreview();
    imageReviewModal.style.display = 'none';
});

function clearPreview() {
    selectedFile = null;
    editedImage = null;
    previewImage.src = '';
    previewContainer.style.display = 'none';
    document.getElementById('userInput').style.paddingLeft = '15px';
}