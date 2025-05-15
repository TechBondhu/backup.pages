function saveChatHistory(message, sender) {
    let chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
    if (!chats[currentChatId]) {
        chats[currentChatId] = { title: `Chat ${Object.keys(chats).length + 1}`, messages: [], timestamp: new Date().toISOString() };
    }
    chats[currentChatId].messages.push({ text: message, sender: sender, time: new Date().toISOString() });
    localStorage.setItem('chatHistory', JSON.stringify(chats));
}

function loadChatHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    const chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
    Object.keys(chats).forEach(chatId => {
        const chat = chats[chatId];
        const item = document.createElement('div');
        item.classList.add('history-item');
        item.setAttribute('data-chat-id', chatId);
        item.innerHTML = `
            <div class="history-item-content">
                <p>${chat.title}</p>
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
            document.getElementById('renameModal').style.display = 'flex';
            document.getElementById('renameInput').value = chat.title;
            currentChatId = chatId;
        });

        deleteItem.addEventListener('click', () => {
            document.getElementById('deleteModal').style.display = 'flex';
            currentChatId = chatId;
        });
    });
}

function loadChat(chatId) {
    currentChatId = chatId;
    const chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
    const chat = chats[chatId];
    if (chat) {
        const messagesDiv = document.getElementById('messages');
        messagesDiv.innerHTML = '';
        chat.messages.forEach(msg => {
            displayMessage(msg.text, msg.sender);
        });
        document.getElementById('welcomeMessage').style.display = 'none';
        document.getElementById('sidebar').classList.remove('open');
        document.querySelector('.chat-container').classList.remove('sidebar-open');
    }
}