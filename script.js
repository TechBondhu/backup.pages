// Firebase SDK চেক
if (typeof firebase === 'undefined') {
    console.error("Step 1: Firebase SDK লোড হয়নি। index.html-এ Firebase CDN যোগ করুন।");
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
    console.log("Step 2: Initializing Firebase with config:", firebaseConfig);
    firebase.initializeApp(firebaseConfig);
}
window.db = firebase.firestore();
console.log("Step 3: Firebase initialized:", window.db); // ডিবাগ করার জন্য

// displayMessage ফাংশন (গ্লোবাল স্কোপে)
function displayMessage(message, sender) {
    console.log("Step 4: displayMessage called with message:", message, "sender:", sender);
    const messagesDiv = document.getElementById('messages');
    if (!messagesDiv) {
        console.error("Step 5: messagesDiv not found");
        return;
    }
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message', 'slide-in');
    messageDiv.innerHTML = sanitizeMessage(message);
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    console.log("Step 6: Message appended to messagesDiv");
}

// sanitizeMessage ফাংশন (গ্লোবাল স্কোপে)
function sanitizeMessage(message) {
    console.log("Step 7: Sanitizing message:", message);
    const div = document.createElement('div');
    div.textContent = message;
    return div.innerHTML;
}

// ওয়েলকাম মেসেজ লুকানোর ফাংশন
function hideWelcomeMessage() {
    console.log("Step 8: Hiding welcome message");
    const welcomeMessage = document.getElementById('welcomeMessage');
    if (welcomeMessage && welcomeMessage.style.display !== 'none') {
        welcomeMessage.classList.add('fade-out');
        setTimeout(() => {
            welcomeMessage.style.display = 'none';
            welcomeMessage.classList.remove('fade-out');
            console.log("Step 9: Welcome message hidden");
        }, 300);
    } else {
        console.log("Step 9: No welcome message to hide or already hidden");
    }
}

// DOMContentLoaded ইভেন্ট
document.addEventListener('DOMContentLoaded', () => {
    console.log("Step 10: DOMContentLoaded event triggered");

    // DOM Elements
    const sendBtn = document.getElementById('sendBtn');
    console.log("Step 11: sendBtn element:", sendBtn);
    const userInput = document.getElementById('userInput');
    console.log("Step 12: userInput element:", userInput);
    const messagesDiv = document.getElementById('messages');
    console.log("Step 13: messagesDiv element:", messagesDiv);
    const uploadBtn = document.getElementById('uploadBtn');
    console.log("Step 14: uploadBtn element:", uploadBtn);
    const fileInput = document.getElementById('fileInput');
    console.log("Step 15: fileInput element:", fileInput);
    const previewContainer = document.getElementById('previewContainer');
    console.log("Step 16: previewContainer element:", previewContainer);
    const previewImage = document.getElementById('previewImage');
    console.log("Step 17: previewImage element:", previewImage);
    const editModal = document.getElementById('editModal');
    console.log("Step 18: editModal element:", editModal);
    const editCanvas = document.getElementById('editCanvas');
    console.log("Step 19: editCanvas element:", editCanvas);
    const cropX = document.getElementById('cropX');
    console.log("Step 20: cropX element:", cropX);
    const cropY = document.getElementById('cropY');
    console.log("Step 21: cropY element:", cropY);
    const cropWidth = document.getElementById('cropWidth');
    console.log("Step 22: cropWidth element:", cropWidth);
    const cropHeight = document.getElementById('cropHeight');
    console.log("Step 23: cropHeight element:", cropHeight);
    const brightness = document.getElementById('brightness');
    console.log("Step 24: brightness element:", brightness);
    const contrast = document.getElementById('contrast');
    console.log("Step 25: contrast element:", contrast);
    const backgroundColor = document.getElementById('bgColor');
    console.log("Step 26: backgroundColor element:", backgroundColor);
    const editCancelBtn = document.getElementById('cancelEdit');
    console.log("Step 27: editCancelBtn element:", editCancelBtn);
    const editApplyBtn = document.getElementById('editApplyBtn');
    console.log("Step 28: editApplyBtn element:", editApplyBtn);
    const moreOptionsBtn = document.getElementById('moreOptionsBtn');
    console.log("Step 29: moreOptionsBtn element:", moreOptionsBtn);
    const genresModal = document.getElementById('genresModal');
    console.log("Step 30: genresModal element:", genresModal);
    const closeGenresModal = document.getElementById('closeGenresModal');
    console.log("Step 31: closeGenresModal element:", closeGenresModal);
    const genresList = document.getElementById('genresList');
    console.log("Step 32: genresList element:", genresList);
    const imageReviewModal = document.getElementById('imageReviewModal');
    console.log("Step 33: imageReviewModal element:", imageReviewModal);
    const reviewImage = document.getElementById('reviewImage');
    console.log("Step 34: reviewImage element:", reviewImage);
    const deleteImageBtn = document.getElementById('deleteImageBtn');
    console.log("Step 35: deleteImageBtn element:", deleteImageBtn);

    // State Variables
    let selectedFile = null;
    let editedImage = null;
    const ctx = editCanvas?.getContext('2d');
    console.log("Step 36: Canvas context initialized:", ctx);
    let image = new Image();
    let cropRect = { x: 0, y: 0, width: 200, height: 200 };
    let brightnessValue = 0;
    let contrastValue = 0;
    let bgColor = 'white';

    // Setup Chat History Event Handlers from chatHistory.js
    setupChatHistoryEventHandlers();
    console.log("Step 37: Chat history event handlers set up");

    // Show Typing Indicator
    function showTypingIndicator() {
        console.log("Step 38: Showing typing indicator");
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
            console.log("Step 39: Typing indicator appended");
        }
        return typingDiv;
    }

    // Display Progressive Message
    function displayProgressiveMessage(message, sender) {
        console.log("Step 40: Displaying progressive message:", message, "sender:", sender);
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message', 'slide-in');
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        console.log("Step 41: Message div created and appended");

        const words = message.split(' ');
        let currentIndex = 0;

        function addNextWord() {
            if (currentIndex < words.length) {
                messageDiv.innerHTML = sanitizeMessage(words.slice(0, currentIndex + 1).join(' '));
                currentIndex++;
                setTimeout(addNextWord, 100);
                console.log("Step 42: Added word:", words[currentIndex - 1]);
            } else {
                saveChatHistory(message, sender);
                console.log("Step 43: Progressive message complete, saved to history");
            }
        }

        addNextWord();
        hideWelcomeMessage();
    }

    // Message Sending
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
        console.log("Step 44: Send button click event listener added");
    }
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            console.log("Step 45: Keypress detected:", e.key);
            if (e.key === 'Enter' && !e.repeat) sendMessage();
        });
    }

    function sendMessage() {
        console.log("Step 46: sendMessage called");
        const message = userInput?.value.trim();
        if (message) {
            console.log("Step 47: Sending text message:", message);
            displayMessage(message, 'user');
            saveChatHistory(message, 'user');
            callRasaAPI(message);
            userInput.value = '';
            hideWelcomeMessage();
        } else if (selectedFile) {
            console.log("Step 48: Sending image file:", selectedFile.name);
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('user-message', 'slide-in');
            const img = document.createElement('img');
            img.src = previewImage?.src || '';
            img.classList.add('image-preview');
            img.addEventListener('click', () => openImageModal(img.src));
            messageDiv.appendChild(img);
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            console.log("Step 49: Image preview appended");

            const formData = new FormData();
            formData.append('image', selectedFile);
            fetch('http://localhost:5000/upload-image', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Step 50: Image upload response:", data);
                    if (data.image_url) {
                        callRasaAPI("image_uploaded", { image_url: data.image_url });
                        saveChatHistory(`[Image: ${selectedFile.name}]`, 'user');
                    } else if (data.error) {
                        console.error('Step 51: Image Upload Error:', data.error);
                        displayMessage('ইমেজ আপলোডে সমস্যা হয়েছে।', 'bot');
                    }
                })
                .catch(error => {
                    console.error('Step 52: Image Upload Error:', error);
                    displayMessage('ইমেজ আপলোডে সমস্যা হয়েছে।', 'bot');
                });
            clearPreview();
            hideWelcomeMessage();
        }
    }

    // Image Upload and Preview
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            console.log("Step 53: Upload button clicked");
            fileInput?.click();
        });
    }
    if (fileInput) {
        fileInput.addEventListener('change', () => {
            console.log("Step 54: File input changed");
            const file = fileInput.files[0];
            if (file) {
                selectedFile = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    console.log("Step 55: FileReader loaded:", e.target.result);
                    if (previewImage) {
                        previewImage.src = e.target.result;
                    }
                    if (previewContainer) {
                        previewContainer.style.display = 'block';
                    }
                };
                reader.onerror = () => {
                    console.log("Step 56: FileReader error");
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
            console.log("Step 57: Preview image clicked");
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
            console.log("Step 58: Preview image double-clicked");
            image.src = previewImage?.src || '';
            image.onload = () => {
                console.log("Step 59: Image loaded for editing, width:", image.width, "height:", image.height);
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
            console.log("Step 60: CropX input changed:", cropX.value);
            cropRect.x = parseInt(cropX.value);
            drawImage();
        });
    }
    if (cropY) {
        cropY.addEventListener('input', () => {
            console.log("Step 61: CropY input changed:", cropY.value);
            cropRect.y = parseInt(cropY.value);
            drawImage();
        });
    }
    if (cropWidth) {
        cropWidth.addEventListener('input', () => {
            console.log("Step 62: CropWidth input changed:", cropWidth.value);
            cropRect.width = parseInt(cropWidth.value);
            drawImage();
        });
    }
    if (cropHeight) {
        cropHeight.addEventListener('input', () => {
            console.log("Step 63: CropHeight input changed:", cropHeight.value);
            cropRect.height = parseInt(cropHeight.value);
            drawImage();
        });
    }
    if (brightness) {
        brightness.addEventListener('input', () => {
            console.log("Step 64: Brightness input changed:", brightness.value);
            brightnessValue = parseInt(brightness.value);
            drawImage();
        });
    }
    if (contrast) {
        contrast.addEventListener('input', () => {
            console.log("Step 65: Contrast input changed:", contrast.value);
            contrastValue = parseInt(contrast.value);
            drawImage();
        });
    }
    if (backgroundColor) {
        backgroundColor.addEventListener('change', () => {
            console.log("Step 66: Background color changed:", backgroundColor.value);
            bgColor = backgroundColor.value;
            drawImage();
        });
    }

    function drawImage() {
        console.log("Step 67: Drawing image on canvas");
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
            console.log("Step 68: Image drawn with cropRect:", cropRect);
        }
    }

    // Apply Edited Image
    if (editApplyBtn) {
        editApplyBtn.addEventListener('click', () => {
            console.log("Step 69: Apply edit button clicked");
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
                    console.log("Step 70: Edited image applied to preview");
                }
                callRasaAPI("show_review");
                if (editModal) {
                    editModal.style.display = 'none';
                    console.log("Step 71: Edit modal closed");
                }
            }
        });
    }

    if (editCancelBtn) {
        editCancelBtn.addEventListener('click', () => {
            console.log("Step 72: Cancel edit button clicked");
            if (editModal) {
                editModal.style.display = 'none';
                console.log("Step 73: Edit modal closed");
            }
        });
    }

    function openImageModal(imageSrc) {
        console.log("Step 74: Opening image modal with src:", imageSrc);
        if (reviewImage) {
            reviewImage.src = imageSrc;
        }
        if (imageReviewModal) {
            imageReviewModal.style.display = 'block';
            console.log("Step 75: Image modal displayed");
        }
    }

    if (imageReviewModal) {
        imageReviewModal.addEventListener('click', (e) => {
            console.log("Step 76: Image review modal clicked, target:", e.target);
            if (e.target === imageReviewModal || e.target === deleteImageBtn) {
                imageReviewModal.style.display = 'none';
                console.log("Step 77: Image review modal closed");
            }
        });
    }

    if (deleteImageBtn) {
        deleteImageBtn.addEventListener('click', () => {
            console.log("Step 78: Delete image button clicked");
            clearPreview();
            if (imageReviewModal) {
                imageReviewModal.style.display = 'none';
                console.log("Step 79: Image review modal closed after delete");
            }
        });
    }

    function clearPreview() {
        console.log("Step 80: Clearing preview");
        selectedFile = null;
        editedImage = null;
        if (previewImage) {
            previewImage.src = '';
            console.log("Step 81: Preview image cleared");
        }
        if (previewContainer) {
            previewContainer.style.display = 'none';
            console.log("Step 82: Preview container hidden");
        }
    }

    // PDF জেনারেশন ফাংশন
    async function generatePDF(reviewData, reviewCard, formType = 'nid') {
        try {
            console.log("Step 83: Initiating PDF generation with reviewData:", reviewData, "formType:", formType);

            const response = await fetch('http://localhost:5000/generate-pdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    reviewData,
                    formType
                })
            });

            if (!response.ok) throw new Error(`Server error: ${response.status} - ${response.statusText}`);

            const data = await response.json();
            const pdfUrl = data.pdf_url;
            reviewCard.setAttribute('data-pdf-url', pdfUrl);
            console.log("Step 84: PDF URL set:", pdfUrl);

            // Preview এবং Download বাটন যোগ করা
            const buttonContainer = reviewCard.querySelector('.review-buttons');
            buttonContainer.innerHTML = ''; // পুরানো বাটনগুলো ক্লিয়ার করা

            const previewBtn = document.createElement('button');
            previewBtn.className = 'preview-btn ripple-btn';
            previewBtn.innerText = 'Preview PDF';
            previewBtn.addEventListener('click', async () => {
                const previewResponse = await fetch('http://localhost:5000/preview-pdf', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ reviewData, formType })
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
                    console.log("Step 85: PDF download initiated");
                } else {
                    displayMessage('পিডিএফ ডাউনলোডের জন্য URL পাওয়া যায়নি।', 'bot');
                }
            });

            buttonContainer.appendChild(previewBtn);
            buttonContainer.appendChild(downloadBtn);
        } catch (error) {
            console.error("Step 86: Error generating PDF:", error.message || error);
            displayMessage('পিডিএফ তৈরিতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।', 'bot');
        }
    }

    // Display review card with user data (updated with first code's image handling)
    function displayReview(reviewData) {
        console.log("Step 87: displayReview called with reviewData:", reviewData);
        const reviewCard = document.createElement('div');
        reviewCard.classList.add('review-card', 'slide-in');
        reviewCard.setAttribute('data-editable', 'true');
        reviewCard.setAttribute('data-id', Date.now());
        reviewCard.setAttribute('data-confirmed', 'false');
        console.log("Step 88: Created reviewCard with attributes:", reviewCard.attributes);

        reviewCard.innerHTML = '<h3>আপনার তথ্য রিভিউ</h3>'; // From first code
        const reviewContent = document.createElement('div');
        reviewContent.classList.add('review-content');

        console.log("Step 89: Processing reviewData entries...");
        for (const [key, value] of Object.entries(reviewData)) {
            console.log("Step 89a: Processing key:", key, "value:", value);
            const reviewItem = document.createElement('div');
            reviewItem.classList.add('review-item');
            reviewItem.setAttribute('data-key', key);

            const label = document.createElement('label');
            label.innerText = key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ') + ':';
            reviewItem.appendChild(label);

            // Image handling from first code
            if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('data:image'))) {
                console.log("Step 89b: Found image for key:", key);
                const img = document.createElement('img');
                img.src = value; // Directly use the image URL or data URL
                reviewItem.appendChild(img);
            } else {
                console.log("Step 89c: Found text for key:", key);
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
            console.log("Step 90: Confirm button clicked");
            if (isProcessing) return;
            isProcessing = true;
            confirmBtn.disabled = true;

            try {
                const updatedData = {};
                console.log("Step 91: Collecting updatedData from reviewContent...");
                reviewContent.querySelectorAll('.review-item').forEach(item => {
                    const key = item.getAttribute('data-key');
                    const value = item.querySelector('p')?.innerText || item.querySelector('img')?.src;
                    console.log("Step 91a: Key:", key, "Value:", value);
                    if (!value) {
                        console.warn("Step 91b: No value found for key:", key);
                    }
                    updatedData[key] = value;
                });

                // Text only data for PDF
                const textOnlyData = {};
                console.log("Step 92: Filtering textOnlyData...");
                for (const [key, value] of Object.entries(updatedData)) {
                    if (typeof value === 'string' && !(value.startsWith('http') || value.startsWith('data:image'))) {
                        textOnlyData[key] = value;
                        console.log("Step 92a: Added to textOnlyData - Key:", key, "Value:", value);
                    } else {
                        textOnlyData[key] = value; // Include image URLs
                    }
                }
                console.log("Step 93: Final textOnlyData:", textOnlyData);

                // Save to Firebase
                console.log("Step 94: Saving to Firebase...");
                await db.collection('submissions').add({
                    review_data: updatedData,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    chat_id: currentChatId
                });
                console.log("Step 95: Firebase save successful");

                displayMessage('আপনার তথ্য সফলভাবে ফায়ারবেজে পাঠানো হয়েছে!', 'bot');
                console.log("Step 96: Calling generatePDF with textOnlyData:", textOnlyData);
                await generatePDF(textOnlyData, reviewCard, 'nid'); // Default formType as 'nid'

                reviewCard.setAttribute('data-confirmed', 'true');
                reviewCard.setAttribute('data-editable', 'false');
                editBtn.disabled = true;
                editBtn.style.display = 'none';
                confirmBtn.style.display = 'none';
            } catch (error) {
                console.log("Step 97: Error caught in confirm button:", error);
                let errorMessage = 'অজানা ত্রুটি ঘটেছে।';
                if (error.code && error.message) {
                    errorMessage = `ফায়ারবেজে তথ্য পাঠাতে সমস্যা: ${error.message}`;
                }
                displayMessage(errorMessage, 'bot');
                console.error("Step 98: Error details:", error);
                confirmBtn.disabled = false;
            } finally {
                isProcessing = false;
                console.log("Step 99: Confirm button processing finished");
            }
        });

        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(confirmBtn);

        reviewCard.appendChild(reviewContent);
        reviewCard.appendChild(buttonContainer);
        if (messagesDiv) {
            messagesDiv.appendChild(reviewCard);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            console.log("Step 100: Review card appended to messagesDiv");
        }
    }

    function toggleEditMode(card, reviewData) {
        console.log("Step 101: toggleEditMode called with card:", card, "reviewData:", reviewData);
        if (card.getAttribute('data-confirmed') === 'true') {
            displayMessage('ডেটা কনফার্ম হয়ে গেছে। এডিট করা যাবে না।', 'bot');
            console.log("Step 102: Edit blocked, data confirmed");
            return;
        }

        const isEditable = card.getAttribute('data-editable') === 'true';
        const reviewContent = card.querySelector('.review-content');
        const editBtn = card.querySelector('.edit-btn');
        const confirmBtn = card.querySelector('.confirm-btn');
        console.log("Step 103: Edit mode status:", isEditable);

        if (!isEditable) {
            card.setAttribute('data-editable', 'true');
            editBtn.innerText = 'Save';
            confirmBtn.style.display = 'none';
            console.log("Step 104: Entered edit mode");

            reviewContent.querySelectorAll('.review-item').forEach(item => {
                const key = item.getAttribute('data-key');
                const value = item.querySelector('p')?.innerText || item.querySelector('img')?.src;
                console.log("Step 105: Processing item with key:", key, "value:", value);
                item.innerHTML = `<label>${sanitizeMessage(key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '))}:</label>`;

                if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('data:image'))) {
                    console.log("Step 106: Adding image edit for key:", key);
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

                    replaceIcon.addEventListener('click', () => {
                        console.log("Step 107: Replace icon clicked for key:", key);
                        replaceInput.click();
                    });

                    replaceInput.addEventListener('change', () => {
                        console.log("Step 108: Replace input changed for key:", key);
                        const file = replaceInput.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                console.log("Step 109: FileReader loaded for replacement:", e.target.result);
                                img.src = e.target.result;
                            };
                            reader.onerror = () => {
                                console.log("Step 110: FileReader error for replacement");
                                displayMessage('ইমেজ লোড করতে সমস্যা হয়েছে।', 'bot');
                            };
                            reader.readAsDataURL(file);
                        } else {
                            console.log("Step 111: No file selected for replacement");
                            displayMessage('কোনো ইমেজ সিলেক্ট করা হয়নি।', 'bot');
                        }
                    });
                } else {
                    console.log("Step 112: Adding text edit for key:", key);
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = value || '';
                    input.className = 'edit-input';
                    item.appendChild(input);
                }
            });
        } else {
            const updatedData = { ...reviewData };
            console.log("Step 113: Saving edited data");
            reviewContent.querySelectorAll('.review-item').forEach(item => {
                const key = item.getAttribute('data-key');
                const input = item.querySelector('input.edit-input');
                const img = item.querySelector('img');
                if (input) {
                    const newValue = input.value.trim();
                    console.log("Step 114: Updated text value for key:", key, "newValue:", newValue);
                    updatedData[key] = newValue;
                    item.innerHTML = `<label>${sanitizeMessage(key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '))}:</label><p>${sanitizeMessage(newValue)}</p>`;
                } else if (img) {
                    console.log("Step 115: Updated image value for key:", key, "src:", img.src);
                    updatedData[key] = img.src;
                    item.innerHTML = `<label>${sanitizeMessage(key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '))}:</label><img src="${img.src}">`;
                }
            });

            card.setAttribute('data-editable', 'false');
            editBtn.innerText = 'Edit';
            confirmBtn.style.display = 'inline-block';
            console.log("Step 116: Exited edit mode with updatedData:", updatedData);
        }
    }

    function callRasaAPI(message, metadata = {}) {
        console.log("Step 117: callRasaAPI called with message:", message, "metadata:", metadata);
        const typingDiv = showTypingIndicator();
        const payload = { sender: currentChatId, message: message };
        if (Object.keys(metadata).length > 0) {
            payload.metadata = metadata;
            console.log("Step 118: Added metadata to payload:", payload.metadata);
        }
        setTimeout(() => {
            if (typeof $ !== 'undefined') {
                console.log("Step 119: jQuery available, sending AJAX request");
                $.ajax({
                    url: 'http://localhost:5005/webhooks/rest/webhook',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(payload),
                    success: (data) => {
                        console.log("Step 120: RASA API success response:", data);
                        typingDiv.remove();
                        if (!data || data.length === 0) {
                            console.log("Step 121: No response from RASA");
                            displayMessage('কোনো প্রতিক্রিয়া পাওয়া যায়নি। দয়া করে আবার চেষ্টা করুন।', 'bot');
                            saveChatHistory('কোনো প্রতিক্রিয়া পাওয়া যায়নি।', 'bot');
                            return;
                        }
                        data.forEach(response => {
                            if (response.text && !response.text.toLowerCase().includes('hi')) {
                                console.log("Step 122: Displaying text response:", response.text);
                                displayMessage(sanitizeMessage(response.text), 'bot');
                                saveChatHistory(sanitizeMessage(response.text), 'bot');
                            }
                            if (response.custom && response.custom.review_data) {
                                console.log("Step 123: Received review_data:", response.custom.review_data);
                                displayReview(response.custom.review_data);
                            }
                            if (response.buttons) {
                                console.log("Step 124: Received buttons:", response.buttons);
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
                                    console.log("Step 125: Buttons appended to messagesDiv");
                                }
                            }
                        });
                    },
                    error: (error) => {
                        console.log("Step 126: RASA API error:", error.status, error.statusText, error.responseText);
                        typingDiv.remove();
                        displayMessage('বটের সাথে সংযোগে সমস্যা হয়েছে। দয়া করে সার্ভার চেক করুন।', 'bot');
                        saveChatHistory('বটের সাথে সংযোগে সমস্যা হয়েছে।', 'bot');
                        console.error("Step 127: Error details:", error);
                    }
                });
            } else {
                console.log("Step 128: jQuery not available");
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
    ];

    function renderGenresList() {
        console.log("Step 129: Rendering genres list");
        if (genresList) {
            genresList.innerHTML = '';
            genres.forEach(genre => {
                const genreItem = document.createElement('div');
                genreItem.className = 'genre-item ripple-btn';
                genreItem.innerHTML = `<i class="${genre.icon}"></i><span>${sanitizeMessage(genre.name)}</span>`;
                genreItem.addEventListener('click', () => {
                    console.log("Step 130: Genre item clicked:", genre.name);
                    if (genre.message) {
                        genresModal.classList.add('slide-out');
                        setTimeout(() => {
                            genresModal.style.display = 'none';
                            genresModal.classList.remove('slide-out');
                            console.log("Step 131: Genres modal closed");
                        }, 300);
                        displayMessage(sanitizeMessage(genre.message), 'user');
                        saveChatHistory(sanitizeMessage(genre.message), 'user');
                        callRasaAPI(sanitizeMessage(genre.message));
                        hideWelcomeMessage();
                    } else {
                        console.error("Step 132: Message undefined for genre:", genre.name);
                        displayMessage('এই সেবাটি বর্তমানে উপলব্ধ নয়।', 'bot');
                        saveChatHistory('এই সেবাটি বর্তমানে উপলব্ধ নয়।', 'bot');
                    }
                });
                genresList.appendChild(genreItem);
                console.log("Step 133: Added genre item:", genre.name);
            });
        } else {
            console.error("Step 134: genresList not found");
        }
    }

    function openGenresModal() {
        console.log("Step 135: Opening genres modal");
        renderGenresList();
        genresModal.classList.add('slide-in');
        genresModal.style.display = 'block';
        setTimeout(() => genresModal.classList.remove('slide-in'), 300);
        console.log("Step 136: Genres modal displayed");
    }

    function closeGenresModalFunc() {
        console.log("Step 137: Closing genres modal");
        genresModal.classList.add('slide-out');
        setTimeout(() => {
            genresModal.style.display = 'none';
            genresModal.classList.remove('slide-out');
            console.log("Step 138: Genres modal closed");
        }, 300);
    }

    if (moreOptionsBtn) {
        moreOptionsBtn.addEventListener('click', openGenresModal);
        console.log("Step 139: More options button click event listener added");
    }
    if (closeGenresModal) {
        closeGenresModal.addEventListener('click', closeGenresModalFunc);
        console.log("Step 140: Close genres modal event listener added");
    }

    document.querySelectorAll('.welcome-buttons button[data-genre]').forEach(button => {
        console.log("Step 141: Processing welcome button:", button.getAttribute('data-genre'));
        button.classList.add('ripple-btn');
        button.addEventListener('click', () => {
            const genreName = button.getAttribute('data-genre');
            console.log("Step 142: Welcome button clicked for genre:", genreName);
            const genre = genres.find(g => g.name === genreName);
            if (genre && genre.message) {
                displayMessage(sanitizeMessage(genre.message), 'user');
                saveChatHistory(sanitizeMessage(genre.message), 'user');
                callRasaAPI(sanitizeMessage(genre.message));
                hideWelcomeMessage();
                console.log("Step 143: Processed genre message:", genre.message);
            } else {
                console.error("Step 144: Genre not found or message undefined for:", genreName);
                displayMessage('এই সেবাটি বর্তমানে উপলব্ধ নয়।', 'bot');
                saveChatHistory('এই সেবাটি বর্তমানে উপলব্ধ নয়।', 'bot');
            }
        });
    });

    // Initialize
    if (currentChatId && messagesDiv) {
        console.log("Step 145: Initializing with currentChatId:", currentChatId);
        loadChatMessages(currentChatId);
    } else {
        console.log("Step 146: Starting new chat");
        startNewChat();
    }
    loadChatHistory();
    console.log("Step 147: Chat history loaded");
});
