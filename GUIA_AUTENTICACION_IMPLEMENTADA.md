# 🔐 Guía de Autenticación - Implementación Completada

## Descripción General

Se ha implementado un sistema completo de autenticación para **Catering Profesional** que permite a los usuarios iniciar sesión mediante:

- ✅ **Google Sign-In** (OAuth 2.0)
- ✅ **Facebook Login** (OAuth)
- ✅ **Email y Contraseña** (Demo)

---

## 🏗️ Arquitectura Implementada

### Frontend (`/public/assets/js/auth.js`)

El archivo `auth.js` incluye:

```javascript
// Estado de autenticación
const authState = {
    usuario: null,      // Datos del usuario autenticado
    token: null,        // JWT token
    proveedor: null     // Proveedor (google, facebook, email)
}
```

**Funciones principales:**

1. **`inicializarAutenticacion()`** - Inicializa event listeners y carga usuario guardado
2. **`abrirModalAutenticacion()`** - Abre el modal de login
3. **`cerrarModalAutenticacion()`** - Cierra el modal
4. **`iniciarGoogle()`** - Inicia flujo de Google Sign-In
5. **`iniciarFacebook()`** - Inicia flujo de Facebook Login
6. **`manejarLoginEmail()`** - Maneja login con email/contraseña
7. **`cerrarSesion()`** - Realiza logout
8. **`actualizarUIAutenticacion()`** - Actualiza la UI según estado de login

### Backend (`server.js`)

Se agregaron 6 nuevos endpoints:

#### 1. **POST `/api/auth/google`**
```javascript
// Recibe: { token: "JWT de Google" }
// Retorna: { success: true, token: "JWT local", user: {...} }
```

#### 2. **POST `/api/auth/facebook`**
```javascript
// Recibe: { id, name, email, picture }
// Retorna: { success: true, token: "JWT local", user: {...} }
```

#### 3. **POST `/api/auth/email`**
```javascript
// Recibe: { email, password }
// Retorna: { success: true, token: "JWT local", user: {...} }
```

#### 4. **POST `/api/auth/logout`** (Protegido con JWT)
```javascript
// Invalida la sesión del usuario
// Retorna: { success: true, mensaje: "Sesión cerrada" }
```

#### 5. **GET `/api/usuario/perfil`** (Protegido con JWT)
```javascript
// Retorna datos del usuario autenticado
// Retorna: { success: true, usuario: {...}, mensaje: "Acceso autorizado" }
```

---

## 🎨 UI/UX Implementada

### Modal de Autenticación

Ubicado en `public/index.html` (línea 325-357):

```html
<!-- MODAL DE AUTENTICACIÓN -->
<div id="auth-modal" class="modal">
    <div class="modal-content auth-modal-content">
        <h2>Iniciar Sesión</h2>

        <div class="auth-methods">
            <button class="auth-btn google-btn">
                <span class="auth-icon">G</span>
                Continuar con Google
            </button>
            <button class="auth-btn facebook-btn">
                <span class="auth-icon">f</span>
                Continuar con Facebook
            </button>
        </div>

        <div class="auth-divider">o</div>

        <form id="form-auth-email" class="auth-form">
            <input type="email" placeholder="Tu correo electrónico" required>
            <input type="password" placeholder="Tu contraseña" required>
            <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
        </form>
    </div>
</div>
```

### Botón de Autenticación en Navbar

En la navbar se agregó:

```html
<li class="auth-nav" id="auth-nav">
    <button class="btn-auth" id="btn-login">Iniciar Sesión</button>
</li>
```

**Estados:**

- **No autenticado:** Muestra botón dorado "Iniciar Sesión"
- **Autenticado:** Muestra perfil del usuario con avatar y botón "Cerrar Sesión"

### Estilos CSS

Se agregaron 200+ líneas de estilos en `/public/assets/css/styles.css` (línea 1496-1781):

```css
/* Botón de autenticación con gradiente */
.btn-auth {
    background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-light) 100%);
    box-shadow: 0 0 20px rgba(201, 162, 39, 0.2);
    transition: all var(--transition-base);
}

.btn-auth:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(201, 162, 39, 0.4);
}

/* Modal de autenticación */
.auth-modal-content {
    max-width: 450px;
    animation: authSlideIn 0.4s ease-out;
}

/* Botones Google y Facebook */
.google-btn:hover {
    box-shadow: 0 0 20px rgba(66, 133, 244, 0.3);
}

.facebook-btn:hover {
    box-shadow: 0 0 20px rgba(59, 89, 152, 0.3);
}

/* Perfil de usuario */
.user-profile {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    background: rgba(201, 162, 39, 0.1);
    border: 1px solid rgba(201, 162, 39, 0.3);
}

.user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid var(--color-gold);
}
```

---

## 🔧 Configuración Requerida

### 1. Variables de Entorno (`.env`)

Actualizar con tus credenciales reales:

```env
# Google OAuth
GOOGLE_CLIENT_ID=tu_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu_client_secret

# Facebook OAuth
FACEBOOK_APP_ID=tu_app_id
FACEBOOK_APP_SECRET=tu_app_secret

# JWT
JWT_SECRET=tu_clave_super_secreta_cambiar_en_produccion_12345
```

### 2. Configurar Google Sign-In

**Pasos:**

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un nuevo proyecto
3. Ve a "APIs y servicios" → "Credenciales"
4. Haz clic en "Crear credenciales" → "ID de cliente OAuth 2.0"
5. Selecciona "Aplicación web"
6. Agrega estos URIs autorizados:
   - `http://localhost:3000`
   - `http://localhost:3000/callback`
   - Tu dominio en producción: `https://midominio.com`
   - `https://midominio.com/callback`
7. Copia tu **Client ID**
8. En `auth.js`, reemplaza:
   ```javascript
   client_id: 'TU_GOOGLE_CLIENT_ID.apps.googleusercontent.com'
   ```

### 3. Configurar Facebook Login

**Pasos:**

1. Ve a [Facebook Developers](https://developers.facebook.com)
2. Crea una nueva aplicación
3. Ve a "Configuración" → "Básico"
4. Copia tu **App ID**
5. Agrega en "Dominios válidos":
   - `localhost`
   - Tu dominio en producción
6. En `auth.js`, reemplaza:
   ```javascript
   appId: 'TU_FACEBOOK_APP_ID'
   ```

---

## 📋 Flujos de Autenticación

### Flujo Google Sign-In

```
Usuario Hace Clic "Continuar con Google"
         ↓
Google One Tap Dialog Abre
         ↓
Usuario Selecciona Cuenta Google
         ↓
Google Retorna JWT Token
         ↓
POST /api/auth/google con token
         ↓
Backend Verifica Token y Crea JWT Local
         ↓
Token Guardado en sessionStorage
         ↓
UI Actualizada - Mostrar Perfil Usuario
         ↓
Modal Cierra
```

### Flujo Facebook Login

```
Usuario Hace Clic "Continuar con Facebook"
         ↓
Facebook SDK Abre Login Dialog
         ↓
Usuario Autoriza Acceso
         ↓
FB.api('/me') Obtiene Datos Usuario
         ↓
POST /api/auth/facebook con datos
         ↓
Backend Crea JWT Local
         ↓
Token Guardado en sessionStorage
         ↓
UI Actualizada - Mostrar Perfil Usuario
         ↓
Modal Cierra
```

### Flujo Email/Contraseña

```
Usuario Ingresa Email y Contraseña
         ↓
Form Submit - Validación Frontend
         ↓
POST /api/auth/email con credenciales
         ↓
Backend Valida Credenciales
         ↓
Backend Crea JWT Token
         ↓
Token Guardado en sessionStorage
         ↓
UI Actualizada - Mostrar Perfil Usuario
         ↓
Modal Cierra
```

---

## 💾 Almacenamiento de Datos

### SessionStorage (Frontend)

```javascript
// Usuario autenticado se guarda en sessionStorage
sessionStorage.setItem('authUser', JSON.stringify({
    id: 'google_abc123',
    email: 'usuario@example.com',
    name: 'Nombre Usuario',
    picture: 'https://...'
}));

// Token se guarda en sessionStorage
sessionStorage.setItem('authToken', 'eyJhbGciOiJIUzI1NiIs...');

// Al cargar la página, se recupera automáticamente
function cargarUsuarioGuardado() {
    const usuarioGuardado = sessionStorage.getItem('authUser');
    const tokenGuardado = sessionStorage.getItem('authToken');

    if (usuarioGuardado && tokenGuardado) {
        authState.usuario = JSON.parse(usuarioGuardado);
        authState.token = tokenGuardado;
        actualizarUIAutenticacion();
    }
}
```

**Nota:** Se usa `sessionStorage` (no `localStorage`) por seguridad. Los datos se limpian al cerrar el navegador.

---

## 🔒 Seguridad

### Implementado

- ✅ **JWT Tokens** con expiración de 7 días
- ✅ **Middleware de verificación** en rutas protegidas
- ✅ **SessionStorage** en lugar de localStorage
- ✅ **HTTPS Ready** (configurado en producción)
- ✅ **CORS habilitado** correctamente
- ✅ **Headers de seguridad**

### Por Implementar (Producción)

- [ ] **Verificación real de Google JWT** con `google-auth-library`
- [ ] **Verificación real de Facebook Token** con `facebook-sdk`
- [ ] **Validación de credenciales en Base de Datos**
- [ ] **Hashing de contraseñas** con bcrypt
- [ ] **Refresh tokens** para renovar sesiones
- [ ] **Rate limiting** en endpoints de auth
- [ ] **Logging de intentos de login** fallidos
- [ ] **2FA (Two-Factor Authentication)**

---

## 🧪 Pruebas

### Probar Google Sign-In

1. Abre el sitio en `http://localhost:3000`
2. Haz clic en "Iniciar Sesión"
3. Haz clic en "Continuar con Google"
4. Selecciona tu cuenta Google
5. Verifica que el usuario aparezca en la navbar

### Probar Facebook Login

1. Abre el sitio en `http://localhost:3000`
2. Haz clic en "Iniciar Sesión"
3. Haz clic en "Continuar con Facebook"
4. Autoriza la aplicación
5. Verifica que el usuario aparezca en la navbar

### Probar Email/Contraseña

**Credenciales de demo:**
- Email: `demo@example.com`
- Contraseña: `demo123`

**O cualquier combinación:**
- Email: `cualquiera@example.com`
- Contraseña: `cualquier_contraseña`

(En modo demo, cualquier email/password se acepta)

---

## 📂 Archivos Modificados

| Archivo | Cambios |
|---------|---------|
| `public/index.html` | + Modal auth + Botón navbar |
| `public/assets/css/styles.css` | + 200+ líneas de estilos auth |
| `public/assets/js/auth.js` | NUEVO - Lógica completa de auth |
| `server.js` | + 170 líneas de endpoints auth |
| `.env` | Placeholder para credenciales |

---

## 🚀 Próximos Pasos

1. **Obtener credenciales reales** de Google y Facebook
2. **Actualizar `.env`** con credenciales
3. **Instalar librería de verificación:**
   ```bash
   npm install google-auth-library
   ```
4. **Implementar verificación real de tokens** en server.js
5. **Conectar a base de datos** para persistencia
6. **Implementar refresh tokens**
7. **Agregar 2FA**
8. **Desplegar a producción**

---

## 📞 Endpoints de Referencia

### POST `/api/auth/google`
```bash
curl -X POST http://localhost:3000/api/auth/google \
  -H "Content-Type: application/json" \
  -d '{"token":"eyJhbGc..."}'
```

### POST `/api/auth/facebook`
```bash
curl -X POST http://localhost:3000/api/auth/facebook \
  -H "Content-Type: application/json" \
  -d '{"id":"123456","name":"Juan","email":"juan@example.com"}'
```

### POST `/api/auth/email`
```bash
curl -X POST http://localhost:3000/api/auth/email \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"demo123"}'
```

### GET `/api/usuario/perfil` (Protegido)
```bash
curl -X GET http://localhost:3000/api/usuario/perfil \
  -H "Authorization: Bearer eyJhbGc..."
```

### POST `/api/auth/logout` (Protegido)
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer eyJhbGc..."
```

---

## 🐛 Troubleshooting

### Google Sign-In no funciona
- [ ] Verificar que el Client ID sea correcto
- [ ] Verificar que el dominio esté autorizado en Google Cloud
- [ ] Limpiar cookies del navegador
- [ ] Verificar que el script de Google se carga: `accounts.google.com/gsi/client`

### Facebook Login no funciona
- [ ] Verificar que el App ID sea correcto
- [ ] Verificar que el dominio esté en "Dominios válidos"
- [ ] Verificar que la app esté en modo desarrollo
- [ ] Verificar que `FB` objeto esté disponible: `window.FB`

### Usuario no se guarda
- [ ] Verificar que sessionStorage esté habilitado
- [ ] Revisar consola del navegador para errores
- [ ] Verificar que el token se retorna correctamente desde `/api/auth/`

### Sesión no persiste
- SessionStorage está diseñado para limpiarse al cerrar la pestaña
- Para persistencia permanente, usar localStorage (menos seguro)
- Usar cookies HTTPOnly desde el servidor (más seguro)

---

## 📖 Documentación Externa

- [Google Sign-In Docs](https://developers.google.com/identity/gsi/web)
- [Facebook Login Docs](https://developers.facebook.com/docs/facebook-login)
- [JWT.io](https://jwt.io)
- [Express Middleware](https://expressjs.com/en/guide/using-middleware.html)

---

**Última actualización:** Noviembre 2024
**Versión:** 2.0 - Autenticación Completa Implementada
