/* ==================== GLOBAL DOM CONTENT LOADED ==================== */
document.addEventListener('DOMContentLoaded', () => {

    /* -------------------- RESPONSIVE MENU -------------------- */
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
            navToggle.classList.toggle('active'); // Activa la animación del ícono
        });
    }

    // Cierra el menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            navToggle.classList.remove('active'); // Desactiva la animación del ícono
        });
    });

    /* -------------------- SERVICES MODAL -------------------- */
    const openModalBtn = document.getElementById('open-services-modal');
    const closeModalBtn = document.getElementById('close-services-modal');
    const servicesModal = document.getElementById('services-modal-container');

    if (openModalBtn) {
        openModalBtn.addEventListener('click', () => {
            servicesModal.classList.add('show-modal');
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            servicesModal.classList.remove('show-modal');
        });
    }

    // Cierra el modal al hacer clic fuera del contenido
    if (servicesModal) {
        servicesModal.addEventListener('click', (e) => {
            if (e.target === servicesModal) {
                servicesModal.classList.remove('show-modal');
            }
        });
    }
    
    /* -------------------- IMAGE CAROUSELS -------------------- */
    const initializeCarousel = (carouselId) => {
        const container = document.getElementById(carouselId);
        if (!container) return;

        const slide = container.querySelector('.carousel-slide');
        const images = container.querySelectorAll('.carousel-slide img');
        const prevBtn = container.querySelector('.prev');
        const nextBtn = container.querySelector('.next');
        const dotsContainer = container.querySelector('.carousel-dots');
        let currentIndex = 0;
        const totalImages = images.length;

        if (totalImages <= 1) {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            if (dotsContainer) dotsContainer.style.display = 'none';
            return;
        }

        // Crear los puntos de navegación
        for (let i = 0; i < totalImages; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        const dots = dotsContainer.querySelectorAll('.dot');

        const updateCarousel = () => {
            slide.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, index) => dot.classList.toggle('active', index === currentIndex));
        };

        const goToSlide = (index) => {
            currentIndex = index;
            updateCarousel();
        };

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalImages;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateCarousel();
        });

        updateCarousel(); // Iniciar carrusel
    };

    // Inicializar todos los carruseles que existan
    initializeCarousel('carousel1');
    initializeCarousel('carousel2');
    initializeCarousel('carousel3'); 
    initializeCarousel('carousel4');

    /* ==================== DARK/LIGHT THEME ==================== */
    const themeButton = document.getElementById('theme-toggle');
    const darkTheme = 'dark-theme';
    const body = document.body;

    // Revisa si el usuario ya eligió un tema
    const selectedTheme = localStorage.getItem('selected-theme');

    // Obtiene el tema actual de la interfaz validando la clase dark-theme
    const getCurrentTheme = () => body.classList.contains(darkTheme) ? 'dark' : 'light';

    // Valida si el usuario eligió previamente un tema
    if (selectedTheme) {
        // Si la validación se cumple, preguntamos cuál fue el tema para saber si activamos o desactivamos el modo oscuro
        if (selectedTheme === 'dark') {
            body.classList.add(darkTheme);
        }
    }

    // Activa / desactiva el tema manualmente con el botón
    themeButton.addEventListener('click', () => {
        // Agrega o remueve la clase del tema oscuro
        body.classList.toggle(darkTheme);
        // Guarda el tema actual que eligió el usuario en el almacenamiento local
        localStorage.setItem('selected-theme', getCurrentTheme());
    });
});

/* ==================== HEADER SCROLL EFFECT ==================== */
function scrollHeader() {
    const header = document.getElementById('header');
    if (window.scrollY >= 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}
window.addEventListener('scroll', scrollHeader);