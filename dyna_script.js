function updateDynamicHeader(genreName) {
  const dynamicText = document.getElementById('dynamicHeaderText');
  if (dynamicText) {
    dynamicText.textContent = genreName || '';
    dynamicText.classList.toggle('active', !!genreName);
    // Save genre to session storage
    if (genreName) {
      sessionStorage.setItem('selectedGenre', genreName);
    } else {
      sessionStorage.removeItem('selectedGenre');
    }
  }
}

// Load saved genre from session storage on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedGenre = sessionStorage.getItem('selectedGenre');
  if (savedGenre) {
    updateDynamicHeader(savedGenre);
  }
});

// Update header when genre is selected from welcome buttons
document.querySelectorAll('.welcome-buttons button').forEach(button => {
  button.addEventListener('click', () => {
    const genreName = button.getAttribute('data-genre') || button.textContent.trim();
    updateDynamicHeader(genreName);
  });
});

// Update header when genre is selected from genres modal
document.querySelector('.genres-list').addEventListener('click', (e) => {
  const genreItem = e.target.closest('.genre-item');
  if (genreItem) {
    const genreName = genreItem.querySelector('span').textContent.trim();
    updateDynamicHeader(genreName);
    // Close genres modal
    document.getElementById('genresModal').style.display = 'none';
  }
});

// Reset header when starting a new chat or returning to home
document.getElementById('newChatIcon').addEventListener('click', () => {
  updateDynamicHeader('');
});

document.querySelector('.home-icon').addEventListener('click', () => {
  updateDynamicHeader('');
});
