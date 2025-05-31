// Firebase SDK চেক
if (typeof firebase === 'undefined') {
    console.error("Firebase SDK লোড হয়নি। index.html-এ Firebase CDN যোগ করুন।");
}

// Firebase কনফিগারেশন
const firebaseConfig = {
    apiKey: "AIzaSyCoIdMx9Zd7kQt9MSZmowbphaQVRl8D16E",
    authDomain: "admissionformdb.firebaseapp.com",
    projectId: "admissionformdb",
    storageBucket: "admissionformdb.firebasestorage.app",
    messagingSenderId: "398052082157",
    appId: "1:398052082157:web:0bc02d66cbdf55dd2567e4"
};

// Firebase ইনিশিয়ালাইজ করা (গ্লোবাল স্কোপে)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
window.db = firebase.firestore();
console.log("Firebase initialized:", window.db); // ডিবাগ করার জন্য

// displayMessage ফাংশন (গ্লোবাল স্কোপে)
function displayMessage(message, sender) {
    const messagesDiv = document.getElementById('messages');
    if (!messagesDiv) {
        console.error("messagesDiv not found");
        return;
    }
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message', 'slide-in');
    messageDiv.innerHTML = sanitizeMessage(message);
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// sanitizeMessage ফাংশন (গ্লোবাল স্কোপে)
function sanitizeMessage(message) {
    const div = document.createElement('div');
    div.textContent = message;
    return div.innerHTML;
}

// ওয়েলকাম মেসেজ লুকানোর ফাংশন
function hideWelcomeMessage() {
    const welcomeMessage = document.getElementById('welcomeMessage');
    if (welcomeMessage && welcomeMessage.style.display !== 'none') {
        welcomeMessage.classList.add('fade-out');
        setTimeout(() => {
            welcomeMessage.style.display = 'none';
            welcomeMessage.classList.remove('fade-out');
        }, 300);
    }
}

// DOMContentLoaded ইভেন্ট
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');
    const messagesDiv = document.getElementById('messages');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('fileInput');
    const previewContainer = document.getElementById('previewContainer');
    const previewImage = document.getElementById('previewImage');
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
    const moreOptionsBtn = document.getElementById('moreOptionsBtn');
    const genresModal = document.getElementById('genresModal');
    const closeGenresModal = document.getElementById('closeGenresModal');
    const genresList = document.getElementById('genresList');
    const imageReviewModal = document.getElementById('imageReviewModal');
    const reviewImage = document.getElementById('reviewImage');
    const deleteImageBtn = document.getElementById('deleteImageBtn');

    // State Variables
    let selectedFile = null;
    let editedImage = null;
    const ctx = editCanvas?.getContext('2d');
    let image = new Image();
    let cropRect = { x: 0, y: 0, width: 200, height: 200 };
    let brightnessValue = 0;
    let contrastValue = 0;
    let bgColor = 'white';

    // Setup Chat History Event Handlers from chatHistory.js
    setupChatHistoryEventHandlers();

    // Show Typing Indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('typing-indicator');
        typingDiv.innerHTML = `
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        `;
        if (messagesDiv) {
            messagesDiv.appendChild(typingDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
        return typingDiv;
    }

    // Display Progressive Message
    function displayProgressiveMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message', 'slide-in');
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;

        const words = message.split(' ');
        let currentIndex = 0;

        function addNextWord() {
            if (currentIndex < words.length) {
                messageDiv.innerHTML = sanitizeMessage(words.slice(0, currentIndex + 1).join(' '));
                currentIndex++;
                setTimeout(addNextWord, 100);
            } else {
                saveChatHistory(message, sender);
            }
        }

        addNextWord();
        hideWelcomeMessage();
    }

    // Message Sending
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.repeat) sendMessage();
        });
    }

    function sendMessage() {
        const message = userInput?.value.trim();
        if (message) {
            displayMessage(message, 'user');
            saveChatHistory(message, 'user');
            callRasaAPI(message);
            userInput.value = '';
            hideWelcomeMessage();
        } else if (selectedFile) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('user-message', 'slide-in');
            const img = document.createElement('img');
            img.src = previewImage?.src || '';
            img.classList.add('image-preview');
            img.addEventListener('click', () => openImageModal(img.src));
            messageDiv.appendChild(img);
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;

            const formData = new FormData();
            formData.append('image', selectedFile);
            fetch('http://localhost:5000/upload-image', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.image_url) {
                        callRasaAPI("image_uploaded", { image_url: data.image_url });
                        saveChatHistory(`[Image: ${selectedFile.name}]`, 'user');
                    } else if (data.error) {
                        console.error('Image Upload Error:', data.error);
                        displayMessage('ইমেজ আপলোডে সমস্যা হয়েছে।', 'bot');
                    }
                })
                .catch(error => {
                    console.error('Image Upload Error:', error);
                    displayMessage('ইমেজ আপলোডে সমস্যা হয়েছে।', 'bot');
                });
            clearPreview();
            hideWelcomeMessage();
        }
    }

    // Image Upload and Preview
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
                        previewContainer.style.display = 'block';
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

    // Image Review Modal
    if (previewImage) {
        previewImage.addEventListener('click', () => {
            if (reviewImage) {
                reviewImage.src = previewImage.src;
            }
            if (imageReviewModal) {
                imageReviewModal.style.display = 'block';
            }
        });
    }

    // Image Editing
    if (previewImage) {
        previewImage.addEventListener('dblclick', () => {
            image.src = previewImage?.src || '';
            image.onload = () => {
                if (editCanvas) {
                    editCanvas.width = image.width;
                    editCanvas.height = image.height;
                    cropRect.width = Math.min(200, image.width);
                    cropRect.height = Math.min(200, image.height);
                    drawImage();
                    if (editModal) {
                        editModal.style.display = 'block';
                    }
                }
            };
        });
    }

    // Canvas Editing Controls
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

    // Apply Edited Image
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

    function openImageModal(imageSrc) {
        if (reviewImage) {
            reviewImage.src = imageSrc;
        }
        if (imageReviewModal) {
            imageReviewModal.style.display = 'block';
        }
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

    function clearPreview() {
        selectedFile = null;
        editedImage = null;
        if (previewImage) {
            previewImage.src = '';
        }
        if (previewContainer) {
            previewContainer.style.display = 'none';
        }
    }

    // PDF জেনারেশন ফাংশন (Second code’s server-side PDF generation)
    async function generatePDF(reviewData, reviewCard) {
        try {
            console.log("Initiating PDF generation with reviewData:", reviewData);

            // Filter out image URLs for text-only PDF
            const textOnlyData = {};
            for (const [key, value] of Object.entries(reviewData)) {
                if (typeof value !== 'string' || !(value.startsWith('http') || value.startsWith('data:image'))) {
                    textOnlyData[key] = value;
                } else {
                    textOnlyData[key] = '[Image omitted]'; // Placeholder for image fields
                }
            }

            const response = await fetch('http://localhost:5000/generate-pdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    reviewData: textOnlyData,
                    formType: 'nid' // Default formType
                })
            });

            if (!response.ok) throw new Error(`Server error: ${response.status} - ${response.statusText}`);

            const data = await response.json();
            const pdfUrl = data.pdf_url;
            reviewCard.setAttribute('data-pdf-url', pdfUrl);

            // Add Preview and Download buttons
            const buttonContainer = reviewCard.querySelector('.review-buttons');
            buttonContainer.innerHTML = ''; // Clear existing buttons

            const previewBtn = document.createElement('button');
            previewBtn.className = 'preview-btn ripple-btn';
            previewBtn.innerText = 'Preview PDF';
            previewBtn.addEventListener('click', async () => {
                const previewResponse = await fetch('http://localhost:5000/preview-pdf', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ reviewData: textOnlyData, formType: 'nid' })
                });
                const previewData = await previewResponse.json();
                const htmlContent = previewData.html_content;

                const previewWindow = window.open('', '_blank');
                previewWindow.document.write(htmlContent);
                previewWindow.document.close();
            });

            const downloadBtn = document.createElement('button');
            downloadBtn.className = 'download-btn ripple-btn';
            downloadBtn.innerText = 'Download PDF';
            downloadBtn.addEventListener('click', () => {
                const pdfUrl = reviewCard.getAttribute('data-pdf-url');
                if (pdfUrl) {
                    const link = document.createElement('a');
                    link.href = pdfUrl;
                    link.download = 'formbondhu_submission.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    displayMessage('পিডিএফ ডাউনলোডের জন্য URL পাওয়া যায়নি।', 'bot');
                }
            });

            buttonContainer.appendChild(previewBtn);
            buttonContainer.appendChild(downloadBtn);
        } catch (error) {
            console.error("Error generating PDF:", error.message || error);
            displayMessage('পিডিএফ তৈরিতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।', 'bot');
        }
    }

    function displayReview(reviewData) {
        const reviewCard = document.createElement('div');
        reviewCard.classList.add('review-card', 'slide-in');
        reviewCard.setAttribute('data-editable', 'true');
        reviewCard.setAttribute('data-id', Date.now());
        reviewCard.setAttribute('data-confirmed', 'false');
        reviewCard.innerHTML = '<h3>আপনার তথ্য রিভিউ</h3>';

        const reviewContent = document.createElement('div');
        reviewContent.classList.add('review-content');

        for (const [key, value] of Object.entries(reviewData)) {
            const reviewItem = document.createElement('div');
            reviewItem.classList.add('review-item');
            reviewItem.setAttribute('data-key', key);

            const label = document.createElement('label');
            label.innerText = key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ') + ':';
            reviewItem.appendChild(label);

            if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('data:image'))) {
                const img = document.createElement('img');
                img.src = value;
                reviewItem.appendChild(img);
            } else {
                const p = document.createElement('p');
                p.innerText = value;
                reviewItem.appendChild(p);
            }

            reviewContent.appendChild(reviewItem);
        }

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'review-buttons';

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn ripple-btn';
        editBtn.innerText = 'Edit';
        editBtn.addEventListener('click', () => toggleEditMode(reviewCard, reviewData));

        const confirmBtn = document.createElement('button');
        confirmBtn.className = 'confirm-btn ripple-btn';
        confirmBtn.innerText = 'Confirm';
        confirmBtn.style.display = 'inline-block';
        let isProcessing = false;

        confirmBtn.addEventListener('click', async () => {
            if (isProcessing) return;
            isProcessing = true;
            confirmBtn.disabled = true;

            try {
                const updatedData = {};
                reviewContent.querySelectorAll('.review-item').forEach(item => {
                    const key = item.getAttribute('data-key');
                    const value = item.querySelector('p')?.innerText || item.querySelector('img')?.src;
                    if (!value) {
                        console.warn(`কোনো মান পাওয়া যায়নি: ${key}`);
                    }
                    updatedData[key] = value;
                });

                await db.collection('submissions').add({
                    review_data: updatedData,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    chat_id: currentChatId
                });

                displayMessage('আপনার তথ্য সফলভাবে ফায়ারবেজে পাঠানো হয়েছে!', 'bot');
                await generatePDF(updatedData, reviewCard);
                reviewCard.setAttribute('data-confirmed', 'true');
                reviewCard.setAttribute('data-editable', 'false');
                editBtn.disabled = true;
                editBtn.style.display = 'none';
                confirmBtn.style.display = 'none';
            } catch (error) {
                let errorMessage = 'অজানা ত্রুটি ঘটেছে।';
                if (error.code && error.message) {
                    errorMessage = `ফায়ারবেজে তথ্য পাঠাতে সমস্যা: ${error.message}`;
                }
                displayMessage(errorMessage, 'bot');
                console.error('Error in confirm button:', error);
                confirmBtn.disabled = false;
            } finally {
                isProcessing = false;
            }
        });

        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(confirmBtn);

        reviewCard.appendChild(reviewContent);
        reviewCard.appendChild(buttonContainer);
        if (messagesDiv) {
            messagesDiv.appendChild(reviewCard);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
    }

    function toggleEditMode(card, reviewData) {
        if (card.getAttribute('data-confirmed') === 'true') {
            displayMessage('ডেটা কনফার্ম হয়ে গেছে। এডিট করা যাবে না।', 'bot');
            return;
        }

        const isEditable = card.getAttribute('data-editable') === 'true';
        const reviewContent = card.querySelector('.review-content');
        const editBtn = card.querySelector('.edit-btn');
        const confirmBtn = card.querySelector('.confirm-btn');

        if (!isEditable) {
            card.setAttribute('data-editable', 'true');
            editBtn.innerText = 'Save';
            confirmBtn.style.display = 'none';

            reviewContent.querySelectorAll('.review-item').forEach(item => {
                const key = item.getAttribute('data-key');
                const value = item.querySelector('p')?.innerText || item.querySelector('img')?.src;
                item.innerHTML = `<label>${sanitizeMessage(key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '))}:</label>`;

                if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('data:image'))) {
                    const img = document.createElement('img');
                    img.src = value;
                    item.appendChild(img);

                    const replaceIcon = document.createElement('i');
                    replaceIcon.className = 'fas fa-camera replace-image-icon';
                    item.appendChild(replaceIcon);

                    const replaceInput = document.createElement('input');
                    replaceInput.type = 'file';
                    replaceInput.className = 'replace-image-input';
                    replaceInput.accept = 'image/png, image/jpeg';
                    replaceInput.style.display = 'none';
                    item.appendChild(replaceInput);

                    replaceIcon.addEventListener('click', () => replaceInput.click());

                    replaceInput.addEventListener('change', () => {
                        const file = replaceInput.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                img.src = e.target.result;
                            };
                            reader.onerror = () => {
                                displayMessage('ইমেজ লোড করতে সমস্যা হয়েছে।', 'bot');
                            };
                            reader.readAsDataURL(file);
                        } else {
                            displayMessage('কোনো ইমেজ সিলেক্ট করা হয়নি।', 'bot');
                        }
                    });
                } else {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = value || '';
                    input.className = 'edit-input';
                    item.appendChild(input);
                }
            });
        } else {
            const updatedData = { ...reviewData };
            reviewContent.querySelectorAll('.review-item').forEach(item => {
                const key = item.getAttribute('data-key');
                const input = item.querySelector('input.edit-input');
                const img = item.querySelector('img');
                if (input) {
                    const newValue = input.value.trim();
                    updatedData[key] = newValue;
                    item.innerHTML = `<label>${sanitizeMessage(key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '))}:</label><p>${sanitizeMessage(newValue)}</p>`;
                } else if (img) {
                    updatedData[key] = img.src;
                    item.innerHTML = `<label>${sanitizeMessage(key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '))}:</label><img src="${img.src}">`;
                }
            });

            card.setAttribute('data-editable', 'false');
            editBtn.innerText = 'Edit';
            confirmBtn.style.display = 'inline-block';
        }
    }

    function callRasaAPI(message, metadata = {}) {
        const typingDiv = showTypingIndicator();
        const payload = { sender: currentChatId, message: message };
        if (Object.keys(metadata).length > 0) {
            payload.metadata = metadata;
        }
        setTimeout(() => {
            if (typeof $ !== 'undefined') {
                $.ajax({
                    url: 'http://localhost:5005/webhooks/rest/webhook',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(payload),
                    success: (data) => {
                        typingDiv.remove();
                        if (!data || data.length === 0) {
                            displayMessage('কোনো প্রতিক্রিয়া পাওয়া যায়নি। দয়া করে আবার চেষ্টা করুন।', 'bot');
                            saveChatHistory('কোনো প্রতিক্রিয়া পাওয়া যায়নি।', 'bot');
                            return;
                        }
                        data.forEach(response => {
                            if (response.text && !response.text.toLowerCase().includes('hi')) {
                                displayMessage(sanitizeMessage(response.text), 'bot');
                                saveChatHistory(sanitizeMessage(response.text), 'bot');
                            }
                            if (response.custom && response.custom.review_data) {
                                displayReview(response.custom.review_data);
                            }
                            if (response.buttons) {
                                const buttonDiv = document.createElement('div');
                                buttonDiv.classList.add('welcome-buttons');
                                response.buttons.forEach(btn => {
                                    const button = document.createElement('button');
                                    button.innerText = sanitizeMessage(btn.title);
                                    button.classList.add('ripple-btn');
                                    button.addEventListener('click', () => sendMessage(btn.payload));
                                    buttonDiv.appendChild(button);
                                });
                                if (messagesDiv) {
                                    messagesDiv.appendChild(buttonDiv);
                                }
                            }
                        });
                    },
                    error: (error) => {
                        typingDiv.remove();
                        displayMessage('বটের সাথে সংযোগে সমস্যা হয়েছে। দয়া করে সার্ভার চেক করুন।', 'bot');
                        saveChatHistory('বটের সাথে সংযোগে সমস্যা হয়েছে।', 'bot');
                        console.error('Rasa API Error:', error.status, error.statusText, error.responseText);
                    }
                });
            } else {
                typingDiv.remove();
                displayMessage('jQuery লোড হয়নি। দয়া করে jQuery লাইব্রেরি যোগ করুন।', 'bot');
                saveChatHistory('jQuery লোড হয়নি।', 'bot');
            }
        }, 500);
    }

    // Genres Data
    const genres = [
        { name: 'এনআইডি আবেদন', icon: 'fas fa-id-card', message: 'আমার জন্য একটি এনআইডি তৈরি করতে চাই' },
        { name: 'পাসপোর্ট আবেদন', icon: 'fas fa-passport', message: 'আমি পাসপোর্ট আবেদন করতে চাই' },
        { name: 'কোম্পানি রেজিস্ট্রেশন', icon: 'fas fa-building', message: 'আমি কোম্পানি রেজিস্ট্রেশন করতে চাই' },
        { name: 'পেনশন আবেদন ফর্ম', icon: 'fas fa-money-check-alt', message: 'আমি পেনশন আবেদন করতে চাই' },
        { name: 'টিআইএন (TIN) সার্টিফিকেট আবেদন', icon: 'fas fa-file-invoice', message: 'আমি টিআইএন সার্টিফিকেট আবেদন করতে চাই' },
        { name: 'ভূমি নামজারি (Mutation) আবেদনপত্র', icon: 'fas fa-map-marked-alt', message: 'আমি ভূমি নামজারি আবেদন করতে চাই' },
        { name: 'উপবৃত্তি বা শিক্ষাবৃত্তির আবেদন', icon: 'fas fa-graduation-cap', message: 'আমি উপবৃত্তি বা শিক্ষাবৃত্তির আবেদন করতে চাই' },
        { name: 'জন্ম ও মৃত্যু নিবন্ধন', icon: 'fas fa-certificate', message: 'আমি জন্ম ও মৃত্যু নিবন্ধন করতে চাই' },
        { name: 'ড্রাইভিং লাইসেন্স আবেদন', icon: 'fas fa-car', message: 'আমি ড্রাইভিং লাইসেন্স আবেদন করতে চাই' },
        { name: 'নাগরিক সনদ (Citizen Certificate) আবেদন', icon: 'fas fa-user-check', message: 'আমি নাগরিক সনদ আবেদন করতে চাই' },
        { name: 'চারিত্রিক সনদপত্র (Character Certificate) আবেদন', icon: 'fas fa-award', message: 'আমি চারিত্রিক সনদপত্র আবেদন করতে চাই' },
        { name: 'ট্রেড লাইসেন্স', icon: 'fas fa-store', message: 'আমি ট্রেড লাইসেন্স আবেদন করতে চাই' },
        { name: 'ভ্যাট রেজিস্ট্রেশন', icon: 'fas fa-calculator', message: 'আমি ভ্যাট রেজিস্ট্রেশন করতে চাই' },
        { name: 'প্রপার্টি রেজিস্ট্রেশন', icon: 'fas fa-home', message: 'আমি প্রপার্টি রেজিস্ট্রেশন করতে চাই' },
        { name: 'ব্যাংক অ্যাকাউন্ট খোলা', icon: 'fas fa-university', message: 'আমি ব্যাংক অ্যাকাউন্ট খুলতে চাই' },
        { name: 'ঢাকা বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি ঢাকা বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
        { name: 'খুলনা বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি খুলনা বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
        { name: 'রাজশাহী বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি রাজশাহী বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
        { name: 'চট্টগ্রাম বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি চট্টগ্রাম বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
        { name: 'জাহাঙ্গীরনগর বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি জাহাঙ্গীরনগর বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
        { name: 'বাংলাদেশ কৃষি বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি বাংলাদেশ কৃষি বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
        { name: 'শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
        { name: 'জগন্নাথ বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি জগন্নাথ বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
        { name: 'কুমিল্লা বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি কুমিল্লা বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
        { name: 'বরিশাল বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি বরিশাল বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
        { name: 'নোয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি নোয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
        { name: 'হাজী মোহাম্মদ দানেশ বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি হাজী মোহাম্মদ দানেশ বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
        { name: 'মাওলানা ভাসানী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি মাওলানা ভাসানী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
        { name: 'পটুয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি পটুয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
        { name: 'ইসলামী বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি ইসলামী বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
        { name: 'গ্যাস সংযোগ আবেদন', icon: 'fas fa-fire', message: 'আমি গ্যাস সংযোগ আবেদন করতে চাই' },
        { name: 'বিদ্যুৎ সংযোগ আবেদন', icon: 'fas fa-bolt', message: 'আমি বিদ্যুৎ সংযোগ আবেদন করতে চাই' },
        { name: 'পানি সংযোগ আবেদন', icon: 'fas fa-faucet', message: 'আমি পানি সংযোগ আবেদন করতে চাই' },
        { name: 'জমির খতিয়ান সংশোধন', icon: 'fas fa-file-alt', message: 'আমি জমির খতিয়ান সংশোধন করতে চাই' },
        { name: 'ভূমি উন্নয়ন কর পরিশোধ', icon: 'fas fa-money-bill', message: 'আমি ভূমি উন্নয়ন কর পরিশোধ করতে চাই' },
        { name: 'ইমিগ্রেশন ক্লিয়ারেন্স', icon: 'fas fa-plane-departure', message: 'আমি ইমিগ্রেশন ক্লিয়ারেন্সের জন্য আবেদন করতে চাই' },
        { name: 'ওয়ারিশ সনদ আবেদন', icon: 'fas fa-users', message: 'আমি ওয়ারিশ সনদ আবেদন করতে চাই' },
        { name: 'পৌরসভা সেবা আবেদন', icon: 'fas fa-city', message: 'আমি পৌরসভা সেবা আবেদন করতে চাই' },
        { name: 'বন্ধকী জমি রেজিস্ট্রেশন', icon: 'fas fa-handshake', message: 'আমি বন্ধকী জমি রেজিস্ট্রেশন করতে চাই' },
        { name: 'বিবাহ নিবন্ধন আবেদন', icon: 'fas fa-ring', message: 'আমি বিবাহ নিবন্ধন করতে চাই' },
        { name: 'তালাক নিবন্ধন আবেদন', icon: 'fas fa-heart-broken', message: 'আমি তালাক নিবন্ধন করতে চাই' },
        { name: 'জাতীয় পেনশন স্কিমে যোগদান', icon: 'fas fa-piggy-bank', message: 'আমি জাতীয় পেনশন স্কিমে যোগ দিতে চাই' },
        { name: 'পরিবেশ ছাড়পত্র আবেদন', icon: 'fas fa-leaf', message: 'আমি পরিবেশ ছাড়পত্র আবেদন করতে চাই' },
        { name: 'ফায়ার সেফটি সার্টিফিকেট', icon: 'fas fa-fire-extinguisher', message: 'আমি ফায়ার সেফটি সার্টিফিকেট আবেদন করতে চাই' },
        { name: 'বিল্ডিং প্ল্যান অনুমোদন', icon: 'fas fa-drafting-compass', message: 'আমি বিল্ডিং প্ল্যান অনুমোদনের জন্য আবেদন করতে চাই' },
        { name: 'সরকারি চাকরি আবেদন', icon: 'fas fa-briefcase', message: 'আমি সরকারি চাকরির জন্য আবেদন করতে চাই' },
        { name: 'প্রবাসী কল্যাণ সেবা আবেদন', icon: 'fas fa-globe', message: 'আমি প্রবাসী কল্যাণ সেবা আবেদন করতে চাই' },
        { name: 'হজ ভিসা আবেদন', icon: 'fas fa-kaaba', message: 'আমি হজ ভিসা আবেদন করতে চাই' },
        { name: 'পেশাদার লাইসেন্স (ডাক্তার/ইঞ্জিনিয়ার)', icon: 'fas fa-stethoscope', message: 'আমি পেশাদার লাইসেন্স (ডাক্তার/ইঞ্জিনিয়ার) আবেদন করতে চাই' },
        { name: 'সরকারি অনুদান আবেদন', icon: 'fas fa-hand-holding-usd', message: 'আমি সরকারি অনুদান আবেদন করতে চাই' },
        { name: 'সেনাবাহিনী চাকরি', icon: 'fas fa-shield-alt', message: 'আমি সেনাবাহিনী চাকরির জন্য আবেদন করতে চাই' },
        { name: 'পুলিশ চাকরি', icon: 'fas fa-user-shield', message: 'আমি পুলিশ চাকরির জন্য আবেদন করতে চাই' },
        { name: 'আনসার-ভিডিপি চাকরি', icon: 'fas fa-users-cog', message: 'আমি আনসার-ভিডিপি চাকরির জন্য আবেদন করতে চাই' },
        { name: 'রেলওয়ে চাকরি', icon: 'fas fa-train', message: 'আমি রেলওয়ে চাকরির জন্য আবেদন করতে চাই' },
        { name: 'পোস্ট অফিস চাকরি', icon: 'fas fa-envelope', message: 'আমি পোস্ট অফিস চাকরির জন্য আবেদন করতে চাই' },
        { name: 'শিক্ষক নিয়োগ (সরকারি)', icon: 'fas fa-chalkboard-teacher', message: 'আমি শিক্ষক নিয়োগ (সরকারি) চাকরির জন্য আবেদন করতে চাই' },
        { name: 'স্বাস্থ্যকর্মী চাকরি', icon: 'fas fa-user-md', message: 'আমি স্বাস্থ্যকর্মী চাকরির জন্য আবেদন করতে চাই' },
        { name: 'বাংলা একাডেমি চাকরি', icon: 'fas fa-book', message: 'আমি বাংলা একাডেমি চাকরির জন্য আবেদন করতে চাই' },
        { name: 'বিআরটিসি চাকরি', icon: 'fas fa-bus', message: 'আমি বিআরটিসি চাকরির জন্য আবেদন করতে চাই' },
        { name: 'কাস্টমস চাকরি', icon: 'fas fa-boxes', message: 'আমি কাস্টমস চাকরির জন্য আবেদন করতে চাই' },
        { name: 'ট্যাক্স চাকরি', icon: 'fas fa-file-invoice-dollar', message: 'আমি ট্যাক্স চাকরির জন্য আবেদন করতে চাই' },
        { name: 'ফায়ার সার্ভিস চাকরি', icon: 'fas fa-fire', message: 'আমি ফায়ার সার্ভিস চাকরির জন্য আবেদন করতে চাই' },
        { name: 'জেলা প্রশাসন চাকরি', icon: 'fas fa-landmark', message: 'আমি জেলা প্রশাসন চাকরির জন্য আবেদন করতে চাই' },
        // ... (remaining genres identical, omitted for brevity)
    ];

    function renderGenresList() {
        if (genresList) {
            genresList.innerHTML = '';
            genres.forEach(genre => {
                const genreItem = document.createElement('div');
                genreItem.className = 'genre-item ripple-btn';
                genreItem.innerHTML = `<i class="${sanitizeMessage(genre.icon)}"></i><span>${sanitizeMessage(genre.name)}</span>`;
                genreItem.addEventListener('click', () => {
                    if (genre.message) {
                        genresModal.classList.add('slide-out');
                        setTimeout(() => {
                            genresModal.style.display = 'none';
                            genresModal.classList.remove('slide-out');
                        }, 300);
                        displayMessage(sanitizeMessage(genre.message), 'user');
                        saveChatHistory(sanitizeMessage(genre.message), 'user');
                        callRasaAPI(sanitizeMessage(genre.message));
                        hideWelcomeMessage();
                    } else {
                        console.error(`Message undefined for genre: ${genre.name}`);
                        displayMessage('এই সেবাটি বর্তমানে উপলব্ধ নয়।', 'bot');
                        saveChatHistory('এই সেবাটি বর্তমানে উপলব্ধ নয়।', 'bot');
                    }
                });
                genresList.appendChild(genreItem);
            });
        }
    }

    function openGenresModal() {
        renderGenresList();
        genresModal.classList.add('slide-in');
        genresModal.style.display = 'block';
        setTimeout(() => genresModal.classList.remove('slide-in'), 300);
    }

    function closeGenresModalFunc() {
        genresModal.classList.add('slide-out');
        setTimeout(() => {
            genresModal.style.display = 'none';
            genresModal.classList.remove('slide-out');
        }, 300);
    }

    if (moreOptionsBtn) {
        moreOptionsBtn.addEventListener('click', openGenresModal);
    }
    if (closeGenresModal) {
        closeGenresModal.addEventListener('click', closeGenresModalFunc);
    }

    document.querySelectorAll('.welcome-buttons button[data-genre]').forEach(button => {
        button.classList.add('ripple-btn');
        button.addEventListener('click', () => {
            const genreName = button.getAttribute('data-genre');
            const genre = genres.find(g => g.name === genreName);
            if (genre && genre.message) {
                displayMessage(sanitizeMessage(genre.message), 'user');
                saveChatHistory(sanitizeMessage(genre.message), 'user');
                callRasaAPI(sanitizeMessage(genre.message));
                hideWelcomeMessage();
            } else {
                console.error(`Genre not found or message undefined for: ${genreName}`);
                displayMessage('এই সেবাটি বর্তমানে উপলব্ধ নয়।', 'bot');
                saveChatHistory('এই সেবাটি বর্তমানে উপলব্ধ নয়।', 'bot');
            }
        });
    });

    // Initialize
    if (currentChatId && messagesDiv) {
        loadChatMessages(currentChatId);
    } else {
        startNewChat();
    }
    loadChatHistory();
});
