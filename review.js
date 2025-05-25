```javascript
// Display Review
function displayReview(reviewData, messagesDiv, welcomeMessage, db, currentChatId, generatePDF, displayMessage, sanitizeMessage) {
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
    editBtn.addEventListener('click', () => toggleEditMode(reviewCard, reviewData, displayMessage, sanitizeMessage));

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
                if (!value) {
                    console.warn(`কোনো মান পাওয়া যায়নি: ${key}`);
                }
                updatedData[key] = value;
            });

            await db.collection('submissions').add({
                review_data: updatedData,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                chat_id: currentChatId
            });

            displayMessage('আপনার তথ্য সফলভাবে ফায়ারবেজে পাঠানো হয়েছে!', 'bot');
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
            let errorMessage = 'অজানা ত্রুটি ঘটেছে।';
            if (error.code && error.message) {
                errorMessage = `ফায়ারবেজে তথ্য পাঠাতে সমস্যা: ${error.message}`;
            }
            displayMessage(errorMessage, 'bot');
            console.error('Error in confirm button:', error);
            confirmBtn.disabled = false;
        } finally {
            isProcessing = false;
        }
    });

    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(confirmBtn);

    reviewCard.appendChild(reviewContent);
    reviewCard.appendChild(buttonContainer);
    if (messagesDiv) {
        messagesDiv.appendChild(reviewCard);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
    if (welcomeMessage && welcomeMessage.style.display !== 'none') {
        welcomeMessage.classList.add('fade-out');
        setTimeout(() => {
            welcomeMessage.style.display = 'none';
            welcomeMessage.classList.remove('fade-out');
        }, 300);
    }
}

// Toggle Edit Mode
function toggleEditMode(card, reviewData, displayMessage, sanitizeMessage) {
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
                        reader.onload = (e) => {
                            img.src = e.target.result;
                        };
                        reader.onerror = () => {
                            displayMessage('ইমেজ লোড করতে সমস্যা হয়েছে।', 'bot');
                        };
                        reader.readAsDataURL(file);
                    } else {
                        displayMessage('কোনো ইমেজ সিলেক্ট করা হয়নি।', 'bot');
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

// Generate PDF
async function generatePDF(reviewData, reviewCard) {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    doc.setFont("helvetica");
    doc.setFontSize(16);
    doc.setFillColor(30, 58, 138);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text("Formbondhu Submission", 20, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30);
    doc.setDrawColor(30, 58, 138);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 277);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);

    let y = 50;
    for (const [key, value] of Object.entries(reviewData)) {
        const label = key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ');
        doc.setFont("helvetica", "bold");
        doc.text(`${label}:`, 20, y);
        doc.setFont("helvetica", "normal");

        if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('data:image'))) {
            try {
                const imgData = value;
                doc.addImage(imgData, 'JPEG', 20, y + 5, 80, 60, undefined, 'FAST');
                y += 70;
            } catch (error) {
                doc.text("Image could not be loaded", 20, y + 5);
                y += 10;
                console.error('PDF Image Error:', error);
            }
        } else {
            const lines = doc.splitTextToSize(value, 170);
            doc.text(lines, 20, y + 5);
            y += lines.length * 5 + 5;
        }
        y += 5;
    }

    doc.setFillColor(229, 231, 235);
    doc.rect(0, 277, 210, 20, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text("Generated by Formbondhu - www.formbondhu.com", 20, 287);
    doc.text("Page 1 of 1", 180, 287);

    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    reviewCard.setAttribute('data-pdf-url', pdfUrl);
}

// Export Functions
export { displayReview, toggleEditMode, generatePDF };
```