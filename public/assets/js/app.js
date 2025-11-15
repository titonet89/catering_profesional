// ═══════════════════════════════════════════════════════════════════════════════
// SCRIPT PRINCIPAL - CATERING PROFESIONAL v2.0
// ═══════════════════════════════════════════════════════════════════════════════

let empresaConfig = {};

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('🍽️ Catering Profesional - Cargando...');
    cargarConfiguracion();
    inicializarNavegacion();
    cargarServicios();
    cargarTestimonios();
    inicializarRatings();
});

// ═══════════════════════════════════════════════════════════════════════════════
// CARGAR CONFIGURACIÓN DE LA EMPRESA
// ═══════════════════════════════════════════════════════════════════════════════

async function cargarConfiguracion() {
    try {
        const response = await fetch('/api/config');
        const data = await response.json();
        empresaConfig = data;

        // Actualizar elementos con datos de configuración
        document.getElementById('empresa-nombre').textContent = data.nombre || 'Catering Profesional';
        document.getElementById('empresa-telefono').textContent = data.telefono || '+54 9 388 123-4567';
        document.getElementById('empresa-telefono').href = `tel:${data.telefono}`;
        document.getElementById('empresa-email').textContent = data.email || 'contacto@cateringprofesional.com.ar';
        document.getElementById('empresa-email').href = `mailto:${data.email}`;
        document.getElementById('empresa-ubicacion').textContent = data.ubicacion || 'San Salvador de Jujuy, Jujuy';

        // WhatsApp link
        const whatsappNumber = (data.whatsapp || '+549388123567').replace(/\D/g, '');
        document.getElementById('empresa-whatsapp').href = `https://wa.me/${whatsappNumber}?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20vuestros%20servicios`;

        console.log('✅ Configuración cargada:', empresaConfig);
    } catch (error) {
        console.error('❌ Error al cargar configuración:', error);
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// INICIALIZAR NAVEGACIÓN
// ═══════════════════════════════════════════════════════════════════════════════

function inicializarNavegacion() {
    const navToggle = document.getElementById('navbar-toggle');
    const navMenu = document.getElementById('navbar-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle del menú móvil
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic en un link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Actualizar nav activo al scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// CARGAR SERVICIOS DESDE LA API
// ═══════════════════════════════════════════════════════════════════════════════

async function cargarServicios() {
    try {
        const response = await fetch('/api/servicios');
        const servicios = await response.json();
        const grid = document.getElementById('servicios-grid');

        if (!Array.isArray(servicios) || servicios.length === 0) {
            cargarServiciosPorDefecto();
            return;
        }

        grid.innerHTML = servicios.map((servicio, index) => `
            <div class="servicio-card">
                <img src="${servicio.imagen || '/images/placeholder.jpg'}" alt="${servicio.nombre}" onerror="this.src='/images/placeholder.jpg'">
                <h3>${servicio.nombre}</h3>
                <p>${servicio.descripcion}</p>
                <p class="servicio-precio">Desde $${servicio.precio}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('❌ Error al cargar servicios:', error);
        cargarServiciosPorDefecto();
    }
}

function cargarServiciosPorDefecto() {
    const servicios = [
        {
            nombre: 'Bodas',
            descripcion: 'Menús personalizados para tu día especial con servicio completo de catering y bartending.',
            precio: '2500',
            emoji: '💍'
        },
        {
            nombre: 'Eventos Corporativos',
            descripcion: 'Soluciones de catering profesionales para conferencias, lanzamientos y reuniones empresariales.',
            precio: '1800',
            emoji: '🏢'
        },
        {
            nombre: 'Cumpleaños y Celebraciones',
            descripcion: 'Fiestas memorables con menús variados y servicio atento para todas las edades.',
            precio: '1200',
            emoji: '🎉'
        }
    ];

    const grid = document.getElementById('servicios-grid');
    grid.innerHTML = servicios.map((servicio) => `
        <div class="servicio-card">
            <div style="background: linear-gradient(135deg, #C9A227, #d4b747); padding: 3rem; border-radius: 12px 12px 0 0; display: flex; align-items: center; justify-content: center; color: white; font-size: 2.5rem;">
                ${servicio.emoji}
            </div>
            <div style="padding: 1.5rem;">
                <h3>${servicio.nombre}</h3>
                <p>${servicio.descripcion}</p>
                <p class="servicio-precio">Desde $${servicio.precio}</p>
            </div>
        </div>
    `).join('');
}

// ═══════════════════════════════════════════════════════════════════════════════
// CARGAR TESTIMONIOS DESDE LA API
// ═══════════════════════════════════════════════════════════════════════════════

async function cargarTestimonios() {
    try {
        const response = await fetch('/api/comentarios');
        const comentarios = await response.json();
        const grid = document.getElementById('testimonios-grid');

        if (!Array.isArray(comentarios) || comentarios.length === 0) {
            cargarTestimonosPorDefecto();
            return;
        }

        grid.innerHTML = comentarios
            .filter(c => c.aprobado === true)
            .slice(0, 3)
            .map((comentario) => `
                <div class="testimonio-card">
                    <div class="testimonio-stars">${'★'.repeat(comentario.calificacion)}${'☆'.repeat(5 - comentario.calificacion)}</div>
                    <p class="testimonio-texto">"${comentario.texto}"</p>
                    <p class="testimonio-autor">- ${comentario.nombre}</p>
                </div>
            `).join('');
    } catch (error) {
        console.error('❌ Error al cargar testimonios:', error);
        cargarTestimonosPorDefecto();
    }
}

function cargarTestimonosPorDefecto() {
    const testimonios = [
        {
            texto: 'Excelente servicio de catering. El equipo fue muy profesional y la comida estuvo deliciosa.',
            autor: 'María García',
            calificacion: 5
        },
        {
            texto: 'Nuestra boda fue perfecta gracias a Catering Profesional. Todo fue impecable.',
            autor: 'Juan Rodríguez',
            calificacion: 5
        },
        {
            texto: 'Muy recomendable. Precios justos y excelente atención al cliente.',
            autor: 'Laura López',
            calificacion: 5
        }
    ];

    const grid = document.getElementById('testimonios-grid');
    grid.innerHTML = testimonios.map((testimonio) => `
        <div class="testimonio-card">
            <div class="testimonio-stars">${'★'.repeat(testimonio.calificacion)}${'☆'.repeat(5 - testimonio.calificacion)}</div>
            <p class="testimonio-texto">"${testimonio.texto}"</p>
            <p class="testimonio-autor">- ${testimonio.autor}</p>
        </div>
    `).join('');
}

// ═══════════════════════════════════════════════════════════════════════════════
// RATING SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

function inicializarRatings() {
    const stars = document.querySelectorAll('.star');
    const hiddenInput = document.getElementById('comentario-calificacion');

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            hiddenInput.value = value;

            stars.forEach(s => s.classList.remove('active'));
            for (let i = 0; i < value; i++) {
                stars[i].classList.add('active');
            }
        });

        star.addEventListener('mouseover', function() {
            const value = this.getAttribute('data-value');
            stars.forEach((s, index) => {
                if (index < value) {
                    s.style.color = 'var(--color-gold)';
                } else {
                    s.style.color = 'rgba(201, 162, 39, 0.3)';
                }
            });
        });
    });

    document.getElementById('stars-container').addEventListener('mouseleave', function() {
        const value = hiddenInput.value || 0;
        stars.forEach((s, index) => {
            if (index < value) {
                s.style.color = 'var(--color-gold)';
            } else {
                s.style.color = 'rgba(201, 162, 39, 0.3)';
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// SMOOTH SCROLL PARA ENLACES INTERNOS
// ═══════════════════════════════════════════════════════════════════════════════

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
