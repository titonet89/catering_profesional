// ═══════════════════════════════════════════════════════════════════════════════
// GALERÍA CON FILTROS - CATERING PROFESIONAL
// ═══════════════════════════════════════════════════════════════════════════════

let galeríaItems = [];
let filtroActual = 'todas';
let currentModalIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    inicializarGaleria();
    cargarGaleria();
});

// ═══════════════════════════════════════════════════════════════════════════════
// INICIALIZAR GALERÍA
// ═══════════════════════════════════════════════════════════════════════════════

function inicializarGaleria() {
    const filtros = document.querySelectorAll('.filtro-btn');
    const modal = document.getElementById('galeria-modal');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');

    // Event listeners para filtros
    filtros.forEach(btn => {
        btn.addEventListener('click', function() {
            filtros.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filtroActual = this.getAttribute('data-filtro');
            cargarGaleria();
        });
    });

    // Modal controls
    if (closeBtn) closeBtn.addEventListener('click', cerrarModal);
    if (prevBtn) prevBtn.addEventListener('click', anteriorModal);
    if (nextBtn) nextBtn.addEventListener('click', siguienteModal);

    // Cerrar modal al hacer clic fuera
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                cerrarModal();
            }
        });
    }

    // Soporte para teclado en modal
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('active')) return;

        if (e.key === 'Escape') cerrarModal();
        if (e.key === 'ArrowLeft') anteriorModal();
        if (e.key === 'ArrowRight') siguienteModal();
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// CARGAR GALERÍA
// ═══════════════════════════════════════════════════════════════════════════════

async function cargarGaleria() {
    try {
        const url = filtroActual === 'todas'
            ? '/api/galeria'
            : `/api/galeria?filtro=${filtroActual}`;

        const response = await fetch(url);
        galeríaItems = await response.json();

        if (galeríaItems.length === 0) {
            cargarGaleriaPorDefecto();
            return;
        }

        renderizarGaleria();
    } catch (error) {
        console.error('❌ Error al cargar galería:', error);
        cargarGaleriaPorDefecto();
    }
}

function cargarGaleriaPorDefecto() {
    const items = [
        { id: 1, titulo: 'Boda Elegante', url: '/images/placeholder.jpg', categoria: 'bodas', tipo: 'foto' },
        { id: 2, titulo: 'Ceremonia Especial', url: '/images/placeholder.jpg', categoria: 'bodas', tipo: 'foto' },
        { id: 3, titulo: 'Fiesta de Casamiento', url: '/images/placeholder.jpg', categoria: 'bodas', tipo: 'foto' },
        { id: 4, titulo: 'Evento Corporativo 1', url: '/images/placeholder.jpg', categoria: 'corporativo', tipo: 'foto' },
        { id: 5, titulo: 'Evento Corporativo 2', url: '/images/placeholder.jpg', categoria: 'corporativo', tipo: 'foto' },
        { id: 6, titulo: 'Cumpleaños 1', url: '/images/placeholder.jpg', categoria: 'cumpleanos', tipo: 'foto' },
    ];

    if (filtroActual === 'todas') {
        galeríaItems = items;
    } else {
        galeríaItems = items.filter(item => item.categoria === filtroActual);
    }

    renderizarGaleria();
}

// ═══════════════════════════════════════════════════════════════════════════════
// RENDERIZAR GALERÍA
// ═══════════════════════════════════════════════════════════════════════════════

function renderizarGaleria() {
    const grid = document.getElementById('galeria-grid');
    if (!grid) return;

    grid.innerHTML = galeríaItems.map((item, index) => `
        <div class="galeria-item" onclick="abrirModal(${index})">
            ${item.tipo === 'video'
                ? `<video src="${item.url}" style="width: 100%; height: 100%; object-fit: cover;"></video>`
                : `<img src="${item.url}" alt="${item.titulo}" onerror="this.src='/images/placeholder.jpg'" style="width: 100%; height: 100%; object-fit: cover;">`
            }
            <div class="galeria-overlay">
                <div class="galeria-overlay-icon">${item.tipo === 'video' ? '▶️' : '🔍'}</div>
            </div>
            <div class="galeria-badge">${item.tipo}</div>
        </div>
    `).join('');
}

// ═══════════════════════════════════════════════════════════════════════════════
// MODAL FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function abrirModal(index) {
    if (galeríaItems.length === 0) return;

    currentModalIndex = index;
    const modal = document.getElementById('galeria-modal');
    const item = galeríaItems[index];
    const modalImg = document.getElementById('modal-img');
    let modalContent = document.querySelector('.modal-content');

    if (item.tipo === 'video') {
        // Para videos, usar video tag
        modalImg.style.display = 'none';
        let video = document.getElementById('modal-video');
        if (!video) {
            video = document.createElement('video');
            video.id = 'modal-video';
            video.controls = true;
            video.style.maxWidth = '90vw';
            video.style.maxHeight = '90vh';
            video.style.objectFit = 'contain';
            modalContent.appendChild(video);
        }
        video.src = item.url;
        video.style.display = 'block';
    } else {
        // Para imágenes, usar img tag
        if (document.getElementById('modal-video')) {
            document.getElementById('modal-video').style.display = 'none';
        }
        modalImg.style.display = 'block';
        modalImg.src = item.url;
        modalImg.onerror = function() {
            this.src = '/images/placeholder.jpg';
        };
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarModal() {
    const modal = document.getElementById('galeria-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';

    // Liberar el video para evitar memory leak y que siga reproduciéndose en segundo plano
    const video = document.getElementById('modal-video');
    if (video) {
        video.pause();
        video.src = '';
        video.load();
    }
}

function anteriorModal() {
    if (galeríaItems.length === 0) return;
    currentModalIndex = (currentModalIndex - 1 + galeríaItems.length) % galeríaItems.length;
    abrirModal(currentModalIndex);
}

function siguienteModal() {
    if (galeríaItems.length === 0) return;
    currentModalIndex = (currentModalIndex + 1) % galeríaItems.length;
    abrirModal(currentModalIndex);
}
