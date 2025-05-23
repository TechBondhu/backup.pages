// js/modules/imageHandling.js
import { callRasaAPI } from './api.js';
import { displayMessage } from './messaging.js';
import { sanitizeMessage } from './utilities.js';

export function setupImageHandlers() {
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
    const userInput = document.getElementById('userInput');
    const messagesDiv = document.getElementById('messages');
    const welcomeMessage = document.getElementById('welcomeMessage');

    let selectedFile = null;
    let editedImage = null;
    const ctx = editCanvas?.getContext('2d');
    let image = new Image();
    let cropRect = { x: 0, y: 0, width: 200, height: 200 };
    let brightnessValue = 0;
    let contrastValue = 0;
    let bgColor = 'white';

    // ইমেজ আপলোড
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => fileInput?.click());
    }
    if (fileInput) {
        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            if (file) {
                selectedFile = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (previewImage) {
                        previewImage.src = e.target.result;
                    }
                    if (previewContainer) {
                        previewContainer.style.display = 'flex';
                    }
                    if (userInput) {
                        userInput.style.paddingLeft = '110px';
                    }
                };
                reader.onerror = () => {
                    displayMessage('ইমেজ লোড করতে সমস্যা হয়েছে।', 'bot');
                };
                reader.readAsDataURL(file);
            }
            fileInput.value = '';
        });
    }

    // ইমেজ রিভিউ মডাল
    if (previewImage) {
        previewImage.addEventListener('click', () => {
            if (reviewImage) {
                reviewImage.src = previewImage.src;
            }
            if (imageReviewModal) {
                imageReviewModal.style.display = 'flex';
            }
        });
    }

    // ইমেজ এডিটিং
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            image.src = previewImage?.src || '';
            image.onload = () => {
                if (editCanvas) {
                    editCanvas.width = image.width;
                    editCanvas.height = image.height;
                    cropRect.width = Math.min(200, image.width);
                    cropRect.height = Math.min(200, image.height);
                    drawImage();
                    if (editModal) {
                        editModal.style.display = 'flex';
                    }
                }
            };
        });
    }

    // ক্যানভাস এডিটিং কন্ট্রোল
    if (cropX) {
        cropX.addEventListener('input', () => {
            cropRect.x = parseInt(cropX.value);
            drawImage();
        });
    }

    if (cropY) {
        cropY.addEventListener('input', () => {
            cropRect.y = parseInt(cropY.value);
            drawImage();
        });
    }

    if (cropWidth) {
        cropWidth.addEventListener('input', () => {
            cropRect.width = parseInt(cropWidth.value);
            drawImage();
        });
    }

    if (cropHeight) {
        cropHeight.addEventListener('input', () => {
            cropRect.height = parseInt(cropHeight.value);
            drawImage();
        });
    }

    if (brightness) {
        brightness.addEventListener('input', () => {
            brightnessValue = parseInt(brightness.value);
            drawImage();
        });
    }

    if (contrast) {
        contrast.addEventListener('input', () => {
            contrastValue = parseInt(contrast.value);
            drawImage();
        });
    }

    if (backgroundColor) {
        backgroundColor.addEventListener('change', () => {
            bgColor = backgroundColor.value;
            drawImage();
        });
    }

    function drawImage() {
        if (ctx) {
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
    }

    // এডিটেড ইমেজ প্রয়োগ
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
                if (previewImage) {
                    previewImage.src = editedImage;
                }

                callRasaAPI("show_review");
                if (editModal) {
                    editModal.style.display = 'none';
                }
            }
        });
    }

    if (editCancelBtn) {
        editCancelBtn.addEventListener('click', () => {
            if (editModal) {
                editModal.style.display = 'none';
            }
        });
    }

    if (imageReviewModal) {
        imageReviewModal.addEventListener('click', (e) => {
            if (e.target === imageReviewModal || e.target === deleteImageBtn) {
                imageReviewModal.style.display = 'none';
            }
        });
    }

    if (deleteImageBtn) {
        deleteImageBtn.addEventListener('click', () => {
            clearPreview();
            if (imageReviewModal) {
                imageReviewModal.style.display = 'none';
            }
        });
    }

    function openImageModal(imageSrc) {
        if (reviewImage) {
            reviewImage.src = imageSrc;
        }
        if (imageReviewModal) {
            imageReviewModal.style.display = 'flex';
        }
    }

    function clearPreview() {
        selectedFile = null;
        editedImage = null;
        if (previewImage) {
            previewImage.src = '';
        }
        if (previewContainer) {
            previewContainer.style.display = 'none';
        }
        if (userInput) {
            userInput.style.paddingLeft = '15px';
        }
    }

    // ইমেজ মেসেজে যোগ করা
    export function handleImageMessage() {
        if (selectedFile) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('user-message', 'slide-in');
            const img = document.createElement('img');
            img.src = previewImage?.src || '';
            img.classList.add('image-preview');
            img.addEventListener('click', () => openImageModal(img.src));
            messageDiv.appendChild(img);
            if (messagesDiv) {
                messagesDiv.appendChild(messageDiv);
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            }
            if (welcomeMessage && welcomeMessage.style.display !== 'none') {
                welcomeMessage.classList.add('fade-out');
                setTimeout(() => {
                    welcomeMessage.style.display = 'none';
                    welcomeMessage.classList.remove('fade-out');
                }, 300);
            }

            const formData = new FormData();
            formData.append('image', selectedFile);
            fetch('http://localhost:5000/upload-image', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.image_url) {
                        callRasaAPI(data.image_url);
                        saveChatHistory(`[Image: ${selectedFile.name}]`, 'user');
                    } else if (data.error) {
                        displayMessage(`ইমেজ আপলোডে ত্রুটি: ${sanitizeMessage(data.error)}`, 'bot');
                    }
                })
                .catch(error => {
                    displayMessage('ইমেজ আপলোডে ত্রুটি হয়েছে।', 'bot');
                    console.error('Image Upload Error:', error);
                });
            clearPreview();
        }
    }
}