const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuOverlay = document.getElementById('menu-overlay');
const mobileMenuLinks = document.querySelectorAll('[data-close-menu]');

let menuOpen = false;

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((element) => {
    revealObserver.observe(element);
});

function updateActiveNavLink() {
    let currentSectionId = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;

        if (window.scrollY >= sectionTop) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
    });
}

function syncNavbarState() {
    navbar.classList.toggle('nav-scrolled', window.scrollY > 10);
    updateActiveNavLink();
}

function setMobileMenuState(isOpen) {
    menuOpen = isOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    menuOverlay.classList.toggle('hidden', !menuOpen);
    navbar.classList.toggle('menu-open', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
}

if (menuToggle && mobileMenu && menuOverlay && navbar) {
    menuToggle.addEventListener('click', () => {
        setMobileMenuState(!menuOpen);
    });

    menuOverlay.addEventListener('click', () => {
        setMobileMenuState(false);
    });

    mobileMenuLinks.forEach((link) => {
        link.addEventListener('click', () => {
            setMobileMenuState(false);
        });
    });
}

window.addEventListener('scroll', syncNavbarState);
syncNavbarState();