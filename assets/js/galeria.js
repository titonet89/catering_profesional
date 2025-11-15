// ═══════════════════════════════════════════════════════════════════════════════
// SCRIPT DE LA GALERÍA CON FILTROS Y MODAL
// ═══════════════════════════════════════════════════════════════════════════════

let galeriaTodas = [];
let filtroActivo = 'todas';
let currentGaleriaIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    cargarGaleria();
    inicializarFiltros();
    inicializarModal();
});

// ═══════════════════════════════════════════════════════════════════════════════
// Cargar galería desde la API
// ═══════════════════════════════════════════════════════════════════════════════

async function cargarGaleria() {
    try {
        const response = await fetch('/api/galeria');
        const items = await response.json();

        if (!Array.isArray(items) || items.length === 0) {
            cargarGaleriaPorDefecto();
            return;
        }

        galeriaTodas = items;
        renderizarGaleria(galeriaTodas);
    } catch (error) {
        console.error('Error al cargar galería:', error);
        cargarGaleriaPorDefecto();
    }
}

function cargarGaleriaPorDefecto() {
    // Galería de ejemplo por defecto
    galeriaTodas = [
        { id: 1, url: '/images/bodas1.jpg', titulo: 'Boda 1', categoria: 'bodas', tipo: 'foto' },
        { id: 2, url: '/images/bodas2.jpg', titulo: 'Boda 2', categoria: 'bodas', tipo: 'foto' },
        { id: 3, url: '/images/bodas3.jpg', titulo: 'Boda 3', categoria: 'bodas', tipo: 'foto' },
        { id: 4, url: '/images/corporativo1.jpg', titulo: 'Evento Corporativo 1', categoria: 'corporativo', tipo: 'foto' },
        { id: 5, url: '/images/corporativo2.jpg', titulo: 'Evento Corporativo 2', categoria: 'corporativo', tipo: 'foto' },
        { id: 6, url: '/images/cumpleanos1.jpg', titulo: 'Cumpleaños 1', categoria: 'cumpleanos', tipo: 'foto' },
        { id: 7, url: '/images/cumpleanos2.jpg', titulo: 'Cumpleaños 2', categoria: 'cumpleanos', tipo: 'foto' },
        { id: 8, url: '/videos/muestra1.mp4', titulo: 'Video de Boda', categoria: 'bodas', tipo: 'video' }
    ];

    renderizarGaleria(galeriaTodas);
}

// ═══════════════════════════════════════════════════════════════════════════════
// Renderizar galería
// ═══════════════════════════════════════════════════════════════════════════════

function renderizarGaleria(items) {
    const grid = document.getElementById('galeria-grid');

    if (!grid) return;

    grid.innerHTML = items.map((item, index) => {
        const es_video = item.tipo === 'video' || item.url.endsWith('.mp4');
        const etiqueta = es_video ? 'video' : item.categoria;

        return `
            <div class="galeria-item ${es_video ? 'video' : ''}" data-index="${index}" data-categoria="${item.categoria}">
                ${es_video ?
                    `<video><source src="${item.url}" type="video/mp4"></video>` :
                    `<img src="${item.url}" alt="${item.titulo}" onerror="this.src='/images/placeholder-galeria.jpg'">`
                }
                <div class="galeria-overlay">
                    <span class="galeria-overlay-icon">${es_video ? '▶' : '🔍'}</span>
                </div>
                <div class="galeria-badge">${etiqueta}</div>
            </div>
        `;
    }).join('');

    // Agregar event listeners a todos los items
    document.querySelectorAll('.galeria-item').forEach((item, index) => {
        item.addEventListener('click', function() {
            currentGaleriaIndex = index;
            abrirModal(index, items);
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// Inicializar filtros
// ═══════════════════════════════════════════════════════════════════════════════

function inicializarFiltros() {
    const filtros = document.querySelectorAll('.filtro-btn');

    filtros.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filtros.forEach(b => b.classList.remove('active'));

            // Agregar clase active al botón clickeado
            this.classList.add('active');

            // Filtrar galería
            const filtro = this.getAttribute('data-filtro');
            filtroActivo = filtro;
            filtrarGaleria(filtro);
        });
    });
}

function filtrarGaleria(filtro) {
    let itemsFiltrados;

    if (filtro === 'todas') {
        itemsFiltrados = galeriaTodas;
    } else if (filtro === 'videos') {
        itemsFiltrados = galeriaTodas.filter(item => item.tipo === 'video' || item.url.endsWith('.mp4'));
    } else {
        itemsFiltrados = galeriaTodas.filter(item => item.categoria === filtro);
    }

    renderizarGaleria(itemsFiltrados);
}

// ═══════════════════════════════════════════════════════════════════════════════
// Modal para ver imágenes en grande
// ═══════════════════════════════════════════════════════════════════════════════

function inicializarModal() {
    const modal = document.getElementById('galeria-modal');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');

    if (closeBtn) {
        closeBtn.addEventListener('click', cerrarModal);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            imgAnterior();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            imgSiguiente();
        });
    }

    // Cerrar modal al hacer clic fuera de la imagen
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                cerrarModal();
            }
        });
    }

    // Keyboard navigation en modal
    document.addEventListener('keydown', function(e) {
        if (!modal || !modal.classList.contains('active')) return;

        if (e.key === 'ArrowLeft') imgAnterior();
        if (e.key === 'ArrowRight') imgSiguiente();
        if (e.key === 'Escape') cerrarModal();
    });
}

function abrirModal(index, items) {
    const modal = document.getElementById('galeria-modal');
    const modalImg = document.getElementById('modal-img');
    const caption = document.getElementById('modal-caption');

    if (!modal) return;

    currentGaleriaIndex = index;
    const item = items[index];

    if (item.tipo === 'video' || item.url.endsWith('.mp4')) {
        // Para videos, mostrar poster o primera frame
        modalImg.style.display = 'none';
        caption.textContent = item.titulo || 'Video';
    } else {
        modalImg.style.display = 'block';
        modalImg.src = item.url;
        modalImg.alt = item.titulo;
        caption.textContent = item.titulo || 'Foto';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarModal() {
    const modal = document.getElementById('galeria-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function imgSiguiente() {
    let items;

    if (filtroActivo === 'todas') {
        items = galeriaTodas;
    } else if (filtroActivo === 'videos') {
        items = galeriaTodas.filter(item => item.tipo === 'video' || item.url.endsWith('.mp4'));
    } else {
        items = galeriaTodas.filter(item => item.categoria === filtroActivo);
    }

    if (items.length > 0) {
        currentGaleriaIndex = (currentGaleriaIndex + 1) % items.length;
        abrirModal(currentGaleriaIndex, items);
    }
}

function imgAnterior() {
    let items;

    if (filtroActivo === 'todas') {
        items = galeriaTodas;
    } else if (filtroActivo === 'videos') {
        items = galeriaTodas.filter(item => item.tipo === 'video' || item.url.endsWith('.mp4'));
    } else {
        items = galeriaTodas.filter(item => item.categoria === filtroActivo);
    }

    if (items.length > 0) {
        currentGaleriaIndex = (currentGaleriaIndex - 1 + items.length) % items.length;
        abrirModal(currentGaleriaIndex, items);
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Controles táctiles para móviles
// ═══════════════════════════════════════════════════════════════════════════════

let touchStartXModal = 0;
let touchEndXModal = 0;

const modal = document.getElementById('galeria-modal');
if (modal) {
    modal.addEventListener('touchstart', function(e) {
        touchStartXModal = e.changedTouches[0].screenX;
    }, false);

    modal.addEventListener('touchend', function(e) {
        touchEndXModal = e.changedTouches[0].screenX;
        handleSwipeModal();
    }, false);
}

function handleSwipeModal() {
    const swipeThreshold = 50;

    if (touchStartXModal - touchEndXModal > swipeThreshold) {
        // Swipe hacia la izquierda - siguiente imagen
        imgSiguiente();
    }

    if (touchEndXModal - touchStartXModal > swipeThreshold) {
        // Swipe hacia la derecha - imagen anterior
        imgAnterior();
    }
}
