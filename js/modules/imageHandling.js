import { sanitizeMessage } from './utilities.js';
import { displayMessage } from './messaging.js';
import { callRasaAPI } from './api.js';
import { elements } from './dom.js';

let selectedFile = null;
let editedImage = null;
let image = new Image();
let cropRect = { x: 0, y: 0, width: 200, height: 200 };
let brightnessValue = 0;
let contrastValue = 0;
let bgColor = 'white';

export function getSelectedFile() {
    return selectedFile;
}

export function setupImageHandlers() {
    if (elements.uploadBtn) {
        elements.uploadBtn.addEventListener('click', () => elements.fileInput?.click());
    }
    if (elements.fileInput) {
        elements.fileInput.addEventListener('change', () => {
            const file = elements.fileInput.files[0];
            if (file) {
                selectedFile = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (elements.previewImage) {
                        elements.previewImage.src = e.target.result;
                    }
                    if (elements.previewContainer) {
                        elements.previewContainer.style.display = 'flex';
                    }
                    if (elements.userInput) {
                        elements.userInput.style.paddingLeft = '110px';
                    }
                };
                reader.onerror = () => displayMessage('ইমেজ লোড করতে সমস্যা হয়েছে।', 'bot');
                reader.readAsDataURL(file);
            }
            elements.fileInput.value = '';
        });
    }
    if (elements.editBtn) {
        elements.editBtn.addEventListener('click', () => {
            image.src = elements.previewImage?.src || '';
            image.onload = () => {
                if (elements.editCanvas) {
                    elements.editCanvas.width = image.width;
                    elements.editCanvas.height = image.height;
                    cropRect.width = Math.min(200, image.width);
                    cropRect.height = Math.min(200, image.height);
                    drawImage();
                    if (elements.editModal) {
                        elements.editModal.style.display = 'flex';
                    }
                }
            };
        });
    }
    if (elements.cropX) elements.cropX.addEventListener('input', () => { cropRect.x = parseInt(elements.cropX.value); drawImage(); });
    if (elements.cropY) elements.cropY.addEventListener('input', () => { cropRect.y = parseInt(elements.cropY.value); drawImage(); });
    if (elements.cropWidth) elements.cropWidth.addEventListener('input', () => { cropRect.width = parseInt(elements.cropWidth.value); drawImage(); });
    if (elements.cropHeight) elements.cropHeight.addEventListener('input', () => { cropRect.height = parseInt(elements.cropHeight.value); drawImage(); });
    if (elements.brightness) elements.brightness.addEventListener('input', () => { brightnessValue = parseInt(elements.brightness.value); drawImage(); });
    if (elements.contrast) elements.contrast.addEventListener('input', () => { contrastValue = parseInt(elements.contrast.value); drawImage(); });
    if (elements.backgroundColor) elements.backgroundColor.addEventListener('change', () => { bgColor = elements.backgroundColor.value; drawImage(); });
    if (elements.editApplyBtn) {
        elements.editApplyBtn.addEventListener('click', () => {
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = cropRect.width;
            tempCanvas.height = cropRect.height;
            const tempCtx = tempCanvas.getContext('2d');
            if (tempCtx) {
                tempCtx.fillStyle = bgColor === 'transparent' ? 'rgba(0,0,0,0)' : bgColor;
                tempCtx.fillRect(0, 0, cropRect.width, cropRect.height);
                tempCtx.filter = `brightness(${100 + brightnessValue}%) contrast(${100 + contrastValue}%)`;
                tempCtx.drawImage(image, cropRect.x, cropRect.y, cropRect.width, cropRect.height, 0, 0, cropRect.width, cropRect.height);
                editedImage = tempCanvas.toDataURL('image/jpeg');
                if (elements.previewImage) elements.previewImage.src = editedImage;
                callRasaAPI("show_review");
                if (elements.editModal) elements.editModal.style.display = 'none';
            }
        });
    }
    if (elements.editCancelBtn) elements.editCancelBtn.addEventListener('click', () => elements.editModal.style.display = 'none');
    if (elements.imageReviewModal) {
        elements.imageReviewModal.addEventListener('click', (e) => {
            if (e.target === elements.imageReviewModal || e.target === elements.deleteImageBtn) {
                elements.imageReviewModal.style.display = 'none';
            }
        });
    }
    if (elements.deleteImageBtn) elements.deleteImageBtn.addEventListener('click', () => { clearPreview(); elements.imageReviewModal.style.display = 'none'; });
}

function drawImage() {
    const ctx = elements.editCanvas?.getContext('2d');
    if (ctx) {
        ctx.clearRect(0, 0, elements.editCanvas.width, elements.editCanvas.height);
        ctx.fillStyle = bgColor === 'transparent' ? 'rgba(0,0,0,0)' : bgColor;
        ctx.fillRect(0, 0, elements.editCanvas.width, elements.editCanvas.height);
        ctx.filter = `brightness(${100 + brightnessValue}%) contrast(${100 + contrastValue}%)`;
        ctx.drawImage(image, 0, 0);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.strokeRect(cropRect.x, cropRect.y, cropRect.width, cropRect.height);
        ctx.filter = 'none';
    }
}

export function openImageModal(imageSrc) {
    if (elements.reviewImage) elements.reviewImage.src = imageSrc;
    if (elements.imageReviewModal) elements.imageReviewModal.style.display = 'flex';
}

export function clearPreview() {
    selectedFile = null;
    editedImage = null;
    if (elements.previewImage) elements.previewImage.src = '';
    if (elements.previewContainer) elements.previewContainer.style.display = 'none';
    if (elements.userInput) elements.userInput.style.paddingLeft = '15px';
}