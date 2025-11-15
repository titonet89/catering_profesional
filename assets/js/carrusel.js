// ═══════════════════════════════════════════════════════════════════════════════
// SCRIPT DEL CARRUSEL DE FOTOS
// ═══════════════════════════════════════════════════════════════════════════════

let currentSlide = 0;
let slides = [];

document.addEventListener('DOMContentLoaded', function() {
    cargarCarrusel();
    inicializarCarrusel();
});

// ═══════════════════════════════════════════════════════════════════════════════
// Cargar fotos del carrusel desde la API
// ═══════════════════════════════════════════════════════════════════════════════

async function cargarCarrusel() {
    try {
        const response = await fetch('/api/galeria?filtro=bodas&limit=6');
        const galeriaItems = await response.json();

        if (!Array.isArray(galeriaItems) || galeriaItems.length === 0) {
            cargarCarruselPorDefecto();
            return;
        }

        slides = galeriaItems;
        renderizarCarrusel();
    } catch (error) {
        console.error('Error al cargar carrusel:', error);
        cargarCarruselPorDefecto();
    }
}

function cargarCarruselPorDefecto() {
    // Fotos de ejemplo por defecto
    slides = [
        { url: '/images/bodas1.jpg', titulo: 'Boda Elegante' },
        { url: '/images/bodas2.jpg', titulo: 'Ceremonia Especial' },
        { url: '/images/bodas3.jpg', titulo: 'Fiesta de Casamiento' },
        { url: '/images/bodas4.jpg', titulo: 'Momentos Inolvidables' },
        { url: '/images/bodas5.jpg', titulo: 'Detalles Perfectos' },
        { url: '/images/bodas6.jpg', titulo: 'Celebración del Amor' }
    ];

    renderizarCarrusel();
}

// ═══════════════════════════════════════════════════════════════════════════════
// Renderizar el carrusel
// ═══════════════════════════════════════════════════════════════════════════════

function renderizarCarrusel() {
    const container = document.getElementById('carrusel-items');
    const dotsContainer = document.getElementById('carrusel-dots');

    if (!container || !dotsContainer) return;

    // Limpiar contenido anterior
    container.innerHTML = '';
    dotsContainer.innerHTML = '';

    // Crear slides
    slides.forEach((slide, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'carrusel-item' + (index === 0 ? ' active' : '');

        const img = document.createElement('img');
        img.src = slide.url || '/images/bodas-placeholder.jpg';
        img.alt = slide.titulo || `Foto ${index + 1}`;
        img.onerror = function() {
            this.src = '/images/bodas-placeholder.jpg';
        };

        slideDiv.appendChild(img);
        container.appendChild(slideDiv);

        // Crear dot
        const dot = document.createElement('span');
        dot.className = 'carrusel-dot' + (index === 0 ? ' active' : '');
        dot.addEventListener('click', function() {
            mostrarSlide(index);
        });
        dotsContainer.appendChild(dot);
    });

    actualizarCarrusel();
}

// ═══════════════════════════════════════════════════════════════════════════════
// Inicializar eventos del carrusel
// ═══════════════════════════════════════════════════════════════════════════════

function inicializarCarrusel() {
    const prevBtn = document.getElementById('carrusel-prev');
    const nextBtn = document.getElementById('carrusel-next');

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            diapositivaAnterior();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            diapositivaSiguiente();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') diapositivaAnterior();
        if (e.key === 'ArrowRight') diapositivaSiguiente();
    });

    // Auto-play cada 5 segundos
    setInterval(diapositivaSiguiente, 5000);
}

// ═══════════════════════════════════════════════════════════════════════════════
// Funciones de navegación
// ═══════════════════════════════════════════════════════════════════════════════

function diapositivaSiguiente() {
    currentSlide = (currentSlide + 1) % slides.length;
    actualizarCarrusel();
}

function diapositivaAnterior() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    actualizarCarrusel();
}

function mostrarSlide(index) {
    currentSlide = index;
    actualizarCarrusel();
}

function actualizarCarrusel() {
    const items = document.querySelectorAll('.carrusel-item');
    const dots = document.querySelectorAll('.carrusel-dot');

    // Actualizar slides
    items.forEach((item, index) => {
        if (index === currentSlide) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Actualizar dots
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    // Mover el contenedor
    const container = document.getElementById('carrusel-items');
    if (container) {
        container.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Controles táctiles para móviles
// ═══════════════════════════════════════════════════════════════════════════════

let touchStartX = 0;
let touchEndX = 0;

const wrapper = document.querySelector('.carrusel-wrapper');
if (wrapper) {
    wrapper.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    wrapper.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
}

function handleSwipe() {
    const swipeThreshold = 50; // Mínimo de píxeles para considerar un swipe

    if (touchStartX - touchEndX > swipeThreshold) {
        // Swipe hacia la izquierda - siguiente slide
        diapositivaSiguiente();
    }

    if (touchEndX - touchStartX > swipeThreshold) {
        // Swipe hacia la derecha - slide anterior
        diapositivaAnterior();
    }
}
