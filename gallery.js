// Photo Gallery Data organized by category
const galleryData = {
  park: [
    { src: 'images/KIMG_0976.jpeg', title: '市民の森' },
    { src: 'images/KIMG_0805.jpeg', title: '都市公園' },
    { src: 'images/KIMG_0806.jpeg', title: '芝生広場' },
    { src: 'images/KIMG_0965.jpeg', title: '河内ダム' },
    { src: 'images/KIMG_0971.jpeg', title: '展望台' },
    { src: 'images/ochouzuKIMG_0725のコピー.jpg', title: '御手洗の滝' },
  ],
  building: [
    { src: 'images/RIMG_0499.jpg', title: '陸上競技場' },
    { src: 'images/RIMG_0502.jpg', title: '文化会館' },
    { src: 'images/RIMG_0790.jpeg', title: 'くすり博物館' },
    { src: 'images/RIMG_0510.jpg', title: '市民球場' },
    { src: 'images/RIMG_0616.jpg', title: '新鳥栖駅' },
    { src: 'images/RIMG_0506.jpg', title: '市民体育館' },
    { src: 'images/RIMG_0578.jpg', title: 'スタジアム' },
    { src: 'images/RIMG_0523.jpg', title: '鳥栖駅' },
    { src: 'images/RIMG_0526.jpg', title: 'サンメッセ鳥栖' },
    { src: 'images/RIMG_0553.jpg', title: '都市景観' },
    { src: 'images/i.jpg', title: 'アウトレット' },
  ],
  food: [
    { src: 'images/GIMG_2056.jpeg', title: 'ランプル台所' },
    { src: 'images/うどん.jpg', title: '中央軒' },
    { src: 'images/GIMG_2021.jpeg', title: '笑顔が見たいから' },
    { src: 'images/GIMG_2041 Copy 2.jpeg', title: 'フレンズ' },
    { src: 'images/GIMG_2018 3.jpeg', title: '牛船' },
    { src: 'images/GIMG_2064.jpg', title: '夢を語れ' },
    { src: 'images/GIMG_2052.jpeg', title: 'かつみや' },
    { src: 'images/GIMG_2040 Copy 2.jpeg', title: '道市場' },
    { src: 'images/GIMG_2045 2.jpeg', title: '天ぷら まき' },
  ],
  history: [
    { src: 'images/BIMG_0633.jpeg', title: '旭山公園' },
    { src: 'images/BIMG_0683.jpeg', title: '八幡神社' },
    { src: 'images/IMG_0994.jpeg', title: '香椎宮' },
    { src: 'images/BIMG_0812.jpeg', title: '慈光寺' },
    { src: 'images/BIMG_0605.jpg', title: '八坂神社' },
    { src: 'images/asahiKIMG_0638.jpeg', title: '朝日神社' },
    { src: 'images/BIMG_0601.jpg', title: '268号機関車' },
  ],
  other: [
    { src: 'images/RIMG_0584.jpg', title: 'サロンパスアリーナ' },
    { src: 'images/20200621_184008 2.jpg', title: '産業施設' },
  ]
};

// Initialize galleries on page load
document.addEventListener('DOMContentLoaded', () => {
  loadGalleries();
  setupLightbox();
});

// Load all galleries with Swiper structure
function loadGalleries() {
  Object.keys(galleryData).forEach(category => {
    const galleryElement = document.getElementById(`gallery-${category}`);
    if (galleryElement) {
      // Clear current content just in case
      galleryElement.innerHTML = '';

      // Add Swiper classes
      galleryElement.classList.add('swiper', `swiper-${category}`);

      // Override grid display from CSS
      galleryElement.style.display = 'block';

      // Create Wrapper
      const wrapper = document.createElement('div');
      wrapper.className = 'swiper-wrapper';

      galleryData[category].forEach(item => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide img-item'; // Reuse img-item for basic styling

        // Ensure item is visible immediately (override scroll animation opacity)
        slide.classList.add('show');
        slide.style.opacity = '1';
        slide.style.transform = 'translateY(0)';

        // Add data attributes for lightbox - initial value
        slide.setAttribute('data-src', item.src);
        slide.setAttribute('data-title', item.title);

        // Smart Image Loading logic
        const img = document.createElement('img');
        img.alt = item.title;
        img.loading = 'lazy';

        img.onerror = function () {
          // If the src includes 'images/' and fails, try without it (root directory)
          if (this.src.includes('/images/')) {
            const fileName = this.src.split('/images/').pop();
            this.onerror = null; // Prevent infinite loop
            this.src = fileName;
            // Update data-src for lightbox to ensure it opens the valid image
            slide.setAttribute('data-src', fileName);
          }
        };
        img.src = item.src;

        const p = document.createElement('p');
        p.textContent = item.title;

        slide.appendChild(img);
        slide.appendChild(p);
        wrapper.appendChild(slide);
      });

      galleryElement.appendChild(wrapper);

      // Add Navigation & Pagination
      const pagination = document.createElement('div');
      pagination.className = 'swiper-pagination';
      galleryElement.appendChild(pagination);

      const nextBtn = document.createElement('div');
      nextBtn.className = 'swiper-button-next';
      galleryElement.appendChild(nextBtn);

      const prevBtn = document.createElement('div');
      prevBtn.className = 'swiper-button-prev';
      galleryElement.appendChild(prevBtn);

      // Initialize Swiper
      new Swiper(`.swiper-${category}`, {
        slidesPerView: 1,
        spaceBetween: 15,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: pagination,
          clickable: true,
        },
        navigation: {
          nextEl: nextBtn,
          prevEl: prevBtn,
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 20,
          }
        }
      });
    }
  });
}

// Lightbox logic
function setupLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const captionText = document.getElementById('caption');
  const closeBtn = document.querySelector('.close');

  if (!lightbox) return;

  // Make caption editable
  captionText.setAttribute('contenteditable', 'true');
  captionText.style.cursor = 'text';
  captionText.title = 'クリックしてテキストを編集できます';

  // Prevent closing lightbox when clicking inside caption
  captionText.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Open lightbox on image click using event delegation for dynamically added items
  document.body.addEventListener('click', (e) => {
    const item = e.target.closest('.img-item');
    if (item && !e.target.closest('.swiper-button-next') && !e.target.closest('.swiper-button-prev')) {
      const src = item.getAttribute('data-src');
      const title = item.getAttribute('data-title');

      if (src) {
        lightbox.classList.add('active');
        lightboxImg.src = src;
        captionText.innerText = title;
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
      }
    }
  });

  // Close lightbox
  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
    // Clear src after transition to avoid flicker if re-opening (optional)
    setTimeout(() => {
      if (!lightbox.classList.contains('active')) lightboxImg.src = '';
    }, 300);
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  // Close on click outside image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

// Smooth scroll for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});
