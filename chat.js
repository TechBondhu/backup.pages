function callRasaAPI(message, metadata = {}) {
    const loadingDiv = displayLoading();
    const payload = { sender: 'user', message: message };
    if (Object.keys(metadata).length > 0) {
        payload.metadata = metadata;
    }
    $.ajax({
        url: 'http://localhost:5005/webhooks/rest/webhook',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: (data) => {
            removeLoading(loadingDiv);
            data.forEach(response => {
                if (response.text && !response.text.toLowerCase().includes('hi')) {
                    displayMessage(response.text, 'bot');
                }
                if (response.custom && response.custom.review_data) {
                    displayReview(response.custom.review_data);
                }
                if (response.buttons) {
                    const buttonDiv = document.createElement('div');
                    buttonDiv.classList.add('welcome-buttons');
                    response.buttons.forEach(btn => {
                        const button = document.createElement('button');
                        button.innerText = btn.title;
                        button.addEventListener('click', () => sendMessage(btn.payload));
                        buttonDiv.appendChild(button);
                    });
                    document.getElementById('messages').appendChild(buttonDiv);
                }
            });
        },
        error: (error) => {
            removeLoading(loadingDiv);
            displayMessage('বটের সাথে সংযোগে ত্রুটি হয়েছে। আবার চেষ্টা করুন।', 'bot');
            console.error('Rasa API Error:', error);
        }
    });
}

function displayLoading() {
    const messagesDiv = document.getElementById('messages');
    const loadingDiv = document.createElement('div');
    loadingDiv.classList.add('loading');
    loadingDiv.innerHTML = 'Loading <span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    messagesDiv.appendChild(loadingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    return loadingDiv;
}

function removeLoading(loadingDiv) {
    if (loadingDiv) loadingDiv.remove();
}