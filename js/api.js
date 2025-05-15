export function callRasaAPI(message, metadata = {}) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://localhost:5005/webhooks/rest/webhook',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ sender: 'user', message, metadata }),
            success: (data) => {
                if (!data || data.length === 0) {
                    reject(new Error('No response from Rasa'));
                } else {
                    resolve(data);
                }
            },
            error: (xhr, status, error) => {
                reject(new Error(`Rasa API Error: ${xhr.status} - ${error}`));
            }
        });
    });
}
