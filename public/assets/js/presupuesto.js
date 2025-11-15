// ═══════════════════════════════════════════════════════════════════════════════
// CALCULATOR DE PRESUPUESTO PERSONALIZADO
// ═══════════════════════════════════════════════════════════════════════════════

const precios = {
    basico: 15,
    profesional: 25,
    premium: 40
};

const preciosAdicionales = {
    bartending: 300,
    meseros: 500,
    decoracion: 400,
    postre: 200
};

const tiposEventos = {
    bodas: 'Bodas',
    corporativo: 'Evento Corporativo',
    cumpleanos: 'Cumpleaños',
    otro: 'Otro evento'
};

const tiposMenus = {
    basico: 'Básico',
    profesional: 'Profesional',
    premium: 'Premium'
};

document.addEventListener('DOMContentLoaded', function() {
    inicializarPresupuesto();
});

// ═══════════════════════════════════════════════════════════════════════════════
// INICIALIZAR
// ═══════════════════════════════════════════════════════════════════════════════

function inicializarPresupuesto() {
    const btnMenos = document.getElementById('btn-menos');
    const btnMas = document.getElementById('btn-mas');
    const inputPersonas = document.getElementById('presupuesto-personas');
    const selectTipo = document.getElementById('presupuesto-tipo');
    const radioMenus = document.querySelectorAll('input[name="menu"]');
    const checkboxServicios = document.querySelectorAll('.presupuesto-checkbox input');
    const btnCalcular = document.getElementById('btn-calcular-presupuesto');

    // Event listeners para botones +/-
    if (btnMenos) btnMenos.addEventListener('click', () => cambiarPersonas(-1));
    if (btnMas) btnMas.addEventListener('click', () => cambiarPersonas(1));

    // Event listeners para cambios
    if (inputPersonas) inputPersonas.addEventListener('change', calcularPresupuesto);
    if (selectTipo) selectTipo.addEventListener('change', calcularPresupuesto);
    if (btnCalcular) btnCalcular.addEventListener('click', calcularPresupuesto);

    radioMenus.forEach(radio => {
        radio.addEventListener('change', calcularPresupuesto);
    });

    checkboxServicios.forEach(checkbox => {
        checkbox.addEventListener('change', calcularPresupuesto);
    });

    // Calcular inicial
    calcularPresupuesto();
}

// ═══════════════════════════════════════════════════════════════════════════════
// CAMBIAR NÚMERO DE PERSONAS
// ═══════════════════════════════════════════════════════════════════════════════

function cambiarPersonas(cambio) {
    const input = document.getElementById('presupuesto-personas');
    let valor = parseInt(input.value) || 50;
    valor += cambio;

    // Limites
    if (valor < 10) valor = 10;
    if (valor > 500) valor = 500;

    input.value = valor;
    calcularPresupuesto();
}

// ═══════════════════════════════════════════════════════════════════════════════
// CALCULAR PRESUPUESTO
// ═══════════════════════════════════════════════════════════════════════════════

function calcularPresupuesto() {
    // Obtener valores
    const tipo = document.getElementById('presupuesto-tipo').value || 'Selecciona uno';
    const personas = parseInt(document.getElementById('presupuesto-personas').value) || 50;
    const menuSeleccionado = document.querySelector('input[name="menu"]:checked').value;
    const precioMenu = precios[menuSeleccionado] || 15;

    // Calcular subtotal de menú
    const subtotalMenu = personas * precioMenu;

    // Calcular servicios adicionales
    let totalAdicionales = 0;
    const checkboxServicios = document.querySelectorAll('.presupuesto-checkbox input:checked');
    const servicios = [];

    checkboxServicios.forEach(checkbox => {
        const precio = parseInt(checkbox.getAttribute('data-price')) || 0;
        totalAdicionales += precio;
        servicios.push(checkbox.value);
    });

    // Total
    const presupuestoTotal = subtotalMenu + totalAdicionales;

    // Actualizar resumen
    actualizarResumen({
        tipo: tiposEventos[tipo] || tipo,
        personas,
        menu: tiposMenus[menuSeleccionado],
        precioMenu,
        subtotalMenu,
        totalAdicionales,
        presupuestoTotal,
        servicios
    });

    // Mostrar animación
    animarCambio();
}

// ═══════════════════════════════════════════════════════════════════════════════
// ACTUALIZAR RESUMEN
// ═══════════════════════════════════════════════════════════════════════════════

function actualizarResumen(datos) {
    document.getElementById('resumen-tipo').textContent = datos.tipo;
    document.getElementById('resumen-personas').textContent = datos.personas.toLocaleString();
    document.getElementById('resumen-menu').textContent = datos.menu;
    document.getElementById('resumen-precio').textContent = `$${datos.precioMenu.toFixed(2)}`;
    document.getElementById('resumen-subtotal').textContent = `$${datos.subtotalMenu.toLocaleString('es-AR', {minimumFractionDigits: 2})}`;
    document.getElementById('presupuesto-total').textContent = `$${datos.presupuestoTotal.toLocaleString('es-AR', {minimumFractionDigits: 2})}`;

    // Mostrar u ocultar servicios adicionales
    const containerAdicionales = document.getElementById('resumen-adicionales-container');
    if (datos.totalAdicionales > 0) {
        containerAdicionales.style.display = 'flex';
        document.getElementById('resumen-adicionales').textContent = `$${datos.totalAdicionales.toLocaleString('es-AR', {minimumFractionDigits: 2})}`;
    } else {
        containerAdicionales.style.display = 'none';
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMACIÓN DE CAMBIO
// ═══════════════════════════════════════════════════════════════════════════════

function animarCambio() {
    const total = document.getElementById('presupuesto-total');
    if (total) {
        total.style.animation = 'none';
        // Trigger reflow
        void total.offsetWidth;
        total.style.animation = 'pulse 0.5s ease';
    }
}

// Agregar animación CSS si no existe
if (!document.getElementById('presupuesto-animation-styles')) {
    const style = document.createElement('style');
    style.id = 'presupuesto-animation-styles';
    style.textContent = `
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
    `;
    document.head.appendChild(style);
}
