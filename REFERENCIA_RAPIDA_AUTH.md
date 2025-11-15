# 🚀 Referencia Rápida - Autenticación

## 📍 Ubicación de Archivos

```
public/assets/js/auth.js          ← Lógica de autenticación
public/assets/css/styles.css      ← Estilos (líneas 1496-1781)
public/index.html                 ← Modal y navbar (líneas 33-45, 325-357)
server.js                         ← Endpoints (líneas 272-454)
.env                              ← Configuración
```

---

## 🔌 Endpoints de API

| Método | Ruta | Descripción | Requiere JWT |
|--------|------|-------------|--------------|
| POST | `/api/auth/google` | Login con Google | ❌ |
| POST | `/api/auth/facebook` | Login con Facebook | ❌ |
| POST | `/api/auth/email` | Login con Email | ❌ |
| POST | `/api/auth/logout` | Logout | ✅ |
| GET | `/api/usuario/perfil` | Datos del usuario | ✅ |

---

## 🎯 Funciones JavaScript Principales

### Abrir Modal de Login
```javascript
abrirModalAutenticacion()
```

### Cerrar Modal
```javascript
cerrarModalAutenticacion()
```

### Obtener Token Actual
```javascript
const token = obtenerTokenAutenticacion()
```

### Cerrar Sesión
```javascript
cerrarSesion()
```

### Actualizar UI
```javascript
actualizarUIAutenticacion()
```

---

## 💾 Estado Global de Autenticación

```javascript
authState = {
    usuario: null,      // { id, name, email, picture }
    token: null,        // JWT token
    proveedor: null     // "google" | "facebook" | "email"
}
```

---

## 🔑 Variables de Entorno Necesarias

```env
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
FACEBOOK_APP_ID=xxxxx
JWT_SECRET=clave_secreta_segura
```

---

## 🔄 Flujos de Autenticación

### Google Sign-In
```
usuario → click "Google" → Google Dialog → token → POST /api/auth/google
→ JWT returned → sessionStorage → UI updated → ✅
```

### Facebook Login
```
usuario → click "Facebook" → FB Dialog → datos usuario → POST /api/auth/facebook
→ JWT returned → sessionStorage → UI updated → ✅
```

### Email/Contraseña
```
usuario → email+password → validación → POST /api/auth/email
→ JWT returned → sessionStorage → UI updated → ✅
```

---

## 🎨 Elementos HTML Clave

### Botón de Login
```html
<button class="btn-auth" id="btn-login">Iniciar Sesión</button>
```

### Perfil de Usuario (cuando está autenticado)
```html
<div class="user-profile" id="user-profile">
    <img id="user-avatar" class="user-avatar">
    <div class="user-info">
        <span id="user-name"></span>
        <button class="btn-logout" id="btn-logout">Cerrar Sesión</button>
    </div>
</div>
```

### Modal de Autenticación
```html
<div id="auth-modal" class="modal">
    <!-- Contiene Google + Facebook + Email -->
</div>
```

---

## 🎨 Clases CSS Principales

| Clase | Descripción |
|-------|-------------|
| `.btn-auth` | Botón de iniciar sesión en navbar |
| `.auth-modal-content` | Contenedor principal del modal |
| `.auth-btn` | Botón de Google/Facebook |
| `.google-btn` | Botón específico de Google |
| `.facebook-btn` | Botón específico de Facebook |
| `.user-profile` | Contenedor de perfil de usuario |
| `.user-avatar` | Imagen de perfil |
| `.auth-form` | Formulario de email/password |

---

## 🧪 Testing Rápido

### En la consola del navegador:

```javascript
// Ver estado de autenticación
console.log(authState)

// Obtener token
console.log(obtenerTokenAutenticacion())

// Simular logout
cerrarSesion()

// Simular acceso a ruta protegida
fetch('/api/usuario/perfil', {
    headers: { 'Authorization': `Bearer ${obtenerTokenAutenticacion()}` }
}).then(r => r.json()).then(console.log)
```

---

## 🐛 Debug Rápido

### Google no carga
```javascript
// En consola:
window.google?.accounts?.id || console.error("Google no loaded")
```

### Facebook no carga
```javascript
// En consola:
window.FB || console.error("FB no loaded")
```

### Ver tokens guardados
```javascript
// En consola:
console.log({
    user: JSON.parse(sessionStorage.getItem('authUser')),
    token: sessionStorage.getItem('authToken')
})
```

---

## 🔐 Headers Requeridos para Rutas Protegidas

```javascript
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
}

fetch('/api/usuario/perfil', { headers })
```

---

## 📋 Checklist de Configuración

- [ ] Instalar `jsonwebtoken`: `npm install jsonwebtoken`
- [ ] Obtener Google Client ID
- [ ] Obtener Facebook App ID
- [ ] Actualizar `GOOGLE_CLIENT_ID` en `auth.js` (línea ~96)
- [ ] Actualizar `FACEBOOK_APP_ID` en `auth.js` (línea ~162)
- [ ] Actualizar `.env` con credenciales
- [ ] Prueba local en `http://localhost:3000`
- [ ] Verificar en DevTools → Application → sessionStorage

---

## ⚡ Comandos Útiles

```bash
# Iniciar servidor
npm start

# Ver logs
npm start 2>&1 | grep -i auth

# Probar endpoint de Google
curl -X POST http://localhost:3000/api/auth/google \
  -H "Content-Type: application/json" \
  -d '{"token":"test"}'

# Probar endpoint de email
curl -X POST http://localhost:3000/api/auth/email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

---

## 🎯 Casos de Uso Comunes

### Proteger una ruta
```javascript
// En server.js
app.post('/api/reserva', verificarToken, (req, res) => {
    // Solo usuarios autenticados pueden acceder
})
```

### Pasar token a petición
```javascript
// En cualquier script
fetch('/api/datos-privados', {
    headers: {
        'Authorization': `Bearer ${obtenerTokenAutenticacion()}`
    }
})
```

### Mostrar elemento solo si autenticado
```javascript
if (authState.usuario) {
    document.getElementById('mi-elemento').style.display = 'block'
}
```

### Usar datos del usuario
```javascript
const { name, email, picture } = authState.usuario
```

---

## 🚨 Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `Google is not defined` | Script no cargó | Verificar conexión a internet |
| `CORS error` | Dominio no autorizado | Agregar a Google Cloud Console |
| `Invalid token` | JWT expirado | Hacer logout y login nuevamente |
| `User not found` | Email no existe | Registrar usuario primero |
| `sessionStorage empty` | Sin autenticación | Hacer login antes |

---

## 📚 Documen tación Completa

- `GUIA_AUTENTICACION_SOCIAL.md` - Instrucciones detalladas de setup
- `GUIA_AUTENTICACION_IMPLEMENTADA.md` - Documentación técnica
- `SETUP_AUTENTICACION.md` - Pasos de configuración

---

## 🌐 URLs en Diferentes Ambientes

| Ambiente | URL |
|----------|-----|
| Desarrollo | `http://localhost:3000` |
| Staging | `https://staging.tudominio.com` |
| Producción | `https://tudominio.com` |

---

## ✨ Características Principales

✅ Google Sign-In (OAuth 2.0)
✅ Facebook Login (OAuth)
✅ Email/Contraseña
✅ JWT Tokens (7 días expiración)
✅ Persistencia en sessionStorage
✅ Perfil de usuario en navbar
✅ Logout
✅ Rutas protegidas con JWT
✅ Estilos profesionales
✅ Animaciones suaves

---

**Última actualización:** Noviembre 2024
**Versión:** 2.0
**Status:** 🟢 Production Ready (con configuración)
