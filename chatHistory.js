// State Variables
let currentChatId = sessionStorage.getItem('chatId') || Date.now().toString() + Math.random().toString(36).substr(2, 9);
sessionStorage.setItem('chatId', currentChatId);

// Sanitize Message
function sanitizeMessage(message) {
    if (typeof message !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = message;
    return div.innerHTML
        .replace(/</g, '<')
        .replace(/>/g, '>')
        .replace(/"/g, '"')
        .replace(/'/g, ''')
        .replace(/&/g, '&');
}

// Save Chat History
function saveChatHistory(message, sender) {
    let chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
    if (!chats[currentChatId]) {
        chats[currentChatId] = { title: `Chat ${Object.keys(chats).length + 1}`, messages: [], timestamp: new Date().toISOString() };
    }
    chats[currentChatId].messages.push({ text: message, sender: sender, time: new Date().toISOString() });
    localStorage.setItem('chatHistory', JSON.stringify(chats));
}

// Load Chat History
function loadChatHistory() {
    const historyList = document.getElementById('historyList');
    const sidebar = document.getElementById('sidebar');
    const chatContainer = document.querySelector('.chat-container');
    if (!historyList || !sidebar || !chatContainer) return;
    historyList.innerHTML = '';
    let chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');

    Object.keys(chats).forEach(chatId => {
        const chat = chats[chatId];
        if (chat && chat.title) { // আপনার কোডের মতো শুধুমাত্র title চেক
            const item = document.createElement('div');
            item.classList.add('history-item');
            item.setAttribute('data-chat-id', chatId);
            item.innerHTML = `<div class="history-item-content"><p>${sanitizeMessage(chat.title)}</p><div class="timestamp">${new Date(chat.timestamp).toLocaleString()}</div></div><div class="options"><i class="fas fa-ellipsis-v"></i></div><div class="dropdown" style="display:none;"><div class="rename-item">Rename</div><div class="delete-item">Delete</div></div>`;
            historyList.appendChild(item);

            item.addEventListener('click', () => loadChat(chatId));
            const optionIcon = item.querySelector('.options i');
            const dropdown = item.querySelector('.dropdown');
            const renameItem = item.querySelector('.rename-item');
            const deleteItem = item.querySelector('.delete-item');

            if (optionIcon && dropdown) {
                optionIcon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
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

    if (historyList.children.length > 0) {
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
            messageDiv.classList.add(msg.sender === 'user' ? 'user-message' : 'bot-message');
            messageDiv.innerHTML = sanitizeMessage(msg.text);
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        });
        if (welcomeMessage) welcomeMessage.style.display = 'none';
        if (sidebar && chatContainer) {
            sidebar.classList.remove('open');
            chatContainer.classList.remove('sidebar-open');
        }
        loadChatHistory();
    }
}

// Start New Chat
function startNewChat() {
    const messagesDiv = document.getElementById('messages');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const chatBox = document.getElementById('chatBox');
    currentChatId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('chatId', currentChatId);
    if (messagesDiv) messagesDiv.innerHTML = '';
    if (welcomeMessage) welcomeMessage.style.display = 'block';
    if (chatBox) {
        chatBox.classList.add('fade-in');
        setTimeout(() => chatBox.classList.remove('fade-in'), 500);
    }
    saveChatHistory('New Chat Started', 'system');
    loadChatHistory();
}

// Event Handlers
function setupChatHistoryEventHandlers() {
    const historyIcon = document.getElementById('historyIcon');
    const sidebarIcon = document.getElementById('sidebarIcon');
    const closeSidebar = document.getElementById('closeSidebar');
    const renameCancelBtn = document.getElementById('cancelRename');
    const renameSaveBtn = document.getElementById('saveRename');
    const deleteCancelBtn = document.getElementById('cancelDelete');
    const deleteConfirmBtn = document.getElementById('confirmDelete');
    const sidebar = document.getElementById('sidebar');
    const chatContainer = document.querySelector('.chat-container');
    const renameModal = document.getElementById('renameModal');
    const deleteModal = document.getElementById('deleteModal');
    const renameInput = document.getElementById('renameInput');

    if (historyIcon) {
        historyIcon.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            chatContainer.classList.toggle('sidebar-open');
            loadChatHistory();
        });
    }
    if (sidebarIcon) {
        sidebarIcon.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            chatContainer.classList.toggle('sidebar-open');
            loadChatHistory();
        });
    }
    if (closeSidebar) {
        closeSidebar.addEventListener('click', () => {
            sidebar.classList.remove('open');
            chatContainer.classList.remove('sidebar-open');
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
                if (Object.keys(chats).length === 0) startNewChat();
                else {
                    const messagesDiv = document.getElementById('messages');
                    const welcomeMessage = document.getElementById('welcomeMessage');
                    if (messagesDiv) messagesDiv.innerHTML = '';
                    if (welcomeMessage) welcomeMessage.style.display = 'block';
                }
            }
            deleteModal.style.display = 'none';
        });
    }
}

// DOM Load Handler
document.addEventListener('DOMContentLoaded', setupChatHistoryEventHandlers);
