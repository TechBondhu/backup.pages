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
    const dragDropIndicator = document.getElementById('dragDropIndicator');

    // Drag and Drop Area (using the entire window as the drop zone)
    const dropZone = document.body;

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
                    // Add click event to open review modal
                    previewImage.addEventListener('click', () => openImageModal(previewImage.src));
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

    // Function to open image review modal
    function openImageModal(imageSrc) {
        if (imageReviewModal && reviewImage) {
            reviewImage.src = imageSrc;
            imageReviewModal.style.display = 'flex';
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

    // Handle delete button in review modal
    if (deleteImageBtn) {
        deleteImageBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent modal click event from firing
            if (imageReviewModal) {
                imageReviewModal.style.display = 'none';
            }
            if (previewContainer) {
                previewContainer.style.display = 'none';
            }
            if (userInput) {
                userInput.style.paddingLeft = '12px';
            }
            selectedFile = null;
        });
    }

    // Close modal when clicking outside the image content
    if (imageReviewModal) {
        imageReviewModal.addEventListener('click', (e) => {
            // Check if the click is on the modal background (not on the content)
            if (e.target === imageReviewModal) {
                imageReviewModal.style.display = 'none';
            }
        });
    }

    // Prevent modal from closing when clicking inside the image content
    const imageReviewContent = document.querySelector('.image-review-content');
    if (imageReviewContent) {
        imageReviewContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Placeholder for callRasaAPI (unchanged)
    function callRasaAPI(data) {
        console.log('Calling Rasa API with:', data);
        // Implement Rasa API call here
    }

    // Placeholder for saveChatHistory (unchanged)
    function saveChatHistory(message, sender) {
        console.log('Saving to chat history:', { message, sender });
        // Implement chat history saving here
    }

    // Placeholder for displayMessage (unchanged)
    function displayMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(sender === 'bot' ? 'bot-message' : 'user-message', 'slide-in');
        messageDiv.textContent = message;
        if (messagesDiv) {
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
    }
});
