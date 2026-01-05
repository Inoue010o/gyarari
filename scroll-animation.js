// スクロールアニメーション
document.addEventListener('DOMContentLoaded', function () {
    // アニメーション対象の要素を取得
    const animateElements = document.querySelectorAll('.card, .intro, .hero-text, .animate-text');

    // Intersection Observer の設定
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // 一度アニメーションしたら監視を解除
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 各要素を監視開始
    animateElements.forEach(element => {
        element.classList.add('animate-element');
        observer.observe(element);
    });
});
