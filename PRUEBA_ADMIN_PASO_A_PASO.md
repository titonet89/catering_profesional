# 🧪 PRUEBA DEL ADMIN PANEL - GUÍA PASO A PASO

## ✅ PASO 1: ABRE EL ADMIN PANEL

1. **Abre tu navegador** (Chrome, Firefox, Edge, Safari)
2. **Ve a este enlace:**
   ```
   http://localhost:3000/admin
   ```
3. **Deberías ver:** Una pantalla gris con un menú a la izquierda

---

## ✅ PASO 2: REVISA LA SECCIÓN EMPRESA (Logo)

Esta es la sección donde cargas el logo de tu empresa.

### Pasos:
1. Haz click en **"Empresa"** en el menú izquierdo
2. Deberías ver un formulario con estos campos:
   - Nombre de la Empresa
   - Teléfono
   - Email
   - Ubicación
   - WhatsApp
   - **Logo de la Empresa** ← Aquí cargamos el logo

### Para cargar el logo:
1. Click en **"Elegir archivo"** bajo "Logo de la Empresa"
2. Selecciona una imagen de tu computadora
3. Recomendación: Usa una imagen cuadrada (200x200px o 500x500px)
4. Click en **"Guardar Cambios"**
5. Deberías ver un mensaje de éxito

> **Nota:** El logo aparecerá en la parte superior izquierda de tu sitio web

---

## ✅ PASO 3: PRUEBA LA SECCIÓN GALERÍA (Fotos/Videos)

**ESTO ES LO MÁS IMPORTANTE PARA TU MARKETING**

Esta es donde subes todas tus fotos y videos de eventos.

### Pasos:
1. Haz click en **"Galería"** en el menú izquierdo
2. Deberías ver:
   - Un botón **"Selecciona Archivos"**
   - Un dropdown que dice **"Selecciona categoría"**
   - Un botón **"Subir Archivos"** (gris, inactivo por ahora)

### Para subir fotos:

**Paso A: Selecciona tus fotos**
1. Click en **"Selecciona Archivos"**
2. Se abre una ventana para elegir archivos
3. Selecciona VARIAS fotos a la vez (Ctrl+Click en Windows, Cmd+Click en Mac)
4. Luego click en **"Abrir"** o **"Seleccionar"**

**Paso B: Elige la categoría**
1. En el dropdown que dice **"Selecciona categoría"**, elige:
   - **Bodas** - Para fotos de matrimonios
   - **Corporativo** - Para eventos de empresas
   - **Cumpleaños** - Para fiestas de cumpleaños
2. Las fotos irán a esa categoría en tu sitio web

**Paso C: Sube las fotos**
1. Click en **"Subir Archivos"** (ahora debería estar de color)
2. Espera a que se carguen
3. Deberías ver un mensaje: **"✓ Archivos subidos correctamente"**
4. Las fotos aparecerán en tu web automáticamente

---

## ✅ PASO 4: VERIFICA QUE LAS FOTOS APAREZCAN EN TU WEB

1. Ve a tu sitio principal:
   ```
   http://localhost:3000
   ```
2. Baja hasta la sección **"Galería"**
3. Deberías ver tus fotos organizadas por categoría:
   - Bodas
   - Corporativo
   - Cumpleaños

---

## ✅ PASO 5: REVISA LAS OTRAS SECCIONES

### Servicios
- Click en **"Servicios"**
- Aquí defines qué tipos de servicios ofreces
- Agrega cosas como: "Catering de Bodas", "Menú Corporativo", etc.

### Comentarios
- Click en **"Comentarios"**
- Aquí ves testimonios de clientes
- Puedes aprobar/rechazar comentarios

### Contactos
- Click en **"Contactos"**
- Aquí ves los mensajes que te envían desde el formulario
- Puedes ver nombre, email, teléfono, mensaje

### Usuarios
- Click en **"Usuarios"**
- Aquí están los permisos de quién puede acceder al admin

### Estadísticas
- Click en **"Estadísticas"**
- Aquí ves cuántas visitas tiene tu sitio
- Cuántas personas vieron fotos, contactos, etc.

---

## 🎯 FLUJO DIARIO PARA TI (Cuando tengas fotos nuevas)

**Tiempo: 3-5 minutos**

```
1. Abre: http://localhost:3000/admin
2. Click en "Galería"
3. Click en "Selecciona Archivos" → Elige tus fotos
4. En el dropdown, elige la categoría (Bodas/Corporativo/Cumpleaños)
5. Click en "Subir Archivos"
6. ¡Listo! Tus fotos aparecen en la web
```

---

## ⚠️ SI ALGO NO FUNCIONA

### La página no carga
- Verifica que el servidor esté corriendo:
  ```
  npm start
  ```
- Recarga la página (Ctrl+R o Cmd+R)

### Las fotos no se cargan
- Asegúrate de seleccionar la categoría ANTES de hacer click en "Subir"
- Intenta con una foto más pequeña (menos de 2MB)
- Abre la consola del navegador (F12) y busca errores en rojo

### Las fotos se cargan pero no aparecen en la web
- Espera 5 segundos y recarga la página principal (http://localhost:3000)
- A veces el navegador guarda una versión vieja

### Ver errores en la consola
1. Presiona **F12** en tu navegador
2. Va a la pestaña **"Console"**
3. Busca mensajes rojos (❌ errores)
4. Comparte eso conmigo si hay problemas

---

## 📸 TIPOS DE FOTOS QUE DEBERÍAS SUBIR

Para que tu sitio vea bien, carga:

**Para Bodas:**
- La novia y novio
- Los novios con familia
- Detalles de decoración
- Comidas servidas
- Brindis
- Baile

**Para Corporativo:**
- Mesas configuradas para oficinas
- Comidas de negocios
- Eventos de lanzamiento
- Reuniones catering

**Para Cumpleaños:**
- Mesas decoradas
- Pasteles
- Espacios festivos
- Comidas para niños/adultos

---

## 🎨 MEJORES PRÁCTICAS PARA TUS FOTOS

1. **Calidad alta** - Usa fotos en buena resolución
2. **Bien iluminadas** - Que se vea claro el catering y decoración
3. **Variedad** - No todas del mismo ángulo
4. **Reales** - Fotos de eventos verdaderos, no stock photos
5. **Actualiza regularmente** - Sube fotos al menos 1 vez por semana
6. **Diferentes categorías** - No todas de bodas, mezcla

---

## 📱 RESULTADO FINAL

Cuando termines de subir fotos, tu web se verá así:

**Homepage:**
```
┌─────────────────────────────────────────┐
│  Logo    Catering Profesional           │  ← Tu logo aquí
├─────────────────────────────────────────┤
│                                         │
│  ¡Bienvenido a Catering Profesional!    │
│                                         │
├─────────────────────────────────────────┤
│  📸 GALERÍA                              │
│                                         │
│  [Bodas]     [Corporativo] [Cumpleaños]│
│                                         │
│  [Foto 1]  [Foto 2]  [Foto 3]          │
│  [Foto 4]  [Foto 5]  [Foto 6]          │
│                                         │
└─────────────────────────────────────────┘
```

---

## ✨ PRÓXIMO PASO CUANDO QUIERAS

Una vez que probaste todo localmente y estés satisfecho, podemos:

1. **Desplegar a producción** - Tu sitio en internet (Netlify, 5 minutos)
2. **Configurar Google/Facebook** - Para login social
3. **Personalizar más** - Cambiar colores, fuentes, etc.

**¿Necesitas ayuda?** Dime qué pasó y te lo arreglo.
