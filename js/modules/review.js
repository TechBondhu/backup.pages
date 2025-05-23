import { sanitizeMessage } from './utilities.js';
import { displayMessage } from './messaging.js';
import { generatePDF } from './pdf.js';
import { elements } from './dom.js';
import { getDb } from './api.js';

export function displayReview(reviewData) {
    if (!elements.messagesDiv || !elements.welcomeMessage) return;
    const reviewCard = document.createElement('div');
    reviewCard.classList.add('review-card', 'slide-in');
    reviewCard.setAttribute('data-editable', 'true');
    reviewCard.setAttribute('data-id', Date.now());
    reviewCard.setAttribute('data-confirmed', 'false');
    reviewCard.innerHTML = '<h3>আপনার তথ্য রিভিউ</h3>';

    const reviewContent = document.createElement('div');
    reviewContent.classList.add('review-content');

    for (const [key, value] of Object.entries(reviewData)) {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');
        reviewItem.setAttribute('data-key', key);
        const label = document.createElement('label');
        label.innerText = key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ') + ':';
        reviewItem.appendChild(label);

        if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('data:image'))) {
            const img = document.createElement('img');
            img.src = value;
            reviewItem.appendChild(img);
        } else {
            const p = document.createElement('p');
            p.innerText = value;
            reviewItem.appendChild(p);
        }
        reviewContent.appendChild(reviewItem);
    }

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'review-buttons';

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn ripple-btn';
    editBtn.innerText = 'Edit';
    editBtn.addEventListener('click', () => toggleEditMode(reviewCard, reviewData));

    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'confirm-btn ripple-btn';
    confirmBtn.innerText = 'Confirm';
    confirmBtn.style.display = 'inline-block';
    let isProcessing = false;

    confirmBtn.addEventListener('click', async () => {
        if (isProcessing) return;
        isProcessing = true;
        confirmBtn.disabled = true;

        try {
            const updatedData = {};
            reviewContent.querySelectorAll('.review-item').forEach(item => {
                const key = item.getAttribute('data-key');
                const value = item.querySelector('p')?.innerText || item.querySelector('img')?.src;
                if (value) updatedData[key] = value;
            });

            const db = getDb();
            await db.collection('submissions').add({
                review_data: updatedData,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                chat_id: sessionStorage.getItem('chatId')
            });

            displayMessage('আপনার তথ্য সফলভাবে ফায়ারবেসে পাঠানো হয়েছে!', 'bot');
            await generatePDF(updatedData, reviewCard);
            reviewCard.setAttribute('data-confirmed', 'true');
            reviewCard.setAttribute('data-editable', 'false');
            editBtn.disabled = true;
            editBtn.style.display = 'none';
            confirmBtn.style.display = 'none';

            buttonContainer.innerHTML = '';
            const downloadBtn = document.createElement('button');
            downloadBtn.className = 'download-btn ripple-btn';
            downloadBtn.innerText = 'Download PDF';
            downloadBtn.addEventListener('click', () => {
                const pdfUrl = reviewCard.getAttribute('data-pdf-url');
                if (pdfUrl) {
                    const link = document.createElement('a');
                    link.href = pdfUrl;
                    link.download = 'formbondhu_submission.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    displayMessage('পিডিএফ ডাউনলোডের জন্য URL পাওয়া যায়নি।', 'bot');
                }
            });
            buttonContainer.appendChild(downloadBtn);
        } catch (error) {
            displayMessage(`ফায়ারবেসে তথ্য পাঠাতে সমস্যা: ${error.message}`, 'bot');
            confirmBtn.disabled = false;
        } finally {
            isProcessing = false;
        }
    });

    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(confirmBtn);
    reviewCard.appendChild(reviewContent);
    reviewCard.appendChild(buttonContainer);
    elements.messagesDiv.appendChild(reviewCard);
    elements.messagesDiv.scrollTop = elements.messagesDiv.scrollHeight;

    if (elements.welcomeMessage.style.display !== 'none') {
        elements.welcomeMessage.classList.add('fade-out');
        setTimeout(() => {
            elements.welcomeMessage.style.display = 'none';
            elements.welcomeMessage.classList.remove('fade-out');
        }, 300);
    }
}

export function toggleEditMode(card, reviewData) {
    if (card.getAttribute('data-confirmed') === 'true') {
        displayMessage('ডেটা কনফার্ম হয়ে গেছে। এডিট করা যাবে না।', 'bot');
        return;
    }

    const isEditable = card.getAttribute('data-editable') === 'true';
    const reviewContent = card.querySelector('.review-content');
    const editBtn = card.querySelector('.edit-btn');
    const confirmBtn = card.querySelector('.confirm-btn');

    if (!isEditable) {
        card.setAttribute('data-editable', 'true');
        editBtn.innerText = 'Save';
        confirmBtn.style.display = 'none';

        reviewContent.querySelectorAll('.review-item').forEach(item => {
            const key = item.getAttribute('data-key');
            const value = item.querySelector('p')?.innerText || item.querySelector('img')?.src;
            item.innerHTML = `<label>${sanitizeMessage(key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '))}:</label>`;

            if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('data:image'))) {
                const img = document.createElement('img');
                img.src = value;
                item.appendChild(img);
                const replaceIcon = document.createElement('i');
                replaceIcon.className = 'fas fa-camera replace-image-icon';
                item.appendChild(replaceIcon);
                const replaceInput = document.createElement('input');
                replaceInput.type = 'file';
                replaceInput.className = 'replace-image-input';
                replaceInput.accept = 'image/png, image/jpeg';
                replaceInput.style.display = 'none';
                item.appendChild(replaceInput);

                replaceIcon.addEventListener('click', () => replaceInput.click());
                replaceInput.addEventListener('change', () => {
                    const file = replaceInput.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => img.src = e.target.result;
                        reader.onerror = () => displayMessage('ইমেজ লোড করতে সমস্যা হয়েছে।', 'bot');
                        reader.readAsDataURL(file);
                    }
                });
            } else {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = value || '';
                input.className = 'edit-input';
                item.appendChild(input);
            }
        });
    } else {
        const updatedData = { ...reviewData };
        reviewContent.querySelectorAll('.review-item').forEach(item => {
            const key = item.getAttribute('data-key');
            const input = item.querySelector('input.edit-input');
            const img = item.querySelector('img');
            if (input) {
                const newValue = input.value.trim();
                updatedData[key] = newValue;
                item.innerHTML = `<label>${sanitizeMessage(key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '))}:</label><p>${sanitizeMessage(newValue)}</p>`;
            } else if (img) {
                updatedData[key] = img.src;
                item.innerHTML = `<label>${sanitizeMessage(key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '))}:</label><img src="${img.src}">`;
            }
        });

        card.setAttribute('data-editable', 'false');
        editBtn.innerText = 'Edit';
        confirmBtn.style.display = 'inline-block';
    }
}