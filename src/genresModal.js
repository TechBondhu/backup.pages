import { sanitizeMessage, displayMessage } from './domUtils.js';
import { callRasaAPI } from './apiService.js';
import { saveChatHistory } from './chatManager.js';

export function renderGenresList(genresList, genres, messagesDiv, welcomeMessage, currentChatId, callRasaAPI) {
    genresList.innerHTML = '';
    genres.forEach(genre => {
        const genreItem = document.createElement('div');
        genreItem.className = 'genre-item ripple-btn';
        genreItem.innerHTML = `<i class="${genre.icon}"></i><span>${sanitizeMessage(genre.name)}</span>`;
        genreItem.addEventListener('click', () => {
            if (genre.message) {
                const genresModal = document.getElementById('genresModal');
                genresModal.classList.add('slide-out');
                setTimeout(() => {
                    genresModal.style.display = 'none';
                    genresModal.classList.remove('slide-out');
                }, 300);
                welcomeMessage.classList.add('fade-out');
                setTimeout(() => {
                    welcomeMessage.style.display = 'none';
                    welcomeMessage.classList.remove('fade-out');
                }, 300);
                displayMessage(sanitizeMessage(genre.message), 'user', messagesDiv, welcomeMessage, saveChatHistory, currentChatId);
                saveChatHistory(sanitizeMessage(genre.message), 'user', currentChatId);
                callRasaAPI(sanitizeMessage(genre.message), {}, currentChatId, messagesDiv, welcomeMessage, saveChatHistory);
            } else {
                console.error(`Message undefined for genre: ${genre.name}`);
                displayMessage('এই সেবাটি বর্তমানে উপলব্ধ নয়। দয়া করে অন্য সেবা নির্বাচন করুন।', 'bot', messagesDiv, welcomeMessage, saveChatHistory, currentChatId);
            }
        });
        genresList.appendChild(genreItem);
    });
}

export function openGenresModal(genresModal) {
    genresModal.classList.add('slide-in');
    genresModal.style.display = 'flex';
    setTimeout(() => genresModal.classList.remove('slide-in'), 300);
}

export function closeGenresModalFunc(genresModal) {
    genresModal.classList.add('slide-out');
    setTimeout(() => {
        genresModal.style.display = 'none';
        genresModal.classList.remove('slide-out');
    }, 300);
}
