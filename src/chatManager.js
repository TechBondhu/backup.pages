import { sanitizeMessage } from './domUtils.js';

export function saveChatHistory(message, sender, currentChatId) {
    let chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
    if (!chats[currentChatId]) {
        chats[currentChatId] = { title: `Chat ${Object.keys(chats).length + 1}`, messages: [], timestamp: new Date().toISOString() };
    }
    chats[currentChatId].messages.push({ text: message, sender: sender, time: new Date().toISOString() });
    localStorage.setItem('chatHistory', JSON.stringify(chats));
}

export function loadChatHistory(historyList, sidebar, chatContainer, messagesDiv, welcomeMessage, loadChat) {
    historyList.innerHTML = '';
    const chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
    Object.keys(chats).forEach(chatId => {
        const chat = chats[chatId];
        if (chat && chat.title) {
            const item = document.createElement('div');
            item.classList.add('history-item');
            item.setAttribute('data-chat-id', chatId);
            item.innerHTML = `
                <div class="history-item-content">
                    <p>${sanitizeMessage(chat.title)}</p>
                    <div class="timestamp">${new Date(chat.timestamp).toLocaleString()}</div>
                </div>
                <div class="options">
                    <i class="fas fa-ellipsis-v" id="optionIcon-${chatId}"></i>
                </div>
                <div class="dropdown" id="dropdown-${chatId}">
                    <div class="dropdown-item rename-item-${chatId}">Rename</div>
                    <div class="dropdown-item delete-item-${chatId}">Delete</div>
                </div>
            `;
            historyList.appendChild(item);

            item.addEventListener('click', () => loadChat(chatId));
            const optionIcon = item.querySelector(`#optionIcon-${chatId}`);
            const dropdown = item.querySelector(`#dropdown-${chatId}`);
            const renameItem = item.querySelector(`.rename-item-${chatId}`);
            const deleteItem = item.querySelector(`.delete-item-${chatId}`);

            optionIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('active');
            });

            renameItem.addEventListener('click', () => {
                const renameModal = document.getElementById('renameModal');
                const renameInput = document.getElementById('renameInput');
                if (renameModal) {
                    renameModal.style.display = 'flex';
                }
                if (renameInput) {
                    renameInput.value = chat.title;
                }
                sessionStorage.setItem('currentChatId', chatId);
            });

            deleteItem.addEventListener('click', () => {
                const deleteModal = document.getElementById('deleteModal');
                if (deleteModal) {
                    deleteModal.style.display = 'flex';
                }
                sessionStorage.setItem('currentChatId', chatId);
            });
        }
    });

    if (historyList.children.length > 0) {
        sidebar.classList.add('open');
        chatContainer.classList.add('sidebar-open');
    }
}

export function loadChat(chatId, messagesDiv, welcomeMessage, displayMessage) {
    sessionStorage.setItem('chatId', chatId);
    const chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
    const chat = chats[chatId];
    if (chat) {
        messagesDiv.innerHTML = '';
        chat.messages.forEach(msg => {
            displayMessage(msg.text, msg.sender, messagesDiv, welcomeMessage, saveChatHistory, chatId);
        });
        welcomeMessage.style.display = 'none';
        const sidebar = document.getElementById('sidebar');
        const chatContainer = document.querySelector('.chat-container');
        sidebar.classList.remove('open');
        chatContainer.classList.remove('sidebar-open');
        loadChatHistory(
            document.getElementById('historyList'),
            sidebar,
            chatContainer,
            messagesDiv,
            welcomeMessage,
            loadChat
        );
    }
}

export function startNewChat(messagesDiv, welcomeMessage, chatBox) {
    const newChatId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('chatId', newChatId);
    messagesDiv.innerHTML = '';
    welcomeMessage.style.display = 'block';
    chatBox.classList.add('fade-in');
    setTimeout(() => chatBox.classList.remove('fade-in'), 500);
    saveChatHistory('New Chat Started', 'system', newChatId);
    loadChatHistory(
        document.getElementById('historyList'),
        document.getElementById('sidebar'),
        document.querySelector('.chat-container'),
        messagesDiv,
        welcomeMessage,
        loadChat
    );
}

export function toggleSidebar(sidebar, chatContainer) {
    sidebar.classList.toggle('open');
    chatContainer.classList.toggle('sidebar-open');
    loadChatHistory(
        document.getElementById('historyList'),
        sidebar,
        chatContainer,
        document.getElementById('messages'),
        document.getElementById('welcomeMessage'),
        loadChat
    );
}

export function hideSidebar(sidebar, chatContainer) {
    sidebar.classList.remove('open');
    chatContainer.classList.remove('sidebar-open');
}