// ═══════════════════════════════════════════════════════════════════════════════
// FORMULARIOS - CATERING PROFESIONAL
// ═══════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    inicializarFormularios();
});

// ═══════════════════════════════════════════════════════════════════════════════
// INICIALIZAR FORMULARIOS
// ═══════════════════════════════════════════════════════════════════════════════

function inicializarFormularios() {
    const formContacto = document.getElementById('form-contacto');
    const formComentario = document.getElementById('form-comentario');

    if (formContacto) {
        formContacto.addEventListener('submit', manejarContacto);
    }

    if (formComentario) {
        formComentario.addEventListener('submit', manejarComentario);
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MANEJAR FORMULARIO DE CONTACTO
// ═══════════════════════════════════════════════════════════════════════════════

async function manejarContacto(e) {
    e.preventDefault();

    const nombre = document.getElementById('contacto-nombre').value.trim();
    const email = document.getElementById('contacto-email').value.trim();
    const telefono = document.getElementById('contacto-telefono').value.trim();
    const fecha = document.getElementById('contacto-fecha').value;
    const servicio = document.getElementById('contacto-servicio').value;
    const personas = document.getElementById('contacto-personas').value;
    const detalles = document.getElementById('contacto-detalles').value.trim();

    // Validación básica
    if (!nombre || !email || !telefono || !fecha || !servicio || !personas) {
        mostrarError('Por favor completa todos los campos requeridos');
        return;
    }

    if (!validarEmail(email)) {
        mostrarError('Por favor ingresa un email válido');
        return;
    }

    try {
        const response = await fetch('/api/contacto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre,
                email,
                telefono,
                fecha,
                servicio,
                personas,
                detalles
            })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            mostrarExito('¡Solicitud enviada correctamente! Nos contactaremos pronto.');
            document.getElementById('form-contacto').reset();
        } else {
            mostrarError(data.error || 'Error al enviar la solicitud');
        }
    } catch (error) {
        console.error('❌ Error:', error);
        mostrarError('Error al enviar la solicitud. Intenta más tarde.');
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MANEJAR FORMULARIO DE COMENTARIOS
// ═══════════════════════════════════════════════════════════════════════════════

async function manejarComentario(e) {
    e.preventDefault();

    const nombre = document.getElementById('comentario-nombre').value.trim();
    const email = document.getElementById('comentario-email').value.trim();
    const texto = document.getElementById('comentario-texto').value.trim();
    const calificacion = parseInt(document.getElementById('comentario-calificacion').value) || 0;

    // Validación
    if (!nombre || !email || !texto || calificacion === 0) {
        mostrarError('Por favor completa todos los campos');
        return;
    }

    if (!validarEmail(email)) {
        mostrarError('Por favor ingresa un email válido');
        return;
    }

    if (texto.length < 10) {
        mostrarError('El comentario debe tener al menos 10 caracteres');
        return;
    }

    try {
        const response = await fetch('/api/comentarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre,
                email,
                texto,
                calificacion
            })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            mostrarExito('¡Gracias por tu comentario! Será revisado y publicado pronto.');
            document.getElementById('form-comentario').reset();
            document.getElementById('comentario-calificacion').value = 0;

            // Limpiar estilos de stars
            document.querySelectorAll('.star').forEach(star => {
                star.classList.remove('active');
                star.style.color = 'rgba(201, 162, 39, 0.3)';
            });
        } else {
            mostrarError(data.error || 'Error al enviar el comentario');
        }
    } catch (error) {
        console.error('❌ Error:', error);
        mostrarError('Error al enviar el comentario. Intenta más tarde.');
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// FUNCIONES UTILITARIAS
// ═══════════════════════════════════════════════════════════════════════════════

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function mostrarExito(mensaje) {
    mostrarMensaje(mensaje, 'success');
}

function mostrarError(mensaje) {
    mostrarMensaje(mensaje, 'error');
}

function mostrarMensaje(mensaje, tipo) {
    // Crear elemento de mensaje
    const div = document.createElement('div');
    div.className = `${tipo}-message`;
    div.textContent = mensaje;
    div.style.position = 'fixed';
    div.style.top = '100px';
    div.style.left = '50%';
    div.style.transform = 'translateX(-50%)';
    div.style.zIndex = '9999';
    div.style.maxWidth = '500px';
    div.style.width = '90%';

    document.body.appendChild(div);

    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        div.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => div.remove(), 300);
    }, 5000);
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMACIÓN PARA MENSAJE
// ═══════════════════════════════════════════════════════════════════════════════

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);
