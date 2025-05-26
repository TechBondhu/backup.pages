// জেনার টেক্সট প্রসেস করার ফাংশন
function processGenreText(genreName, isMobile) {
  if (!genreName) return '';
  
  if (isMobile) {
    // মোবাইলে প্রথম শব্দের প্রথম ৮ অক্ষর
    const firstWord = genreName.split(' ')[0];
    let charCount = 0;
    let result = '';
    
    // বাংলা অক্ষর গণনা (ইউনিকোড)
    for (let char of firstWord) {
      charCount++;
      if (charCount <= 8) {
        result += char;
      } else {
        break;
      }
    }
    return result;
  } else {
    // ডেস্কটপে প্রথম দুই শব্দ
    const words = genreName.split(' ').slice(0, 2);
    return words.join(' ');
  }
}

// ডিভাইস চেক করার ফাংশন
function isMobileDevice() {
  return window.innerWidth <= 768;
}

function updateDynamicHeader(genreName) {
  const dynamicText = document.getElementById('dynamicHeaderText');
  const mobileGenreBox = document.getElementById('mobileGenreBox');
  const headerBrand = document.querySelector('.header-brand');
  const isMobile = isMobileDevice();

  if (dynamicText && mobileGenreBox && headerBrand) {
    const processedText = processGenreText(genreName, isMobile);
    
    if (isMobile) {
      // মোবাইলে
      dynamicText.textContent = '';
      dynamicText.classList.remove('active');
      headerBrand.classList.remove('active');
      mobileGenreBox.textContent = processedText || '';
      mobileGenreBox.classList.toggle('active', !!processedText);
    } else {
      // ডেস্কটপে
      mobileGenreBox.textContent = '';
      mobileGenreBox.classList.remove('active');
      dynamicText.textContent = processedText || '';
      dynamicText.classList.toggle('active', !!processedText);
      headerBrand.classList.toggle('active', !!processedText);
    }

    // সেশন স্টোরেজে সেভ
    if (genreName) {
      sessionStorage.setItem('selectedGenre', genreName);
    } else {
      sessionStorage.removeItem('selectedGenre');
    }
  }
}

// পেজ লোডে সেভ করা জেনার লোড
document.addEventListener('DOMContentLoaded', () => {
  const savedGenre = sessionStorage.getItem('selectedGenre');
  if (savedGenre) {
    updateDynamicHeader(savedGenre);
  }
});

// Welcome buttons থেকে জেনার সিলেক্ট
document.querySelectorAll('.welcome-messages button').forEach(button => {
  button.addEventListener('click', () => {
    const genreName = button.getAttribute('data-genre') || button.textContent.trim();
    updateDynamicHeader(genreName);
  });
});

// Genres modal থেকে জেনার সিলেক্ট
document.querySelector('.genres-list').addEventListener('click', (e) => {
  const genreItem = e.target.closest('.genre-item');
  if (genreItem) {
    const genreName = genreItem.querySelector('span').textContent.trim();
    updateDynamicHeader(genreName);
    document.getElementById('genresModal').style.display = 'none';
  }
});

// নতুন চ্যাট বা হোমে রিসেট
document.getElementById('newChatBtn').addEventListener('click', () => {
  updateDynamicHeader('');
});

document.querySelector('.home-icon').addEventListener('click', () => {
  updateDynamicHeader('');
});

// উইন্ডো রিসাইজে আপডেট
window.addEventListener('resize', () => {
  const savedGenre = sessionStorage.getItem('selectedGenre');
  if (savedGenre) {
    updateDynamicHeader(savedGenre);
  }
});
