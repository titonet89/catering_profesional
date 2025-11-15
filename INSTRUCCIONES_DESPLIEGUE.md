# 🍽️ Catering Profesional - Instrucciones de Despliegue

## ✅ Estado del Proyecto

El proyecto ha sido completamente reorganizado y optimizado siguiendo las mejores prácticas profesionales de desarrollo web.

### Cambios Realizados:

1. **Estructura de Carpetas Profesional**
   - ✅ Archivos estáticos organizados en `public/assets/`
   - ✅ CSS consolidado en un único archivo `styles.css`
   - ✅ JavaScript modularizado por funcionalidad
   - ✅ Rutas correctas en HTML

2. **CSS Mejorado**
   - ✅ Variables CSS organizadas
   - ✅ Diseño responsive completo
   - ✅ Animaciones profesionales
   - ✅ Mobile-first approach

3. **JavaScript Optimizado**
   - ✅ `app.js` - Funcionalidades principales
   - ✅ `carrusel.js` - Galería con navegación
   - ✅ `galeria.js` - Filtros y modal
   - ✅ `formularios.js` - Validación y envío

4. **Configuración**
   - ✅ Archivo `.env` con variables de entorno
   - ✅ Servidor Express configurado correctamente

---

## 🚀 Cómo Ejecutar Localmente

### Paso 1: Instalar Dependencias
```bash
npm install
```

### Paso 2: Iniciar el Servidor
```bash
npm start
```

El servidor correrá en `http://localhost:3000`

### Paso 3: Acceder al Sitio
- **Página Principal**: http://localhost:3000
- **Panel Admin**: http://localhost:3000/admin (próximamente)

---

## 📋 Archivos Importantes

```
CateringProfesional/
├── public/
│   ├── index.html              ← Página principal
│   ├── assets/
│   │   ├── css/
│   │   │   └── styles.css      ← Estilos únicos y consolidados
│   │   └── js/
│   │       ├── app.js          ← Script principal
│   │       ├── carrusel.js     ← Carrusel de fotos
│   │       ├── galeria.js      ← Galería con filtros
│   │       └── formularios.js  ← Validación de formularios
│   ├── images/                 ← Imágenes del sitio
│   ├── videos/                 ← Videos (hero, etc)
│   └── uploads/                ← Fotos/videos subidas
├── admin/                       ← Panel de administración
├── server.js                    ← Servidor Express
├── package.json                 ← Dependencias
├── .env                         ← Variables de entorno
└── .env.example                 ← Plantilla de .env
```

---

## 🎨 Estructura de Datos Esperada

### API `/api/config`
```json
{
  "nombre": "Catering Profesional",
  "telefono": "+54 9 388 123-4567",
  "email": "contacto@ejemplo.com",
  "ubicacion": "San Salvador de Jujuy, Jujuy",
  "whatsapp": "+549388123567"
}
```

### API `/api/servicios`
```json
[
  {
    "id": 1,
    "nombre": "Bodas",
    "descripcion": "Servicio completo...",
    "precio": 2500,
    "imagen": "/images/bodas.jpg"
  }
]
```

### API `/api/galeria`
```json
[
  {
    "id": 1,
    "titulo": "Boda Elegante",
    "url": "/images/bodas1.jpg",
    "categoria": "bodas",
    "tipo": "foto"
  }
]
```

---

## 🌐 Desplegar a Producción

### Opción 1: Render.com (Recomendado - Gratis)

1. **Crear cuenta en Render.com**
   - https://render.com
   - Registrarse con GitHub

2. **Conectar repositorio**
   - Crear repositorio en GitHub con este código
   - Autorizar Render acceder a GitHub

3. **Crear Web Service**
   - Click en "New Web Service"
   - Seleccionar repositorio
   - Configurar:
     - **Name**: catering-profesional
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`

4. **Variables de Entorno**
   - En Render → Environment Variables
   - Agregar las del `.env`

5. **Deploy**
   - Click "Create Web Service"
   - Esperar 5-10 minutos
   - Tu URL: `https://catering-profesional.onrender.com`

### Opción 2: Railway.app (También Gratis)

1. **Crear cuenta**: https://railway.app
2. **Conectar con GitHub**
3. **Nuevo Proyecto** → Seleccionar repositorio
4. **Railway detecta Node.js automáticamente**
5. **Deploy automático**

---

## 🗄️ Base de Datos (Opcional)

### MongoDB Atlas (Nube)

1. **Crear cuenta**: https://mongodb.com/cloud/atlas
2. **Crear Cluster** (M0 - Gratuito)
3. **Crear Usuario**:
   - Username: `admin`
   - Password: contraseña segura
4. **Obtener URI**:
   ```
   mongodb+srv://admin:password@cluster.mongodb.net/catering
   ```
5. **Agregar a `.env`**:
   ```env
   MONGODB_URI=mongodb+srv://admin:password@cluster.mongodb.net/catering
   ```

---

## 🔒 Seguridad - Antes de Desplegar

- [ ] Cambiar `JWT_SECRET` en `.env`
- [ ] Usar contraseña segura en MongoDB
- [ ] Configurar CORS correctamente
- [ ] Validar todas las rutas de API
- [ ] Habilitar HTTPS
- [ ] No subir `.env` a GitHub

---

## 🚨 Solución de Problemas

### "Cannot find module 'express'"
```bash
npm install
npm install --legacy-peer-deps
```

### Puerto 3000 en uso
```bash
# Cambiar puerto
PORT=5000 npm start
```

### Archivos CSS/JS no cargan
- Verificar rutas en HTML
- Confirmar archivos en `public/assets/`
- Limpiar caché del navegador (Ctrl+Shift+Delete)

### API no responde
- Verificar que el servidor está corriendo
- Revisar console del navegador (F12)
- Confirmar endpoints en `server.js`

---

## 📱 Acceso desde Teléfono (Local)

1. PC y teléfono en **MISMA RED WiFi**
2. En terminal: `ipconfig`
3. Buscar "Dirección IPv4" (ej: 192.168.1.5)
4. En teléfono: `http://192.168.1.5:3000`

---

## ✨ Mejoras Futuras

- [ ] Panel de administración funcional
- [ ] Base de datos MongoDB integrada
- [ ] Email de notificaciones
- [ ] Sistema de usuarios
- [ ] Integración con pasarelas de pago
- [ ] SEO optimizado
- [ ] PWA (Progressive Web App)

---

## 📞 Soporte

Para problemas técnicos:
1. Revisar Console (F12)
2. Verificar archivo `.env`
3. Ejecutar: `npm install`
4. Reiniciar servidor

---

## ✅ Checklist Antes de Desplegar

- [ ] Código probado localmente
- [ ] `.env` configurado con valores reales
- [ ] Todas las imágenes/videos presentes
- [ ] Rutas de API funcionando
- [ ] Formularios validando correctamente
- [ ] Responsive design en móvil
- [ ] Sin errores en console (F12)
- [ ] Variables de entorno en plataforma de hosting
- [ ] HTTPS habilitado
- [ ] Dominio configurado (opcional)

---

## 🎉 ¡Listo para Desplegar!

Tu sitio está completamente configurado y listo para producción.

Cualquier duda, revisa la guía o contacta al desarrollador.

**Desarrollado profesionalmente para Catering Profesional** 🍽️
