const renameCancelBtn = document.getElementById('cancelRename');
const renameSaveBtn = document.getElementById('saveRename');
const deleteCancelBtn = document.getElementById('cancelDelete');
const deleteConfirmBtn = document.getElementById('confirmDelete');

renameCancelBtn.addEventListener('click', () => {
    document.getElementById('renameModal').style.display = 'none';
});

renameSaveBtn.addEventListener('click', () => {
    const newTitle = document.getElementById('renameInput').value.trim();
    if (newTitle) {
        let chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
        if (chats[currentChatId]) {
            chats[currentChatId].title = newTitle;
            localStorage.setItem('chatHistory', JSON.stringify(chats));
            loadChatHistory();
        }
    }
    document.getElementById('renameModal').style.display = 'none';
});

deleteCancelBtn.addEventListener('click', () => {
    document.getElementById('deleteModal').style.display = 'none';
});

deleteConfirmBtn.addEventListener('click', () => {
    let chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
    if (chats[currentChatId]) {
        delete chats[currentChatId];
        localStorage.setItem('chatHistory', JSON.stringify(chats));
        loadChatHistory();
        if (Object.keys(chats).length === 0) {
            startNewChat();
        } else {
            document.getElementById('messages').innerHTML = '';
            document.getElementById('welcomeMessage').style.display = 'block';
        }
    }
    document.getElementById('deleteModal').style.display = 'none';
});