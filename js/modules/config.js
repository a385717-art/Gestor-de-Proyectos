function applyTheme(theme) {
    const body = document.body;
    body.classList.toggle('dark', theme === 'dark');
}

function initThemeToggle(button, currentTheme, callback) {
    function updateText(theme) {
        button.textContent = theme === 'dark' ? 'Modo claro' : 'Modo oscuro';
    }
    updateText(currentTheme);
    button.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
        updateText(nextTheme);
        callback(nextTheme);
    });
}

export { applyTheme, initThemeToggle };
