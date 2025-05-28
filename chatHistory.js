// State Variables
let currentChatId = sessionStorage.getItem('chatId') || Date.now().toString() + Math.random().toString(36).substr(2, 9);
sessionStorage.setItem('chatId', currentChatId);

// Sanitize Message
function sanitizeMessage(message) {
    if (typeof message !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = message;
     return div.innerHTML
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
        .replace(/&/g, '&amp;');
}

// Generate Title from First 30 Characters
function generateTitle(message) {
    const cleanMessage = sanitizeMessage(message);
    return cleanMessage.substring(0, 30) + (cleanMessage.length > 30 ? '...' : '');
}

// Save Chat History
function saveChatHistory(message, sender) {
    let chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
    if (!chats[currentChatId]) {
        chats[currentChatId] = { 
            title: sender === 'user' ? generateTitle(message) : 'Chat', 
            messages: [], 
            timestamp: new Date().toISOString() 
        };
    }
    chats[currentChatId].messages.push({ text: message, sender: sender, time: new Date().toISOString() });
    localStorage.setItem('chatHistory', JSON.stringify(chats));
    loadChatHistory();
}

// Load and Display Chat History
function loadChatHistory() {
    const historyList = document.getElementById('historyList');
    const sidebar = document.getElementById('sidebar');
    const chatContainer = document.querySelector('.chat-container');
    if (historyList) historyList.innerHTML = '';
    let chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
    Object.keys(chats).forEach(chatId => {
        const chat = chats[chatId];
        if (chat && chat.title) {
            const item = document.createElement('div');
            item.classList.add('history-item');
            item.setAttribute('data-chat-id', chatId);
            item.innerHTML = `
                <div class="history-item-content">
                    <p>${chat.title}</p>
                    <div class="timestamp">${new Date(chat.timestamp).toLocaleString()}</div>
                </div>
                <div class="options">
                    <i class="fas fa-ellipsis-v"></i>
                </div>
                <div class="dropdown">
                    <div class="dropdown-item rename-item">Rename</div>
                    <div class="dropdown-item delete-item">Delete</div>
                </div>`;
            historyList.appendChild(item);

            item.addEventListener('click', (e) => {
                if (!e.target.closest('.options') && !e.target.closest('.dropdown')) {
                    loadChat(chatId);
                }
            });

            const optionIcon = item.querySelector('.options i');
            const dropdown = item.querySelector('.dropdown');
            const renameItem = item.querySelector('.rename-item');
            const deleteItem = item.querySelector('.delete-item');

            if (optionIcon && dropdown) {
                optionIcon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    dropdown.classList.toggle('active');
                });
            }
            if (renameItem) {
                renameItem.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const renameModal = document.getElementById('renameModal');
                    const renameInput = document.getElementById('renameInput');
                    if (renameModal && renameInput) {
                        renameModal.style.display = 'flex';
                        renameInput.value = chat.title;
                        currentChatId = chatId;
                    }
                });
            }
            if (deleteItem) {
                deleteItem.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const deleteModal = document.getElementById('deleteModal');
                    if (deleteModal) {
                        deleteModal.style.display = 'flex';
                        currentChatId = chatId;
                    }
                });
            }
        }
    });

    if (historyList && historyList.children.length > 0) {
        sidebar.classList.add('open');
        chatContainer.classList.add('sidebar-open');
    } else {
        sidebar.classList.remove('open');
        chatContainer.classList.remove('sidebar-open');
    }
}

// Load Specific Chat
function loadChat(chatId) {
    const messagesDiv = document.getElementById('messages');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const sidebar = document.getElementById('sidebar');
    const chatContainer = document.querySelector('.chat-container');
    currentChatId = chatId;
    sessionStorage.setItem('chatId', currentChatId);
    const chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
    const chat = chats[chatId];
    if (chat && messagesDiv) {
        messagesDiv.innerHTML = '';
        chat.messages.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add(msg.sender === 'user' ? 'user-message' : 'bot-message', 'slide-in');
            messageDiv.innerHTML = sanitizeMessage(msg.text);
            messagesDiv.appendChild(messageDiv);
        });
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        if (welcomeMessage) welcomeMessage.style.display = 'none';
        sidebar.classList.remove('open');
        chatContainer.classList.remove('sidebar-open');
    }
}

// Start New Chat
function startNewChat() {
    currentChatId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('chatId', currentChatId);
    window.location.href = 'index.html'; // Redirect to new page
}

// Display Message
function displayMessage(message, sender) {
    const messagesDiv = document.getElementById('messages');
    const welcomeMessage = document.getElementById('welcomeMessage');
    if (messagesDiv) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message', 'slide-in');
        messageDiv.innerHTML = sanitizeMessage(message);
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        if (welcomeMessage) welcomeMessage.style.display = 'none';
    }
}

// Event Handlers
function setupChatHistoryEventHandlers() {
    const historyIcon = document.getElementById('historyIcon');
    const newChatIcon = document.getElementById('newChatIcon');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebarIcon = document.getElementById('sidebarIcon');
    const renameCancelBtn = document.getElementById('cancelRename');
    const renameSaveBtn = document.getElementById('saveRename');
    const deleteCancelBtn = document.getElementById('cancelDelete');
    const deleteConfirmBtn = document.getElementById('confirmDelete');
    const sidebar = document.getElementById('sidebar');
    const chatContainer = document.querySelector('.chat-container');
    const renameModal = document.getElementById('renameModal');
    const deleteModal = document.getElementById('deleteModal');
    const renameInput = document.getElementById('renameInput');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');

    if (historyIcon) {
        historyIcon.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            chatContainer.classList.toggle('sidebar-open');
            loadChatHistory();
        });
    }
    if (newChatIcon) {
        newChatIcon.addEventListener('click', startNewChat);
    }
    if (closeSidebar) {
        closeSidebar.addEventListener('click', () => {
            sidebar.classList.remove('open');
            chatContainer.classList.remove('sidebar-open');
        });
    }
    if (sidebarIcon) {
        sidebarIcon.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            chatContainer.classList.toggle('sidebar-open');
            loadChatHistory();
        });
    }
    if (renameCancelBtn) {
        renameCancelBtn.addEventListener('click', () => renameModal.style.display = 'none');
    }
    if (renameSaveBtn) {
        renameSaveBtn.addEventListener('click', () => {
            const newTitle = renameInput?.value.trim() || '';
            if (newTitle) {
                let chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
                if (chats[currentChatId]) {
                    chats[currentChatId].title = sanitizeMessage(newTitle);
                    localStorage.setItem('chatHistory', JSON.stringify(chats));
                    loadChatHistory();
                }
            }
            renameModal.style.display = 'none';
        });
    }
    if (deleteCancelBtn) {
        deleteCancelBtn.addEventListener('click', () => deleteModal.style.display = 'none');
    }
    if (deleteConfirmBtn) {
        deleteConfirmBtn.addEventListener('click', () => {
            let chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
            if (chats[currentChatId]) {
                delete chats[currentChatId];
                localStorage.setItem('chatHistory', JSON.stringify(chats));
                loadChatHistory();
                const messagesDiv = document.getElementById('messages');
                const welcomeMessage = document.getElementById('welcomeMessage');
                if (messagesDiv) messagesDiv.innerHTML = '';
                if (welcomeMessage) welcomeMessage.style.display = 'block';
            }
            deleteModal.style.display = 'none';
        });
    }
    if (sendBtn && userInput) {
        sendBtn.addEventListener('click', () => {
            const message = userInput.value.trim();
            if (message) {
                displayMessage(message, 'user');
                saveChatHistory(message, 'user');
                // Simulate bot response (replace with actual bot logic)
                setTimeout(() => {
                    const botResponse = `এটি একটি উত্তর: ${message}`;
                    displayMessage(botResponse, 'bot');
                    saveChatHistory(botResponse, 'bot');
                }, 500);
                userInput.value = '';
            }
        });
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendBtn.click();
            }
        });
    }
}

// DOM Load Handler
document.addEventListener('DOMContentLoaded', setupChatHistoryEventHandlers);
