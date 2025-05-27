// drag-drop.js
document.addEventListener('DOMContentLoaded', () => {
    const previewContainer = document.getElementById('previewContainer');
    const previewImage = document.getElementById('previewImage');
    const userInput = document.getElementById('userInput');
    const fileInput = document.getElementById('fileInput');
    const messagesDiv = document.getElementById('messages');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const uploadConfirmBtn = document.getElementById('uploadConfirmBtn');
    const imageReviewModal = document.getElementById('imageReviewModal');
    const reviewImage = document.getElementById('reviewImage');
    const deleteImageBtn = document.getElementById('deleteImageBtn');

    // Drag and Drop Area (using input-area as the drop zone)
    const dropZone = document.querySelector('.input-area');
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

    dropZone.addEventListener('dragleave', () => {
        dragDropIndicator.classList.remove('active');
    });

    // Handle dropped files
    dropZone.addEventListener('drop', (e) => {
        dragDropIndicator.classList.remove('active');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFiles(files);
        }
    });

    // Handle files for preview (without immediate upload)
    let selectedFile = null; // Store the file for later upload
    function handleFiles(files) {
        const file = files[0];
        if (file && file.type.startsWith('image/')) {
            selectedFile = file; // Store the file for later upload
            const reader = new FileReader();
            reader.onload = (e) => {
                if (previewImage) {
                    previewImage.src = e.target.result;
                    previewContainer.style.display = 'flex'; // Show preview
                }
                if (userInput) {
                    userInput.style.paddingLeft = '110px'; // Adjust input padding
                }
            };
            reader.onerror = () => {
                displayMessage('ইমেজ লোড করতে সমস্যা হয়েছে।', 'bot');
            };
            reader.readAsDataURL(file);
        }
    }

    // Handle upload confirmation
    if (uploadConfirmBtn) {
        uploadConfirmBtn.addEventListener('click', () => {
            if (selectedFile) {
                // Display image in chat as user message
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
                if (welcomeMessage && welcomeMessage.style.display !== 'none') {
                    welcomeMessage.classList.add('fade-out');
                    setTimeout(() => {
                        welcomeMessage.style.display = 'none';
                        welcomeMessage.classList.remove('fade-out');
                    }, 300);
                }

                // Upload to server
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
                        } else if (data.error) {
                            console.error('Image Upload Error:', data.error);
                        }
                        // Reset preview after upload
                        previewContainer.style.display = 'none';
                        userInput.style.paddingLeft = '12px';
                        selectedFile = null;
                    })
                    .catch(error => {
                        console.error('Image Upload Error:', error);
                    });
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

    // Add click event to close modal when clicking outside
    if (imageReviewModal) {
        imageReviewModal.addEventListener('click', (e) => {
            if (e.target === imageReviewModal) {
                closeImageModal();
            }
        });
    }

    // Add click event to delete image button
    if (deleteImageBtn) {
        deleteImageBtn.addEventListener('click', () => {
            if (imageReviewModal) {
                imageReviewModal.style.display = 'none';
            }
            // Optionally reset preview if needed
            if (previewContainer) {
                previewContainer.style.display = 'none';
                userInput.style.paddingLeft = '12px';
                selectedFile = null;
            }
        });
    }

    // Reuse displayMessage function from scripts.js
    function displayMessage(message, sender) {
        if (window.displayMessage) {
            window.displayMessage(message, sender);
        }
    }

    // Reuse callRasaAPI function from scripts.js
    function callRasaAPI(message, metadata = {}) {
        if (window.callRasaAPI) {
            window.callRasaAPI(message, metadata);
        }
    }

    // Reuse saveChatHistory function from scripts.js
    function saveChatHistory(message, sender) {
        if (window.saveChatHistory) {
            window.saveChatHistory(message, sender);
        }
    }
});
