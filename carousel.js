// カード画像のカルーセル機能
document.addEventListener('DOMContentLoaded', function() {
    const cardContainers = document.querySelectorAll('.card-image-container');
    
    cardContainers.forEach(container => {
        const images = container.querySelectorAll('img');
        let currentIndex = 0;
        
        // 3秒ごとに画像を切り替え
        setInterval(() => {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }, 3000);
    });
});
