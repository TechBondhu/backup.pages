import { genres, renderGenresList, openGenresModal, closeGenresModal } from './genres.js';
import { initializeChat } from './chat.js';
import { callRasaAPI } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const moreOptionsBtn = document.getElementById('moreOptionsBtn');
    const closeGenresModalBtn = document.getElementById('closeGenresModal');
    const modeBanner = document.getElementById('modeBanner');
    const bannerText = document.getElementById('bannerText');
    const bannerCloseBtn = document.querySelector('.banner-close-btn');
    const welcomeButtons = document.querySelectorAll('.welcome-buttons button[data-genre]');

    if (!moreOptionsBtn || !closeGenresModalBtn || !modeBanner || !bannerText || !bannerCloseBtn) {
        console.error('Required elements not found!');
        return;
    }

    const { displayMessage } = initializeChat();

    function updateGenreHeader(genreName) {
        bannerText.textContent = `${genreName} মোড অন`;
        modeBanner.style.display = 'block';
        setTimeout(() => {
            modeBanner.style.display = 'none';
        }, 5000);
    }

    function triggerIntent(intent) {
        console.log(`Triggering intent: ${intent}`);
        callRasaAPI(intent, { isIntent: true })
            .then(data => {
                data.forEach(response => {
                    if (response.text) {
                        displayMessage(response.text, 'bot');
                    }
                });
            })
            .catch(error => {
                displayMessage('ইনটেন্ট ট্রিগারে ত্রুটি। আবার চেষ্টা করুন।', 'bot');
                console.error('Intent Trigger Error:', error);
            });
    }

    renderGenresList(triggerIntent, updateGenreHeader);

    moreOptionsBtn.addEventListener('click', () => {
        console.log('More Options button clicked');
        openGenresModal();
    });

    closeGenresModalBtn.addEventListener('click', closeGenresModal);

    bannerCloseBtn.addEventListener('click', () => {
        modeBanner.style.display = 'none';
    });

    welcomeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const genreName = button.getAttribute('data-genre');
            const genre = genres.find(g => g.name === genreName);
            if (genre) {
                console.log(`Welcome button clicked: ${genre.name}`);
                updateGenreHeader(genre.name);
                triggerIntent(genre.intent);
            }
        });
    });
});
