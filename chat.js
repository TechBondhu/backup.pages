/**
 * Combined chat functionality for handling Firebase, chat history, and UI interactions.
 * Merged from script.js and chatHistory.js, with duplicates removed and code optimized.
 */

// Firebase SDK Check
if (typeof firebase === 'undefined') throw new Error("Firebase SDK not loaded. Add Firebase CDN in index.html");

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCoIdMx9Zd7kQt9MSZmowbphaQVRl8D16E",
    authDomain: "admissionformdb.firebaseapp.com",
    projectId: "admissionformdb",
    storageBucket: "admissionformdb.appspot.com",
    messagingSenderId: "398052082157",
    appId: "1:398052082157:web:0bc02d66cbdf55dd2567e4"
};

// Initialize Firebase
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Global Variables
let currentChatId = localStorage.getItem('currentChatId') || null;
let currentUserUid = null;
let selectedFile = null;
let editedImage = null;

// DOM Elements
const elements = {
    sidebar: document.getElementById('sidebar'),
    historyList: document.getElementById('historyList'),
    historyIcon: document.getElementById('historyIcon'),
    closeSidebar: document.getElementById('closeSidebar'),
    newChatIcon: document.getElementById('newChatIcon'),
    searchInput: document.getElementById('searchInput'),
    deleteModal: document.getElementById('deleteModal'),
    renameModal: document.getElementById('renameModal'),
    cancelDelete: document.getElementById('cancelDelete'),
    confirmDelete: document.getElementById('confirmDelete'),
    cancelRename: document.getElementById('cancelRename'),
    saveRename: document.getElementById('saveRename'),
    renameInput: document.getElementById('renameInput'),
    messagesDiv: document.getElementById('messages'),
    welcomeMessage: document.getElementById('welcomeMessage'),
    userInput: document.getElementById('userInput'),
    sendBtn: document.getElementById('sendBtn'),
    uploadBtn: document.getElementById('uploadBtn'),
    fileInput: document.getElementById('fileInput'),
    previewContainer: document.getElementById('previewContainer'),
    previewImage: document.getElementById('previewImage'),
    editModal: document.getElementById('editModal'),
    editCanvas: document.getElementById('editCanvas'),
    cropX: document.getElementById('cropX'),
    cropY: document.getElementById('cropY'),
    cropWidth: document.getElementById('cropWidth'),
    cropHeight: document.getElementById('cropHeight'),
    brightness: document.getElementById('brightness'),
    contrast: document.getElementById('contrast'),
    backgroundColor: document.getElementById('bgColor'),
    editCancelBtn: document.getElementById('cancelEdit'),
    editApplyBtn: document.getElementById('editApplyBtn'),
    moreOptionsBtn: document.getElementById('moreOptionsBtn'),
    genresModal: document.getElementById('genresModal'),
    closeGenresModal: document.getElementById('closeGenresModal'),
    genresList: document.getElementById('genresList'),
    imageReviewModal: document.getElementById('imageReviewModal'),
    reviewImage: document.getElementById('reviewImage'),
    deleteImageBtn: document.getElementById('deleteImageBtn')
};

// Image Editing State
const cropRect = { x: 0, y: 0, width: 200, height: 200 };
let brightnessValue = 0;
let contrastValue = 0;
let bgColor = 'white';
const ctx = elements.editCanvas?.getContext('2d');
const image = new Image();

// Genres Data
const genres = [
    { name: 'এনআইডি আবেদন', icon: 'fas fa-id-card', message: 'আমার জন্য একটি এনআইডি তৈরি করতে চাই' },
    { name: 'পাসপোর্ট আবেদন', icon: 'fas fa-passport', message: 'আমি পাসপোর্ট আবেদন করতে চাই' },
    { name: 'কোম্পানি রেজিস্ট্রেশন', icon: 'fas fa-building', message: 'আমি কোম্পানি রেজিস্ট্রেশন করতে চাই' },
    { name: 'পেনশন আবেদন ফর্ম', icon: 'fas fa-money-check-alt', message: 'আমি পেনশন আবেদন করতে চাই' },
    { name: 'টিআইএন (TIN) সার্টিফিকেট আবেদন', icon: 'fas fa-file-invoice', message: 'আমি টিআইএন সার্টিফিকেট আবেদন করতে চাই' },
    { name: 'ভূমি নামজারি (Mutation) আবেদনপত্র', icon: 'fas fa-map-marked-alt', message: 'আমি ভূমি নামজারি আবেদন করতে চাই' }
];

// Auth State Listener
auth.onAuthStateChanged(user => {
    if (user) {
        currentUserUid = user.uid;
        loadChatHistory();
        if (currentChatId) loadChatMessages(currentChatId);
        else startNewChat();
    } else {
        currentUserUid = null;
        window.location.href = 'login.html';
    }
});

// Utility Functions
function sanitizeMessage(message) {
    const div = document.createElement('div');
    div.textContent = message;
    return div.innerHTML;
}

function displayMessage(message, sender) {
    if (!elements.messagesDiv) return;
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message', 'slide-in');
    messageDiv.innerHTML = sanitizeMessage(message);
    elements.messagesDiv.appendChild(messageDiv);
    elements.messagesDiv.scrollTop = elements.messagesDiv.scrollHeight;
}

function showErrorMessage(message) {
    displayMessage(sanitizeMessage(message), 'bot');
}

function hideWelcomeMessage() {
    if (elements.welcomeMessage && elements.welcomeMessage.style.display !== 'none') {
        elements.welcomeMessage.classList.add('fade-out');
        setTimeout(() => {
            elements.welcomeMessage.style.display = 'none';
            elements.welcomeMessage.classList.remove('fade-out');
        }, 300);
    }
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('typing-indicator');
    typingDiv.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    elements.messagesDiv?.appendChild(typingDiv);
    elements.messagesDiv.scrollTop = elements.messagesDiv.scrollHeight;
    return typingDiv;
}

// Chat History Functions
async function startNewChat() {
    if (!currentUserUid) return showErrorMessage('ইউজার লগইন করেননি।');
    try {
        const chatRef = await db.collection('chats').add({
            uid: currentUserUid,
            name: 'নতুন চ্যাট',
            last_message: 'চ্যাট শুরু হয়েছে',
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
            updated_at: firebase.firestore.FieldValue.serverTimestamp()
        });
        currentChatId = chatRef.id;
        localStorage.setItem('currentChatId', currentChatId);

        await db.collection('chats').doc(currentChatId).collection('messages').add({
            message: 'Chat session started',
            sender: 'system',
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            uid: currentUserUid
        });

        if (elements.messagesDiv) elements.messagesDiv.innerHTML = '';
        if (elements.welcomeMessage) elements.welcomeMessage.style.display = 'block';
        await loadChatHistory();
    } catch (error) {
        showErrorMessage('নতুন চ্যাট শুরু করতে সমস্যা: ' + error.message);
    }
}

async function saveChatHistory(message, sender) {
    if (!currentUserUid) return showErrorMessage('ইউজার লগইন করেননি।');
    if (!message || typeof message !== 'string') return showErrorMessage('অবৈধ মেসেজ।');

    if (!currentChatId) await startNewChat();
    if (!currentChatId) return showErrorMessage('চ্যাট তৈরি ব্যর্থ।');

    try {
        const chatDoc = await db.collection('chats').doc(currentChatId).get();
        if (!chatDoc.exists) return showErrorMessage('চ্যাট ডকুমেন্ট পাওয়া যায়নি।');

        const messageRef = await db.collection('chats').doc(currentChatId).collection('messages').add({
            uid: currentUserUid,
            message,
            sender,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        const chatData = chatDoc.data();
        let chatName = chatData.name || 'নতুন চ্যাট';
        if (!chatData.name && sender === 'user') {
            chatName = message.length > 30 ? message.substring(0, 30) + '...' : message;
        }
        const lastMessage = message.length > 50 ? message.substring(0, 50) + '...' : message;

        await db.collection('chats').doc(currentChatId).update({
            name: chatName,
            last_message: lastMessage,
            updated_at: firebase.firestore.FieldValue.serverTimestamp()
        });

        await loadChatHistory();
    } catch (error) {
        showErrorMessage('মেসেজ সেভ করতে সমস্যা: ' + error.message);
    }
}

async function loadChatHistory(searchQuery = '') {
    if (!currentUserUid || !elements.historyList) return showErrorMessage('ইউজার লগইন করেননি।');
    elements.historyList.innerHTML = '<div class="loading">লোড হচ্ছে...</div>';

    try {
        const snapshot = await db.collection('chats')
            .where('uid', '==', currentUserUid)
            .orderBy('updated_at', 'desc')
            .get();

        elements.historyList.innerHTML = '';
        if (snapshot.empty) {
            elements.historyList.innerHTML = '<div>কোনো চ্যাট হিস্ট্রি নেই।</div>';
            return;
        }

        snapshot.forEach(doc => {
            const chat = doc.data();
            const searchLower = searchQuery.toLowerCase();
            if (searchQuery && !chat.name?.toLowerCase().includes(searchLower) && !chat.last_message?.toLowerCase().includes(searchLower)) return;

            const historyItem = document.createElement('div');
            historyItem.classList.add('history-item');
            historyItem.setAttribute('data-chat-id', doc.id);
            historyItem.innerHTML = `
                <div class="history-content">
                    <span class="history-title">${sanitizeMessage(chat.name || 'নতুন চ্যাট')}</span>
                    <span class="history-preview">${sanitizeMessage(chat.last_message || 'কোনো মেসেজ নেই')}</span>
                </div>
                <div class="history-actions">
                    <i class="fas fa-edit rename-chat" title="নাম পরিবর্তন"></i>
                    <i class="fas fa-trash delete-chat" title="মুছুন"></i>
                </div>
            `;

            historyItem.addEventListener('click', async e => {
                if (e.target.classList.contains('rename-chat') || e.target.classList.contains('delete-chat')) return;
                currentChatId = doc.id;
                localStorage.setItem('currentChatId', currentChatId);
                await loadChatMessages(currentChatId);
                elements.sidebar?.classList.remove('open');
            });

            historyItem.querySelector('.rename-chat')?.addEventListener('click', () => {
                elements.renameModal?.setAttribute('data-chat-id', doc.id);
                elements.renameInput.value = chat.name || 'নতুন চ্যাট';
                elements.renameModal.style.display = 'block';
            });

            historyItem.querySelector('.delete-chat')?.addEventListener('click', () => {
                elements.deleteModal?.setAttribute('data-chat-id', doc.id);
                elements.deleteModal.style.display = 'block';
            });

            elements.historyList.appendChild(historyItem);
        });
    } catch (error) {
        showErrorMessage('চ্যাট হিস্ট্রি লোড করতে সমস্যা: ' + error.message);
    }
}

async function loadChatMessages(chatId) {
    if (!chatId || !elements.messagesDiv) return showErrorMessage('চ্যাট আইডি বা মেসেজ এলাকা পাওয়া যায়নি।');
    elements.messagesDiv.innerHTML = '';
    elements.welcomeMessage.style.display = 'none';

    try {
        const snapshot = await db.collection('chats').doc(chatId).collection('messages').orderBy('timestamp', 'asc').get();
        snapshot.forEach(doc => {
            const msg = doc.data();
            if (msg.sender === 'user' || msg.sender === 'bot') displayMessage(sanitizeMessage(msg.message), msg.sender);
        });

        const submissions = await db.collection('submissions').where('chat_id', '==', chatId).get();
        submissions.forEach(doc => {
            const sub = doc.data();
            if (sub.review_data) displayReview(sub.review_data);
        });

        elements.messagesDiv.scrollTop = elements.messagesDiv.scrollHeight;
    } catch (error) {
        showErrorMessage('মেসেজ লোড করতে সমস্যা: ' + error.message);
    }
}

async function deleteChat() {
    const chatId = elements.deleteModal?.getAttribute('data-chat-id');
    if (!chatId) return showErrorMessage('চ্যাট আইডি পাওয়া যায়নি।');

    try {
        await db.collection('chats').doc(chatId).delete();
        const messagesSnapshot = await db.collection('chats').doc(chatId).collection('messages').get();
        if (!messagesSnapshot.empty) {
            const batch = db.batch();
            messagesSnapshot.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
        }

        elements.deleteModal.style.display = 'none';
        if (chatId === currentChatId) {
            currentChatId = null;
            localStorage.removeItem('currentChatId');
            elements.messagesDiv.innerHTML = '';
            elements.welcomeMessage.style.display = 'block';
            await startNewChat();
        }
        await loadChatHistory();
    } catch (error) {
        showErrorMessage('চ্যাট ডিলিট করতে সমস্যা: ' + error.message);
    }
}

async function renameChat() {
    const chatId = elements.renameModal?.getAttribute('data-chat-id');
    const newName = elements.renameInput?.value.trim();
    if (!chatId || !newName) return showErrorMessage('চ্যাট আইডি বা নাম অবৈধ।');

    try {
        await db.collection('chats').doc(chatId).update({
            name: newName,
            updated_at: firebase.firestore.FieldValue.serverTimestamp()
        });
        elements.renameModal.style.display = 'none';
        await loadChatHistory();
    } catch (error) {
        showErrorMessage('নাম পরিবর্তন করতে সমস্যা: ' + error.message);
    }
}

// UI Interaction Functions
function toggleSidebar() {
    if (elements.sidebar) {
        elements.sidebar.classList.toggle('open');
        if (elements.sidebar.classList.contains('open')) loadChatHistory();
    }
}

function closeSidebarHandler() {
    elements.sidebar?.classList.remove('open');
}

function sendMessage() {
    const message = elements.userInput?.value.trim();
    if (message) {
        displayMessage(message, 'user');
        saveChatHistory(message, 'user');
        callRasaAPI(message);
        elements.userInput.value = '';
        hideWelcomeMessage();
    } else if (selectedFile) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('user-message', 'slide-in');
        const img = document.createElement('img');
        img.src = elements.previewImage?.src || '';
        img.classList.add('image-preview');
        img.addEventListener('click', () => openImageModal(img.src));
        messageDiv.appendChild(img);
        elements.messagesDiv?.appendChild(messageDiv);
        elements.messagesDiv.scrollTop = elements.messagesDiv.scrollHeight;

        const formData = new FormData();
        formData.append('image', selectedFile);
        fetch('http://localhost:5000/upload-image', { method: 'POST', body: formData })
            .then(response => response.json())
            .then(data => {
                if (data.image_url) {
                    callRasaAPI(data.image_url);
                    saveChatHistory(`[Image: ${selectedFile.name}]`, 'user');
                } else {
                    showErrorMessage('ইমেজ আপলোডে সমস্যা।');
                }
            })
            .catch(() => showErrorMessage('ইমেজ আপলোডে সমস্যা।'));
        clearPreview();
        hideWelcomeMessage();
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
        label.textContent = key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ') + ':';
        reviewItem.appendChild(label);

        if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('data:image'))) {
            const img = document.createElement('img');
            img.src = value;
            reviewItem.appendChild(img);
        } else {
            const p = document.createElement('p');
            p.textContent = value;
            reviewItem.appendChild(p);
        }
        reviewContent.appendChild(reviewItem);
    }

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('review-buttons');

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn', 'ripple-btn');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => toggleEdit(reviewCard, editBtn, reviewContent, reviewData));

    const confirmBtn = document.createElement('button');
    confirmBtn.classList.add('confirm-btn', 'ripple-btn');
    confirmBtn.textContent = 'Confirm';
    let isProcessing = false;

    confirmBtn.addEventListener('click', async () => {
        if (isProcessing) return;
        isProcessing = true;
        confirmBtn.disabled = true;

        try {
            const updatedData = {};
            reviewContent.querySelectorAll('.review-item').forEach(item => {
                const key = item.getAttribute('data-key');
                const value = item.querySelector('p')?.textContent || item.querySelector('img')?.src;
                updatedData[key] = value;
            });

            await db.collection('submissions').add({
                review_data: updatedData,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                chat_id: currentChatId
            });

            displayMessage('তথ্য সফলভাবে সংরক্ষিত!', 'bot');
            generatePDF(reviewData, reviewCard);
            reviewCard.setAttribute('data-confirmed', 'true');
            reviewCard.setAttribute('data-editable', 'false');
            editBtn.disabled = true;
            editBtn.style.display = 'none';
            confirmBtn.style.display = 'none';

            buttonContainer.innerHTML = '';
            const downloadBtn = document.createElement('button');
            downloadBtn.classList.add('download-btn', 'ripple-btn');
            buttonContainer.appendChild(downloadButton);
        } catch (error) {
            showErrorMessage('তথ্য সংরক্ষণে সমস্যা: ' + error.message);
            confirmBtn.disabled = false;
        } finally {
            isProcessing = false;
        }
    });

    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(confirmBtn);
    reviewCard.appendChild(reviewContent);
    reviewCard.appendChild(buttonContainer);
    elements.messagesDiv?.appendChild(reviewCard);
    elements.messagesDiv.scrollTop = elements.messagesDiv.scrollHeight;
}

function toggleEdit(reviewCard, editBtn, reviewContent, confirmBtn, reviewData) {
    if (reviewCard.getAttribute('data-confirmed') === 'true') {
        showErrorMessage('Data confirmed, cannot edit.');
        return;
    }

    const isEditable = reviewCard.getAttribute('data-editable') === 'true';
    if (!isEditable) {
        reviewCard.setAttribute('data-editable', 'true');
        editBtn.textContent = 'Save';
        confirmBtn.style.display = 'none';

        reviewContent.querySelectorAll('.review-item').forEach(item => {
            const key = item.getAttribute('data-key');
            const value = item.querySelector('p')?.textContent || item.querySelector('img')?.src;
            item.innerHTML = '<label>${sanitizeMessage(key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '))}:</label>';

            if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('data:image'))) {
                const img = document.createElement('img');
                img.src = value;
                item.appendChild(img);

                const replaceInput = document.createElement('input');
                replaceInput.type = 'file';
                replaceInput.classList.add('replace-image-input');
                replaceInput.accept = 'image/png, image/jpeg';
                replaceInput.style.display = 'none';
                item.appendChild(replaceInput);

                const replaceIcon = document.createElement('i');
                replaceIcon.classList.add('fas', 'fa-camera', 'replace-image-icon');
                item.appendChild(replaceIcon);

                replaceIcon.addEventListener('click', () => replaceInput.click());
                replaceInput.addEventListener('change', () => {
                    const file = replaceInput.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = e => img.src = e.target.result;
                        reader.onerror = () => showErrorMessage('ইমেজ লোডে সমস্যা।');
                        reader.readAsDataURL(file);
                    }
                });
            } else {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = value || '';
                input.classList.add('edit-input');
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
                item.innerHTML = `<label>${sanitizeMessage(key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '))}:</label><img src="${img.src}" />`;
            }
        });
        reviewCard.setAttribute('data-editable', 'false');
        editBtn.textContent = 'Edit';
        editBtn.disabled = false;
        confirmBtn.style.display = 'inline-block';
    }
}

function generatePDF(reviewData, reviewCard) {
    const formType = reviewData.form_type || 'generic';
    const payload = {
        reviewData: Object.fromEntries(
            Object.entries(reviewData).map(([key, value]) => [
                key,
                typeof value === 'string' && (value.startsWith('http') || value.startsWith('data:image')) ? '[Image]' : value
            ])
        ),
        formType
    };

    fetch('http://localhost:5000/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        if (data.pdf_url) {
            reviewCard.setAttribute('data-pdf-url', data.pdf_url);
            displayMessage('PDF তৈরি ও আপলোড সফল!', 'bot');
            saveChatHistory('PDF তৈরি সফল।', 'bot');
        } else {
            throw new Error(data.error || 'PDF generation failed');
        }
    })
    .catch(error => {
        showErrorMessage('PDF তৈরিতে সমস্যা: ' + error.message);
        saveChatHistory('PDF error: ' + error.message, 'bot');
    });
}

function callRasaAPI(message, metadata = {}) {
    const typingDiv = showTypingIndicator();
    const payload = { sender: currentChatId || 'default', message, ...metadata };

    setTimeout(() => {
        if (typeof $ === 'undefined') {
            typingDiv.remove();
            showErrorMessage('jQuery লোড হয়নি।');
            return;
        }

        $.ajax({
            url: 'http://localhost:5005/webhooks/rest/webhook',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: data => {
                typingDiv.remove();
                if (!data || !data.length) {
                    showErrorMessage('কোনো সাড়া পাওয়া যায়নি।');
                    saveChatHistory('কোনো সাড়া পাওয়া যায়নি।', 'bot');
                    return;
                }
                data.forEach(response => {
                    if (response.text && !response.text.toLowerCase().includes('hi')) {
                        displayMessage(sanitizeMessage(response.text), 'bot');
                        saveChatHistory(sanitizeMessage(response.text), 'bot');
                    }
                    if (response.custom?.review_data) {
                        displayReview(response.custom.review_data);
                    }
                    if (response.buttons) {
                        const buttonDiv = document.createElement('div');
                        buttonDiv.classList.add('welcome-buttons');
                        response.buttons.forEach(btn => {
                            const button = document.createElement('button');
                            button.textContent = sanitizeMessage(btn.title);
                            button.classList.add('ripple-btn');
                            button.addEventListener('click', () => sendMessage(btn.payload));
                            buttonDiv.appendChild(button);
                        });
                        elements.messagesDiv?.appendChild(buttonDiv);
                    }
                });
            },
            error: () => {
                typingDiv.remove();
                showErrorMessage('বট সংযোগে সমস্যা।');
                saveChatHistory('বট সংযোগে সমস্যা।', 'bot');
            }
        });
    }, 500);
}

// Image Handling Functions
function clearPreview() {
    selectedFile = null;
    editedImage = null;
    if (elements.previewImage) elements.previewImage.src = '';
    if (elements.previewContainer) elements.previewContainer.style.display = 'none';
}

function openImageModal(src) {
    if (elements.reviewImage) elements.reviewImage.src = src;
    if (elements.imageReviewModal) elements.imageReviewModal.style.display = 'block';
}

function drawImage() {
    if (!ctx) return;
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

// Genres Modal Functions
function renderGenres() {
    if (!elements.genresList) return;
    elements.genresList.innerHTML = '';
    genres.forEach(genre => {
        const item = document.createElement('div');
        item.className = 'genre-item ripple-btn';
        item.innerHTML = `<i class="${genre.icon}"></i><span>${sanitizeMessage(genre.name)}</span>`;
        item.addEventListener('click', () => {
            elements.genresModal?.classList.add('slide-out');
            setTimeout(() => {
                elements.genresModal.style.display = 'none';
                elements.genresModal.classList.remove('slide-out');
            }, 300);
            if (genre.message) {
                displayMessage(sanitizeMessage(genre.message), 'user');
                saveChatHistory(sanitizeMessage(genre.message), 'user');
                callRasaAPI(genre.message);
                hideWelcomeMessage();
            } else {
                showErrorMessage('এই সেবা উপলব্ধ নয়।');
            }
        });
        elements.genresList.appendChild(item);
    });
}

function openGenresModal() {
    renderGenres();
    elements.genresModal?.classList.add('slide-in');
    elements.genresModal.style.display = 'block';
    setTimeout(() => elements.genresModal?.classList.remove('slide-in'), 300);
}

function closeGenresModal() {
    elements.genresModal?.classList.add('slide-out');
    setTimeout(() => {
        elements.genresModal.style.display = 'none';
        elements.genresModal.classList.remove('slide-out');
    }, 300);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Chat History Handlers
    elements.historyIcon?.addEventListener('click', toggleSidebar);
    elements.closeSidebar?.addEventListener('click', closeSidebarHandler);
    elements.newChatIcon?.addEventListener('click', startNewChat);
    elements.searchInput?.addEventListener('input', () => loadChatHistory(elements.searchInput.value.trim()));
    elements.cancelDelete?.addEventListener('click', () => elements.deleteModal.style.display = 'none');
    elements.confirmDelete?.addEventListener('click', deleteChat);
    elements.cancelRename?.addEventListener('click', () => elements.renameModal.style.display = 'none');
    elements.saveRename?.addEventListener('click', renameChat);

    // Message Sending
    elements.sendBtn?.addEventListener('click', sendMessage);
    elements.userInput?.addEventListener('keypress', e => {
        if (e.key === 'Enter' && !e.repeat) sendMessage();
    });

    // Image Upload
    elements.uploadBtn?.addEventListener('click', () => elements.fileInput?.click());
    elements.fileInput?.addEventListener('change', () => {
        const file = elements.fileInput.files[0];
        if (file) {
            selectedFile = file;
            const reader = new FileReader();
            reader.onload = e => {
                elements.previewImage.src = e.target.result;
                elements.previewContainer.style.display = 'block';
            };
            reader.onerror = () => showErrorMessage('ইমেজ লোডে সমস্যা।');
            reader.readAsDataURL(file);
        }
        elements.fileInput.value = '';
    });

    // Image Review
    elements.previewImage?.addEventListener('click', () => {
        elements.reviewImage.src = elements.previewImage.src;
        elements.imageReviewModal?.style.display = 'block';
    });

    // Image Editing
    elements.previewImage?.addEventListener('dblclick', () => {
        image.src = elements.previewImage.src || '';
        image.onload = () => {
            if (elements.editCanvas) {
                elements.editCanvas.width = image.width;
                elements.editCanvas.height = image.height;
                cropRect.width = Math.min(200, image.width);
                cropRect.height = Math.min(200, element.image.height);
                drawImage();
                elements.editModal.style.display = 'block';
            }
        };
    });

    // Canvas Controls
    elements.editCanvas.width = e => { cropRect.x = parseInt(e.target.value); drawImage(); };
    elements.cropY?.addEventListener('input', e => { cropRect.y = parseInt(e.target.value); drawImage(); });
    elements.cropWidth?.addEventListener('input', e => { cropRect.width = parseInt(e.target.value Wonderful; drawImage(); });
    elements.cropHeight?.addEventListener('input', e => { cropRect.height = parseInt(e.target.value); drawImage(); });
    elements.brightness?.addEventListener('input', e => { brightnessValue = parseInt(e.target.value); drawImage(); });
    elements.contrast?.addEventListener('input', e => { contrastValue = parseInt(e.target.value); drawImage(); });
    elements.backgroundColor?.addEventListener('change', () => { bgColor = e.target.value; drawImage(); });

    // Apply Edit
    elements.editApplyBtn?.addEventListener('click', () => {
        const tempCanvas cấu.createElement('canvas');
        tempCanvas.width = cropRect.width;
        tempCanvas.height = cropRect.height;
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) {
            tempCtx.fillStyle = bgColor === 'transparent' ? 'rgba(0,0,0,0)' : bgColor;
            tempCtx.fillRect(0, 0, cropRect.width, cropRect.height);
            tempCtx.filter = `brightness(${100 + brightnessValue}%) contrast(${100 + contrastValue}%)`;
            tempCtx.drawImage(image, cropRect.x, cropRect.y, cropRect.width, cropRect.height, 0, 0, cropRect.width, cropRect.height);
            editedImage = tempCanvas.toDataURL('image/jpeg');
            elements.previewImage.src = editedImage;
            callRasaAPI("show_review");
            elements.editModal.style.display = 'none';
        }
    });

    elements.editCancelBtn?.addEventListener('click', () => elements.editModal.style.display = 'none');

    // Image Modal
    elements.imageReviewModal?.addEventListener('click', e => {
        if (e.target === elements.imageReviewModal || e.target === elements.deleteImageBtn) {
            elements.imageReviewModal.style.display = 'none';
        }
    });

    elements.deleteImageBtn?.addEventListener('click', () => {
        clearPreview();
        elements.imageReviewModal.style.display = 'none';
    });

    // Genres Modal
    elements.moreOptionsBtn?.addEventListener('click', openGenresModal);
    elements.closeGenresModal?.addEventListener('click', closeGenresModal);

    // Welcome Buttons
    document.querySelectorAll('.welcome-buttons button[data-genre]').forEach(button => {
        button.classList.add('ripple-btn');
        button.addEventListener('click', () => {
            const genreName = button.getAttribute('data-genre');
            const genre = genres.find(g => g.name === genreName);
            if (genre?.message) {
                displayMessage(sanitizeMessage(genre.message), 'user');
                saveChatHistory(genre.message, 'user');
                callRasaAPI(genre.message);
                hideWelcomeMessage();
            } else {
                showErrorMessage('এই সেবা উপলব্ধ নয়।');
            }
        });
    });
});
