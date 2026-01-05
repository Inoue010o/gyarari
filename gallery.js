// Photo Gallery Data organized by category
const galleryData = {
  park: [
    { src: 'images/KIMG_0627.jpg', title: '公園の風景' },
    { src: 'images/KIMG_0799.jpeg', title: '緑豊かな公園' },
    { src: 'images/KIMG_0588.jpg', title: '自然の中の散策路' },
    { src: 'images/KIMG_0967.jpeg', title: '公園のアクティビティ' },
    { src: 'images/BIMG_0597.jpg', title: '公園の四季' },
    { src: 'images/BIMG_0598.jpg', title: '遊び場' },
    { src: 'images/KIMG_0589.jpg', title: '公園の景色' },
    { src: 'images/KIMG_0590.jpg', title: '自然環境' },
    { src: 'images/KIMG_0591.jpg', title: '自然風景' },
    { src: 'images/KIMG_0593.jpg', title: '景観' },
  ],
  building: [
    { src: 'images/RIMG_0499.jpg', title: '市の施設' },
    { src: 'images/RIMG_0502.jpg', title: '公共建築' },
    { src: 'images/RIMG_0506.jpg', title: '文化施設' },
    { src: 'images/RIMG_0510.jpg', title: 'スポーツ施設' },
    { src: 'images/RIMG_0780.jpeg', title: '商業施設' },
    { src: 'images/RIMG_0787.jpeg', title: 'ショッピングエリア' },
    { src: 'images/IMG_0773.jpeg', title: '市街地の建物' },
    { src: 'images/BIMG_0599.jpg', title: '駅前施設' },
    { src: 'images/BIMG_0601.jpg', title: '街の光景' },
    { src: 'images/BIMG_0602.jpg', title: '都市風景' },
  ],
  food: [
    { src: 'images/IMG_0497.jpeg', title: 'グルメスポット' },
    { src: 'images/IMG_0501.jpeg', title: 'レストラン' },
    { src: 'images/IMG_0503.jpeg', title: 'カフェ' },
    { src: 'images/IMG_0504.jpeg', title: '地元の料理' },
    { src: 'images/IMG_0507.jpeg', title: '食事処' },
    { src: 'images/IMG_0509.jpeg', title: 'フードコート' },
    { src: 'images/うどん.jpg', title: 'うどん' },
  ],
  history: [
    { src: 'images/asahiKIMG_0638.jpeg', title: '旭神社' },
    { src: 'images/asahiKIMG_0640.jpeg', title: '歴史的建造物' },
    { src: 'images/asahiKIMG_0643.jpeg', title: '神社境内' },
    { src: 'images/ochouzuKIMG_0724のコピー.jpg', title: '手水舎' },
    { src: 'images/ochouzuKIMG_0725のコピー.jpg', title: '伝統文化' },
    { src: 'images/ochouzuKIMG_0729.jpg', title: '歴史遺産' },
    { src: 'images/ochouzuKIMG_0730のコピー.jpg', title: '文化財' },
    { src: 'images/GIMG_2017.jpeg', title: '祭りの様子' },
  ]
};

// Initialize galleries on page load
document.addEventListener('DOMContentLoaded', () => {
  loadGalleries();
  // Animation is now handled by Swiper or initial CSS, but we can keep scroll trigger if needed for the section title
  // setupScrollAnimations(); // Removed as Swiper handles display differently
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

        // Add data attributes for lightbox
        slide.setAttribute('data-src', item.src);
        slide.setAttribute('data-title', item.title);

        slide.innerHTML = `
          <img src="${item.src}" alt="${item.title}" loading="lazy">
          <p>${item.title}</p>
        `;
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
        spaceBetween: 20,
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
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 30,
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

