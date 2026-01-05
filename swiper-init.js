// Swiper初期化
document.addEventListener('DOMContentLoaded', function() {
    // カード内のスライダーを初期化
    const cardSwipers = document.querySelectorAll('.cardSwiper');
    cardSwipers.forEach((element) => {
        new Swiper(element, {
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: element.querySelector('.swiper-pagination'),
                clickable: true,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            // クリックで次へ
            on: {
                click: function() {
                    this.slideNext();
                }
            }
        });
    });

    // メインのスポットスライダーを初期化
    const swiper = new Swiper('.spotsSwiper', {
        // スライド設定
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        // ナビゲーションボタン
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // レスポンシブ設定
        breakpoints: {
            600: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1025: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
        },
    });
});
