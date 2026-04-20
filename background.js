function generateStars(selector, qtd) {
    const container = document.querySelector('.background-container');
    const el = document.querySelector(selector);

    const width = container.clientWidth;
    const height = container.clientHeight;

    let shadows = [];

    for (let i = 0; i < qtd; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const opacity = Math.random();

        shadows.push(`${x}px ${y}px rgba(255,255,255,${opacity})`);
    }

    el.style.boxShadow = shadows.join(',');
}

window.addEventListener('load', () => {
    generateStars('.layer1', 150);
    generateStars('.layer2', 100);
    generateStars('.layer3', 70);
});
