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

// ═══════════════════════════════════════════════════════════════════════════════
// PRESUPUESTO DE ALQUILERES
// ═══════════════════════════════════════════════════════════════════════════════

function inicializarAlquileres() {
    const btnMenosAlq = document.getElementById('btn-menos-alquiler');
    const btnMasAlq = document.getElementById('btn-mas-alquiler');
    const inputPersonasAlq = document.getElementById('alquileres-personas');
    const checkboxAlquileres = document.querySelectorAll('.alquiler-item');
    const btnCalcularAlq = document.getElementById('btn-calcular-alquileres');

    // Event listeners para botones +/-
    if (btnMenosAlq) btnMenosAlq.addEventListener('click', () => cambiarPersonasAlquiler(-1));
    if (btnMasAlq) btnMasAlq.addEventListener('click', () => cambiarPersonasAlquiler(1));

    // Event listeners para cambios
    if (inputPersonasAlq) inputPersonasAlq.addEventListener('change', calcularAlquileres);
    if (btnCalcularAlq) btnCalcularAlq.addEventListener('click', calcularAlquileres);

    checkboxAlquileres.forEach(checkbox => {
        checkbox.addEventListener('change', calcularAlquileres);
    });

    // Calcular inicial
    calcularAlquileres();
}

function cambiarPersonasAlquiler(cambio) {
    const input = document.getElementById('alquileres-personas');
    let valor = parseInt(input.value) || 50;
    valor += cambio;

    if (valor < 10) valor = 10;
    if (valor > 500) valor = 500;

    input.value = valor;
    calcularAlquileres();
}

function calcularAlquileres() {
    const personas = parseInt(document.getElementById('alquileres-personas').value) || 50;
    const checkboxAlquileres = document.querySelectorAll('.alquiler-item:checked');

    let totalAlquileres = 0;
    const itemsSeleccionados = [];

    checkboxAlquileres.forEach(checkbox => {
        const valor = checkbox.parentElement;
        const texto = valor.querySelector('span').textContent;
        const precio = parseFloat(checkbox.getAttribute('data-price')) || 0;

        // Diferenciar items por persona de items por unidad
        let costoItem = 0;
        if (texto.includes('/pp')) {
            // Por persona
            costoItem = precio * personas;
        } else if (texto.includes('c/u')) {
            // Por unidad (asumimos cantidad = personas/10, mínimo 1)
            const cantidad = Math.ceil(personas / 10);
            costoItem = precio * cantidad;
        } else {
            costoItem = precio;
        }

        totalAlquileres += costoItem;
        itemsSeleccionados.push({
            nombre: texto.replace(/ \(\$[\d.]+.*\)/, '').trim(),
            costo: costoItem.toFixed(2)
        });
    });

    // Actualizar resumen
    document.getElementById('resumen-alq-personas').textContent = personas.toLocaleString();

    const containerItems = document.getElementById('resumen-alq-items');
    if (itemsSeleccionados.length > 0) {
        containerItems.innerHTML = itemsSeleccionados
            .map(item => `
                <div class="alquiler-item-line">
                    <span>${item.nombre}</span>
                    <strong>$${parseFloat(item.costo).toLocaleString('es-AR', {minimumFractionDigits: 2})}</strong>
                </div>
            `)
            .join('');
    } else {
        containerItems.innerHTML = '<p style="color: var(--color-gray-light); font-size: 0.9rem;">Selecciona items para ver el desglose</p>';
    }

    // Actualizar total
    document.getElementById('alquileres-total').textContent = `$${totalAlquileres.toLocaleString('es-AR', {minimumFractionDigits: 2})}`;

    // Animación
    const total = document.getElementById('alquileres-total');
    if (total) {
        total.style.animation = 'none';
        void total.offsetWidth;
        total.style.animation = 'pulse 0.5s ease';
    }
}

// Inicializar presupuesto de alquileres cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarAlquileres);
} else {
    inicializarAlquileres();
}
