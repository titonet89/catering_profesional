# 📸 GUÍA COMPLETA: ADMIN PANEL E IMÁGENES PERSONALIZADAS

**Fecha:** Noviembre 2024
**Versión:** 1.0
**Estado:** ✅ Lista para usar

---

## 🎯 RESUMEN RÁPIDO

Tienes todo lo que necesitas:
- ✅ **Panel de Admin** completamente funcional
- ✅ **Directorio de imágenes** listo para cargar
- ✅ **Logo** puede colocarse al lado del nombre
- ✅ **Galería de fotos/videos** para subir contenido

---

## 🔐 ACCEDER AL PANEL DE ADMINISTRACIÓN

### **URL del Admin:**
```
http://localhost:3000/admin
```

**Nota:** Actualmente SIN contraseña (abierto para desarrollo)

### **Pasos:**
```
1. El servidor debe estar corriendo (npm start)
2. Abre navegador
3. Ve a: http://localhost:3000/admin
4. Verás el Panel de Administración con todas las opciones
```

---

## 🏢 SECCIÓN 1: EMPRESA (Donde va el Logo)

### **Ubicación:** Admin Panel → Tab "Empresa"

Aquí es donde configuras:
- ✅ **Nombre de la Empresa**
- ✅ **Teléfono**
- ✅ **Email**
- ✅ **Ubicación**
- ✅ **WhatsApp**
- ✅ **LOGO (Aquí cargamos tu imagen)**

### **Cómo cargar tu logo:**

#### **PASO 1: Prepara tu logo**
```
Requisitos:
- Formato: PNG, JPG, o GIF
- Tamaño recomendado: 200x200 píxeles (cuadrado)
- Tamaño máximo: 2 MB
- Fondo transparente (si es PNG, mejor)

Ejemplo bueno:
- Logo_empresa.png (200x200)
- Fondo transparente
- Colores claros que resalten en navbar dorado
```

#### **PASO 2: Ve al Admin**
```
1. Abre: http://localhost:3000/admin
2. Verás tab "Empresa" (ya abierto por defecto)
3. Desplázate hasta "Logo de la Empresa"
```

#### **PASO 3: Carga tu logo**
```
1. Click en el campo "Selecciona archivo"
2. Busca tu logo en tu computadora
3. Selecciona y abre
4. Verás el nombre del archivo
```

#### **PASO 4: Guarda**
```
1. Click en botón azul "Guardar Cambios"
2. Espera a que aparezca mensaje de confirmación
3. El logo se guardará en: public/images/logo.png
```

---

## 🖼️ CÓMO APARECE TU LOGO EN LA WEB

Después de cargar, tu logo aparecerá automáticamente:

### **En la Navbar (superior izquierda):**
```
┌─────────────────────────────────────────┐
│  [LOGO] Catering Profesional  [Menú...]│
│                                         │
│  Este es el resultado                   │
└─────────────────────────────────────────┘
```

**Estructura HTML:**
```html
<div class="navbar-brand">
    <img src="/images/logo.png" alt="Logo" class="logo">
    <span class="company-name">Catering Profesional</span>
</div>
```

El logo y el nombre aparecen **juntos en la navbar** en la esquina superior izquierda.

---

## 📁 ESTRUCTURA DE CARPETAS PARA IMÁGENES

Tu proyecto tiene esta estructura:

```
CateringProfesional/
├── public/
│   ├── images/           ← AQUÍ VAN TUS IMÁGENES
│   │   ├── logo.png      ← Tu logo (se carga automáticamente)
│   │   ├── bodas.jpg
│   │   ├── corporativo.jpg
│   │   ├── cumpleanos.jpg
│   │   └── ...otras fotos
│   ├── videos/           ← Videos (hero background, etc)
│   │   └── hero-bg.mp4
│   └── uploads/          ← Fotos subidas desde admin
│       └── ...archivos generados
```

---

## 🎬 CÓMO CARGAR IMÁGENES PARA LA GALERÍA

### **Sección 2: Galería (Admin Panel)**

#### **PASO 1: Ve a la sección Galería**
```
1. Admin Panel: http://localhost:3000/admin
2. Click en tab "Galería" (a la derecha de "Empresa")
3. Verás área de carga ("Subir Fotos/Videos")
```

#### **PASO 2: Selecciona tus fotos**
```
1. Click en "Selecciona archivo" (área de carga)
2. Puedes seleccionar múltiples fotos (Ctrl+Click)
3. Formatos soportados:
   - JPG / JPEG
   - PNG
   - GIF
   - MP4 (videos)
   - WebM
```

#### **PASO 3: Categoriza tus fotos**
```
ANTES de subir, selecciona la categoría:

┌─────────────────────────────────┐
│ Selecciona categoría ▼          │
│ ├─ Bodas                        │
│ ├─ Corporativo                  │
│ └─ Cumpleaños                   │
└─────────────────────────────────┘

Elegir la categoría es IMPORTANTE para la galería
```

#### **PASO 4: Sube los archivos**
```
1. Después de elegir categoría
2. Click en botón azul "Subir Archivos"
3. Espera a que se carguen
4. Las fotos aparecerán en la galería filtrable
```

---

## 📸 TIPOS Y TAMAÑOS DE IMÁGENES RECOMENDADOS

### **Logo de Empresa**
```
Nombre: logo.png
Tamaño: 200x200px (cuadrado)
Formato: PNG (con fondo transparente, mejor)
Peso máximo: 2MB
Donde aparece: Navbar (esquina superior izquierda)
```

### **Fotos de Galería (Bodas, Corporativo, etc)**
```
Nombre: cualquiera.jpg
Tamaño recomendado: 1200x800px (landscape)
Formato: JPG (más ligero)
Peso máximo: 2-3MB cada una
Donde aparecen: Sección Galería con filtros
Consejo: Comprime tus fotos antes de subir
```

### **Video de Hero (Fondo)**
```
Nombre: hero-bg.mp4
Tamaño recomendado: 1920x1080 (Full HD)
Formato: MP4
Peso: 5-20MB (máximo recomendado)
Donde aparece: Pantalla principal (fondo animado)
```

### **Imágenes Carousel**
```
Nombre: cualquiera.jpg
Tamaño: 800x600px
Formato: JPG
Donde aparecen: Carrusel de "Últimas Bodas y Eventos"
```

---

## 🛠️ CÓMO CAMBIAR EL NOMBRE DE LA EMPRESA

En el mismo Admin Panel, sección "Empresa":

```
1. Abre Admin: http://localhost:3000/admin
2. En el campo "Nombre de la Empresa"
3. Borra "Catering Profesional"
4. Escribe tu nombre
5. Click "Guardar Cambios"
```

El nombre aparecerá automáticamente en:
- ✅ Navbar (al lado del logo)
- ✅ Footer
- ✅ Meta tags del navegador
- ✅ Título de la página

---

## 🎨 VISUALIZAR LOGO Y NOMBRE JUNTOS

### **Cómo se ve en la navbar:**

**ANTES (sin logo):**
```
┌──────────────────────────────────────────┐
│ Catering Profesional  [Menú...]         │
└──────────────────────────────────────────┘
```

**DESPUÉS (con tu logo):**
```
┌──────────────────────────────────────────┐
│ [LOGO] Catering Profesional  [Menú...]  │
└──────────────────────────────────────────┘
```

El logo se coloca automáticamente al lado izquierdo del nombre gracias a este código:

```html
<div class="navbar-brand">
    <img src="/images/logo.png" alt="Logo" class="logo">
    <span class="company-name" id="empresa-nombre">Catering Profesional</span>
</div>
```

**CSS (estilos):**
```css
.navbar-brand {
    display: flex;           /* Logo y nombre lado a lado */
    align-items: center;     /* Verticalmente centrados */
    gap: 1rem;               /* Espacio entre logo y nombre */
}

.logo {
    height: 50px;            /* Altura del logo */
    width: auto;             /* Ancho automático (respeta proporción) */
    object-fit: contain;     /* Ajusta la imagen sin distorsionarla */
}

.company-name {
    font-size: 1.5rem;       /* Tamaño del texto */
    font-weight: 700;        /* Negrita */
    color: white;            /* Color blanco */
}
```

---

## 📊 TODOS LOS TABS DEL ADMIN

### **Tab 1: Empresa** ← LOGO AQUÍ
```
Configuración básica de la empresa
├─ Nombre
├─ Teléfono
├─ Email
├─ Ubicación
├─ WhatsApp
└─ Logo (DONDE CARGAS TU IMAGEN)
```

### **Tab 2: Servicios**
```
Gestión de servicios ofrecidos
├─ Bodas
├─ Eventos Corporativos
├─ Cumpleaños
└─ Otros eventos
```

### **Tab 3: Galería** ← FOTOS AQUÍ
```
Carga de fotos y videos
├─ Subir múltiples archivos
├─ Categorizar (Bodas, Corporativo, Cumpleaños)
└─ Ver y gestionar galería
```

### **Tab 4: Comentarios**
```
Ver y moderar testimonios de clientes
├─ Comentarios pendientes
├─ Comentarios aprobados
└─ Eliminar comentarios
```

### **Tab 5: Contactos**
```
Ver mensajes de contacto del formulario
├─ Mensajes nuevos
├─ Marcar como leído
└─ Eliminar
```

### **Tab 6: Usuarios**
```
Gestión de usuarios registrados
├─ Ver lista de usuarios
├─ Permisos
└─ Eliminar usuarios
```

### **Tab 7: Estadísticas**
```
Analytics y estadísticas
├─ Visitantes
├─ Conversiones
└─ Gráficas
```

---

## 🚀 PASO A PASO: CARGA COMPLETA

### **Paso 1: Prepara tus archivos**
```
1. Tu logo: logo.png (200x200px)
2. Tus fotos: foto1.jpg, foto2.jpg, etc
3. Tus videos: video.mp4 (opcional)
```

### **Paso 2: Abre el Admin**
```
1. npm start (si no está corriendo)
2. Abre: http://localhost:3000/admin
3. Verás el panel automáticamente
```

### **Paso 3: Carga el logo**
```
1. Tab "Empresa" (abierto por defecto)
2. Scroll hacia abajo hasta "Logo de la Empresa"
3. Click en "Selecciona archivo"
4. Elige tu logo.png
5. Click "Guardar Cambios"
6. Verás tu logo en la navbar automáticamente
```

### **Paso 4: Carga fotos de galería**
```
1. Tab "Galería"
2. Click en área de carga
3. Selecciona múltiples fotos (Ctrl+Click)
4. Elige categoría (Bodas, Corporativo, etc)
5. Click "Subir Archivos"
6. Las fotos aparecerán en la galería filtrada
```

### **Paso 5: Verifica en la web**
```
1. Ve a: http://localhost:3000
2. Verás tu logo en la navbar
3. Scroll a "Galería" y verás tus fotos
4. Filtra por categoría
```

---

## 🔧 RUTAS DE ARCHIVOS IMPORTANTES

```
Para cargar en HTML:

Logo:
src="/images/logo.png"

Fotos de ejemplo:
src="/images/bodas1.jpg"
src="/images/corporativo1.jpg"
src="/images/cumpleanos1.jpg"

Videos:
src="/videos/hero-bg.mp4"

Uploads (desde admin):
src="/uploads/..."
```

---

## 📱 CÓMO SE VE EN MÓVIL

El logo y nombre se adaptan automáticamente en móvil:

**Desktop (1920px):**
```
┌────────────────────────────────────────────────────┐
│ [LOGO]  Catering Profesional      [Menú...]       │
└────────────────────────────────────────────────────┘
```

**Mobile (375px):**
```
┌─────────────────────────┐
│ [LOGO]  Catering P. [☰] │
└─────────────────────────┘
```

El logo se mantiene siempre visible en móvil, es responsivo.

---

## ✨ CARACTERÍSTICAS DEL ADMIN

### **Lo que FUNCIONA:**
- ✅ Cargar y guardar información de empresa
- ✅ Subir logo
- ✅ Subir fotos a galería con categorías
- ✅ Ver comentarios/testimonios
- ✅ Ver contactos recibidos
- ✅ Interfaz intuitiva y profesional
- ✅ Respaldo de datos en localStorage

### **Lo que FALTA para Producción:**
- ⚠️ Autenticación (contraseña de admin)
- ⚠️ Base de datos (ahora usa localStorage/memoria)
- ⚠️ Búsqueda avanzada
- ⚠️ Backup automático
- ⚠️ Estadísticas detalladas

---

## 🎯 PRÓXIMOS PASOS

### **Ahora (Para probar):**
```
1. npm start
2. http://localhost:3000/admin
3. Carga tu logo en "Empresa"
4. Carga fotos en "Galería"
5. Ve http://localhost:3000 para ver resultados
```

### **Para Producción:**
```
1. Conectar a base de datos (MongoDB/PostgreSQL)
2. Agregar autenticación (contraseña admin)
3. HTTPS y seguridad
4. Backups automáticos
5. Estadísticas reales
```

---

## 🆘 TROUBLESHOOTING

### **"El logo no aparece"**
```
1. Abre http://localhost:3000/admin
2. Recarga la página (Ctrl+R)
3. Si sigue sin aparecer:
   - En Console (F12): Busca errores 404
   - Verifica que el archivo existe en public/images/
4. Intenta con un logo diferente
```

### **"Las fotos de galería no se ven"**
```
1. Abre Admin → Galería
2. Verifica que seleccionaste una categoría
3. En Console (F12): Busca errores
4. Recarga http://localhost:3000
5. Scroll a Galería y filtra por categoría
```

### **"Los cambios no se guardan"**
```
1. Abre Console (F12)
2. Busca mensajes de error
3. Verifica que el servidor está corriendo
4. Reinicia servidor: Ctrl+C y npm start
5. Intenta guardar nuevamente
```

### **"Admin page blank"**
```
1. Abre http://localhost:3000/admin
2. Presiona F12 (DevTools)
3. Ve a Console
4. Busca errores rojos
5. Si hay errores, reinicia servidor
```

---

## 📸 EJEMPLOS DE NOMBRES DE ARCHIVO

```
Logo:
- logo_empresa.png
- icon_catering.png
- brand_logo.png

Fotos Bodas:
- boda_elegante_1.jpg
- boda_claustro_2.jpg
- boda_jardin_3.jpg

Fotos Corporativo:
- evento_empresa_1.jpg
- reunion_profesional_2.jpg
- conferencia_3.jpg

Videos:
- video_bodas_highlights.mp4
- eventos_reel_2024.mp4
```

---

## 🎨 TIPS PARA MEJORES RESULTADOS

### **Para el Logo:**
```
1. Usa PNG con fondo transparente
2. Cuadrado (mismo ancho y alto)
3. Colores que contrasten con la navbar dorada
4. Sin efectos 3D complicados
5. Mantén simple (se verá pequeño en navbar)
```

### **Para las Fotos:**
```
1. Comprime antes de subir (máximo 2MB)
2. Buena iluminación
3. Fotos horizontales (mejor para galería)
4. Variedad de categorías
5. Alta resolución (1200x800px mínimo)
```

### **Para Videos:**
```
1. Máximo 20MB
2. Formato MP4
3. Resolución 1920x1080 o menor
4. Duración: 15-30 segundos (hero video)
5. Autoplay muted (sin sonido inicial)
```

---

## 📞 INFORMACIÓN DEL SERVIDOR

```
Servidor: http://localhost:3000
Admin: http://localhost:3000/admin
Puerto: 3000
Status: ✅ Corriendo ahora (si ejecutaste npm start)

Para detener: Ctrl+C en la terminal
Para reiniciar: npm start
```

---

**¡Ahora ya sabes cómo usar el admin y cargar tus imágenes personalizadas!** 📸✨

Desarrollado con ❤️ - Noviembre 2024
