
document.addEventListener('DOMContentLoaded', () => {
    const omikujiBtn = document.getElementById('omikuji-btn');
    const omikujiResult = document.getElementById('omikuji-result');
    const resultText = document.getElementById('omikuji-text');
    const resultDesc = document.getElementById('omikuji-desc');

    if (!omikujiBtn) return;

    const fortunes = [
        { type: '大吉', desc: '最高の運勢です！鳥栖の自然でさらにパワーチャージしましょう。' },
        { type: '中吉', desc: '良いことがありそう。美味しいグルメ巡りが吉です。' },
        { type: '小吉', desc: 'ささやかな幸せが訪れます。公園でリラックスするのがおすすめ。' },
        { type: '吉', desc: '平穏な一日。歴史散策で知識を深めてみては。' },
        { type: '末吉', desc: 'これから運気が上がります。新しい発見があるかも。' },
        { type: '凶', desc: '慎重に行動しましょう。温泉でリフレッシュして運気改善！' }
    ];

    omikujiBtn.addEventListener('click', () => {
        // Simple animation effect
        omikujiResult.classList.remove('show');
        omikujiBtn.disabled = true;
        omikujiBtn.innerText = '占っています...';

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * fortunes.length);
            const fortune = fortunes[randomIndex];

            resultText.innerText = fortune.type;
            resultDesc.innerText = fortune.desc;

            omikujiResult.classList.add('show');
            omikujiBtn.innerText = 'もう一度引く';
            omikujiBtn.disabled = false;
        }, 800);
    });
});
