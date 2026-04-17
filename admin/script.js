// ═══════════════════════════════════════════════════════════════════════════════
// SCRIPT DEL PANEL ADMIN - CON AUTENTICACIÓN Y APIs REALES
// ═══════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación antes de inicializar el panel
    const token = localStorage.getItem('adminToken');
    if (!token) {
        mostrarPantallaLogin();
        return;
    }
    inicializarAdmin();
    cargarDatos();
    inicializarMenus();
});

// ═══════════════════════════════════════════════════════════════════════════════
// AUTENTICACIÓN
// ═══════════════════════════════════════════════════════════════════════════════

function mostrarPantallaLogin() {
    document.body.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0f0f0f;">
            <div style="background:#1a1a2e;padding:2.5rem;border-radius:16px;width:100%;max-width:380px;border:1px solid #2d2d2d;box-shadow:0 8px 32px rgba(0,0,0,0.4);">
                <h2 style="color:#C9A227;text-align:center;margin-bottom:0.5rem;font-size:1.6rem;">Panel Admin</h2>
                <p style="color:#666;text-align:center;margin-bottom:2rem;font-size:0.9rem;">Catering Profesional</p>
                <div style="margin-bottom:1rem;">
                    <label style="display:block;color:#ccc;font-size:0.85rem;margin-bottom:0.4rem;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Email</label>
                    <input type="email" id="admin-email" placeholder="admin@empresa.com" style="width:100%;padding:0.85rem 1rem;border-radius:8px;border:1px solid #333;background:#0f0f0f;color:white;font-size:1rem;box-sizing:border-box;" onkeydown="if(event.key==='Enter')loginAdmin()">
                </div>
                <div style="margin-bottom:1.5rem;">
                    <label style="display:block;color:#ccc;font-size:0.85rem;margin-bottom:0.4rem;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Contraseña</label>
                    <input type="password" id="admin-password" placeholder="••••••••" style="width:100%;padding:0.85rem 1rem;border-radius:8px;border:1px solid #333;background:#0f0f0f;color:white;font-size:1rem;box-sizing:border-box;" onkeydown="if(event.key==='Enter')loginAdmin()">
                </div>
                <button onclick="loginAdmin()" style="width:100%;padding:0.9rem;background:linear-gradient(135deg,#C9A227,#d4b747);color:#0f0f0f;border:none;border-radius:8px;font-weight:700;font-size:1rem;cursor:pointer;letter-spacing:0.5px;">Iniciar Sesión</button>
                <p id="login-error" style="color:#ef4444;text-align:center;margin-top:1rem;display:none;font-size:0.9rem;"></p>
            </div>
        </div>
    `;
}

async function loginAdmin() {
    const email = document.getElementById('admin-email').value.trim();
    const password = document.getElementById('admin-password').value;
    const errorEl = document.getElementById('login-error');
    errorEl.style.display = 'none';

    if (!email || !password) {
        errorEl.textContent = 'Completá todos los campos';
        errorEl.style.display = 'block';
        return;
    }

    try {
        const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok && data.success) {
            localStorage.setItem('adminToken', data.token);
            window.location.reload();
        } else {
            errorEl.textContent = data.error || 'Credenciales incorrectas';
            errorEl.style.display = 'block';
        }
    } catch (err) {
        errorEl.textContent = 'Error al conectar con el servidor';
        errorEl.style.display = 'block';
    }
}

function authHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
    };
}

function manejarErrorAuth(res) {
    if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('adminToken');
        mostrarPantallaLogin();
        return true;
    }
    return false;
}

// ═══════════════════════════════════════════════════════════════════════════════
// INICIALIZACIÓN DEL PANEL
// ═══════════════════════════════════════════════════════════════════════════════

function inicializarAdmin() {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const tab = this.getAttribute('data-tab');
            abrirTab(tab);
        });
    });

    document.getElementById('btn-nuevo-servicio').addEventListener('click', abrirModalServicio);
    document.getElementById('form-empresa').addEventListener('submit', guardarEmpresa);
    document.getElementById('form-servicio').addEventListener('submit', guardarServicio);

    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });

    document.querySelectorAll('.btn-logout').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('adminToken');
            window.location.reload();
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// NAVEGACIÓN ENTRE TABS
// ═══════════════════════════════════════════════════════════════════════════════

function abrirTab(tabName) {
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-tab') === tabName) {
            item.classList.add('active');
        }
    });

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
// CARGAR DATOS INICIALES
// ═══════════════════════════════════════════════════════════════════════════════

async function cargarDatos() {
    try {
        const configRes = await fetch('/api/config');
        const config = await configRes.json();
        document.getElementById('empresa-nombre').value = config.nombre || '';
        document.getElementById('empresa-telefono').value = config.telefono || '';
        document.getElementById('empresa-email').value = config.email || '';
        document.getElementById('empresa-ubicacion').value = config.ubicacion || '';
        document.getElementById('empresa-whatsapp').value = config.whatsapp || '';
    } catch (error) {
        console.error('Error al cargar configuración:', error);
    }

    cargarServicios();
    cargarGaleria();
    cargarComentarios();
    cargarContactos();
}

// ═══════════════════════════════════════════════════════════════════════════════
// EMPRESA
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

    try {
        const res = await fetch('/api/admin/config', {
            method: 'PUT',
            headers: authHeaders(),
            body: JSON.stringify(datosEmpresa)
        });
        if (manejarErrorAuth(res)) return;
        if (res.ok) {
            mostrarMensaje('Datos de empresa guardados correctamente', 'success');
        } else {
            mostrarMensaje('Error al guardar los datos', 'error');
        }
    } catch (err) {
        mostrarMensaje('Error de red al guardar', 'error');
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICIOS
// ═══════════════════════════════════════════════════════════════════════════════

let servicios = [];

async function cargarServicios() {
    try {
        const response = await fetch('/api/servicios');
        servicios = await response.json();
        renderizarServicios();
    } catch (error) {
        console.error('Error al cargar servicios:', error);
    }
}

function renderizarServicios() {
    const list = document.getElementById('servicios-list');
    list.innerHTML = servicios.map(servicio => `
        <div class="list-item">
            <div class="list-item-content">
                <h4>${servicio.nombre}</h4>
                <p>${(servicio.descripcion || '').substring(0, 80)}...</p>
                <p>Precio: $${servicio.precio}</p>
            </div>
            <div class="list-item-actions">
                <button class="btn btn-secondary" onclick="editarServicio('${servicio._id}')">Editar</button>
                <button class="btn btn-danger" onclick="eliminarServicio('${servicio._id}')">Eliminar</button>
            </div>
        </div>
    `).join('');
}

function abrirModalServicio() {
    document.getElementById('form-servicio').reset();
    document.getElementById('form-servicio').removeAttribute('data-edit-id');
    document.getElementById('modal-servicio').classList.add('active');
}

function editarServicio(id) {
    const servicio = servicios.find(s => s._id === id);
    if (!servicio) return;
    document.getElementById('servicio-nombre').value = servicio.nombre;
    document.getElementById('servicio-descripcion').value = servicio.descripcion;
    document.getElementById('servicio-precio').value = servicio.precio;
    document.getElementById('form-servicio').setAttribute('data-edit-id', id);
    document.getElementById('modal-servicio').classList.add('active');
}

async function eliminarServicio(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este servicio?')) return;
    try {
        const res = await fetch('/api/admin/servicios/' + id, {
            method: 'DELETE',
            headers: authHeaders()
        });
        if (manejarErrorAuth(res)) return;
        mostrarMensaje('Servicio eliminado', 'success');
        cargarServicios();
    } catch (err) {
        mostrarMensaje('Error al eliminar el servicio', 'error');
    }
}

async function guardarServicio(e) {
    e.preventDefault();

    const editId = e.target.getAttribute('data-edit-id');
    const datosServicio = {
        nombre: document.getElementById('servicio-nombre').value,
        descripcion: document.getElementById('servicio-descripcion').value,
        precio: parseFloat(document.getElementById('servicio-precio').value)
    };

    try {
        const url = editId ? '/api/admin/servicios/' + editId : '/api/admin/servicios';
        const method = editId ? 'PUT' : 'POST';
        const res = await fetch(url, {
            method,
            headers: authHeaders(),
            body: JSON.stringify(datosServicio)
        });
        if (manejarErrorAuth(res)) return;
        if (res.ok) {
            cerrarModal();
            mostrarMensaje(editId ? 'Servicio actualizado' : 'Servicio guardado', 'success');
            cargarServicios();
        } else {
            mostrarMensaje('Error al guardar el servicio', 'error');
        }
    } catch (err) {
        mostrarMensaje('Error de red', 'error');
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// GALERÍA
// ═══════════════════════════════════════════════════════════════════════════════

let galeriaItems = [];

async function cargarGaleria() {
    try {
        const response = await fetch('/api/galeria');
        galeriaItems = await response.json();
        renderizarGaleria();
    } catch (error) {
        console.error('Error al cargar galería:', error);
    }
}

function renderizarGaleria() {
    const gallery = document.getElementById('galeria-list');
    gallery.innerHTML = galeriaItems.map(item => `
        <div class="gallery-item">
            ${item.tipo === 'video' ?
                `<video style="width:100%;height:150px;object-fit:cover;"><source src="${item.url}"></video>` :
                `<img src="${item.url}" alt="${item.titulo}" style="width:100%;height:150px;object-fit:cover;">`
            }
            <div class="gallery-item-info" style="padding:0.5rem;font-size:0.8rem;color:#ccc;">${item.titulo} (${item.categoria})</div>
            <div class="gallery-item-actions">
                <button onclick="eliminarGaleria('${item._id}')" style="width:100%;padding:0.4rem;background:#dc3545;color:white;border:none;cursor:pointer;border-radius:0 0 4px 4px;">✕ Eliminar</button>
            </div>
        </div>
    `).join('');
}

async function eliminarGaleria(id) {
    if (!confirm('¿Eliminar esta imagen/video?')) return;
    try {
        const res = await fetch('/api/admin/galeria/' + id, {
            method: 'DELETE',
            headers: authHeaders()
        });
        if (manejarErrorAuth(res)) return;
        mostrarMensaje('Archivo eliminado', 'success');
        cargarGaleria();
    } catch (err) {
        mostrarMensaje('Error al eliminar', 'error');
    }
}

async function subirArchivo(file, tipo) {
    const formData = new FormData();
    formData.append('file', file);
    const endpoint = tipo === 'video' ? '/api/upload/video' : '/api/upload/foto';

    try {
        const uploadRes = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('adminToken') },
            body: formData
        });
        if (manejarErrorAuth(uploadRes)) return;
        const uploadData = await uploadRes.json();
        if (!uploadData.success) {
            mostrarMensaje(uploadData.error || 'Error al subir archivo', 'error');
            return;
        }

        const titulo = prompt('Título para este archivo:') || file.name;
        const categoriaOpciones = 'bodas, corporativo, cumpleanos, otro';
        const categoria = prompt('Categoría (' + categoriaOpciones + '):') || 'otro';

        const galRes = await fetch('/api/admin/galeria', {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify({ titulo, url: uploadData.url, tipo, categoria })
        });
        if (galRes.ok) {
            mostrarMensaje('Archivo subido y guardado en galería', 'success');
            cargarGaleria();
        }
    } catch (err) {
        mostrarMensaje('Error al subir el archivo', 'error');
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMENTARIOS
// ═══════════════════════════════════════════════════════════════════════════════

let comentarios = [];

async function cargarComentarios() {
    try {
        const res = await fetch('/api/admin/comentarios', { headers: authHeaders() });
        if (manejarErrorAuth(res)) return;
        comentarios = await res.json();
        renderizarComentarios();
    } catch (error) {
        console.error('Error al cargar comentarios:', error);
    }
}

function renderizarComentarios() {
    const list = document.getElementById('comentarios-list');
    list.innerHTML = comentarios.map(comentario => `
        <div class="list-item">
            <div class="list-item-content">
                <h4>${comentario.nombre} ${comentario.aprobado ? '<span style="color:#28a745;font-size:0.8rem;">(Aprobado)</span>' : '<span style="color:#ffc107;font-size:0.8rem;">(Pendiente)</span>'}</h4>
                <p>${(comentario.texto || '').substring(0, 100)}...</p>
                <p>Calificación: ${'★'.repeat(comentario.calificacion)}${'☆'.repeat(5 - comentario.calificacion)}</p>
            </div>
            <div class="list-item-actions">
                ${!comentario.aprobado ?
                    `<button class="btn btn-success" onclick="aprobarComentario('${comentario._id}')">Aprobar</button>` : ''
                }
                <button class="btn btn-danger" onclick="rechazarComentario('${comentario._id}')">Eliminar</button>
            </div>
        </div>
    `).join('');
}

async function aprobarComentario(id) {
    try {
        const res = await fetch('/api/admin/comentarios/' + id, {
            method: 'PATCH',
            headers: authHeaders(),
            body: JSON.stringify({ aprobado: true })
        });
        if (manejarErrorAuth(res)) return;
        mostrarMensaje('Comentario aprobado', 'success');
        cargarComentarios();
    } catch (err) {
        mostrarMensaje('Error al aprobar comentario', 'error');
    }
}

async function rechazarComentario(id) {
    if (!confirm('¿Eliminar este comentario permanentemente?')) return;
    try {
        const res = await fetch('/api/admin/comentarios/' + id, {
            method: 'DELETE',
            headers: authHeaders()
        });
        if (manejarErrorAuth(res)) return;
        mostrarMensaje('Comentario eliminado', 'success');
        cargarComentarios();
    } catch (err) {
        mostrarMensaje('Error al eliminar comentario', 'error');
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONTACTOS
// ═══════════════════════════════════════════════════════════════════════════════

let contactos = [];

async function cargarContactos() {
    try {
        const res = await fetch('/api/admin/contactos', { headers: authHeaders() });
        if (manejarErrorAuth(res)) return;
        contactos = await res.json();
        renderizarContactos();
    } catch (error) {
        console.error('Error al cargar contactos:', error);
    }
}

function renderizarContactos() {
    const list = document.getElementById('contactos-list');
    list.innerHTML = contactos.map(contacto => `
        <div class="list-item">
            <div class="list-item-content">
                <h4>${contacto.nombre}</h4>
                <p>Email: ${contacto.email} | Tel: ${contacto.telefono}</p>
                <p>Servicio: ${contacto.servicio} | Fecha: ${contacto.fecha} | Personas: ${contacto.personas}</p>
                ${contacto.detalles ? `<p style="color:#999;font-size:0.9rem;">${contacto.detalles}</p>` : ''}
            </div>
            <div class="list-item-actions">
                ${contacto.contactado ?
                    '<span style="color:#28a745;">✓ Contactado</span>' :
                    `<button class="btn btn-success" onclick="marcarContactado('${contacto._id}')">Marcar contactado</button>`
                }
            </div>
        </div>
    `).join('');
}

async function marcarContactado(id) {
    try {
        const res = await fetch('/api/admin/contactos/' + id, {
            method: 'PATCH',
            headers: authHeaders(),
            body: JSON.stringify({ contactado: true })
        });
        if (manejarErrorAuth(res)) return;
        mostrarMensaje('Marcado como contactado', 'success');
        cargarContactos();
    } catch (err) {
        mostrarMensaje('Error al actualizar', 'error');
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// UTILIDADES
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
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        font-size: 0.95rem;
        max-width: 320px;
    `;
    alerta.textContent = mensaje;
    document.body.appendChild(alerta);
    setTimeout(() => alerta.remove(), 3500);
}

function inicializarMenus() {
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.admin-sidebar') && !e.target.closest('.menu-item')) {
            // Reservado para responsive
        }
    });
}
