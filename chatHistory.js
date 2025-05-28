// chatHistory.js

// DOM Elements
const sidebar = document.getElementById('sidebar');
const historyList = document.getElementById('historyList');
const historyIcon = document.getElementById('historyIcon');
const closeSidebar = document.getElementById('closeSidebar');
const newChatIcon = document.getElementById('newChatIcon');
const searchInput = document.getElementById('searchInput');
const deleteModal = document.getElementById('deleteModal');
const renameModal = document.getElementById('renameModal');
const cancelDelete = document.getElementById('cancelDelete');
const confirmDelete = document.getElementById('confirmDelete');
const cancelRename = document.getElementById('cancelRename');
const saveRename = document.getElementById('saveRename');
const renameInput = document.getElementById('renameInput');
const messagesDiv = document.getElementById('messages');
const welcomeMessage = document.getElementById('welcomeMessage');

// Global Variables
let currentChatId = localStorage.getItem('currentChatId') || null;

// db ব্যবহারের জন্য window.db থেকে নেওয়া
const db = window.db;

// Setup Event Handlers for Chat History
function setupChatHistoryEventHandlers() {
    // Open Sidebar
    if (historyIcon && sidebar) {
        historyIcon.addEventListener('click', () => {
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            } else {
                sidebar.classList.add('active');
                loadChatHistory(); // হিস্ট্রি লোড করা
            }
        });
    }

    // Close Sidebar
    if (closeSidebar && sidebar) {
        closeSidebar.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    }

    // Start New Chat
    if (newChatIcon) {
        newChatIcon.addEventListener('click', startNewChat);
    }

    // Search Chat History
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            loadChatHistory(query);
        });
    }

    // Delete Modal Handlers
    if (cancelDelete) {
        cancelDelete.addEventListener('click', () => {
            deleteModal.style.display = 'none';
        });
    }

    if (confirmDelete) {
        confirmDelete.addEventListener('click', async () => {
            const chatId = deleteModal.getAttribute('data-chat-id');
            try {
                await db.collection('chats').doc(chatId).delete();
                deleteModal.style.display = 'none';
                if (chatId === currentChatId) {
                    startNewChat();
                } else {
                    loadChatHistory();
                }
            } catch (error) {
                console.error('চ্যাট ডিলিট করতে সমস্যা:', error);
                showErrorMessage('চ্যাট ডিলিট করতে সমস্যা হয়েছে।');
            }
        });
    }

    // Rename Modal Handlers
    if (cancelRename) {
        cancelRename.addEventListener('click', () => {
            renameModal.style.display = 'none';
        });
    }

    if (saveRename) {
        saveRename.addEventListener('click', async () => {
            const chatId = renameModal.getAttribute('data-chat-id');
            const newName = renameInput.value.trim();
            if (newName) {
                try {
                    await db.collection('chats').doc(chatId).update({
                        name: newName,
                        updated_at: firebase.firestore.FieldValue.serverTimestamp()
                    });
                    renameModal.style.display = 'none';
                    loadChatHistory();
                } catch (error) {
                    console.error('চ্যাটের নাম পরিবর্তন করতে সমস্যা:', error);
                    showErrorMessage('চ্যাটের নাম পরিবর্তন করতে সমস্যা হয়েছে।');
                }
            } else {
                showErrorMessage('দয়া করে একটি বৈধ নাম লিখুন।');
            }
        });
    }
}

// Save Chat Message to Firestore
async function saveChatHistory(message, sender) {
    if (!currentChatId) {
        await startNewChat();
    }
    try {
        await db.collection('chats').doc(currentChatId).collection('messages').add({
            message: message,
            sender: sender,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Update chat metadata (e.g., name, last message)
        const chatName = await db.collection('chats').doc(currentChatId).get().then(doc => doc.data()?.name || 'নতুন চ্যাট');
        await db.collection('chats').doc(currentChatId).set({
            name: chatName,
            last_message: message.length > 50 ? message.substring(0, 50) + '...' : message,
            updated_at: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    } catch (error) {
        console.error('চ্যাট হিস্ট্রি সেভ করতে সমস্যা:', error);
        showErrorMessage('চ্যাট হিস্ট্রি সেভ করতে সমস্যা হয়েছে।');
    }
}

// Load Chat History List
async function loadChatHistory(searchQuery = '') {
    try {
        let query = db.collection('chats').orderBy('updated_at', 'desc');
        const snapshot = await query.get();
        historyList.innerHTML = '';

        snapshot.forEach(doc => {
            const chat = doc.data();
            if (searchQuery && !chat.name.toLowerCase().includes(searchQuery) && !chat.last_message.toLowerCase().includes(searchQuery)) {
                return;
            }

            const historyItem = document.createElement('div');
            historyItem.classList.add('history-item');
            historyItem.setAttribute('data-chat-id', doc.id);
            historyItem.innerHTML = `
                <div class="history-content">
                    <span class="history-title">${sanitizeMessage(chat.name)}</span>
                    <span class="history-preview">${sanitizeMessage(chat.last_message)}</span>
                </div>
                <div class="history-actions">
                    <i class="fas fa-edit rename-chat" title="নাম পরিবর্তন"></i>
                    <i class="fas fa-trash delete-chat" title="মুছুন"></i>
                </div>
            `;

            // Load Chat on Click
            historyItem.addEventListener('click', async (e) => {
                if (e.target.classList.contains('rename-chat') || e.target.classList.contains('delete-chat')) {
                    return;
                }
                currentChatId = doc.id;
                localStorage.setItem('currentChatId', currentChatId);
                await loadChatMessages(currentChatId);
                sidebar.classList.remove('active');
            });

            // Rename Chat
            historyItem.querySelector('.rename-chat').addEventListener('click', () => {
                renameModal.setAttribute('data-chat-id', doc.id);
                renameInput.value = chat.name;
                renameModal.style.display = 'flex';
            });

            // Delete Chat
            historyItem.querySelector('.delete-chat').addEventListener('click', () => {
                deleteModal.setAttribute('data-chat-id', doc.id);
                deleteModal.style.display = 'flex';
            });

            historyList.appendChild(historyItem);
        });
    } catch (error) {
        console.error('চ্যাট হিস্ট্রি লোড করতে সমস্যা:', error);
        showErrorMessage('চ্যাট হিস্ট্রি লোড করতে সমস্যা হয়েছে।');
    }
}

// Load Messages for a Specific Chat
async function loadChatMessages(chatId) {
    try {
        if (!messagesDiv) {
            console.error('messagesDiv not found');
            return;
        }
        messagesDiv.innerHTML = '';
        welcomeMessage.style.display = 'none';

        const snapshot = await db.collection('chats').doc(chatId).collection('messages').orderBy('timestamp', 'asc').get();
        snapshot.forEach(doc => {
            const msg = doc.data();
            if (msg.sender === 'user' || msg.sender === 'bot') {
                if (typeof displayMessage === 'function') {
                    displayMessage(sanitizeMessage(msg.message), msg.sender);
                } else {
                    console.error('displayMessage ফাংশন পাওয়া যায়নি।');
                    showErrorMessage('মেসেজ প্রদর্শনে সমস্যা হয়েছে।');
                }
            }
        });

        // Load review data if any
        const submissions = await db.collection('submissions').where('chat_id', '==', chatId).get();
        submissions.forEach(doc => {
            const submission = doc.data();
            if (submission.review_data && typeof displayReview === 'function') {
                displayReview(submission.review_data);
            }
        });

        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    } catch (error) {
        console.error('চ্যাট মেসেজ লোড করতে সমস্যা:', error);
        showErrorMessage('চ্যাট মেসেজ লোড করতে সমস্যা হয়েছে।');
    }
}

// Start a New Chat
async function startNewChat() {
    try {
        currentChatId = db.collection('chats').doc().id;
        localStorage.setItem('currentChatId', currentChatId);
        if (messagesDiv) {
            messagesDiv.innerHTML = '';
        }
        if (welcomeMessage) {
            welcomeMessage.style.display = 'block';
        }
        await loadChatHistory();
    } catch (error) {
        console.error('নতুন চ্যাট শুরু করতে সমস্যা:', error);
        showErrorMessage('নতুন চ্যাট শুরু করতে সমস্যা হয়েছে।');
    }
}

// Sanitize Message
function sanitizeMessage(message) {
    const div = document.createElement('div');
    div.textContent = message;
    return div.innerHTML;
}

// Fallback Error Message Display
function showErrorMessage(message) {
    if (typeof displayMessage === 'function') {
        displayMessage(message, 'bot');
    } else {
        if (messagesDiv) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('bot-message', 'slide-in');
            messageDiv.innerHTML = sanitizeMessage(message);
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        } else {
            console.error('messagesDiv not found for error message display');
        }
    }
}

// Initialize Chat History on Page Load
document.addEventListener('DOMContentLoaded', () => {
    if (currentChatId && messagesDiv) {
        loadChatMessages(currentChatId);
    } else {
        startNewChat();
    }
    loadChatHistory();
});
