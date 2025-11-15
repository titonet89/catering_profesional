// ═══════════════════════════════════════════════════════════════════════════════
// CARRUSEL DE FOTOS - CATERING PROFESIONAL
// ═══════════════════════════════════════════════════════════════════════════════

let currentIndex = 0;
let carruselItems = [];

document.addEventListener('DOMContentLoaded', function() {
    inicializarCarrusel();
    cargarGaleriaCarrusel();
});

// ═══════════════════════════════════════════════════════════════════════════════
// INICIALIZAR CARRUSEL
// ═══════════════════════════════════════════════════════════════════════════════

function inicializarCarrusel() {
    const prevBtn = document.getElementById('carrusel-prev');
    const nextBtn = document.getElementById('carrusel-next');

    if (prevBtn) prevBtn.addEventListener('click', () => mostrarAnterior());
    if (nextBtn) nextBtn.addEventListener('click', () => mostrarSiguiente());

    // Auto-scroll cada 5 segundos
    setInterval(() => {
        if (carruselItems.length > 0 && document.hidden === false) {
            mostrarSiguiente();
        }
    }, 5000);
}

// ═══════════════════════════════════════════════════════════════════════════════
// CARGAR GALERÍA PARA EL CARRUSEL
// ═══════════════════════════════════════════════════════════════════════════════

async function cargarGaleriaCarrusel() {
    try {
        const response = await fetch('/api/galeria?filtro=bodas&limit=6');
        carruselItems = await response.json();

        if (carruselItems.length === 0) {
            cargarCarruselPorDefecto();
            return;
        }

        renderizarCarrusel();
        actualizarDots();
    } catch (error) {
        console.error('❌ Error al cargar galería:', error);
        cargarCarruselPorDefecto();
    }
}

function cargarCarruselPorDefecto() {
    carruselItems = [
        { id: 1, titulo: 'Boda Elegante', url: '/images/placeholder.jpg', categoria: 'bodas', tipo: 'foto' },
        { id: 2, titulo: 'Ceremonia Especial', url: '/images/placeholder.jpg', categoria: 'bodas', tipo: 'foto' },
        { id: 3, titulo: 'Fiesta de Casamiento', url: '/images/placeholder.jpg', categoria: 'bodas', tipo: 'foto' }
    ];
    renderizarCarrusel();
    actualizarDots();
}

// ═══════════════════════════════════════════════════════════════════════════════
// RENDERIZAR CARRUSEL
// ═══════════════════════════════════════════════════════════════════════════════

function renderizarCarrusel() {
    const itemsContainer = document.getElementById('carrusel-items');
    if (!itemsContainer) return;

    itemsContainer.innerHTML = carruselItems.map((item, index) => `
        <div class="carrusel-item ${index === 0 ? 'active' : ''}">
            ${item.tipo === 'video'
                ? `<video src="${item.url}" controls style="width: 100%; height: 100%; object-fit: cover;"></video>`
                : `<img src="${item.url}" alt="${item.titulo}" onerror="this.src='/images/placeholder.jpg'">`
            }
        </div>
    `).join('');

    // Aplicar transformación al contenedor
    const itemsElement = document.getElementById('carrusel-items');
    if (itemsElement) {
        itemsElement.style.transform = `translateX(${-currentIndex * 100}%)`;
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// NAVEGACIÓN DEL CARRUSEL
// ═══════════════════════════════════════════════════════════════════════════════

function mostrarSiguiente() {
    if (carruselItems.length === 0) return;
    currentIndex = (currentIndex + 1) % carruselItems.length;
    actualizarCarrusel();
}

function mostrarAnterior() {
    if (carruselItems.length === 0) return;
    currentIndex = (currentIndex - 1 + carruselItems.length) % carruselItems.length;
    actualizarCarrusel();
}

function mostrarItem(index) {
    if (index >= 0 && index < carruselItems.length) {
        currentIndex = index;
        actualizarCarrusel();
    }
}

function actualizarCarrusel() {
    const itemsElement = document.getElementById('carrusel-items');
    if (itemsElement) {
        itemsElement.style.transform = `translateX(${-currentIndex * 100}%)`;
    }
    actualizarDots();
}

// ═══════════════════════════════════════════════════════════════════════════════
// ACTUALIZAR DOTS
// ═══════════════════════════════════════════════════════════════════════════════

function actualizarDots() {
    const dotsContainer = document.getElementById('carrusel-dots');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = carruselItems.map((_, index) => `
        <div class="carrusel-dot ${index === currentIndex ? 'active' : ''}" onclick="mostrarItem(${index})"></div>
    `).join('');
}

// ═══════════════════════════════════════════════════════════════════════════════
// SOPORTE PARA TECLADO
// ═══════════════════════════════════════════════════════════════════════════════

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        mostrarAnterior();
    } else if (event.key === 'ArrowRight') {
        mostrarSiguiente();
    }
});
