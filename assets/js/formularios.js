// ═══════════════════════════════════════════════════════════════════════════════
// SCRIPT DE FORMULARIOS - COMENTARIOS Y CONTACTO
// ═══════════════════════════════════════════════════════════════════════════════

let calificacionSeleccionada = 0;

document.addEventListener('DOMContentLoaded', function() {
    inicializarFormularioComentarios();
    inicializarFormularioContacto();
    inicializarSelectorEstrellas();
});

// ═══════════════════════════════════════════════════════════════════════════════
// Formulario de comentarios y testimonios
// ═══════════════════════════════════════════════════════════════════════════════

function inicializarFormularioComentarios() {
    const form = document.getElementById('form-comentario');

    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const nombre = document.getElementById('comentario-nombre').value.trim();
        const email = document.getElementById('comentario-email').value.trim();
        const texto = document.getElementById('comentario-texto').value.trim();

        // Validación básica
        if (!nombre || !email || !texto || calificacionSeleccionada === 0) {
            mostrarAlerta('Por favor completa todos los campos y selecciona una calificación', 'error');
            return;
        }

        // Validar email
        if (!validarEmail(email)) {
            mostrarAlerta('Por favor ingresa un email válido', 'error');
            return;
        }

        // Enviar comentario
        try {
            const response = await fetch('/api/comentarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: nombre,
                    email: email,
                    texto: texto,
                    calificacion: calificacionSeleccionada
                })
            });

            if (response.ok) {
                mostrarAlerta('¡Comentario enviado! Será revisado antes de publicarse.', 'success');
                form.reset();
                calificacionSeleccionada = 0;
                actualizarSelectorEstrellas();
            } else {
                mostrarAlerta('Error al enviar el comentario. Intenta nuevamente.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            mostrarAlerta('Error de conexión. Intenta nuevamente.', 'error');
        }
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// Formulario de contacto
// ═══════════════════════════════════════════════════════════════════════════════

function inicializarFormularioContacto() {
    const form = document.getElementById('form-contacto');

    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const nombre = document.getElementById('contacto-nombre').value.trim();
        const email = document.getElementById('contacto-email').value.trim();
        const telefono = document.getElementById('contacto-telefono').value.trim();
        const fecha = document.getElementById('contacto-fecha').value;
        const servicio = document.getElementById('contacto-servicio').value;
        const personas = document.getElementById('contacto-personas').value;
        const detalles = document.getElementById('contacto-detalles').value.trim();

        // Validación
        if (!nombre || !email || !telefono || !fecha || !servicio || !personas) {
            mostrarAlerta('Por favor completa todos los campos requeridos', 'error');
            return;
        }

        if (!validarEmail(email)) {
            mostrarAlerta('Por favor ingresa un email válido', 'error');
            return;
        }

        // Validar que la fecha sea en el futuro
        const fechaSeleccionada = new Date(fecha);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        if (fechaSeleccionada < hoy) {
            mostrarAlerta('La fecha debe ser en el futuro', 'error');
            return;
        }

        // Validar número de personas
        if (parseInt(personas) < 1) {
            mostrarAlerta('El número de personas debe ser mayor a 0', 'error');
            return;
        }

        // Enviar solicitud
        try {
            const response = await fetch('/api/contacto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: nombre,
                    email: email,
                    telefono: telefono,
                    fecha: fecha,
                    servicio: servicio,
                    personas: parseInt(personas),
                    detalles: detalles
                })
            });

            if (response.ok) {
                mostrarAlerta('¡Solicitud enviada! Nos pondremos en contacto pronto.', 'success');
                form.reset();

                // Hacer scroll hacia arriba
                setTimeout(function() {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }, 500);
            } else {
                mostrarAlerta('Error al enviar la solicitud. Intenta nuevamente.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            mostrarAlerta('Error de conexión. Intenta nuevamente.', 'error');
        }
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// Selector de estrellas
// ═══════════════════════════════════════════════════════════════════════════════

function inicializarSelectorEstrellas() {
    const stars = document.querySelectorAll('.star');

    stars.forEach(star => {
        star.addEventListener('click', function() {
            calificacionSeleccionada = parseInt(this.getAttribute('data-value'));
            actualizarSelectorEstrellas();
        });

        star.addEventListener('mouseover', function() {
            const valor = parseInt(this.getAttribute('data-value'));
            stars.forEach(s => {
                if (parseInt(s.getAttribute('data-value')) <= valor) {
                    s.style.color = 'var(--secondary-color)';
                } else {
                    s.style.color = '#ddd';
                }
            });
        });
    });

    const starsContainer = document.querySelector('.stars');
    if (starsContainer) {
        starsContainer.addEventListener('mouseleave', actualizarSelectorEstrellas);
    }
}

function actualizarSelectorEstrellas() {
    const stars = document.querySelectorAll('.star');

    stars.forEach(star => {
        const valor = parseInt(star.getAttribute('data-value'));

        if (valor <= calificacionSeleccionada) {
            star.classList.add('active');
            star.style.color = 'var(--secondary-color)';
        } else {
            star.classList.remove('active');
            star.style.color = '#ddd';
        }
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// Funciones de validación y utilidades
// ═══════════════════════════════════════════════════════════════════════════════

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function mostrarAlerta(mensaje, tipo) {
    // Crear elemento de alerta
    const alerta = document.createElement('div');
    alerta.className = `alerta alerta-${tipo}`;
    alerta.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        background: ${tipo === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    alerta.textContent = mensaje;

    document.body.appendChild(alerta);

    // Remover alerta después de 4 segundos
    setTimeout(function() {
        alerta.style.animation = 'fadeOut 0.3s ease';
        setTimeout(function() {
            alerta.remove();
        }, 300);
    }, 4000);
}

// ═══════════════════════════════════════════════════════════════════════════════
// Validación en tiempo real de formularios
// ═══════════════════════════════════════════════════════════════════════════════

// Email en tiempo real
const emailInputs = document.querySelectorAll('input[type="email"]');
emailInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validarEmail(this.value)) {
            this.style.borderColor = '#dc3545';
        } else {
            this.style.borderColor = 'var(--border-color)';
        }
    });

    input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--border-color)';
    });
});

// Teléfono - permitir solo números
const telefonoInputs = document.querySelectorAll('input[type="tel"]');
telefonoInputs.forEach(input => {
    input.addEventListener('input', function() {
        this.value = this.value.replace(/[^\d\s\-\+()]/g, '');
    });
});

// Número de personas - mínimo 1
const personasInput = document.getElementById('contacto-personas');
if (personasInput) {
    personasInput.addEventListener('change', function() {
        if (parseInt(this.value) < 1) {
            this.value = 1;
        }
    });
}
