// Ensure Firebase is initialized by script.js before using db
// We assume db is globally available from script.js

// Initialize currentChatId
let currentChatId = localStorage.getItem('currentChatId') || null;

// Setup Chat History Event Handlersincluding images
function setupChatHistoryEventHandlers() {
    const sidebarIcon = document.getElementById('sidebarIcon');
    const closeSidebar = document.getElementById('closeSidebar');
    const newChatIcon = document.getElementById('newChatIcon');
    const historyList = document.getElementById('historyList');
    const searchInput = document.getElementById('searchInput');
    const deleteModal = document.getElementById('deleteModal');
    const confirmDelete = document.getElementById('confirmDelete');
    const cancelDelete = document.getElementById('cancelDelete');
    const renameModal = document.getElementById('renameModal');
    const saveRename = document.getElementById('saveRename');
    const cancelRename = document.getElementById('cancelRename');
    const renameInput = document.getElementById('renameInput');

    // Open Sidebar
    if (sidebarIcon) {
        sidebarIcon.addEventListener('click', () => {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) {
                sidebar.classList.add('active');
            }
        });
    }

    // Close Sidebar
    if (closeSidebar) {
        closeSidebar.addEventListener('click', () => {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) {
                sidebar.classList.remove('active');
            }
        });
    }

    // Start New Chat
    if (newChatIcon) {
        newChatIcon.addEventListener('click', async () => {
            try {
                const newChatId = db.collection('chats').doc().id;
                currentChatId = newChatId;
                localStorage.setItem('currentChatId', currentChatId);
                await db.collection('chats').doc(currentChatId).set({
                    title: 'নতুন চ্যাট',
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    messages: []
                });
                const messagesDiv = document.getElementById('messages');
                const welcomeMessage = document.getElementById('welcomeMessage');
                if (messagesDiv) {
                    messagesDiv.innerHTML = '';
                }
                if (welcomeMessage) {
                    welcomeMessage.style.display = 'block';
                }
                loadChatHistory();
            } catch (error) {
                console.error('Error creating new chat:', error);
                displayMessage('নতুন চ্যাট তৈরি করতে সমস্যা হয়েছে।', 'bot');
            }
        });
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
                if (chatId === currentChatId) {
                    currentChatId = null;
                    localStorage.removeItem('currentChatId');
                    const messagesDiv = document.getElementById('messages');
                    const welcomeMessage = document.getElementById('welcomeMessage');
                    if (messagesDiv) {
                        messagesDiv.innerHTML = '';
                    }
                    if (welcomeMessage) {
                        welcomeMessage.style.display = 'block';
                    }
                }
                loadChatHistory();
                deleteModal.style.display = 'none';
            } catch (error) {
                console.error('Error deleting chat:', error);
                displayMessage('চ্যাট মুছতে সমস্যা হয়েছে।', 'bot');
            }
        });
    }

    // Rename Modal Handlers
    if (cancelRename) {
        cancelRename.addEventListener('click', () => {
            renameModal.style.display = 'none';
            renameInput.value = '';
        });
    }

    if (saveRename) {
        saveRename.addEventListener('click', async () => {
            const chatId = renameModal.getAttribute('data-chat-id');
            const newTitle = renameInput.value.trim();
            if (newTitle) {
                try {
                    await db.collection('chats').doc(chatId).update({
                        title: newTitle
                    });
                    loadChatHistory();
                    renameModal.style.display = 'none';
                    renameInput.value = '';
                } catch (error) {
                    console.error('Error renaming chat:', error);
                    displayMessage('চ্যাটের নাম পরিবর্তন করতে সমস্যা হয়েছে।', 'bot');
                }
            } else {
                displayMessage('দয়া করে একটি নাম প্রবেশ করান।', 'bot');
            }
        });
    }
}

// Save Chat Message to Firestore
function saveChatHistory(message, sender) {
    if (!currentChatId) {
        try {
            currentChatId = db.collection('chats').doc().id;
            localStorage.setItem('currentChatId', currentChatId);
            db.collection('chats').doc(currentChatId).set({
                title: 'নতুন চ্যাট',
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                messages: []
            }).catch(error => {
                console.error('Error creating new chat in saveChatHistory:', error);
                displayMessage('চ্যাট সেভ করতে সমস্যা হয়েছে।', 'bot');
            });
        } catch (error) {
            console.error('Error setting currentChatId:', error);
            displayMessage('চ্যাট সেভ করতে সমস্যা হয়েছে।', 'bot');
            return;
        }
    }

    try {
        db.collection('chats').doc(currentChatId).update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                text: message,
                sender: sender,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        }).then(() => {
            loadChatHistory(); // Refresh history after saving
        }).catch(error => {
            console.error('Error saving chat message:', error);
            displayMessage('চ্যাট সেভ করতে সমস্যা হয়েছে।', 'bot');
        });
    } catch (error) {
        console.error('Error in saveChatHistory:', error);
        displayMessage('চ্যাট সেভ করতে সমস্যা হয়েছে।', 'bot');
    }
}

// Load Chat History from Firestore
function loadChatHistory(searchQuery = '') {
    const historyList = document.getElementById('historyList');
    if (!historyList) {
        console.error('historyList element not found.');
        return;
    }

    try {
        db.collection('chats')
            .orderBy('timestamp', 'desc')
            .get()
            .then((querySnapshot) => {
                historyList.innerHTML = '';
                querySnapshot.forEach((doc) => {
                    const chat = doc.data();
                    const title = chat.title || 'নতুন চ্যাট';
                    if (searchQuery && !title.toLowerCase().includes(searchQuery.toLowerCase())) {
                        return;
                    }

                    const historyItem = document.createElement('div');
                    historyItem.className = 'history-item';
                    historyItem.setAttribute('data-chat-id', doc.id);
                    historyItem.innerHTML = `
                        <span class="history-title">${sanitizeMessage(title)}</span>
                        <div class="history-actions">
                            <i class="fas fa-edit rename-chat" title="নাম পরিবর্তন"></i>
                            <i class="fas fa-trash delete-chat" title="মুছুন"></i>
                        </div>
                    `;

                    // Load Chat on Click
                    historyItem.addEventListener('click', (e) => {
                        if (e.target.classList.contains('rename-chat') || e.target.classList.contains('delete-chat')) {
                            return;
                        }
                        currentChatId = doc.id;
                        localStorage.setItem('currentChatId', currentChatId);
                        loadChatMessages(doc.id);
                    });

                    // Rename Chat
                    historyItem.querySelector('.rename-chat').addEventListener('click', () => {
                        const renameModal = document.getElementById('renameModal');
                        renameModal.setAttribute('data-chat-id', doc.id);
                        renameModal.style.display = 'block';
                        document.getElementById('renameInput').value = title;
                    });

                    // Delete Chat
                    historyItem.querySelector('.delete-chat').addEventListener('click', () => {
                        const deleteModal = document.getElementById('deleteModal টি বাংলায় লিখতে হবে।, "মুছুন");
                    historyList.appendChild(historyItem);
                });
            })
            .catch(error => {
                console.error('Error loading chat history:', error);
                displayMessage('চ্যাট হিস্ট্রি লোড করতে সমস্যা হয়েছে।', 'bot');
            });
    } catch (error) {
        console.error('Error in loadChatHistory:', error);
        displayMessage('চ্যাট হিস্ট্রি লোড করতে সমস্যা হয়েছে।', 'bot');
    }
}

// Load Messages for a Specific Chat
function loadChatMessages(chatId) {
    const messagesDiv = document.getElementById('messages');
    const welcomeMessage = document.getElementById('welcomeMessage');
    if (!messagesDiv || !welcomeMessage) {
        console.error('messagesDiv or welcomeMessage element not found.');
        return;
    }

    messagesDiv.innerHTML = '';
    welcomeMessage.style.display = 'none';

    try {
        db.collection('chats').doc(chatId).get()
            .then((doc) => {
                if (doc.exists) {
                    const chat = doc.data();
                    if (chat.messages && chat.messages.length > 0) {
                        chat.messages.forEach(message => {
                            if (message.text.startsWith('[Image:')) {
                                const messageDiv = document.createElement('div');
                                messageDiv.classList.add(message.sender === 'user' ? 'user-message' : 'bot-message', 'slide-in');
                                const img = document.createElement('img');
                                img.src = message.text.includes('http') ? message.text.split('[Image: ')[1].slice(0, -1) : '';
                                img.classList.add('image-preview');
                                img.addEventListener('click', () => openImageModal(img.src));
                                messageDiv.appendChild(img);
                                messagesDiv.appendChild(messageDiv);
                            } else {
                                displayMessage(message.text, message.sender);
                            }
                        });
                        messagesDiv.scrollTop = messagesDiv.scrollHeight;
                    }
                }
            })
            .catch(error => {
                console.error('Error loading chat messages:', error);
                displayMessage('চ্যাট মেসেজ লোড করতে সমস্যা হয়েছে।', 'bot');
            });
    } catch (error) {
        console.error('Error in loadChatMessages:', error);
        displayMessage('চ্যাট মেসেজ লোড করতে সমস্যা হয়েছে।', 'bot');
    }
}

// Sanitize Message (same as in script.js, included for completeness)
function sanitizeMessage(message) {
    const div = document.createElement('div');
    div.textContent = message;
    return div.innerHTML;
}

// Initialize Chat History on Load
document.addEventListener('DOMContentLoaded', () => {
    if (currentChatId) {
        loadChatMessages(currentChatId);
    } else {
        const welcomeMessage = document.getElementById('welcomeMessage');
        if (welcomeMessage) {
            welcomeMessage.style.display = 'block';
        }
    }
    loadChatHistory();
});
