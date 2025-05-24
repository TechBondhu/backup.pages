import { displayMessage, sanitizeMessage } from './domUtils.js';
import { callRasaAPI } from './apiService.js';

export let selectedFile = null;
export let editedImage = null;

export function setupImageUpload(uploadBtn, fileInput, previewImage, previewContainer, userInput, messagesDiv, welcomeMessage, currentChatId, saveChatHistory) {
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => fileInput.click());
    }
    if (fileInput) {
        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            if (file) {
                selectedFile = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    previewImage.src = e.target.result;
                    previewContainer.style.display = 'flex';
                    userInput.style.paddingLeft = '110px';
                };
                reader.onerror = () => {
                    displayMessage('ইমেজ লোড করতে সমস্যা হয়েছে।', 'bot', messagesDiv, welcomeMessage, saveChatHistory, currentChatId);
                };
                reader.readAsDataURL(file);
            }
            fileInput.value = '';
        });
    }
}

export function setupImagePreview(previewImage, reviewImage, imageReviewModal) {
    if (previewImage) {
        previewImage.addEventListener('click', () => {
            reviewImage.src = previewImage.src;
            imageReviewModal.style.display = 'flex';
        });
    }
}

export function setupImageEditing(editBtn, previewImage, editCanvas, editModal, cropX, cropY, cropWidth, cropHeight, brightness, contrast, backgroundColor, editApplyBtn, editCancelBtn, callRasaAPI, currentChatId) {
    const ctx = editCanvas.getContext('2d');
    let image = new Image();
    let cropRect = { x: 0, y: 0, width: 200, height: 200 };
    let brightnessValue = 0;
    let contrastValue = 0;
    let bgColor = 'white';

    if (editBtn) {
        editBtn.addEventListener('click', () => {
            image.src = previewImage.src;
            image.onload = () => {
                editCanvas.width = image.width;
                editCanvas.height = image.height;
                cropRect.width = Math.min(200, image.width);
                cropRect.height = Math.min(200, image.height);
                drawImage(ctx, image, cropRect, brightnessValue, contrastValue, bgColor);
                editModal.style.display = 'flex';
            };
        });
    }

    if (cropX) {
        cropX.addEventListener('input', () => {
            cropRect.x = parseInt(cropX.value);
            drawImage(ctx, image, cropRect, brightnessValue, contrastValue, bgColor);
        });
    }

    if (cropY) {
        cropY.addEventListener('input', () => {
            cropRect.y = parseInt(cropY.value);
            drawImage(ctx, image, cropRect, brightnessValue, contrastValue, bgColor);
        });
    }

    if (cropWidth) {
        cropWidth.addEventListener('input', () => {
            cropRect.width = parseInt(cropWidth.value);
            drawImage(ctx, image, cropRect, brightnessValue, contrastValue, bgColor);
        });
    }

    if (cropHeight) {
        cropHeight.addEventListener('input', () => {
            cropRect.height = parseInt(cropHeight.value);
            drawImage(ctx, image, cropRect, brightnessValue, contrastValue, bgColor);
        });
    }

    if (brightness) {
        brightness.addEventListener('input', () => {
            brightnessValue = parseInt(brightness.value);
            drawImage(ctx, image, cropRect, brightnessValue, contrastValue, bgColor);
        });
    }

    if (contrast) {
        contrast.addEventListener('input', () => {
            contrastValue = parseInt(contrast.value);
            drawImage(ctx, image, cropRect, brightnessValue, contrastValue, bgColor);
        });
    }

    if (backgroundColor) {
        backgroundColor.addEventListener('change', () => {
            bgColor = backgroundColor.value;
            drawImage(ctx, image, cropRect, brightnessValue, contrastValue, bgColor);
        });
    }

    if (editApplyBtn) {
        editApplyBtn.addEventListener('click', () => {
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
                previewImage.src = editedImage;
                callRasaAPI("show_review", {}, currentChatId);
                editModal.style.display = 'none';
            }
        });
    }

    if (editCancelBtn) {
        editCancelBtn.addEventListener('click', () => {
            editModal.style.display = 'none';
        });
    }
}

export function drawImage(ctx, image, cropRect, brightnessValue, contrastValue, bgColor) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = bgColor === 'transparent' ? 'rgba(0,0,0,0)' : bgColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.filter = `brightness(${100 + brightnessValue}%) contrast(${100 + contrastValue}%)`;
    ctx.drawImage(image, 0, 0);

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.strokeRect(cropRect.x, cropRect.y, cropRect.width, cropRect.height);
    ctx.filter = 'none';
}

export function openImageModal(reviewImage, imageReviewModal, imageSrc) {
    reviewImage.src = imageSrc;
    imageReviewModal.style.display = 'flex';
}

export function clearPreview(previewImage, previewContainer, userInput) {
    selectedFile = null;
    editedImage = null;
    previewImage.src = '';
    previewContainer.style.display = 'none';
    userInput.style.paddingLeft = '15px';
}

export function setupImageReviewModal(imageReviewModal, deleteImageBtn, clearPreview, previewImage, previewContainer, userInput) {
    if (imageReviewModal) {
        imageReviewModal.addEventListener('click', (e) => {
            if (e.target === imageReviewModal || e.target === deleteImageBtn) {
                imageReviewModal.style.display = 'none';
            }
        });
    }
    if (deleteImageBtn) {
        deleteImageBtn.addEventListener('click', () => {
            clearPreview(previewImage, previewContainer, userInput);
            imageReviewModal.style.display = 'none';
        });
    }
}