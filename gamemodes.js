const options = document.querySelectorAll('.options');

options.forEach(el => {
    el.addEventListener('click', () => {
        const selectedTheme = el.id;
        localStorage.setItem('themeChoice', selectedTheme);
        window.location.href = 'game.html';
    });
});
