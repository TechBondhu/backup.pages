document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');
    const messagesDiv = document.getElementById('messages');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('fileInput');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const sidebar = document.getElementById('sidebar');
    const historyList = document.getElementById('historyList');
    const chatContainer = document.querySelector('.chat-container');
    const historyIcon = document.getElementById('historyIcon');
    const newChatIcon = document.getElementById('newChatIcon');
    const closeSidebar = document.getElementById('closeSidebar');
    const searchInput = document.getElementById('searchInput');
    const chatBox = document.getElementById('chatBox');
    const sidebarIcon = document.getElementById('sidebarIcon');
    const deleteModal = document.getElementById('deleteModal');
    const renameModal = document.getElementById('renameModal');
    const renameInput = document.getElementById('renameInput');
    const renameCancelBtn = document.getElementById('cancelRename');
    const renameSaveBtn = document.getElementById('saveRename');
    const deleteCancelBtn = document.getElementById('cancelDelete');
    const deleteConfirmBtn = document.getElementById('confirmDelete');
    const homeIcon = document.querySelector('.home-icon');
    const settingsIcon = document.getElementById('settingsIcon');
    const accountIcon = document.getElementById('accountIcon');
    const previewContainer = document.getElementById('previewContainer');
    const previewImage = document.getElementById('previewImage');

    // State Variables
    let currentChatId = Date.now().toString();

    // Navigation Events
    homeIcon.addEventListener('click', () => window.location.href = 'index.html');
    settingsIcon.addEventListener('click', () => window.location.href = 'settings.html');
    accountIcon.addEventListener('click', () => window.location.href = 'account.html');

    // Message Sending
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.repeat) sendMessage();
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            displayMessage(message, 'user');
            userInput.value = '';
            saveChatHistory(message, 'user');
            callRasaAPI(message);
        }
    }

    // Sidebar and Chat History
    historyIcon.addEventListener('click', toggleSidebar);
    newChatIcon.addEventListener('click', startNewChat);
    closeSidebar.addEventListener('click', toggleSidebar);
    sidebarIcon.addEventListener('click', toggleSidebar);

    function toggleSidebar() {
        sidebar.classList.toggle('open');
        chatContainer.classList.toggle('sidebar-open');
        loadChatHistory();
    }

    function startNewChat() {
        currentChatId = Date.now().toString();
        messagesDiv.innerHTML = '';
        welcomeMessage.style.display = 'block';
        chatBox.classList.add('fade-in');
        setTimeout(() => chatBox.classList.remove('fade-in'), 500);
        saveChatHistory('New Chat Started', 'system');
        loadChatHistory();
    }

    function displayMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageDiv.innerText = message;
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        if (welcomeMessage.style.display !== 'none') welcomeMessage.style.display = 'none';
        saveChatHistory(message, sender);
    }

    // Initialize
    loadChatHistory();
});