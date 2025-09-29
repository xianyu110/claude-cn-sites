// ==================== Translations ====================
const translations = {
    zh: {
        'theme': '主题',
        'language': '语言',
        'hero-title': 'Claude 4.5 国内使用指南',
        'hero-subtitle': '为国内用户提供最全面、最便捷的 Claude 4.5 访问方案',
        'badge-reliable': '稳定可靠',
        'badge-transparent': '价格透明',
        'badge-secure': '安全保障'
    },
    en: {
        'theme': 'Theme',
        'language': 'Language',
        'hero-title': 'Claude 4.5 Access Guide for China',
        'hero-subtitle': 'The most comprehensive and convenient Claude 4.5 access solutions for users in China',
        'badge-reliable': 'Reliable',
        'badge-transparent': 'Transparent Pricing',
        'badge-secure': 'Secure'
    }
};

// ==================== Theme Toggle ====================
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';

    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// ==================== Language Toggle ====================
function initLanguage() {
    const langToggle = document.getElementById('lang-toggle');
    const savedLang = localStorage.getItem('language') || 'zh';

    updateLanguage(savedLang);

    langToggle.addEventListener('click', () => {
        const currentLang = localStorage.getItem('language') || 'zh';
        const newLang = currentLang === 'zh' ? 'en' : 'zh';

        localStorage.setItem('language', newLang);
        updateLanguage(newLang);
    });
}

function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
}

// ==================== Page Initialization ====================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme and language
    initTheme();
    initLanguage();
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all main content elements
    const elementsToAnimate = document.querySelectorAll('h2, h4, table, ul, img, p');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Add smooth scrolling to links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add external link indicators
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});