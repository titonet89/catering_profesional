// ═══════════════════════════════════════════════════════════════════════════════
// AUTENTICACIÓN - GOOGLE Y FACEBOOK
// ═══════════════════════════════════════════════════════════════════════════════
// Versión Simplificada y Funcional - Noviembre 2024

// ═══════════════════════════════════════════════════════════════════════════════
// ESTADO DE AUTENTICACIÓN
// ═══════════════════════════════════════════════════════════════════════════════

const authState = {
    usuario: null,
    token: null,
    proveedor: null
};

// Cargar usuario desde sessionStorage al iniciar
function cargarUsuarioGuardado() {
    try {
        const usuarioGuardado = sessionStorage.getItem('authUser');
        const tokenGuardado = sessionStorage.getItem('authToken');

        if (usuarioGuardado && tokenGuardado) {
            authState.usuario = JSON.parse(usuarioGuardado);
            authState.token = tokenGuardado;
            console.log('✓ Usuario cargado desde sessionStorage:', authState.usuario.name);
            actualizarUIAutenticacion();
        }
    } catch (error) {
        console.error('❌ Error cargando usuario:', error);
        sessionStorage.clear();
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// INICIALIZAR AUTENTICACIÓN - VERSIÓN MEJORADA
// ═══════════════════════════════════════════════════════════════════════════════

function inicializarAutenticacion() {
    console.log('🔄 Inicializando autenticación...');

    // Esperar a que el DOM esté completamente listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', configurarEventos);
    } else {
        configurarEventos();
    }

    function configurarEventos() {
        console.log('📡 DOM listo, configurando eventos...');

        cargarUsuarioGuardado();

        // Obtener elementos del DOM
        const btnLogin = document.getElementById('btn-login');
        const btnLogout = document.getElementById('btn-logout');
        const authModalClose = document.getElementById('auth-modal-close');
        const authModal = document.getElementById('auth-modal');
        const btnGoogleSignin = document.getElementById('btn-google-signin');
        const btnFacebookSignin = document.getElementById('btn-facebook-signin');
        const formAuthEmail = document.getElementById('form-auth-email');

        // Log de elementos encontrados
        console.log('🔍 Elementos encontrados:', {
            btnLogin: !!btnLogin,
            btnLogout: !!btnLogout,
            formAuthEmail: !!formAuthEmail,
            authModal: !!authModal,
            btnGoogleSignin: !!btnGoogleSignin,
            btnFacebookSignin: !!btnFacebookSignin
        });

        // BOTÓN DE LOGIN - ABRIR MODAL
        if (btnLogin) {
            btnLogin.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('👆 Click en botón login');
                abrirModalAutenticacion();
            });
        } else {
            console.warn('⚠️ Botón de login NO encontrado');
        }

        // BOTÓN DE LOGOUT
        if (btnLogout) {
            btnLogout.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('👆 Click en botón logout');
                cerrarSesion();
            });
        }

        // CERRAR MODAL (X)
        if (authModalClose) {
            authModalClose.addEventListener('click', () => {
                console.log('👆 Click en cerrar modal');
                cerrarModalAutenticacion();
            });
        }

        // CERRAR MODAL AL HACER CLICK FUERA
        if (authModal) {
            authModal.addEventListener('click', (e) => {
                if (e.target === authModal) {
                    console.log('👆 Click fuera del modal');
                    cerrarModalAutenticacion();
                }
            });
        }

        // BOTÓN GOOGLE
        if (btnGoogleSignin) {
            btnGoogleSignin.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('👆 Click en Google Sign-In');
                manejarGoogle();
            });
        } else {
            console.warn('⚠️ Botón Google NO encontrado');
        }

        // BOTÓN FACEBOOK
        if (btnFacebookSignin) {
            btnFacebookSignin.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('👆 Click en Facebook Login');
                manejarFacebook();
            });
        } else {
            console.warn('⚠️ Botón Facebook NO encontrado');
        }

        // FORMULARIO DE EMAIL
        if (formAuthEmail) {
            console.log('✓ Formulario de email encontrado');
            formAuthEmail.addEventListener('submit', async (e) => {
                e.preventDefault();
                console.log('👆 Submit del formulario de email');
                await manejarLoginEmail(e);
            });
        } else {
            console.warn('❌ Formulario de email NO encontrado');
        }

        console.log('✅ Autenticación inicializada correctamente');
    }
}

// Llamar a inicialización cuando el script cargue
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarAutenticacion);
} else {
    inicializarAutenticacion();
}

// ═══════════════════════════════════════════════════════════════════════════════
// MODAL DE AUTENTICACIÓN
// ═══════════════════════════════════════════════════════════════════════════════

function abrirModalAutenticacion() {
    const authModal = document.getElementById('auth-modal');
    if (authModal) {
        authModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        console.log('📂 Modal abierto');
    }
}

function cerrarModalAutenticacion() {
    const authModal = document.getElementById('auth-modal');
    if (authModal) {
        authModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Limpiar campos del formulario
        const form = document.getElementById('form-auth-email');
        if (form) form.reset();
        console.log('📂 Modal cerrado');
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// GOOGLE SIGN-IN - VERSIÓN SIMPLIFICADA
// ═══════════════════════════════════════════════════════════════════════════════

function manejarGoogle() {
    console.log('🔐 Iniciando Google Sign-In...');

    // Verificar si Google está disponible
    if (!window.google || !window.google.accounts || !window.google.accounts.id) {
        console.error('❌ Google Sign-In no está disponible');
        mostrarError('Google Sign-In no está disponible. Recarga la página.');
        return;
    }

    try {
        // Mostrar Google One Tap UI
        window.google.accounts.id.prompt((notification) => {
            if (notification.isNotDisplayed()) {
                console.warn('⚠️ Google One Tap no se mostró:', notification.getNotDisplayedReason());
            }
            if (notification.isSkippedMoment()) {
                console.log('⏭️ Usuario cerró Google One Tap');
            }
        });
    } catch (error) {
        console.error('❌ Error con Google Prompt:', error);
        mostrarError('Error al abrir Google Sign-In. Intenta nuevamente.');
    }
}

// Callback de respuesta de Google (llamado por la librería de Google)
function handleCredentialResponse(response) {
    console.log('📨 Respuesta de Google recibida');
    manejarRespuestaGoogle(response);
}

async function manejarRespuestaGoogle(response) {
    console.log('🔄 Procesando respuesta de Google...');

    try {
        if (!response || !response.credential) {
            console.error('❌ No se recibió credential de Google');
            mostrarError('Error: No se recibió respuesta de Google');
            return;
        }

        const token = response.credential;
        console.log('🔑 Token recibido, enviando al servidor...');

        // Enviar token al servidor
        const respuestaServidor = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token })
        });

        const datos = await respuestaServidor.json();
        console.log('📥 Respuesta del servidor:', datos);

        if (respuestaServidor.ok && datos.success) {
            // Guardar usuario y token
            authState.usuario = datos.user;
            authState.token = datos.token;
            authState.proveedor = 'google';

            // Guardar en sessionStorage
            sessionStorage.setItem('authUser', JSON.stringify(datos.user));
            sessionStorage.setItem('authToken', datos.token);

            console.log('✅ Autenticación exitosa:', datos.user.name);
            mostrarExito('¡Bienvenido ' + datos.user.name + '!');

            setTimeout(() => {
                actualizarUIAutenticacion();
                cerrarModalAutenticacion();
            }, 800);
        } else {
            console.error('❌ Error del servidor:', datos);
            mostrarError(datos.error || 'Error en la autenticación');
        }
    } catch (error) {
        console.error('❌ Error en Google Sign-In:', error);
        mostrarError('Error al conectar con Google. Intenta nuevamente.');
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// FACEBOOK LOGIN
// ═══════════════════════════════════════════════════════════════════════════════

function manejarFacebook() {
    console.log('🔐 Iniciando Facebook Login...');

    // Verificar si Facebook SDK está cargado
    if (!window.FB) {
        console.warn('⚠️ Facebook SDK no está cargado, cargando...');
        cargarFacebookSDK();
        setTimeout(() => {
            manejarFacebook();
        }, 1500);
        return;
    }

    try {
        FB.login((response) => {
            console.log('📨 Respuesta de Facebook:', response.status);
            if (response.authResponse) {
                obtenerDatosFacebook(response);
            } else {
                console.error('❌ Usuario no autorizó Facebook Login');
                mostrarError('No se pudo conectar con Facebook. Intenta nuevamente.');
            }
        }, { scope: 'public_profile,email' });
    } catch (error) {
        console.error('❌ Error con Facebook Login:', error);
        mostrarError('Error al iniciar Facebook Login');
    }
}

function cargarFacebookSDK() {
    console.log('📥 Cargando Facebook SDK...');

    window.fbAsyncInit = function() {
        FB.init({
            appId: 'TU_FACEBOOK_APP_ID', // CAMBIAR CON TU APP ID
            xfbml: true,
            version: 'v18.0'
        });
        console.log('✓ Facebook SDK inicializado');
    };

    // Cargar el script de Facebook
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/es_ES/sdk.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

function obtenerDatosFacebook(response) {
    console.log('🔄 Obteniendo datos de Facebook...');

    if (!window.FB) {
        mostrarError('Facebook SDK no está disponible');
        return;
    }

    FB.api('/me?fields=id,name,email,picture', async (datosFacebook) => {
        try {
            console.log('📨 Datos de Facebook:', datosFacebook);

            // Enviar datos al servidor
            const respuestaServidor = await fetch('/api/auth/facebook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: datosFacebook.id,
                    name: datosFacebook.name,
                    email: datosFacebook.email || 'facebook_sin_email@example.com',
                    picture: datosFacebook.picture?.data?.url
                })
            });

            const datos = await respuestaServidor.json();
            console.log('📥 Respuesta del servidor:', datos);

            if (respuestaServidor.ok && datos.success) {
                // Guardar usuario y token
                authState.usuario = datos.user;
                authState.token = datos.token;
                authState.proveedor = 'facebook';

                // Guardar en sessionStorage
                sessionStorage.setItem('authUser', JSON.stringify(datos.user));
                sessionStorage.setItem('authToken', datos.token);

                console.log('✅ Autenticación exitosa con Facebook:', datos.user.name);
                mostrarExito('¡Bienvenido ' + datos.user.name + '!');

                setTimeout(() => {
                    actualizarUIAutenticacion();
                    cerrarModalAutenticacion();
                }, 800);
            } else {
                console.error('❌ Error del servidor:', datos);
                mostrarError(datos.error || 'Error en la autenticación con Facebook');
            }
        } catch (error) {
            console.error('❌ Error procesando Facebook auth:', error);
            mostrarError('Error al procesar autenticación con Facebook');
        }
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// AUTENTICACIÓN CON EMAIL Y CONTRASEÑA
// ═══════════════════════════════════════════════════════════════════════════════

async function manejarLoginEmail(e) {
    e.preventDefault();
    console.log('🔄 Procesando login por email...');

    const emailInput = document.getElementById('auth-email');
    const passwordInput = document.getElementById('auth-password');

    if (!emailInput || !passwordInput) {
        console.error('❌ Inputs de email o password no encontrados');
        mostrarError('Error: Formulario incompleto');
        return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Validar campos
    if (!email || !password) {
        console.warn('⚠️ Campos vacíos');
        mostrarError('Por favor completa todos los campos');
        return;
    }

    // Validar formato de email
    if (!validarEmail(email)) {
        console.warn('⚠️ Email inválido');
        mostrarError('Por favor ingresa un email válido');
        return;
    }

    try {
        console.log('📤 Enviando credenciales al servidor...');

        const respuesta = await fetch('/api/auth/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const datos = await respuesta.json();
        console.log('📥 Respuesta del servidor:', datos);

        if (respuesta.ok && datos.success) {
            // Guardar usuario y token
            authState.usuario = datos.user;
            authState.token = datos.token;
            authState.proveedor = 'email';

            // Guardar en sessionStorage
            sessionStorage.setItem('authUser', JSON.stringify(datos.user));
            sessionStorage.setItem('authToken', datos.token);

            console.log('✅ Autenticación exitosa:', datos.user.name);
            mostrarExito('¡Bienvenido ' + datos.user.name + '!');

            // Limpiar formulario
            document.getElementById('form-auth-email').reset();

            setTimeout(() => {
                actualizarUIAutenticacion();
                cerrarModalAutenticacion();
            }, 800);
        } else {
            console.error('❌ Error del servidor:', datos);
            mostrarError(datos.error || 'Error en la autenticación. Verifica tus datos.');
        }
    } catch (error) {
        console.error('❌ Error en login por email:', error);
        mostrarError('Error al conectar con el servidor. Intenta nuevamente.');
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// CERRAR SESIÓN
// ═══════════════════════════════════════════════════════════════════════════════

function cerrarSesion() {
    console.log('🚪 Cerrando sesión...');

    // Limpiar estado
    authState.usuario = null;
    authState.token = null;
    authState.proveedor = null;

    // Limpiar sessionStorage
    sessionStorage.removeItem('authUser');
    sessionStorage.removeItem('authToken');

    // Si es Google, desconectar
    if (window.google && window.google.accounts) {
        try {
            window.google.accounts.id.disableAutoSelect();
        } catch (e) {}
    }

    // Si es Facebook, desconectar
    if (window.FB) {
        try {
            FB.logout();
        } catch (e) {}
    }

    console.log('✓ Sesión cerrada');
    mostrarExito('Sesión cerrada');
    actualizarUIAutenticacion();
}

// ═══════════════════════════════════════════════════════════════════════════════
// ACTUALIZAR UI DE AUTENTICACIÓN
// ═══════════════════════════════════════════════════════════════════════════════

function actualizarUIAutenticacion() {
    console.log('🎨 Actualizando UI de autenticación...');

    const authNav = document.getElementById('auth-nav');
    const userProfile = document.getElementById('user-profile');
    const authMenu = document.getElementById('auth-menu');
    const btnLogin = document.getElementById('btn-login');
    const userName = document.getElementById('user-name');
    const userAvatar = document.getElementById('user-avatar');

    if (!authNav || !userProfile || !authMenu) {
        console.warn('⚠️ Elementos de navegación no encontrados');
        return;
    }

    if (authState.usuario) {
        // Usuario autenticado
        console.log('✓ Mostrando perfil de usuario:', authState.usuario.name);

        // Ocultar botón de login
        if (btnLogin) btnLogin.style.display = 'none';

        // Mostrar perfil
        userProfile.style.display = 'flex';
        if (userName) userName.textContent = authState.usuario.name;

        // Mostrar avatar si existe
        if (userAvatar && authState.usuario.picture) {
            userAvatar.src = authState.usuario.picture;
            userAvatar.style.display = 'block';
        }

        authMenu.style.display = 'block';
    } else {
        // Usuario no autenticado
        console.log('✓ Usuario no autenticado');

        // Mostrar botón de login
        if (btnLogin) btnLogin.style.display = 'block';

        // Ocultar perfil
        userProfile.style.display = 'none';
        authMenu.style.display = 'none';
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// NOTIFICACIONES Y UTILIDADES
// ═══════════════════════════════════════════════════════════════════════════════

function mostrarError(mensaje) {
    console.error('❌', mensaje);
    mostrarMensaje(mensaje, 'error');
}

function mostrarExito(mensaje) {
    console.log('✅', mensaje);
    mostrarMensaje(mensaje, 'success');
}

function mostrarMensaje(mensaje, tipo) {
    // Crear elemento de mensaje
    const messageDiv = document.createElement('div');
    messageDiv.className = `mensaje-${tipo}`;
    messageDiv.textContent = mensaje;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideDown 0.4s ease;
        max-width: 400px;
        word-wrap: break-word;
        ${tipo === 'error' ? 'background: linear-gradient(135deg, rgba(239, 68, 68, 0.95), rgba(220, 38, 38, 0.95)); color: white;' : ''}
        ${tipo === 'success' ? 'background: linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(5, 150, 105, 0.95)); color: white;' : ''}
    `;

    document.body.appendChild(messageDiv);

    // Auto-remover después de 4 segundos
    setTimeout(() => {
        messageDiv.style.animation = 'slideUp 0.4s ease';
        setTimeout(() => {
            messageDiv.remove();
        }, 400);
    }, 4000);
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
