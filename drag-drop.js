document.addEventListener('DOMContentLoaded', () => {
    const previewContainer = document.getElementById('previewContainer');
    const previewImage = document.getElementById('previewImage');
    const userInput = document.getElementById('userInput');
    const fileInput = document.getElementById('fileInput');
    const messagesDiv = document.getElementById('messages');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const sendBtn = document.getElementById('sendBtn');
    const imageReviewModal = document.getElementById('imageReviewModal');
    const reviewImage = document.getElementById('reviewImage');
    const deleteImageBtn = document.getElementById('deleteImageBtn');

    // Drag and Drop Area (using the entire window as the drop zone)
    const dropZone = document.body;
    const dragDropIndicator = document.getElementById('dragDropIndicator');

    // Prevent default behavior for drag events
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
    });

    // Show drag drop indicator when dragging
    dropZone.addEventListener('dragenter', () => {
        dragDropIndicator.classList.add('active');
    });

    dropZone.addEventListener('dragover', () => {
        dragDropIndicator.classList.add('active');
    });

    dropZone.addEventListener('dragleave', (e) => {
        if (e.relatedTarget === null) {
            dragDropIndicator.classList.remove('active');
        }
    });

    // Handle dropped files
    dropZone.addEventListener('drop', (e) => {
        dragDropIndicator.classList.remove('active');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFiles(files);
        }
    });

    // Handle files for preview
    let selectedFile = null;
    function handleFiles(files) {
        const file = files[0];
        if (file && file.type.startsWith('image/')) {
            selectedFile = file;
            const reader = new FileReader();
            reader.onload = (e) => {
                if (previewImage) {
                    previewImage.src = e.target.result;
                    previewContainer.style.display = 'flex';
                    previewContainer.classList.add('fade-in');
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
    }

    // Handle upload and send via sendBtn with locking mechanism
    let isUploading = false;
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            if (isUploading) return;

            const message = userInput.value.trim();
            if (selectedFile || message) {
                isUploading = true;
                sendBtn.disabled = true;
                sendBtn.style.opacity = '0.5';

                if (selectedFile) {
                    const formData = new FormData();
                    formData.append('image', selectedFile);

                    fetch('http://localhost:5000/upload-image', {
                        method: 'POST',
                        body: formData
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.image_url) {
                                const messageDiv = document.createElement('div');
                                messageDiv.classList.add('user-message', 'slide-in');
                                const img = document.createElement('img');
                                img.src = previewImage.src;
                                img.classList.add('image-preview');
                                img.addEventListener('click', () => openImageModal(previewImage.src));
                                messageDiv.appendChild(img);
                                if (messagesDiv) {
                                    messagesDiv.appendChild(messageDiv);
                                    messagesDiv.scrollTop = messagesDiv.scrollHeight;
                                }
                                callRasaAPI(data.image_url);
                            } else if (data.error) {
                                console.error('Image Upload Error:', data.error);
                            }
                            previewContainer.style.display = 'none';
                            userInput.style.paddingLeft = '12px';
                            selectedFile = null;
                        })
                        .catch(error => {
                            console.error('Image Upload Error:', error);
                            displayMessage('ইমেজ আপলোডে সমস্যা হয়েছে।', 'bot');
                        })
                        .finally(() => {
                            isUploading = false;
                            sendBtn.disabled = false;
                            sendBtn.style.opacity = '1';
                        });
                }

                if (message) {
                    const messageDiv = document.createElement('div');
                    messageDiv.classList.add('user-message', 'slide-in');
                    messageDiv.textContent = message;
                    if (messagesDiv) {
                        messagesDiv.appendChild(messageDiv);
                        messagesDiv.scrollTop = messagesDiv.scrollHeight;
                    }
                    callRasaAPI(message);
                    saveChatHistory(message, 'user');

                    isUploading = false;
                    sendBtn.disabled = false;
                    sendBtn.style.opacity = '1';
                }

                userInput.value = '';
                if (welcomeMessage && welcomeMessage.style.display !== 'none') {
                    welcomeMessage.classList.add('fade-out');
                    setTimeout(() => {
                        welcomeMessage.style.display = 'none';
                        welcomeMessage.classList.remove('fade-out');
                    }, 300);
                }
            }
        });
    }

    // Open Image Modal
    function openImageModal(imageSrc) {
        if (reviewImage) {
            reviewImage.src = imageSrc;
        }
        if (imageReviewModal) {
            imageReviewModal.style.display = 'flex';
        }
    }

    // Close Image Modal
    function closeImageModal() {
        if (imageReviewModal) {
            imageReviewModal.style.display = 'none';
        }
    }

    if (imageReviewModal) {
        imageReviewModal.addEventListener('click', (e) => {
            if (e.target === imageReviewModal) {
                closeImageModal();
            }
        });
    }

    if (deleteImageBtn) {
        deleteImageBtn.addEventListener('click', () => {
            if (imageReviewModal) {
                imageReviewModal.style.display = 'none';
            }
            if (previewContainer) {
                previewContainer.style.display = 'none';
                userInput.style.paddingLeft = '12px';
                selectedFile = null;
            }
        });
    }

    function displayMessage(message, sender) {
        if (window.displayMessage) {
            window.displayMessage(message, sender);
        }
    }

    function callRasaAPI(message, metadata = {}) {
        if (window.callRasaAPI) {
            window.callRasaAPI(message, metadata);
        }
    }

    function saveChatHistory(message, sender) {
        if (window.saveChatHistory) {
            window.saveChatHistory(message, sender);
        }
    }
});
