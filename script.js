document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Update copyright year in the footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Check if system prefers dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Apply a theme to the page (does NOT persist)
    const applyTheme = (theme) => {
        body.classList.toggle('dark-mode', theme === 'dark');
    };

    // Explicit user choice: apply and persist
    const setTheme = (theme) => {
        applyTheme(theme);
        localStorage.setItem('theme', theme);
    };

    // Follow the system preference
    const applySystemTheme = () => {
        applyTheme(prefersDark.matches ? 'dark' : 'light');
    };

    // Initialize theme: honor an explicit user choice, otherwise follow the system
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applySystemTheme();
    }

    // Listen for system theme changes (only when the user hasn't made an explicit choice)
    prefersDark.addEventListener('change', () => {
        if (!localStorage.getItem('theme')) {
            applySystemTheme();
        }
    });

    // Toggle theme manually (this is an explicit choice, so persist it)
    themeToggle.addEventListener('click', () => {
        const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        setTheme(newTheme);
    });
});
