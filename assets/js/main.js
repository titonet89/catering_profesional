// ═══════════════════════════════════════════════════════════════════════════════
// SCRIPT PRINCIPAL - CATERING PROFESIONAL
// ═══════════════════════════════════════════════════════════════════════════════

// Variables globales
let empresaConfig = {};
let currentPage = 'index';

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Cargando configuración...');
    cargarConfiguracion();
    inicializarNavegacion();
    cargarServicios();
    cargarTestimonios();
});

// ═══════════════════════════════════════════════════════════════════════════════
// Cargar configuración de la empresa
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

        console.log('Configuración cargada:', empresaConfig);
    } catch (error) {
        console.error('Error al cargar configuración:', error);
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Inicializar navegación
// ═══════════════════════════════════════════════════════════════════════════════

function inicializarNavegacion() {
    const navToggle = document.getElementById('navbar-toggle');
    const navMenu = document.getElementById('navbar-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle del menú móvil
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');

            // Actualizar link activo
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Actualizar nav activo al scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
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
// Cargar servicios desde la API
// ═══════════════════════════════════════════════════════════════════════════════

async function cargarServicios() {
    try {
        const response = await fetch('/api/servicios');
        const servicios = await response.json();
        const grid = document.getElementById('servicios-grid');

        if (!Array.isArray(servicios) || servicios.length === 0) {
            // Datos por defecto si no hay servicios en la API
            cargarServiciosPorDefecto();
            return;
        }

        grid.innerHTML = servicios.map(servicio => `
            <div class="servicio-card" style="animation-delay: ${servicios.indexOf(servicio) * 0.1}s">
                ${servicio.imagen ? `<img src="${servicio.imagen}" alt="${servicio.nombre}" class="servicio-imagen">` : '<div class="servicio-imagen" style="background: #ccc;"></div>'}
                <div class="servicio-contenido">
                    <h3 class="servicio-titulo">${servicio.nombre}</h3>
                    <p class="servicio-descripcion">${servicio.descripcion}</p>
                    ${servicio.precio ? `<p class="servicio-precio">Desde $${servicio.precio}</p>` : ''}
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error al cargar servicios:', error);
        cargarServiciosPorDefecto();
    }
}

function cargarServiciosPorDefecto() {
    const servicios = [
        {
            nombre: 'Bodas',
            descripcion: 'Menús personalizados para tu día especial con servicio completo de catering y bartending.',
            precio: '2500'
        },
        {
            nombre: 'Eventos Corporativos',
            descripcion: 'Soluciones de catering profesionales para conferencias, lanzamientos y reuniones empresariales.',
            precio: '1800'
        },
        {
            nombre: 'Cumpleaños y Celebraciones',
            descripcion: 'Fiestas memorables con menús variados y servicio atento para todas las edades.',
            precio: '1200'
        }
    ];

    const grid = document.getElementById('servicios-grid');
    grid.innerHTML = servicios.map((servicio, index) => `
        <div class="servicio-card" style="animation-delay: ${index * 0.1}s">
            <div class="servicio-imagen" style="background: linear-gradient(135deg, #c41e3a 0%, #f4a460 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">
                ${['🎂', '🍽️', '🎉'][index]}
            </div>
            <div class="servicio-contenido">
                <h3 class="servicio-titulo">${servicio.nombre}</h3>
                <p class="servicio-descripcion">${servicio.descripcion}</p>
                <p class="servicio-precio">Desde $${servicio.precio}</p>
            </div>
        </div>
    `).join('');
}

// ═══════════════════════════════════════════════════════════════════════════════
// Cargar testimonios desde la API
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
            .map((comentario, index) => `
                <div class="testimonio-card" style="animation-delay: ${index * 0.1}s">
                    <p class="testimonio-texto">"${comentario.texto}"</p>
                    <p class="testimonio-autor">- ${comentario.nombre}</p>
                    <div class="testimonio-rating">${'★'.repeat(comentario.calificacion)}${'☆'.repeat(5 - comentario.calificacion)}</div>
                </div>
            `).join('');
    } catch (error) {
        console.error('Error al cargar testimonios:', error);
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
    grid.innerHTML = testimonios.map((testimonio, index) => `
        <div class="testimonio-card" style="animation-delay: ${index * 0.1}s">
            <p class="testimonio-texto">"${testimonio.texto}"</p>
            <p class="testimonio-autor">- ${testimonio.autor}</p>
            <div class="testimonio-rating">${'★'.repeat(testimonio.calificacion)}${'☆'.repeat(5 - testimonio.calificacion)}</div>
        </div>
    `).join('');
}

// ═══════════════════════════════════════════════════════════════════════════════
// Smooth scroll para enlaces internos
// ═══════════════════════════════════════════════════════════════════════════════

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ═══════════════════════════════════════════════════════════════════════════════
// Actualizar año en footer
// ═══════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.querySelector('.footer p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = `© ${currentYear} Catering Profesional. Todos los derechos reservados.`;
    }
});
