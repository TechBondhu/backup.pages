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

console.log('DOM Elements initialized:', {
    sidebar: !!sidebar,
    historyList: !!historyList,
    historyIcon: !!historyIcon,
    closeSidebar: !!closeSidebar,
    newChatIcon: !!newChatIcon,
    searchInput: !!searchInput,
    deleteModal: !!deleteModal,
    renameModal: !!renameModal,
    cancelDelete: !!cancelDelete,
    confirmDelete: !!confirmDelete,
    cancelRename: !!cancelRename,
    saveRename: !!saveRename,
    renameInput: !!renameInput,
    messagesDiv: !!messagesDiv,
    welcomeMessage: !!welcomeMessage
});

// Global Variables
let currentChatId = localStorage.getItem('currentChatId') || null;
let currentUserUid = null;

console.log('Initial global variables:', { currentChatId, currentUserUid });

// Firebase
const auth = firebase.auth();
const db = window.db;

if (!db) {
    console.error("Firestore database not initialized. Check Firebase setup in script.js.");
    showErrorMessage("ডাটাবেজ সংযোগে সমস্যা হয়েছে। দয়া করে পুনরায় চেষ্টা করুন।");
    throw new Error("Firestore db is not initialized");
}
console.log('Firestore database initialized successfully');

// Auth state change handler
auth.onAuthStateChanged((user) => {
    console.log('Auth state changed, user:', user ? { uid: user.uid, email: user.email } : null);
    if (user) {
        currentUserUid = user.uid;
        console.log("User logged in with UID:", currentUserUid);
        console.log('Loading chat history for user');
        loadChatHistory();
        if (currentChatId) {
            console.log('Loading messages for existing chatId:', currentChatId);
            loadChatMessages(currentChatId);
        } else {
            console.log('No currentChatId, starting new chat');
            startNewChat();
        }
    } else {
        currentUserUid = null;
        console.log("No user logged in, redirecting to login.html");
        window.location.href = 'login.html';
    }
});

// Setup Event Handlers for Chat History
function setupChatHistoryEventHandlers() {
    console.log('Setting up event handlers for chat history');
    if (historyIcon && sidebar) {
        historyIcon.addEventListener('click', toggleSidebar);
        console.log('historyIcon click listener added');
    } else {
        console.error("historyIcon or sidebar element not found", { historyIcon: !!historyIcon, sidebar: !!sidebar });
    }

    if (closeSidebar && sidebar) {
        closeSidebar.addEventListener('click', closeSidebarHandler);
        console.log('closeSidebar click listener added');
    } else {
        console.error("closeSidebar or sidebar element not found", { closeSidebar: !!closeSidebar, sidebar: !!sidebar });
    }

    if (newChatIcon) {
        newChatIcon.addEventListener('click', startNewChat);
        console.log('newChatIcon click listener added');
    } else {
        console.error("newChatIcon element not found", { newChatIcon: !!newChatIcon });
    }

    if (searchInput) {
        searchInput.addEventListener('input', searchHandler);
        console.log('searchInput input listener added');
    } else {
        console.error("searchInput element not found", { searchInput: !!searchInput });
    }

    if (cancelDelete) {
        cancelDelete.addEventListener('click', cancelDeleteHandler);
        console.log('cancelDelete click listener added');
    } else {
        console.error("cancelDelete element not found", { cancelDelete: !!cancelDelete });
    }

    if (confirmDelete) {
        confirmDelete.addEventListener('click', confirmDeleteHandler);
        console.log('confirmDelete click listener added');
    } else {
        console.error("confirmDelete element not found", { confirmDelete: !!confirmDelete });
    }

    if (cancelRename) {
        cancelRename.addEventListener('click', cancelRenameHandler);
        console.log('cancelRename click listener added');
    } else {
        console.error("cancelRename element not found", { cancelRename: !!cancelRename });
    }

    if (saveRename) {
        saveRename.addEventListener('click', saveRenameHandler);
        console.log('saveRename click listener added');
    } else {
        console.error("saveRename element not found", { saveRename: !!saveRename });
    }
}

function toggleSidebar() {
    console.log('toggleSidebar called, current sidebar state:', sidebar.classList.contains('open'));
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        console.log('Sidebar closed');
    } else {
        sidebar.classList.add('open');
        console.log('Sidebar opened, triggering loadChatHistory');
        loadChatHistory();
    }
}

function closeSidebarHandler() {
    console.log('closeSidebarHandler called');
    if (sidebar) {
        sidebar.classList.remove('open');
        console.log('Sidebar closed');
    } else {
        console.error('Sidebar element not found during close');
    }
}

function searchHandler() {
    const query = searchInput.value.toLowerCase();
    console.log('searchHandler called with query:', query);
    loadChatHistory(query);
}

function cancelDeleteHandler() {
    console.log('cancelDeleteHandler called');
    if (deleteModal) {
        deleteModal.style.display = 'none';
        console.log('Delete modal closed');
    } else {
        console.error('deleteModal element not found');
    }
}

async function confirmDeleteHandler() {
    console.log('confirmDeleteHandler called');
    const chatId = deleteModal.getAttribute('data-chat-id');
    console.log('Attempting to delete chat with chatId:', chatId);
    if (!chatId) {
        console.error('No chatId found in delete modal');
        showErrorMessage('চ্যাট আইডি পাওয়া যায়নি।');
        return;
    }
    try {
        console.log('Deleting chat document:', chatId);
        await db.collection('chats').doc(chatId).delete();
        console.log('Chat document deleted successfully');

        console.log('Fetching messages for deletion, chatId:', chatId);
        const messagesSnapshot = await db.collection('chats').doc(chatId).collection('messages').get();
        console.log('Messages to delete:', messagesSnapshot.size);
        if (!messagesSnapshot.empty) {
            const batch = db.batch();
            messagesSnapshot.docs.forEach(doc => {
                console.log('Queueing message for deletion:', doc.id);
                batch.delete(doc.ref);
            });
            await batch.commit();
            console.log('All messages deleted successfully');
        } else {
            console.log('No messages found to delete');
        }

        if (deleteModal) {
            deleteModal.style.display = 'none';
            console.log('Delete modal closed');
        }

        if (chatId === currentChatId) {
            console.log('Current chat deleted, resetting currentChatId');
            currentChatId = null;
            localStorage.removeItem('currentChatId');
            if (messagesDiv) {
                messagesDiv.innerHTML = '';
                console.log('Messages div cleared');
            } else {
                console.error('messagesDiv not found');
            }
            if (welcomeMessage) {
                welcomeMessage.style.display = 'block';
                console.log('Welcome message displayed');
            } else {
                console.error('welcomeMessage not found');
            }
            console.log('Starting new chat after deletion');
            await startNewChat();
        }
        console.log('Reloading chat history after deletion');
        await loadChatHistory();
    } catch (error) {
        console.error('Error deleting chat:', error);
        showErrorMessage('চ্যাট ডিলিট করতে সমস্যা হয়েছে: ' + error.message);
    }
}

function cancelRenameHandler() {
    console.log('cancelRenameHandler called');
    if (renameModal) {
        renameModal.style.display = 'none';
        console.log('Rename modal closed');
    } else {
        console.error('renameModal element not found');
    }
}

async function saveRenameHandler() {
    console.log('saveRenameHandler called');
    const chatId = renameModal.getAttribute('data-chat-id');
    const newName = renameInput.value.trim();
    console.log('Attempting to rename chatId:', chatId, 'to:', newName);
    if (!chatId) {
        console.error('No chatId found in rename modal');
        showErrorMessage('চ্যাট আইডি পাওয়া যায়নি।');
        return;
    }
    if (!newName) {
        console.error('No valid chat name provided');
        showErrorMessage('দয়া করে একটি বৈধ নাম লিখুন।');
        return;
    }
    try {
        console.log('Updating chat name in Firestore');
        await db.collection('chats').doc(chatId).update({
            name: newName,
            updated_at: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('Chat name updated successfully');
        if (renameModal) {
            renameModal.style.display = 'none';
            console.log('Rename modal closed');
        }
        console.log('Reloading chat history after rename');
        await loadChatHistory();
    } catch (error) {
        console.error('Error renaming chat:', error);
        showErrorMessage('চ্যাটের নাম পরিবর্তন করতে সমস্যা হয়েছে: ' + error.message);
    }
}

// Save Chat Message to Firestore
async function saveChatHistory(message, sender) {
    console.log('saveChatHistory called with:', { message, sender, currentChatId, currentUserUid });
    if (!currentUserUid) {
        console.error('No user UID available, cannot save chat history');
        showErrorMessage('ইউজার লগইন করেননি। দয়া করে লগইন করুন।');
        return;
    }

    if (!currentChatId) {
        console.log('No currentChatId, starting new chat');
        await startNewChat();
        if (!currentChatId) {
            console.error('Failed to set currentChatId after startNewChat');
            showErrorMessage('নতুন চ্যাট তৈরি করতে সমস্যা হয়েছে।');
            return;
        }
    }

    try {
        console.log('Saving message to Firestore, path:', `chats/${currentChatId}/messages`);
        const messageRef = await db.collection('chats').doc(currentChatId).collection('messages').add({
            message: message,
            sender: sender,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('Message saved successfully, messageId:', messageRef.id);

        console.log('Fetching current chat document to update metadata');
        const chatDoc = await db.collection('chats').doc(currentChatId).get();
        if (!chatDoc.exists) {
            console.error('Chat document does not exist:', currentChatId);
            showErrorMessage('চ্যাট ডকুমেন্ট পাওয়া যায়নি।');
            return;
        }
        const chatData = chatDoc.data();
        console.log('Current chat data:', chatData);

        let chatName = chatData.name;
        if (!chatName && sender === 'user') {
            chatName = message.length > 30 ? message.substring(0, 30) + '...' : message;
            console.log('Setting chat name from user message:', chatName);
        } else if (!chatName) {
            chatName = 'নতুন চ্যাট';
            console.log('Using default chat name:', chatName);
        }

        const lastMessage = message.length > 50 ? message.substring(0, 50) + '...' : message;
        console.log('Updating chat metadata with:', { chatName, lastMessage });
        await db.collection('chats').doc(currentChatId).update({
            name: chatName,
            last_message: lastMessage,
            updated_at: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('Chat metadata updated successfully');

        console.log('Reloading chat history after saving message');
        await loadChatHistory();
    } catch (error) {
        console.error('Error saving chat history:', error);
        showErrorMessage('চ্যাট হিস্ট্রি সেভ করতে সমস্যা হয়েছে: ' + error.message);
    }
}

// Load Chat History List with UID Filter
async function loadChatHistory(searchQuery = '') {
    console.log('loadChatHistory called with:', { searchQuery, currentUserUid });
    if (!currentUserUid) {
        console.error('currentUserUid is null, cannot load chat history');
        showErrorMessage('ইউজার লগইন করেননি। দয়া করে লগইন করুন।');
        return;
    }

    if (!historyList) {
        console.error('historyList element not found');
        showErrorMessage('চ্যাট হিস্ট্রি লোড করতে সমস্যা হয়েছে।');
        return;
    }

    historyList.innerHTML = '<div class="loading">লোড হচ্ছে...</div>';
    console.log('Cleared historyList, showing loading state');
    try {
        console.log('Querying Firestore for chats with UID:', currentUserUid);
        let query = db.collection('chats')
            .where('uid', '==', currentUserUid)
            .orderBy('updated_at', 'desc');
        const snapshot = await query.get();
        console.log('Chats retrieved, count:', snapshot.size);

        historyList.innerHTML = '';
        console.log('Cleared loading state from historyList');

        if (snapshot.empty) {
            console.log('No chat history found for user');
            historyList.innerHTML = '<div>কোনো চ্যাট হিস্ট্রি পাওয়া যায়নি।</div>';
            return;
        }

        snapshot.forEach(doc => {
            const chat = doc.data();
            console.log('Processing chat:', { chatId: doc.id, name: chat.name, last_message: chat.last_message });
            const searchLower = searchQuery.toLowerCase();
            if (searchQuery && !chat.name.toLowerCase().includes(searchLower) && !chat.last_message.toLowerCase().includes(searchLower)) {
                console.log('Chat skipped due to search filter:', doc.id);
                return;
            }

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
            console.log('Created history item for chatId:', doc.id);

            historyItem.addEventListener('click', async (e) => {
                if (e.target.classList.contains('rename-chat') || e.target.classList.contains('delete-chat')) {
                    console.log('Clicked rename or delete action, skipping chat load');
                    return;
                }
                console.log('Loading chat messages for chatId:', doc.id);
                currentChatId = doc.id;
                localStorage.setItem('currentChatId', currentChatId);
                await loadChatMessages(currentChatId);
                if (sidebar) {
                    sidebar.classList.remove('open');
                    console.log('Sidebar closed after loading chat');
                }
            });

            const renameButton = historyItem.querySelector('.rename-chat');
            if (renameButton) {
                renameButton.addEventListener('click', () => {
                    console.log('Opening rename modal for chatId:', doc.id);
                    if (renameModal && renameInput) {
                        renameModal.setAttribute('data-chat-id', doc.id);
                        renameInput.value = chat.name || 'নতুন চ্যাট';
                        renameModal.style.display = 'block';
                        console.log('Rename modal opened');
                    } else {
                        console.error('renameModal or renameInput not found');
                    }
                });
            }

            const deleteButton = historyItem.querySelector('.delete-chat');
            if (deleteButton) {
                deleteButton.addEventListener('click', () => {
                    console.log('Opening delete modal for chatId:', doc.id);
                    if (deleteModal) {
                        deleteModal.setAttribute('data-chat-id', doc.id);
                        deleteModal.style.display = 'block';
                        console.log('Delete modal opened');
                    } else {
                        console.error('deleteModal not found');
                    }
                });
            }

            historyList.appendChild(historyItem);
            console.log('Appended history item to historyList:', doc.id);
        });
    } catch (error) {
        console.error('Error loading chat history:', error);
        showErrorMessage('চ্যাট হিস্ট্রি লোড করতে সমস্যা হয়েছে: ' + error.message);
    }
}

// Load Messages for a Specific Chat
async function loadChatMessages(chatId) {
    console.log('loadChatMessages called with chatId:', chatId);
    if (!chatId) {
        console.error('No chatId provided');
        showErrorMessage('চ্যাট আইডি পাওয়া যায়নি।');
        return;
    }
    if (!messagesDiv) {
        console.error('messagesDiv not found');
        showErrorMessage('মেসেজ প্রদর্শন এলাকা পাওয়া যায়নি।');
        return;
    }
    try {
        messagesDiv.innerHTML = '';
        console.log('Cleared messagesDiv');
        if (welcomeMessage) {
            welcomeMessage.style.display = 'none';
            console.log('Hid welcome message');
        } else {
            console.warn('welcomeMessage element not found');
        }

        console.log('Querying messages for chatId:', chatId);
        const snapshot = await db.collection('chats').doc(chatId).collection('messages').orderBy('timestamp', 'asc').get();
        console.log('Messages retrieved, count:', snapshot.size);

        if (snapshot.empty) {
            console.log('No messages found for chatId:', chatId);
        }

        snapshot.forEach(doc => {
            const msg = doc.data();
            console.log('Processing message:', { messageId: doc.id, sender: msg.sender, message: msg.message });
            if (msg.sender === 'user' || msg.sender === 'bot') {
                if (typeof displayMessage === 'function') {
                    displayMessage(sanitizeMessage(msg.message), msg.sender);
                    console.log('Displayed message:', msg.message);
                } else {
                    console.error('displayMessage function not found');
                    showErrorMessage('মেসেজ প্রদর্শনে সমস্যা হয়েছে।');
                }
            }
        });

        console.log('Querying submissions for chatId:', chatId);
        const submissions = await db.collection('submissions').where('chat_id', '==', chatId).get();
        console.log('Submissions retrieved, count:', submissions.size);
        submissions.forEach(doc => {
            const sub = doc.data();
            console.log('Processing submission:', { submissionId: doc.id, review_data: sub.review_data });
            if (sub.review_data && typeof displayReview === 'function') {
                displayReview(sub.review_data);
                console.log('Displayed review data:', sub.review_data);
            } else {
                console.warn('displayReview function not found or no review_data');
            }
        });

        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        console.log('Scrolled messagesDiv to bottom');
    } catch (error) {
        console.error('Error loading chat messages:', error);
        showErrorMessage('চ্যাট মেসেজ লোড করতে সমস্যা হয়েছে: ' + error.message);
    }
}

// Start a New Chat
async function startNewChat() {
    console.log('startNewChat called with UID:', currentUserUid);
    if (!currentUserUid) {
        console.error('No user UID available, cannot start new chat');
        showErrorMessage('ইউজার লগইন করেননি। দয়া করে লগইন করুন।');
        return;
    }
    try {
        console.log('Creating new chat document in Firestore with data:', {
            uid: currentUserUid,
            name: 'নতুন চ্যাট',
            last_message: 'চ্যাট শুরু হয়েছে',
            created_at: 'serverTimestamp',
            updated_at: 'serverTimestamp'
        });
        const newChatRef = await db.collection('chats').add({
            uid: currentUserUid,
            name: 'নতুন চ্যাট',
            last_message: 'চ্যাট শুরু হয়েছে',
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
            updated_at: firebase.firestore.FieldValue.serverTimestamp()
        });
        currentChatId = newChatRef.id;
        localStorage.setItem('currentChatId', currentChatId);
        console.log('New chat created, chatId:', currentChatId);

        console.log('Adding system message to messages sub-collection');
        const systemMessageRef = await db.collection('chats').doc(currentChatId).collection('messages').add({
            message: 'Chat session started',
            sender: 'system',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('System message added, messageId:', systemMessageRef.id);

        if (messagesDiv) {
            messagesDiv.innerHTML = '';
            console.log('Cleared messagesDiv');
        } else {
            console.error('messagesDiv not found');
        }
        if (welcomeMessage) {
            welcomeMessage.style.display = 'block';
            console.log('Displayed welcome message');
        } else {
            console.warn('welcomeMessage element not found');
        }
        console.log('Reloading chat history after new chat creation');
        await loadChatHistory();
    } catch (error) {
        console.error('Error starting new chat:', error);
        showErrorMessage('নতুন চ্যাট শুরু করতে সমস্যা হয়েছে: ' + error.message);
    }
}

// Sanitize Message
function sanitizeMessage(message) {
    console.log('sanitizeMessage called with message:', message);
    const div = document.createElement('div');
    div.textContent = message;
    const sanitized = div.innerHTML;
    console.log('Sanitized message:', sanitized);
    return sanitized;
}

// Fallback Error Message Display
function showErrorMessage(message) {
    console.log('showErrorMessage called with message:', message);
    if (typeof displayMessage === 'function') {
        displayMessage(sanitizeMessage(message), 'bot');
        console.log('Error message displayed via displayMessage');
    } else {
        console.warn('displayMessage function not found, using fallback');
        if (messagesDiv) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('bot-message', 'slide-in');
            messageDiv.innerHTML = sanitizeMessage(message);
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            console.log('Error message displayed via fallback');
        } else {
            console.error('messagesDiv not found for error message display');
        }
    }
}

// Initialize event handlers
console.log('Initializing event handlers');
setupChatHistoryEventHandlers();

// Setup message form handler
console.log('Setting up message form handler');
const messageForm = document.getElementById('messageForm');
if (messageForm) {
    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Message form submitted');
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();
        if (message) {
            console.log('Sending message:', message);
            await saveChatHistory(message, 'user');
            messageInput.value = '';
            console.log('Message input cleared');
        } else {
            console.warn('Empty message input');
            showErrorMessage('দয়া করে একটি মেসেজ লিখুন।');
        }
    });
    console.log('Message form handler set up');
} else {
    console.error('messageForm not found');
}
