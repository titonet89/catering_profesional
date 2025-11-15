# ⚙️ Guía de Setup - Autenticación Social

## 🎯 Resumen Rápido

Se ha implementado un **sistema completo de autenticación** con:
- Google Sign-In (OAuth 2.0)
- Facebook Login (OAuth)
- Email/Contraseña (Demo)

Todo está listo para usar. Solo necesitas configurar tus credenciales de Google y Facebook.

---

## ✅ ¿Qué está listo?

### Frontend Completado ✓
- [x] Modal de login con 3 opciones de autenticación
- [x] Botón "Iniciar Sesión" en navbar
- [x] Estilos profesionales y futuristas
- [x] Gestión de estado de usuario
- [x] Perfil de usuario en navbar
- [x] Botón "Cerrar Sesión"
- [x] Animaciones suaves

### Backend Completado ✓
- [x] Endpoint `/api/auth/google`
- [x] Endpoint `/api/auth/facebook`
- [x] Endpoint `/api/auth/email`
- [x] Endpoint `/api/auth/logout`
- [x] Endpoint `/api/usuario/perfil` (protegido)
- [x] Middleware de JWT
- [x] Tokens con expiración

### Archivos Creados ✓
- [x] `/public/assets/js/auth.js` - Lógica de autenticación
- [x] Estilos en `/public/assets/css/styles.css`
- [x] Documentación completa

---

## 🚀 Pasos para Activar

### Paso 1: Verificar Instalación de Dependencias

```bash
npm list jsonwebtoken
```

Si no está instalado:
```bash
npm install jsonwebtoken
```

### Paso 2: Obtener Credenciales de Google

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto
3. Habilita **Google Identity Services API**
4. Ve a "Credenciales" → "Crear Credenciales" → "ID de Cliente OAuth 2.0"
5. Selecciona "Aplicación Web"
6. URIs autorizados:
   ```
   http://localhost:3000
   http://localhost:3000/callback
   https://tudominio.com
   https://tudominio.com/callback
   ```
7. Copia tu **Client ID**
8. En `public/assets/js/auth.js` (línea ~96), reemplaza:
   ```javascript
   client_id: 'TU_GOOGLE_CLIENT_ID.apps.googleusercontent.com'
   ```

### Paso 3: Obtener Credenciales de Facebook

1. Ve a [Facebook Developers](https://developers.facebook.com/)
2. Crea una nueva aplicación
3. Ve a "Configuración" → "Básico"
4. Copia tu **App ID**
5. En "Dominios válidos" agrega:
   ```
   localhost
   tudominio.com
   ```
6. En `public/assets/js/auth.js` (línea ~162), reemplaza:
   ```javascript
   appId: 'TU_FACEBOOK_APP_ID'
   ```

### Paso 4: Actualizar `.env`

```env
# Google
GOOGLE_CLIENT_ID=tu_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu_client_secret

# Facebook
FACEBOOK_APP_ID=tu_app_id
FACEBOOK_APP_SECRET=tu_app_secret

# JWT Secret
JWT_SECRET=tu_clave_super_secreta_cambiar_en_produccion
```

### Paso 5: Prueba Local

```bash
npm start
```

Abre: `http://localhost:3000`

1. Haz clic en "Iniciar Sesión"
2. Prueba "Continuar con Google"
3. Prueba "Continuar con Facebook"
4. Prueba con email/contraseña (cualquiera en modo demo)

---

## 🧪 Credenciales de Prueba

### Email/Contraseña (Demo)

```
Email: demo@example.com
Contraseña: demo123

O cualquier combinación:
Email: test@example.com
Contraseña: cualquiera
```

---

## 📋 Flujo de Autenticación

```
┌─────────────────────────────────────────────────────┐
│         Usuario Hace Clic "Iniciar Sesión"         │
└──────────────────┬──────────────────────────────────┘
                   │
        ┌──────────┴──────────┬──────────────┐
        │                     │              │
    ┌───▼────┐          ┌────▼───┐    ┌────▼────┐
    │ Google │          │Facebook │    │  Email  │
    └───┬────┘          └────┬───┘    └────┬────┘
        │                    │             │
        └────────┬───────────┴─────────────┘
                 │
         ┌───────▼────────┐
         │  JWT Token +   │
         │  User Data     │
         └───────┬────────┘
                 │
       ┌─────────▼──────────┐
       │ sessionStorage     │
       │ Persistencia       │
       └─────────┬──────────┘
                 │
       ┌─────────▼──────────┐
       │ Mostrar Perfil     │
       │ en Navbar          │
       └────────────────────┘
```

---

## 📱 Interfaz de Usuario

### Navbar sin Autenticar
```
[Inicio] [Servicios] [💰 Presupuesto] [Galería] [Testimonios] [Contacto] [Iniciar Sesión]
```

### Navbar Autenticado
```
[Inicio] [Servicios] [💰 Presupuesto] [Galería] [Testimonios] [Contacto]
                                                                 [👤 Usuario] [Cerrar Sesión]
```

### Modal de Login

```
┌─────────────────────────────────┐
│    ✕  Iniciar Sesión            │
│                                 │
│  Elige tu forma de iniciar      │
│                                 │
│  ┌─────────────────────────────┐ │
│  │ G  Continuar con Google     │ │
│  └─────────────────────────────┘ │
│                                 │
│  ┌─────────────────────────────┐ │
│  │ f  Continuar con Facebook   │ │
│  └─────────────────────────────┘ │
│                                 │
│           — o —                 │
│                                 │
│  Email:      [____________]     │
│  Contraseña: [____________]     │
│                                 │
│  ┌─────────────────────────────┐ │
│  │  Iniciar Sesión             │ │
│  └─────────────────────────────┘ │
│                                 │
│  ¿No tienes cuenta? Crear una   │
│                                 │
└─────────────────────────────────┘
```

---

## 🔑 Variables de Entorno

Actualizar el archivo `.env`:

```env
# ═══════════════════════════════════════════════════════════════════════════════
# SERVIDOR
PORT=3000
NODE_ENV=development

# ═══════════════════════════════════════════════════════════════════════════════
# EMPRESA
EMPRESA_NOMBRE=Catering Profesional
EMPRESA_TELEFONO=+54 9 388 123-4567
EMPRESA_EMAIL=contacto@cateringprofesional.com.ar
EMPRESA_UBICACION=San Salvador de Jujuy, Jujuy
EMPRESA_WHATSAPP=+549388123567

# ═══════════════════════════════════════════════════════════════════════════════
# AUTENTICACIÓN - GOOGLE
GOOGLE_CLIENT_ID=tu_client_id_aqui.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu_client_secret_aqui

# AUTENTICACIÓN - FACEBOOK
FACEBOOK_APP_ID=tu_app_id_aqui
FACEBOOK_APP_SECRET=tu_app_secret_aqui

# ═══════════════════════════════════════════════════════════════════════════════
# SEGURIDAD
JWT_SECRET=tu_clave_super_secreta_cambiar_en_produccion_12345

# ═══════════════════════════════════════════════════════════════════════════════
# BASE DE DATOS (Opcional - MongoDB)
# MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/catering

# ═══════════════════════════════════════════════════════════════════════════════
# EMAILS (Opcional)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=tu_email@gmail.com
# SMTP_PASS=tu_contraseña_app

# ═══════════════════════════════════════════════════════════════════════════════
# CONFIGURACIÓN
MAX_FILE_SIZE=50MB
CORS_ORIGIN=*
```

---

## 🔒 Seguridad

### Implementado
✅ JWT Tokens con 7 días de expiración
✅ SessionStorage (datos se limpian al cerrar navegador)
✅ Middleware de verificación en rutas protegidas
✅ CORS habilitado
✅ Validación de entrada

### Para Producción
- [ ] Usar HTTPS (muy importante)
- [ ] Verificar tokens de Google con librería oficial
- [ ] Verificar tokens de Facebook con librería oficial
- [ ] Hash de contraseñas con bcrypt
- [ ] Base de datos para usuarios
- [ ] Refresh tokens
- [ ] Rate limiting
- [ ] 2FA

---

## 📚 Archivos Relevantes

### Frontend
```
public/
├── index.html                    ← Modal y botón navbar
├── assets/
│   ├── css/
│   │   └── styles.css           ← Estilos auth (200+ líneas)
│   └── js/
│       ├── auth.js              ← Lógica completa de auth
│       └── app.js               ← App principal
```

### Backend
```
server.js                         ← 5 nuevos endpoints de auth
.env                              ← Configuración
```

### Documentación
```
GUIA_AUTENTICACION_SOCIAL.md     ← Instrucciones detalladas
GUIA_AUTENTICACION_IMPLEMENTADA.md ← Resumen técnico
SETUP_AUTENTICACION.md            ← Este archivo
```

---

## 🧩 Integración con Otras Funciones

### Formulario de Contacto
El token de autenticación se puede pasar al enviar formularios:

```javascript
// En formularios.js
const token = obtenerTokenAutenticacion();

const response = await fetch('/api/contacto', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(datos)
});
```

### Presupuesto Personalizado
Los datos del presupuesto se pueden guardar en el perfil:

```javascript
// En presupuesto.js
if (authState.usuario) {
    // Guardar presupuesto con usuario autenticado
    fetch('/api/presupuestos', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${obtenerTokenAutenticacion()}`
        },
        body: JSON.stringify(presupuesto)
    });
}
```

---

## 📞 Soporte y Troubleshooting

### Google Sign-In no funciona
```
❌ "Google is not defined"
→ Verificar que el script se carga: accounts.google.com/gsi/client

❌ CORS Error
→ Verificar que el dominio está autorizado en Google Cloud Console

❌ El modal de Google no aparece
→ Verificar que window.google.accounts.id existe
→ Revisar consola para errores
```

### Facebook Login no funciona
```
❌ "FB is not defined"
→ Verificar que el SDK de Facebook se carga

❌ App no autorizada
→ Verificar que el App ID es correcto
→ Verificar que el dominio está en "Dominios válidos"

❌ Usuario no autoriza permisos
→ Revisar que la app solicita permisos correctos
```

### Usuario no se guarda
```
❌ sessionStorage vacío
→ Verificar que el navegador soporta sessionStorage
→ Verificar que no hay errores en consola
→ Verificar que el token se retorna desde /api/auth/
```

---

## 🚀 Deploy a Producción

### Antes de Desplegar

1. **Cambiar JWT_SECRET** a algo seguro:
   ```bash
   npm install crypto
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Obtener HTTPS Certificate** (obligatorio para OAuth)

3. **Actualizar URLs autorizadas** en Google y Facebook

4. **Cambiar NODE_ENV** a `production`:
   ```env
   NODE_ENV=production
   ```

5. **Configurar Base de Datos** para persistencia

### Desplegar en Render.com

```bash
git push heroku main
```

O en el dashboard de Render:
1. Conectar repositorio
2. Agregar variables de entorno
3. Deploy

---

## ✨ Próximas Mejoras

- [ ] Verificación real de tokens (google-auth-library)
- [ ] Base de datos MongoDB
- [ ] Recuperación de contraseña
- [ ] Cambio de contraseña
- [ ] 2FA
- [ ] Perfil de usuario editable
- [ ] Historial de eventos
- [ ] Guardados favoritos
- [ ] Sincronización entre dispositivos
- [ ] Push notifications

---

## 📖 Links Útiles

- [Google Sign-In Setup](https://developers.google.com/identity/gsi/web)
- [Facebook Login Setup](https://developers.facebook.com/docs/facebook-login)
- [JWT Documentation](https://jwt.io)
- [Express.js Guide](https://expressjs.com/)
- [sessionStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)

---

**Fecha de Creación:** Noviembre 2024
**Versión:** 2.0
**Estado:** 🟢 Listo para Desarrollo

¡Cualquier pregunta, revisa los archivos de documentación o la consola del navegador para más detalles!
