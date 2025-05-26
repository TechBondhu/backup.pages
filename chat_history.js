```javascript
// Save Chat History
function saveChatHistory(currentChatId, message, sender) {
    let chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
    if (!chats[currentChatId]) {
        chats[currentChatId] = { title: `Chat ${Object.keys(chats).length + 1}`, messages: [], timestamp: new Date().toISOString() };
    }
    chats[currentChatId].messages.push({ text: message, sender: sender, time: new Date().toISOString() });
    localStorage.setItem('chatHistory', JSON.stringify(chats));
}

// Load Chat History
function loadChatHistory(historyList, sidebar, chatContainer, messagesDiv, welcomeMessage, displayMessage, sanitizeMessage) {
    if (historyList) {
        historyList.innerHTML = '';
    }
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

            item.addEventListener('click', () => loadChat(chatId, messagesDiv, welcomeMessage, sidebar, chatContainer, displayMessage, sanitizeMessage));
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
            });

            deleteItem.addEventListener('click', () => {
                const deleteModal = document.getElementById('deleteModal');
                if (deleteModal) {
                    deleteModal.style.display = 'flex';
                }
            });
        } else {
            console.warn(`Chat with ID ${chatId} is missing or invalid. Skipping...`);
        }
    });

    if (historyList && historyList.children.length > 0) {
        sidebar.classList.add('open');
        chatContainer.classList.add('sidebar-open');
    }
}

// Load Specific Chat
function loadChat(chatId, messagesDiv, welcomeMessage, sidebar, chatContainer, displayMessage, sanitizeMessage) {
    sessionStorage.setItem('chatId', chatId);
    const chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
    const chat = chats[chatId];
    if (chat) {
        messagesDiv.innerHTML = '';
        chat.messages.forEach(msg => {
            displayMessage(msg.text, msg.sender);
        });
        if (welcomeMessage) {
            welcomeMessage.style.display = 'none';
        }
        sidebar.classList.remove('open');
        chatContainer.classList.remove('sidebar-open');
    }
}

// Start New Chat
function startNewChat(currentChatId, messagesDiv, welcomeMessage, chatBox, saveChatHistory) {
    currentChatId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('chatId', currentChatId);
    if (messagesDiv) {
        messagesDiv.innerHTML = '';
    }
    if (welcomeMessage) {
        welcomeMessage.style.display = 'block';
    }
    if (chatBox) {
        chatBox.classList.add('fade-in');
        setTimeout(() => chatBox.classList.remove('fade-in'), 500);
    }
    saveChatHistory(currentChatId, 'New Chat Started', 'system');
}

// Toggle Sidebar
function toggleSidebar(sidebar, chatContainer, loadChatHistory) {
    if (sidebar && chatContainer) {
        sidebar.classList.toggle('open');
        chatContainer.classList.toggle('sidebar-open');
        loadChatHistory();
    }
}

// Hide Sidebar
function hideSidebar(sidebar, chatContainer) {
    if (sidebar && chatContainer) {
        sidebar.classList.remove('open');
        chatContainer.classList.remove('sidebar-open');
    }
}

// Export Functions
export { saveChatHistory, loadChatHistory, loadChat, startNewChat, toggleSidebar, hideSidebar };
```
