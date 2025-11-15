# 🚀 PASO A PASO - DEPLOYMENT RENDER + MONGODB

**Tiempo total: 20-30 minutos**

Este documento te guía paso a paso. Lee cada sección completa antes de hacer click.

---

## FASE 1: CREAR CUENTA GITHUB (5 minutos)

### PASO 1.1: Ir a GitHub

1. Abre tu navegador
2. Ve a: https://github.com
3. Click en **"Sign up"** (arriba a la derecha)

### PASO 1.2: Crear cuenta

Completa el formulario:
```
Email:           tu-email@gmail.com (usa un email real)
Contraseña:      Algo seguro (8+ caracteres)
Nombre usuario:  catering-profesional (o tu nombre)
```

**Importante:**
- Anota tu **nombre de usuario** (lo vamos a necesitar)
- Guarda la **contraseña** en lugar seguro
- Verifica tu email (GitHub te envía un link)

### PASO 1.3: Configuración inicial (opcional)

GitHub te puede pedir:
- "Are you a student?" → NO
- "Do you use GitHub for work?" → YES
- "What features are you interested in?" → Click en lo que quieras

**Cuando termines:** Deberías estar en tu dashboard de GitHub (con página de inicio)

---

## FASE 2: SUBIR CÓDIGO A GITHUB (5 minutos)

Una vez que tengas cuenta GitHub, voy a hacer lo siguiente POR TI:

1. **Crear repositorio** en tu GitHub
2. **Subir tu código** desde tu computadora
3. **Verificar** que todo está en GitHub

> **Yo hago esto automáticamente. Solo necesito tu nombre de usuario de GitHub.**

---

## FASE 3: CREAR CUENTA MONGODB (5 minutos)

### PASO 3.1: Ir a MongoDB

1. Abre navegador
2. Ve a: https://www.mongodb.com/cloud/atlas
3. Click en **"Try Free"** (verde, arriba)

### PASO 3.2: Crear cuenta

Elige cómo crear cuenta:
- **Google** (recomendado - más rápido)
- **Email**

**Si eliges Email:**
```
Email:           tu-email@gmail.com
Contraseña:      Algo seguro (12+ caracteres)
Nombre:          Tu nombre real
```

**Si eliges Google:**
- Solo clickea tu cuenta de Google
- MongoDB accede directamente

### PASO 3.3: Crear Cluster (Base de Datos)

1. Una vez logueado, ves botón **"Create"** (azul)
2. Click en **"Create a Deployment"**
3. Selecciona:
   - **Free** (M0) → $0/mes
   - **Region:** Elige una cercana a ti (Sudamérica)
   - Click **"Create Deployment"**

### PASO 3.4: Usuario de Base de Datos

MongoDB te pide crear un usuario para acceder:

```
Username:        admin
Password:        Algo seguro y diferente
```

**IMPORTANTE:**
- Anota el **username** y **password**
- NO compartas estas credenciales con nadie
- Las vas a usar en Render

### PASO 3.5: Obtener URL de Conexión

1. En MongoDB, ve a **"Databases"** (menú)
2. Busca tu cluster recién creado
3. Click en **"Connect"** (botón gris)
4. Selecciona **"Drivers"** → **"Node.js"**
5. Verás algo como:
```
mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/catering
```

**Copia y guarda esta URL en un lugar seguro (Notepad, por ejemplo)**

---

## FASE 4: CREAR CUENTA RENDER (5 minutos)

### PASO 4.1: Ir a Render

1. Abre navegador
2. Ve a: https://render.com
3. Click en **"Get Started"** (arriba derecha) o **"Sign Up"**

### PASO 4.2: Crear cuenta

Elige cómo:
- **GitHub** (recomendado)
- **Google**
- **Email**

**Si conectas con GitHub:**
- GitHub te pide autorización
- Click en **"Authorize render"**
- ¡Listo!

### PASO 4.3: Esperar validación

Render puede pedir:
- Tu número de teléfono (para verificar)
- O número de tarjeta (para verificar, no te cobra)

Completa lo que pida.

---

## FASE 5: DESPLEGAR EN RENDER (5 minutos)

Una vez que tengas las 3 cuentas, voy a:

### PASO 5.1: Conectar repositorio GitHub

1. En Render, click **"New +"** (arriba)
2. Selecciona **"Web Service"**
3. Click **"Connect Repository"**
4. Busca tu repositorio: `catering-profesional`
5. Click **"Connect"**

### PASO 5.2: Configurar Web Service

Completa el formulario:

```
Name:           catering-profesional
Environment:    Node
Build Command:  npm install
Start Command:  node server.js
Region:         (elige más cercano a ti)
```

### PASO 5.3: Agregar Variables de Entorno

En la misma pantalla, ve a **"Environment"** y agrega:

```
Key: MONGODB_URI
Value: mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/catering

Key: NODE_ENV
Value: production

Key: GOOGLE_CLIENT_ID
Value: (dejar en blanco por ahora, si no tienes)

Key: FACEBOOK_APP_ID
Value: (dejar en blanco por ahora, si no tienes)
```

### PASO 5.4: Deploy

Click **"Create Web Service"** (botón azul abajo)

Render va a:
1. Clonar tu código de GitHub
2. Instalar dependencias (npm install)
3. Iniciar el servidor
4. **Generar URL pública**

**Espera 5-10 minutos** mientras compila.

---

## FASE 6: VERIFICACIÓN (2 minutos)

### Una vez que Render termina:

1. Render muestra una **URL pública** como:
   ```
   https://catering-profesional-xxxx.onrender.com
   ```

2. Click en la URL para probar
3. Deberías ver tu sitio web funcionando

4. Prueba:
   - [ ] Homepage carga
   - [ ] Menú funciona
   - [ ] Admin panel: `/admin`
   - [ ] Galería muestra fotos
   - [ ] Formulario de contacto funciona

### Si todo funciona:

✓ ¡Tu web está ONLINE!

---

## 🎯 RESULTADO FINAL

Después del deployment, tendrás:

✓ **URL pública:** `https://catering-profesional-xxxx.onrender.com`
✓ **Compartible:** Puedes enviar a amigos
✓ **24/7 Online:** Siempre accesible
✓ **MongoDB:** Base de datos en la nube
✓ **Admin Panel:** Funcional para agregar fotos

---

## ⚠️ COSAS IMPORTANTES

### URL de Render
- Primero es: `catering-profesional-xxxx.onrender.com`
- Después puedes: Cambiar el nombre (settings)
- Eventualmente: Comprar dominio propio (ejemplo.com)

### Variables de Entorno
- NUNCA compartas la URL de MongoDB
- Está protegida en Render
- No aparece en GitHub

### Actualizaciones futuras
- Haces cambios en tu código local
- Haces `git push` a GitHub
- Render automáticamente redeploy (2-3 min)

---

## 🔧 SI ALGO FALLA

### Error: "Build failed"
```
Solución: Verifica que package.json está en la carpeta raíz
          npm install funciona localmente
```

### Error: "Cannot connect to MongoDB"
```
Solución: Verifica URL de MongoDB en variables de entorno
          IP whitelist de MongoDB (debe incluir Render)
```

### Error: "Port already in use"
```
Solución: Usa PORT de variable de entorno
          (ya configurado en server.js)
```

### Sitio carga pero fotos no aparecen
```
Solución: Verificar que subiste fotos en admin local
          Esperar 1 minuto
          Recarga página (Ctrl+F5)
```

---

## 📞 PRÓXIMOS PASOS

Una vez desplegado:

1. **Compartir con amigos:**
   - Envía URL pública
   - Pide feedback
   - Anota sugerencias

2. **Recopilar feedback:**
   - ¿Qué les falta?
   - ¿Qué cambios?
   - ¿Fácil de usar?

3. **Hacer cambios:**
   - Edita código en tu computadora
   - Git push a GitHub
   - Render redeploy automático

4. **Comprar hosting premium:**
   - Una vez tengas feedback
   - Elige: Render $7/mes, Vercel, AWS, etc.
   - Compra dominio propio (ejemplo.com.ar)

---

## 🚀 CUANDO ESTÉS LISTO

**Yo voy a:**
1. Crear repositorio GitHub por ti
2. Subir tu código
3. Guiarte en MongoDB
4. Guiarte en Render
5. Hacer el deployment completo

**Solo necesito:**
- ✓ Que tengas cuenta GitHub (nombre de usuario)
- ✓ Que tengas cuenta MongoDB (URL de conexión)
- ✓ Que tengas cuenta Render (email verificado)

**¿Listo?** Avísame cuándo empezamos. 🚀
