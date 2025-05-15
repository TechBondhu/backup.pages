import { generatePDF } from './pdf.js';
import { initializeFirebase } from './api.js';

export function displayReview(reviewData, messagesDiv, welcomeMessage) {
    const reviewCard = document.createElement('div');
    reviewCard.classList.add('review-card');
    reviewCard.innerHTML = `
        <h3>রিভিউ ডেটা</h3>
        <div class="review-content"></div>
        <div class="review-actions">
            <button class="edit-review">এডিট</button>
            <button class="confirm-review">কনফার্ম</button>
            <button class="replace-image">ইমেজ রিপ্লেস</button>
        </div>
    `;
    const reviewContent = reviewCard.querySelector('.review-content');
    Object.keys(reviewData).forEach(key => {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${key}:</strong> <span class="review-value">${reviewData[key]}</span>`;
        reviewContent.appendChild(p);
    });
    messagesDiv.appendChild(reviewCard);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    if (welcomeMessage.style.display !== 'none') welcomeMessage.style.display = 'none';

    reviewCard.querySelector('.edit-review').addEventListener('click', () => {
        toggleEditMode(reviewCard, reviewData);
    });

    reviewCard.querySelector('.confirm-review').addEventListener('click', () => {
        const db = initializeFirebase();
        db.collection('reviews').add(reviewData)
            .then(() => {
                generatePDF(reviewData);
                reviewCard.remove();
            })
            .catch(error => {
                console.error('Firebase Save Error:', error);
            });
    });

    reviewCard.querySelector('.replace-image').addEventListener('click', () => {
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    });
}

export function toggleEditMode(reviewCard, reviewData) {
    const reviewContent = reviewCard.querySelector('.review-content');
    const isEditing = reviewContent.classList.contains('editing');
    if (!isEditing) {
        reviewContent.classList.add('editing');
        reviewContent.innerHTML = '';
        Object.keys(reviewData).forEach(key => {
            const div = document.createElement('div');
            div.innerHTML = `
                <label>${key}:</label>
                <input type="text" value="${reviewData[key]}" data-key="${key}">
            `;
            reviewContent.appendChild(div);
        });
        reviewCard.querySelector('.edit-review').innerText = 'সেভ';
    } else {
        const inputs = reviewContent.querySelectorAll('input');
        inputs.forEach(input => {
            reviewData[input.dataset.key] = input.value;
        });
        reviewContent.classList.remove('editing');
        reviewContent.innerHTML = '';
        Object.keys(reviewData).forEach(key => {
            const p = document.createElement('p');
            p.innerHTML = `<strong>${key}:</strong> <span class="review-value">${reviewData[key]}</span>`;
            reviewContent.appendChild(p);
        });
        reviewCard.querySelector('.edit-review').innerText = 'এডিট';
    }
}