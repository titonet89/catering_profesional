// ═══════════════════════════════════════════════════════════════════════════════
// SCRIPT DEL PANEL ADMIN
// ═══════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    inicializarAdmin();
    cargarDatos();
    inicializarMenus();
});

// ═══════════════════════════════════════════════════════════════════════════════
// Inicializar panel admin
// ═══════════════════════════════════════════════════════════════════════════════

function inicializarAdmin() {
    // Event listeners para el menú
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const tab = this.getAttribute('data-tab');
            abrirTab(tab);
        });
    });

    // Event listeners para los botones
    document.getElementById('btn-nuevo-servicio').addEventListener('click', abrirModalServicio);
    document.getElementById('form-empresa').addEventListener('submit', guardarEmpresa);
    document.getElementById('form-servicio').addEventListener('submit', guardarServicio);

    // Cerrar modales
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });

    // Cerrar sesión
    document.querySelectorAll('.btn-logout').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = '/';
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// Navegación entre tabs
// ═══════════════════════════════════════════════════════════════════════════════

function abrirTab(tabName) {
    // Ocultar todos los tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Mostrar el tab seleccionado
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Actualizar menú activo
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-tab') === tabName) {
            item.classList.add('active');
        }
    });

    // Actualizar título
    const titles = {
        'empresa': 'Administración de Empresa',
        'servicios': 'Gestión de Servicios',
        'galeria': 'Galería de Fotos y Videos',
        'comentarios': 'Gestión de Comentarios',
        'contacto': 'Solicitudes de Contacto',
        'usuarios': 'Gestión de Usuarios',
        'estadisticas': 'Estadísticas del Sitio'
    };

    document.getElementById('page-title').textContent = titles[tabName] || 'Panel Admin';
}

// ═══════════════════════════════════════════════════════════════════════════════
// Cargar datos
// ═══════════════════════════════════════════════════════════════════════════════

async function cargarDatos() {
    try {
        // Cargar configuración empresa
        const configRes = await fetch('/api/config');
        const config = await configRes.json();
        document.getElementById('empresa-nombre').value = config.nombre || '';
        document.getElementById('empresa-telefono').value = config.telefono || '';
        document.getElementById('empresa-email').value = config.email || '';
        document.getElementById('empresa-ubicacion').value = config.ubicacion || '';
        document.getElementById('empresa-whatsapp').value = config.whatsapp || '';

        // Cargar servicios
        cargarServicios();

        // Cargar galería
        cargarGaleria();

        // Cargar comentarios
        cargarComentarios();

        // Cargar contactos
        cargarContactos();
    } catch (error) {
        console.error('Error al cargar datos:', error);
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Empresa
// ═══════════════════════════════════════════════════════════════════════════════

async function guardarEmpresa(e) {
    e.preventDefault();

    const datosEmpresa = {
        nombre: document.getElementById('empresa-nombre').value,
        telefono: document.getElementById('empresa-telefono').value,
        email: document.getElementById('empresa-email').value,
        ubicacion: document.getElementById('empresa-ubicacion').value,
        whatsapp: document.getElementById('empresa-whatsapp').value
    };

    console.log('Datos empresa guardados:', datosEmpresa);
    mostrarMensaje('Cambios guardados correctamente', 'success');
}

// ═══════════════════════════════════════════════════════════════════════════════
// Servicios
// ═══════════════════════════════════════════════════════════════════════════════

let servicios = [];

async function cargarServicios() {
    try {
        const response = await fetch('/api/servicios');
        servicios = await response.json();
        renderizarServicios();
    } catch (error) {
        console.error('Error:', error);
    }
}

function renderizarServicios() {
    const list = document.getElementById('servicios-list');
    list.innerHTML = servicios.map((servicio, index) => `
        <div class="list-item">
            <div class="list-item-content">
                <h4>${servicio.nombre}</h4>
                <p>${servicio.descripcion.substring(0, 50)}...</p>
                <p>Precio: $${servicio.precio}</p>
            </div>
            <div class="list-item-actions">
                <button class="btn btn-secondary" onclick="editarServicio(${index})">Editar</button>
                <button class="btn btn-danger" onclick="eliminarServicio(${index})">Eliminar</button>
            </div>
        </div>
    `).join('');
}

function abrirModalServicio() {
    document.getElementById('modal-servicio').classList.add('active');
}

function editarServicio(index) {
    const servicio = servicios[index];
    document.getElementById('servicio-nombre').value = servicio.nombre;
    document.getElementById('servicio-descripcion').value = servicio.descripcion;
    document.getElementById('servicio-precio').value = servicio.precio;
    abrirModalServicio();
}

function eliminarServicio(index) {
    if (confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
        servicios.splice(index, 1);
        renderizarServicios();
        mostrarMensaje('Servicio eliminado', 'success');
    }
}

async function guardarServicio(e) {
    e.preventDefault();

    const nuevoServicio = {
        nombre: document.getElementById('servicio-nombre').value,
        descripcion: document.getElementById('servicio-descripcion').value,
        precio: document.getElementById('servicio-precio').value
    };

    servicios.push(nuevoServicio);
    renderizarServicios();
    cerrarModal();
    mostrarMensaje('Servicio guardado', 'success');
}

// ═══════════════════════════════════════════════════════════════════════════════
// Galería
// ═══════════════════════════════════════════════════════════════════════════════

let galeriaItems = [];

async function cargarGaleria() {
    try {
        const response = await fetch('/api/galeria');
        galeriaItems = await response.json();
        renderizarGaleria();
    } catch (error) {
        console.error('Error:', error);
    }
}

function renderizarGaleria() {
    const gallery = document.getElementById('galeria-list');

    gallery.innerHTML = galeriaItems.map((item, index) => `
        <div class="gallery-item">
            ${item.tipo === 'video' ?
                `<video><source src="${item.url}"></video>` :
                `<img src="${item.url}" alt="${item.titulo}">`
            }
            <div class="gallery-item-actions">
                <button onclick="eliminarGaleria(${index})">✕</button>
            </div>
        </div>
    `).join('');
}

function eliminarGaleria(index) {
    if (confirm('¿Eliminar esta imagen/video?')) {
        galeriaItems.splice(index, 1);
        renderizarGaleria();
        mostrarMensaje('Archivo eliminado', 'success');
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Comentarios
// ═══════════════════════════════════════════════════════════════════════════════

let comentarios = [];

async function cargarComentarios() {
    try {
        const response = await fetch('/api/comentarios');
        comentarios = await response.json();
        renderizarComentarios();
    } catch (error) {
        console.error('Error:', error);
    }
}

function renderizarComentarios() {
    const list = document.getElementById('comentarios-list');

    list.innerHTML = comentarios.map((comentario, index) => `
        <div class="list-item">
            <div class="list-item-content">
                <h4>${comentario.nombre}</h4>
                <p>${comentario.texto.substring(0, 100)}...</p>
                <p>Calificación: ${'★'.repeat(comentario.calificacion)}${'☆'.repeat(5 - comentario.calificacion)}</p>
            </div>
            <div class="list-item-actions">
                ${comentario.aprobado ?
                    `<button class="btn btn-danger" onclick="rechazarComentario(${index})">Rechazar</button>` :
                    `<button class="btn btn-success" onclick="aprobarComentario(${index})">Aprobar</button>`
                }
            </div>
        </div>
    `).join('');
}

function aprobarComentario(index) {
    if (comentarios[index]) {
        comentarios[index].aprobado = true;
        renderizarComentarios();
        mostrarMensaje('Comentario aprobado', 'success');
    }
}

function rechazarComentario(index) {
    if (comentarios[index]) {
        comentarios.splice(index, 1);
        renderizarComentarios();
        mostrarMensaje('Comentario rechazado', 'success');
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Contactos
// ═══════════════════════════════════════════════════════════════════════════════

let contactos = [];

async function cargarContactos() {
    try {
        // Por ahora datos de ejemplo
        contactos = [
            {
                id: 1,
                nombre: 'Juan Pérez',
                email: 'juan@example.com',
                telefono: '3884123456',
                evento: 'Boda',
                fecha: '2024-06-15',
                personas: 150,
                contactado: false
            }
        ];
        renderizarContactos();
    } catch (error) {
        console.error('Error:', error);
    }
}

function renderizarContactos() {
    const list = document.getElementById('contactos-list');

    list.innerHTML = contactos.map((contacto, index) => `
        <div class="list-item">
            <div class="list-item-content">
                <h4>${contacto.nombre}</h4>
                <p>Email: ${contacto.email} | Tel: ${contacto.telefono}</p>
                <p>Evento: ${contacto.evento} | Fecha: ${contacto.fecha} | Personas: ${contacto.personas}</p>
            </div>
            <div class="list-item-actions">
                ${contacto.contactado ?
                    '<span style="color: green;">✓ Contactado</span>' :
                    `<button class="btn btn-success" onclick="marcarContactado(${index})">Contactar</button>`
                }
            </div>
        </div>
    `).join('');
}

function marcarContactado(index) {
    if (contactos[index]) {
        contactos[index].contactado = true;
        renderizarContactos();
        mostrarMensaje('Marcado como contactado', 'success');
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Utilidades
// ═══════════════════════════════════════════════════════════════════════════════

function cerrarModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

function mostrarMensaje(mensaje, tipo) {
    const alerta = document.createElement('div');
    alerta.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${tipo === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        z-index: 9999;
    `;
    alerta.textContent = mensaje;
    document.body.appendChild(alerta);

    setTimeout(() => alerta.remove(), 3000);
}

function inicializarMenus() {
    // Cerrar menú al hacer click fuera (para móviles)
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.admin-sidebar') && !e.target.closest('.menu-item')) {
            // Cerrar menú si es necesario en responsive
        }
    });
}
