import { elements } from './dom.js';

export function setupNavigation() {
    if (elements.homeIcon) {
        elements.homeIcon.addEventListener('click', () => window.location.href = 'index.html');
    }
    if (elements.settingsIcon) {
        elements.settingsIcon.addEventListener('click', () => window.location.href = 'settings.html');
    }
    if (elements.accountIcon) {
        elements.accountIcon.addEventListener('click', () => window.location.href = 'account.html');
    }
}