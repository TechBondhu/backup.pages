// profile.js
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

// Initialize Firebase
const auth = getAuth();
const db = getFirestore();

// Utility to display messages
function displayMessage(message, type = 'error') {
    const messageElement = document.createElement('div');
    messageElement.className = `${type}-message`;
    messageElement.textContent = message;
    document.querySelector('.profile-form').prepend(messageElement);
    setTimeout(() => messageElement.remove(), 3000);
}

// Autofill profile form
async function autofillProfile(uid) {
    try {
        const userDocRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            const userData = userDoc.data();
            document.getElementById('name').value = userData.displayName || '';
            document.getElementById('email').value = userData.email || '';
            document.getElementById('phone').value = userData.phone || '';
            document.getElementById('address').value = userData.address || '';
            document.getElementById('uid').value = uid;
            document.getElementById('profilePicture').value = userData.profilePicture || '';
        } else {
            displayMessage('কোনো প্রোফাইল ডেটা পাওয়া যায়নি।', 'error');
        }
    } catch (error) {
        displayMessage(`প্রোফাইল লোড করতে সমস্যা: ${error.message}`, 'error');
    }
}

// Handle profile form submission
document.getElementById('profileForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'সংরক্ষণ হচ্ছে...';

    const uid = document.getElementById('uid').value;
    const profileData = {
        displayName: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        profilePicture: document.getElementById('profilePicture').value,
    };

    try {
        await setDoc(doc(db, 'users', uid), profileData, { merge: true });
        displayMessage('প্রোফাইল সফলভাবে সংরক্ষিত হয়েছে।', 'success');
    } catch (error) {
        displayMessage(`প্রোফাইল সংরক্ষণে সমস্যা: ${error.message}`, 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'সংরক্ষণ করুন';
    }
});

// Check auth state and load profile
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('uid').value = user.uid;
        autofillProfile(user.uid);
    } else {
        window.location.href = 'login.html';
    }
});
