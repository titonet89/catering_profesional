# 🚀 GUÍA COMPLETA: DESPLEGAR TU WEB

**Fecha:** Noviembre 2024
**Versión:** 1.0
**Estado:** ✅ Listo para Deploy

---

## 🎯 OPCIONES DE DEPLOY

Tienes **3 opciones** para ver tu web funcionando:

```
1️⃣  LOCAL (Ahora)          → Ya está corriendo
2️⃣  GRATIS (Netlify/Vercel) → 5 minutos, dominio gratis
3️⃣  PAGO (Hosting profesional) → Máximo control
```

---

## ✅ OPCIÓN 1: LOCAL (YA ESTÁ FUNCIONANDO)

### **Status Actual:**
```
Servidor: ✅ CORRIENDO EN http://localhost:3000
Admin: ✅ DISPONIBLE EN http://localhost:3000/admin
```

### **Cómo Acceder:**

**Desde tu computadora:**
```
Abre cualquier navegador
Escribe: http://localhost:3000
¡Ves tu sitio!
```

**Desde otros dispositivos EN TU RED:**
```
En otra PC/Teléfono en la misma WiFi:
Abre navegador
Escribe: http://[TU_IP]:3000

Para saber tu IP:
Windows PowerShell:
  ipconfig

Busca: "IPv4 Address" (será como 192.168.x.x)

Ejemplo: http://192.168.1.100:3000
```

### **Ventajas:**
- ✅ Completamente gratis
- ✅ Funciona sin internet
- ✅ Perfecto para testing
- ✅ Modificas en vivo

### **Desventajas:**
- ❌ Solo funciona cuando npm start está corriendo
- ❌ No tiene dominio (solo IP)
- ❌ No es visible desde internet
- ❌ Cuando cierres terminal, se apaga

---

## 🟢 OPCIÓN 2: NETLIFY (RECOMENDADO - GRATIS)

Despliega tu web **GRATIS** en 5 minutos con dominio propio.

### **¿Qué es Netlify?**
```
- Hosting profesional GRATIS
- Tu dominio propio (ej: miempresa.netlify.app)
- HTTPS automático
- Visible desde cualquier lugar
- Despliegue con 1 click
```

### **PASO 1: Crear Cuenta**
```
1. Ve a: https://netlify.com
2. Click "Sign up"
3. Opción: "Sign up with GitHub" (más fácil)
   - Si no tienes GitHub, crealo (gratis)
4. Autoriza Netlify
5. Confirma correo
```

### **PASO 2: Preparar Proyecto**

Antes de subir, asegúrate que todo está listo:

```bash
# 1. Abre terminal en tu proyecto
cd C:\Users\USUARIO\Desktop\CateringProfesional

# 2. Verifica que npm start funciona
npm start

# 3. Presiona Ctrl+C para detener
# (Verificamos que todo está bien)

# 4. Instala Netlify CLI (solo 1 vez)
npm install -g netlify-cli

# 5. Verifica que se instaló
netlify --version
# Debe mostrar versión, ej: "netlify-cli/15.0.0"
```

### **PASO 3: Conectar Repositorio (Opción A - Recomendada)**

**Si tienes GitHub:**

```bash
# 1. Sube tu proyecto a GitHub (ver PASO 4)
# 2. En Netlify.com:
#    - Click "Add new site"
#    - Selecciona "Import an existing project"
#    - Conecta tu GitHub
#    - Selecciona tu repositorio
#    - Click "Deploy"
# 3. ¡Listo! Tu sitio está publicado
```

### **PASO 3 ALTERNATIVA: Deployer Manual (Opción B)**

**Si no quieres usar GitHub:**

```bash
# 1. En tu terminal (en la carpeta del proyecto)
netlify deploy

# 2. Te pedirá que inicies sesión
# - Click en el link que aparece
# - Autoriza en navegador
# - Vuelve a terminal

# 3. Te pedirá publicar como "Draft site" o "Producción"
# Responde:
# - Publish directory: public
# - Esta es la carpeta final

# 4. ¡LISTO! Te dará URL como:
# https://xxx.netlify.app
```

### **RESULTADO:**
```
Tu web estará en:
https://tunombre.netlify.app

Ejemplo:
https://catering-profesional.netlify.app

¡Visible desde cualquier lugar del mundo!
✅ HTTPS automático
✅ Dominio profesional
✅ GRATIS
```

### **VENTAJAS:**
- ✅ Dominio gratis (xxx.netlify.app)
- ✅ HTTPS automático
- ✅ Deploy en 5 minutos
- ✅ Visible desde cualquier lugar
- ✅ Actualizaciones con 1 click
- ✅ Soporte profesional
- ✅ Gratis para siempre

### **DESVENTAJAS:**
- ⚠️ Dominio genérico (netlify.app)
- ⚠️ Si quieres dominio personalizado, cuesta ($)

---

## 🔵 OPCIÓN 3: VERCEL (TAMBIÉN GRATIS)

Similar a Netlify, también es **GRATIS** y muy popular.

### **Pasos Rápidos:**
```
1. Ve a: https://vercel.com
2. Click "Sign Up"
3. Conecta GitHub (mismo proyecto)
4. Click "Import"
5. Click "Deploy"

¡Tu web estará en: xxx.vercel.app
```

### **VENTAJAS:**
- ✅ Gratis
- ✅ Muy rápido
- ✅ Deploy automático con GitHub
- ✅ HTTPS
- ✅ Dominio gratis

### **DESVENTAJAS:**
- ⚠️ Dominio genérico (vercel.app)

---

## 🟣 OPCIÓN 4: HOSTING PROFESIONAL (PAGO)

Si quieres dominio propio (miempresa.com.ar):

### **Opciones Populares:**

**1. Hostinger**
```
Precio: Desde $2.99/mes
Dominio: Puedes usar .com.ar, .com, etc
HTTPS: Automático
Admin: cPanel (fácil)
URL: https://hostinger.com.ar
```

**2. Bluehost**
```
Precio: Desde $2.95/mes
Dominio: Incluido primer año
HTTPS: Automático
Admin: cPanel
URL: https://bluehost.com
```

**3. SiteGround**
```
Precio: Desde $2.99/mes (primeros 3 meses)
Dominio: Puedes usarlo
HTTPS: Automático
Admin: cPanel o Plesk
URL: https://siteground.com
```

**4. Kinsta (Más caro pero muy bueno)**
```
Precio: Desde $35/mes
Dominio: Puedes usarlo
HTTPS: Automático
Admin: Panel personalizado
URL: https://kinsta.com
```

### **Pasos Generales (Hosting Pago):**

```
1. Elige hosting y contrata
2. Registra tu dominio (ej: miempresa.com.ar)
3. Conecta dominio a hosting
4. Sube archivos por FTP o Git
5. Configura base de datos
6. ¡Listo!
```

**Esto es más complejo, necesita más configuración.**

---

## 📊 COMPARACIÓN DE OPCIONES

| Aspecto | Local | Netlify | Vercel | Hosting Pago |
|---------|-------|---------|--------|--------------|
| **Precio** | Gratis | Gratis | Gratis | $2-35/mes |
| **Dominio** | IP local | xxx.netlify.app | xxx.vercel.app | miempresa.com |
| **HTTPS** | No | Sí | Sí | Sí |
| **Visible desde internet** | No | Sí | Sí | Sí |
| **Facilidad** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Ideal para** | Testing | Producción | Producción | Profesional |

---

## 🎯 RECOMENDACIÓN PARA TI

### **OPCIÓN RECOMENDADA: Netlify**

¿Por qué?
```
✅ Completamente GRATIS
✅ Súper fácil (5 minutos)
✅ Dominio profesional (aunque sea netlify.app)
✅ HTTPS automático
✅ Visible desde cualquier lugar
✅ Perfecto para mostrar a clientes
✅ Puedes cambiar a dominio personalizado después
```

**Resultado:**
```
Tu web en: https://catering-profesional.netlify.app
¡Funciona perfectamente!
Clientes pueden verlo desde cualquier lugar
```

---

## 🚀 DEPLOY EN NETLIFY (PASO A PASO COMPLETO)

### **OPCIÓN A: Usando GitHub (Recomendado)**

#### **PASO 1: Crear Repositorio GitHub**

```bash
# 1. Abre terminal en tu proyecto
cd C:\Users\USUARIO\Desktop\CateringProfesional

# 2. Inicializa Git
git init

# 3. Agrega todos los archivos
git add .

# 4. Crea primer commit
git commit -m "Sitio de catering - Deploy inicial"

# 5. Ve a https://github.com/new
# Crea nuevo repositorio
# Nombre: "catering-profesional"
# Descripción: "Sitio web de catering profesional"
# Click "Create repository"

# 6. En terminal, conecta a GitHub
git branch -M main
git remote add origin https://github.com/TUUSUARIO/catering-profesional.git
git push -u origin main

# (Te pedirá usuario y contraseña de GitHub)
```

#### **PASO 2: Desplegar en Netlify**

```
1. Ve a https://netlify.com
2. Inicia sesión (o crea cuenta)
3. Click "Add new site" → "Import an existing project"
4. Selecciona GitHub
5. Autoriza Netlify
6. Busca y selecciona "catering-profesional"
7. Build settings:
   - Base directory: (dejar vacío)
   - Build command: npm run build (o dejar vacío)
   - Publish directory: public
8. Click "Deploy site"
9. ¡LISTO!

Tu sitio estará en:
https://[nombre-generado].netlify.app

Ejemplo:
https://wonderful-elephant-42.netlify.app
```

#### **PASO 3: Cambiar Nombre de Dominio**

```
En Netlify, ve a:
Settings → General → Site details
Click "Change site name"
Nuevo nombre: "catering-profesional"

Ahora tu URL es:
https://catering-profesional.netlify.app

¡Mucho mejor!
```

---

### **OPCIÓN B: Sin GitHub (Deploy Manual)**

```bash
# 1. Instala Netlify CLI
npm install -g netlify-cli

# 2. En tu terminal, entra en la carpeta del proyecto
cd C:\Users\USUARIO\Desktop\CateringProfesional

# 3. Deploy
netlify deploy --prod --dir=public

# 4. Te pedirá:
#    - Inicia sesión (abre link en navegador)
#    - Autoriza
#    - Vuelve a terminal
#    - Presiona Enter

# 5. ¡LISTO!
# Tu sitio estará en una URL como:
# https://wonderful-elephant-42.netlify.app
```

---

## 📱 CÓMO PROBAR EN MÓVIL

Después de desplegar en Netlify:

```
1. En tu teléfono (cualquiera, no necesita ser tu WiFi)
2. Abre navegador
3. Escribe la URL: https://catering-profesional.netlify.app
4. ¡Verás tu sitio completo!
5. Prueba:
   - Scroll en móvil
   - Click en botones
   - Filtra galería
   - Carga imágenes
   - Responsive design
```

---

## 🔄 ACTUALIZAR DESPUÉS DE DEPLOY

Si usaste GitHub:
```bash
# Haces cambios localmente
# Luego en terminal:
git add .
git commit -m "Descripción de cambios"
git push

# ¡Netlify se actualiza automáticamente!
# En 1-2 minutos los cambios estén en vivo
```

Si usaste deploy manual:
```bash
# Repite:
netlify deploy --prod --dir=public
```

---

## ✅ CHECKLIST DE DEPLOY

Antes de desplegar, verifica:

```
[ ] npm start funciona correctamente
[ ] Las imágenes están en public/images/
[ ] El formulario de contacto funciona
[ ] La galería se filtra correctamente
[ ] El responsive funciona en móvil
[ ] No hay errores en Console (F12)
[ ] El admin funciona
[ ] Todo se ve bien visualmente
```

---

## 🎓 DESPUÉS DE DEPLOY

### **URL para compartir con clientes:**
```
https://catering-profesional.netlify.app
```

### **URL del Admin:**
```
https://catering-profesional.netlify.app/admin
```

### **Cosas que puedes hacer:**
```
✅ Compartir por WhatsApp
✅ Compartir por Email
✅ En tus redes sociales
✅ En tu tarjeta de negocios
✅ En tu presentación a clientes
✅ En Google (después config SEO)
```

---

## 💡 TIPS IMPORTANTES

```
✨ Usa Netlify (más fácil que otras opciones)
✨ Dominio netlify.app es profesional
✨ Si quieres .com.ar, necesitas hosting pago
✨ Netlify es mejor para pequeños proyectos
✨ Vercel es mejor para apps grandes
✨ Siempre haz backup de tus archivos
✨ Actualiza regularmente después de deploy
```

---

## 🆘 PROBLEMAS COMUNES

### **"Netlify muestra página en blanco"**
```
1. Verifica que carpeta public/ tiene contenido
2. En Netlify settings, publish directory: "public"
3. Reconstruye el sitio
4. Borra caché navegador (Ctrl+Shift+Del)
5. Recarga página
```

### **"Las imágenes no se ven en Netlify"**
```
1. Verifica que están en public/images/
2. Usa rutas: /images/logo.png
3. No uses: ./images/logo.png
4. Reconstruye en Netlify
```

### **"El formulario no funciona"**
```
1. Netlify tiene formas para manejar formularios
2. Pero por ahora, el tuyo usa API local
3. Para que funcione en Netlify, necesitas:
   - Base de datos en nube
   - API en servidor cloud
   - O usar Netlify Functions
4. Por ahora, solo test en local
```

---

## 📞 INFORMACIÓN ÚTIL

```
Netlify.com (Sign up)
Vercel.com (Sign up)
GitHub.com (Crear cuenta si no tienes)
Hostinger.com.ar (Para dominio .com.ar)

Soporte:
- Netlify: https://support.netlify.com
- Vercel: https://vercel.com/support
- GitHub: https://docs.github.com
```

---

## 🎯 TU PRÓXIMO PASO

### **RECOMENDACIÓN:**

1. **AHORA (Hoy):**
   - Asegúrate que npm start funciona
   - Carga tus imágenes en el admin
   - Prueba todo localmente

2. **MAÑANA (Deploy):**
   - Crea cuenta en Netlify
   - Conecta GitHub
   - Deploy en 5 minutos
   - ¡Tu web está en vivo!

3. **LUEGO:**
   - Comparte URL con clientes
   - Recibe feedback
   - Haz mejoras
   - Push a GitHub
   - ¡Netlify se actualiza automáticamente!

---

**¡Estás listo para desplegar tu web profesional!** 🚀

Desarrollado con ❤️ - Noviembre 2024
