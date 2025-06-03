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

// Global Variables
let currentChatId = null; // গ্লোবাল স্কোপে ডিফাইন
let currentUserUid = null;

// Authentication State Listener
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        currentUserUid = user.uid;
        console.log("User logged in:", currentUserUid);
        initializeChat(); // Authentication সফল হলে চ্যাট ইনিশিয়ালাইজ করো
    } else {
        currentUserUid = null;
        console.log("No user logged in");
        window.location.href = 'login.html';
    }
});

// Chat Initialization Function
function initializeChat() {
    if (currentChatId && document.getElementById('messages')) {
        loadChatMessages(currentChatId).catch(err => console.error("Load chat messages error:", err));
    } else {
        startNewChat().then(() => {
            if (document.getElementById('messages')) loadChatHistory();
        }).catch(err => console.error("Start new chat error:", err));
    }
}

// Chat History Functions
async function startNewChat() {
    if (!currentUserUid) {
        console.error("No user UID found, cannot start new chat.");
        return;
    }
    try {
        const chatRef = await db.collection('chats').add({
            uid: currentUserUid,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
            updated_at: firebase.firestore.FieldValue.serverTimestamp(),
            last_message: "New chat started",
            messages: []
        });
        currentChatId = chatRef.id;
        console.log("New chat started with ID:", currentChatId);
    } catch (error) {
        console.error("Error starting new chat:", error);
        throw error;
    }
}

async function loadChatMessages(chatId) {
    if (!chatId) {
        console.error("No chat ID provided to load messages.");
        return;
    }
    try {
        const chatDoc = await db.collection('chats').doc(chatId).get();
        if (chatDoc.exists) {
            const messages = chatDoc.data().messages || [];
            messages.forEach(msg => {
                displayMessage(msg.content, msg.sender);
            });
        } else {
            console.warn("Chat document not found for ID:", chatId);
        }
    } catch (error) {
        console.error("Error loading chat messages:", error);
        throw error;
    }
}

async function saveChatHistory(message, sender) {
    if (!currentChatId || !currentUserUid) {
        console.error("No chat ID or user UID found to save chat history.");
        return;
    }
    try {
        const chatRef = db.collection('chats').doc(currentChatId);
        await chatRef.update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                sender: sender,
                content: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }),
            updated_at: firebase.firestore.FieldValue.serverTimestamp(),
            last_message: message
        });
        console.log("Chat history saved:", { sender, message });
    } catch (error) {
        console.error("Error saving chat history:", error);
        displayMessage(`চ্যাট হিস্ট্রি সেভ করতে সমস্যা: ${error.message}`, 'bot');
    }
}

async function loadChatHistory() {
    if (!currentUserUid) {
        console.error("No user UID found to load chat history.");
        return;
    }
    try {
        const chatsSnapshot = await db.collection('chats')
            .where('uid', '==', currentUserUid)
            .orderBy('updated_at', 'desc')
            .get();
        chatsSnapshot.forEach(doc => {
            const chatData = doc.data();
            console.log("Chat loaded:", doc.id, chatData.last_message);
        });
    } catch (error) {
        console.error("চ্যাট হিস্ট্রি লোড করতে সমস্যা:", error);
        displayMessage(`চ্যাট হিস্ট্রি লোড করতে সমস্যা: ${error.message}`, 'bot');
    }
}

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
        hideWelcomeMessage(); // ওয়েলকাম মেসেজ লুকানো
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
            hideWelcomeMessage(); // ওয়েলকাম মেসেজ লুকানো
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
                        callRasaAPI(data.image_url);
                        saveChatHistory(`[Image: ${selectedFile.name}]`, 'user');
                    } else if (data.error) {
                        console.error('Image Upload Error:', data.error);
                    }
                })
                .catch(error => {
                    console.error('Image Upload Error:', error);
                });
            clearPreview();
            hideWelcomeMessage(); // ওয়েলকাম মেসেজ লুকানো
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
                generatePDF(updatedData, reviewCard);
                reviewCard.setAttribute('data-confirmed', 'true');
                reviewCard.setAttribute('data-editable', 'false');
                editBtn.disabled = true;
                editBtn.style.display = 'none';
                confirmBtn.style.display = 'none';

                buttonContainer.innerHTML = '';
                const downloadBtn = document.createElement('button');
                downloadBtn.className = 'download-btn ripple-btn';
                downloadBtn.innerText = 'Download PDF';
                downloadBtn.addEventListener('click', () => {
                    const pdfUrl = reviewCard.getAttribute('data-pdf-url');
                    if (pdfUrl) {
                        const link = document.createElement('a');
                        link.href = pdfUrl;
                        const serverFileName = decodeURIComponent(pdfUrl.split('/').pop());
                        link.download = serverFileName;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    } else {
                        displayMessage('পিডিএফ ডাউনলোডের জন্য URL পাওয়া যায়নি।', 'bot');
                    }
                });
                buttonContainer.appendChild(downloadBtn);
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

    function generatePDF(reviewData, reviewCard) {
        const formType = reviewData.form_type || 'generic';

        const textOnlyData = {};
        for (const [key, value] of Object.entries(reviewData)) {
            if (typeof value !== 'string' || !(value.startsWith('http') || value.startsWith('data:image'))) {
                textOnlyData[key] = value;
            } else {
                textOnlyData[key] = '[Image omitted]';
            }
        }

        const payload = {
            reviewData: textOnlyData,
            formType: formType
        };

        fetch('http://localhost:5000/generate-pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            if (data.pdf_url) {
                reviewCard.setAttribute('data-pdf-url', data.pdf_url);
                displayMessage('পিডিএফ সফলভাবে তৈরি হয়েছে এবং ক্লাউডিনারিতে আপলোড করা হয়েছে!', 'bot');
                saveChatHistory('পিডিএফ সফলভাবে তৈরি হয়েছে।', 'bot');

                const buttonContainer = reviewCard.querySelector('.review-buttons');
                buttonContainer.innerHTML = '';
                const downloadBtn = document.createElement('button');
                downloadBtn.className = 'download-btn ripple-btn';
                downloadBtn.innerText = 'Download PDF';
                downloadBtn.addEventListener('click', () => {
                    const pdfUrl = reviewCard.getAttribute('data-pdf-url');
                    if (pdfUrl) {
                        const link = document.createElement('a');
                        link.href = pdfUrl;
                        const serverFileName = decodeURIComponent(pdfUrl.split('/').pop());
                        link.download = serverFileName;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    } else {
                        displayMessage('পিডিএফ ডাউনলোডের জন্য URL পাওয়া যায়নি।', 'bot');
                    }
                });
                buttonContainer.appendChild(downloadBtn);
            } else {
                throw new Error(data.error || 'PDF generation failed');
            }
        })
        .catch(error => {
            console.error('PDF Generation Error:', error);
            displayMessage(`পিডিএফ তৈরিতে সমস্যা: ${error.message}`, 'bot');
            saveChatHistory(`পিডিএফ তৈরিতে সমস্যা: ${error.message}`, 'bot');
        });
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
                                const formType = response.custom.review_data.form_type || 
                                               response.events?.find(e => e.event === 'slot' && e.name === 'form_type')?.value;
                                console.log('Step 125: Detected form_type from Rasa:', formType, 'for message:', message);
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
    ];

    function renderGenresList() {
        if (genresList) {
            genresList.innerHTML = '';
            genres.forEach(genre => {
                const genreItem = document.createElement('div');
                genreItem.className = 'genre-item ripple-btn';
                genreItem.innerHTML = `<i class="${genre.icon}"></i><span>${sanitizeMessage(genre.name)}</span>`;
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
});
