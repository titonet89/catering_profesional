# 🐛 Guía de Debugging - Autenticación

## Cómo Ver lo que Está Pasando

### Paso 1: Abrir Herramientas del Desarrollador

**En Windows:**
- Presiona: **F12** o **Ctrl + Shift + I**

**En Mac:**
- Presiona: **Cmd + Option + I**

Verás una ventana como esta:

```
┌─────────────────────────────────────────┐
│ Elements │ Console │ Sources │ Network  │
├─────────────────────────────────────────┤
│                                         │
│  Console aquí                           │
│                                         │
└─────────────────────────────────────────┘
```

### Paso 2: Ir a la Pestaña "Console"

Haz clic en la pestaña **"Console"** para ver los mensajes de depuración.

---

## Qué Ver en la Consola

Cuando abres la página, deberías ver mensajes así:

```
✓ Inicializando autenticación...
DOM cargado, configurando eventos...
Elementos encontrados: {btnLogin: true, btnLogout: false, formAuthEmail: true}
Formulario de email encontrado, agregando event listener
✓ Google Sign-In inicializado
✓ Autenticación inicializada
```

### Si NO ves estos mensajes:
- La autenticación no se inicializó correctamente
- Recarga la página (F5)
- Abre DevTools nuevamente
- Verifica que todos los scripts se cargaron

---

## Problemas y Soluciones

### 1. El botón "Iniciar Sesión" no abre el modal

**En la consola deberías ver:**
```
Click en botón login
```

**Si NO ves esto:**
- El botón no tiene el evento vinculado
- La página no se cargó correctamente
- Solución: Recarga la página (Ctrl+R)

**Si VES esto pero el modal no abre:**
- Hay error en `abrirModalAutenticacion()`
- Mira más abajo en la consola si hay errores rojos

---

### 2. El formulario de Email no funciona

**Pasos para debuggear:**

1. Abre DevTools (F12)
2. Ve a la pestaña **Console**
3. Haz clic en **"Iniciar Sesión"**
4. Completa el formulario:
   - Email: `test@test.com`
   - Contraseña: `test123`
5. Haz clic en **"Iniciar Sesión"**

**Deberías ver en la consola:**
```
Click en botón login
Submit del formulario de email
```

**Si NO ves "Submit del formulario de email":**
- El formulario no está encontrando el elemento
- Busca en la consola: `⚠️ Formulario de email NO encontrado`
- Si lo ves, hay un problema con los IDs en HTML

**Si VES "Submit" pero no funciona:**
- Mira si hay errores rojos en la consola
- El error probablemente te dice qué está mal

---

### 3. Google Sign-In se tilda

**Pasos para debuggear:**

1. Abre DevTools (F12)
2. Ve a **Console**
3. Haz clic en **"Iniciar Sesión"**
4. Haz clic en **"Continuar con Google"**
5. Mira la consola

**Deberías ver:**
```
Click en Google Sign-In
Iniciando Google Sign-In...
```

**Si NO ves esto:**
- El botón no tiene evento
- Solución: Recarga la página

**Si ves pero Google no abre:**
```
Error: Google Sign-In no disponible. Recarga la página.
```

- El script de Google no se cargó
- Verifica que tienes internet
- Cierra y reabre DevTools

**Si Google se abre pero luego se tilda:**
- Mira en **Network** si hay peticiones colgadas
- Presiona Ctrl+Shift+K para limpiar la consola
- Intenta de nuevo

---

### 4. Los estilos no se ven bien

**Pasos para verificar:**

1. Abre DevTools (F12)
2. Ve a la pestaña **Elements**
3. Haz clic en el ícono de cursor (esquina superior izquierda)
4. Haz clic en el modal de autenticación

Deberías ver el HTML resaltado. Luego:

5. En el panel de la derecha, busca la sección **"Styles"**
6. Verifica que ve los estilos CSS

**Si NO ves estilos:**
- El CSS no se está cargando
- En la pestaña **Network**, busca `styles.css`
- Si tiene status rojo (404), el archivo no existe
- Solución: Verifica que `public/assets/css/styles.css` existe

---

## Errores Comunes en la Consola

### Error: "Cannot read property 'getElementById' of null"
```
Error: Cannot read property 'getElementById' of null
```

**Significado:** El DOM no está listo cuando el script corre
**Solución:** Ya está arreglado en el nuevo código, pero si lo ves recarga la página

---

### Error: "Google is not defined"
```
Uncaught ReferenceError: Google is not defined
```

**Significado:** El script de Google no se cargó
**Solución:**
- Verifica que tienes internet
- En **Network**, busca `accounts.google.com/gsi/client`
- Si no está, el script no se cargó
- Recarga la página

---

### Error: "Cannot POST /api/auth/email"
```
POST http://localhost:3000/api/auth/email 404 (Not Found)
```

**Significado:** El servidor no tiene el endpoint
**Solución:**
- Verifica que el servidor está corriendo: `npm start`
- Verifica que `server.js` tiene `/api/auth/email`
- Restart el servidor (Ctrl+C y npm start)

---

## Network Tab - Ver Peticiones

Para ver exactamente qué está pasando con las peticiones:

1. Abre DevTools (F12)
2. Ve a pestaña **Network**
3. Completa el formulario de login
4. Haz clic en "Iniciar Sesión"

Deberías ver una petición POST:
```
POST /api/auth/email  200 OK
```

**Si ves 404:**
- El endpoint no existe
- Mira en `server.js` si está definido

**Si ves 500:**
- Error en el servidor
- Mira en la terminal (donde corre npm start)

**Si no ves nada:**
- La petición no se hizo
- Hay un error en el JavaScript
- Mira la **Console** para errores

---

## Verificar que los Datos se Guardan

En la consola, ejecuta:

```javascript
console.log('User:', sessionStorage.getItem('authUser'))
console.log('Token:', sessionStorage.getItem('authToken'))
```

Deberías ver:
```
User: {"id":"email_abc123","email":"test@test.com","name":"test"}
Token: eyJhbGciOiJIUzI1NiIs...
```

**Si ves `null`:**
- Los datos no se guardaron
- El login no funcionó correctamente

---

## Limpiar Cache y Datos

Si los cambios no se ven, intenta:

### Opción 1: Limpiar sessionStorage
En la consola, ejecuta:
```javascript
sessionStorage.clear()
location.reload()
```

### Opción 2: Forzar recarga de CSS
Presiona: **Ctrl+Shift+R** (Windows) o **Cmd+Shift+R** (Mac)

### Opción 3: Borrar toda la caché
1. Abre DevTools (F12)
2. Haz clic derecho en el botón de recarga
3. Selecciona "Vaciar caché y hacer recarga forzada"

---

## Script de Prueba Rápida

Copia esto en la **Console** y presiona Enter:

```javascript
// Verificar estructura del auth
console.clear()
console.log('=== DEBUG AUTENTICACIÓN ===')
console.log('authState:', authState)
console.log('Elementos:', {
    btnLogin: !!document.getElementById('btn-login'),
    formEmail: !!document.getElementById('form-auth-email'),
    authModal: !!document.getElementById('auth-modal')
})
console.log('SessionStorage:', {
    user: sessionStorage.getItem('authUser'),
    token: sessionStorage.getItem('authToken')
})
console.log('Función existente:', typeof manejarLoginEmail)
```

---

## Resumen - Qué Verificar

| Problema | Dónde Mirar | Qué Buscar |
|----------|------------|-----------|
| Bot don no se abre | Console | "Click en botón login" |
| Formulario no funciona | Console | "Submit del formulario de email" |
| Google se tilda | Console | "Respuesta de Google recibida" |
| Datos no se guardan | Console | `sessionStorage.getItem('authUser')` |
| Estilos rotos | Elements > Styles | Verificar que hay CSS |
| Petición falla | Network | Status 200 u 404 |
| Servidor error | Terminal | Revisar dónde corre npm start |

---

## Contacto y Ayuda

Si tienes un error que no entiendes:

1. **Copia el error completo** desde la consola
2. **Toma una captura de pantalla** de DevTools
3. **Anota qué hiciste** antes del error
4. **Comparte toda esa información**

---

**¡Los logs son tu mejor amigo en debugging! 🐛** Lee lo que dice la consola, es muy clara.
