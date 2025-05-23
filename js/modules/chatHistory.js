import { sanitizeMessage } from './utilities.js';
import { displayMessage } from './messaging.js';
import { elements } from './dom.js';
import { startNewChat } from './sidebar.js';

export function saveChatHistory(message, sender) {
    let chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
    const currentChatId = sessionStorage.getItem('chatId') || Date.now().toString();
    if (!chats[currentChatId]) {
        chats[currentChatId] = { title: `Chat ${Object.keys(chats).length + 1}`, messages: [], timestamp: new Date().toISOString() };
    }
    chats[currentChatId].messages.push({ text: message, sender: sender, time: new Date().toISOString() });
    localStorage.setItem('chatHistory', JSON.stringify(chats));
}

export function loadChatHistory() {
    if (!elements.historyList) return;
    elements.historyList.innerHTML = '';
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
            elements.historyList.appendChild(item);

            item.addEventListener('click', () => loadChat(chatId));
            const optionIcon = item.querySelector(`#optionIcon-${chatId}`);
            const dropdown = item.querySelector(`#dropdown-${chatId}`);
            const renameItem = item.querySelector(`.rename-item-${chatId}`);
            const deleteItem = item.querySelector(`.delete-item-${chatId}`);

            optionIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('active');
            });

            renameItem.addEventListener('click', (e) => {
                e.stopPropagation();
                if (elements.renameModal) {
                    elements.renameModal.style.display = 'flex';
                    elements.renameInput.value = chat.title;
                    sessionStorage.setItem('currentChatId', chatId);
                }
            });

            deleteItem.addEventListener('click', (e) => {
                e.stopPropagation();
                if (elements.deleteModal) {
                    elements.deleteModal.style.display = 'flex';
                    sessionStorage.setItem('currentChatId', chatId);
                }
            });
        }
    });

    if (elements.historyList.children.length > 0) {
        elements.sidebar.classList.add('open');
        elements.chatContainer.classList.add('sidebar-open');
    }
}

export function loadChat(chatId) {
    sessionStorage.setItem('chatId', chatId);
    const chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
    const chat = chats[chatId];
    if (chat && elements.messagesDiv) {
        elements.messagesDiv.innerHTML = '';
        chat.messages.forEach(msg => displayMessage(msg.text, msg.sender));
        if (elements.welcomeMessage) elements.welcomeMessage.style.display = 'none';
        elements.sidebar.classList.remove('open');
        elements.chatContainer.classList.remove('sidebar-open');
        loadChatHistory();
    }
}

export function renameChat() {
    const newTitle = elements.renameInput?.value.trim() || '';
    if (newTitle) {
        let chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
        const currentChatId = sessionStorage.getItem('currentChatId');
        if (chats[currentChatId]) {
            chats[currentChatId].title = sanitizeMessage(newTitle);
            localStorage.setItem('chatHistory', JSON.stringify(chats));
            loadChatHistory();
        }
    }
    elements.renameModal.style.display = 'none';
}

export function deleteChat() {
    let chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
    const currentChatId = sessionStorage.getItem('currentChatId');
    if (chats[currentChatId]) {
        delete chats[currentChatId];
        localStorage.setItem('chatHistory', JSON.stringify(chats));
        loadChatHistory();
        if (Object.keys(chats).length === 0) {
            startNewChat();
        } else {
            elements.messagesDiv.innerHTML = '';
            if (elements.welcomeMessage) elements.welcomeMessage.style.display = 'block';
        }
    }
    elements.deleteModal.style.display = 'none';
}