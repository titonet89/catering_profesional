# 🔐 Guía: Integración de Autenticación Social

## Google Sign-In & Facebook Login

Esta guía explica cómo integrar autenticación con Google y Facebook en tu sitio profesional.

---

## Opción 1: Google Sign-In (Recomendado)

### Paso 1: Configurar en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a "APIs y servicios" → "Credenciales"
4. Click en "Crear credenciales" → "ID de cliente OAuth 2.0"
5. Selecciona "Aplicación web"
6. Agrega estos URIs autorizados:
   - `http://localhost:3000`
   - `http://localhost:3000/callback`
   - Tu dominio en producción: `https://midominio.com`
   - `https://midominio.com/callback`
7. Copia tu **Client ID**

### Paso 2: Agregar el código HTML

```html
<!-- En tu HTML, antes del </body> -->
<script src="https://accounts.google.com/gsi/client" async defer></script>

<!-- Botón de login con Google -->
<div id="g_id_onload"
     data-client_id="TU_CLIENT_ID_AQUI"
     data-callback="handleCredentialResponse">
</div>
<div class="g_id_signin" data-type="standard"></div>
```

### Paso 3: Agregar JavaScript

```javascript
function handleCredentialResponse(response) {
    // response.credential contiene el JWT
    const token = response.credential;

    // Enviar al servidor
    fetch('/api/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token })
    })
    .then(res => res.json())
    .then(data => {
        console.log('Usuario autenticado:', data);
        // Guardar token, redirigir, etc.
    });
}
```

---

## Opción 2: Facebook Login

### Paso 1: Configurar en Facebook Developers

1. Ve a [Facebook Developers](https://developers.facebook.com)
2. Crea una nueva aplicación o selecciona una existente
3. Ve a "Configuración" → "Básico"
4. Copia tu **App ID** y **App Secret**
5. Agrega en "Dominios válidos":
   - `localhost`
   - Tu dominio en producción

### Paso 2: Agregar el código HTML

```html
<!-- En tu HTML, antes del </body> -->
<script async defer crossorigin="anonymous"
    src="https://connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v18.0&appId=TU_APP_ID_AQUI"
    nonce="ABC123"></script>

<!-- Botón de login con Facebook -->
<div class="fb-login-button"
     data-width="250"
     data-max-rows="1"
     data-size="large"
     data-button-type="login_with"
     data-layout="default"
     data-auto-logout-link="true"
     data-use-continue-as="true">
</div>
```

### Paso 3: Agregar JavaScript

```javascript
FB.AppEvents.logPageView();

FB.Event.subscribe('auth.authResponseChange', function(response) {
    if (response.authResponse) {
        // Usuario logueado
        FB.api('/me?fields=id,name,email', function(response) {
            fetch('/api/auth/facebook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: response.id,
                    name: response.name,
                    email: response.email
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log('Usuario autenticado:', data);
            });
        });
    }
});
```

---

## Backend (Node.js/Express)

### Paso 1: Instalar dependencias

```bash
npm install jsonwebtoken google-auth-library dotenv
```

### Paso 2: Crear rutas de autenticación

```javascript
// server.js - Agregar estas rutas

const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Ruta para Google
app.post('/api/auth/google', async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const userId = payload['sub'];

        // Aquí puedes guardar el usuario en la BD
        const jwtToken = jwt.sign(
            { userId, email: payload.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            token: jwtToken,
            user: {
                id: userId,
                email: payload.email,
                name: payload.name,
                picture: payload.picture
            }
        });
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    }
});

// Ruta para Facebook
app.post('/api/auth/facebook', async (req, res) => {
    try {
        const { id, name, email } = req.body;

        // Aquí puedes guardar el usuario en la BD
        const jwtToken = jwt.sign(
            { userId: id, email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            token: jwtToken,
            user: { id, email, name }
        });
    } catch (error) {
        res.status(401).json({ error: 'Autenticación fallida' });
    }
});
```

### Paso 3: Agregar variables de entorno

```env
GOOGLE_CLIENT_ID=TU_CLIENT_ID_AQUI.apps.googleusercontent.com
FACEBOOK_APP_ID=TU_APP_ID_AQUI
JWT_SECRET=tu_clave_super_secreta_aqui
```

---

## Soluciones a Problemas Comunes

### Google Sign-In no funciona
- Verificar que el Client ID es correcto
- Asegurarse que el dominio está autorizado
- Limpiar cookies del navegador
- Verificar que el script de Google se carga correctamente

### Facebook Login no funciona
- Verificar App ID correcto
- Asegurar que el dominio está en "Dominios válidos"
- Verificar que la app está en modo desarrollo o en vivo
- Comprobar que el nonce es válido

### Token expirado
- Implementar refresh token
- Guardar tokens en base de datos
- Implementar logout automático

---

## Almacenamiento del Token (Frontend)

```javascript
// Guardar token en localStorage (NO ES MÁS SEGURO)
localStorage.setItem('authToken', jwtToken);

// Mejor: Usar sessionStorage
sessionStorage.setItem('authToken', jwtToken);

// O mejor aún: Cookies HTTPOnly (desde servidor)
// Set-Cookie: authToken=...; HttpOnly; Secure; SameSite=Strict
```

---

## Verificación del Token en Rutas Protegidas

```javascript
function verificarToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token requerido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    }
}

// Usar en rutas protegidas
app.get('/api/usuario/perfil', verificarToken, (req, res) => {
    res.json({ user: req.user });
});
```

---

## Dashboard de Usuarios Autenticados

Una vez implementada la autenticación, puedes:

1. **Mostrar perfil del usuario**
2. **Guardar preferencias de usuario**
3. **Crear historial de presupuestos**
4. **Permitir guardar eventos favoritos**
5. **Acceso a área restringida**

---

## Recomendaciones de Seguridad

✅ **HACER:**
- Usar HTTPS en producción
- Validar tokens en el backend
- Usar tokens de corta duración
- Implementar refresh tokens
- Usar cookies HTTPOnly

❌ **NO HACER:**
- Guardar tokens en localStorage
- Enviar datos sensibles en URLs
- Confiar solo en validación frontend
- Guardar contraseñas en texto plano

---

## Próximos Pasos

1. Implementar autenticación social
2. Crear dashboard del usuario
3. Integrar con base de datos
4. Implementar2FA (autenticación de dos factores)
5. Agregar registro con email y contraseña

---

Para más información:
- [Google Sign-In Docs](https://developers.google.com/identity/protocols/oauth2)
- [Facebook Login Docs](https://developers.facebook.com/docs/facebook-login)
- [JWT.io](https://jwt.io)
