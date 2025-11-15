# 🍽️ CATERING PROFESIONAL - Sitio Web Profesional

**Versión 2.0** - Sitio web completo con panel de administración, galería interactiva y sistema de presupuestos.

---

## 🎯 DESCRIPCIÓN

Plataforma web profesional para un catering que ofrece servicios para bodas, eventos corporativos y cumpleaños. Incluye panel de administración completo para gestionar contenido.

---

## ✨ CARACTERÍSTICAS PRINCIPALES

### 🌐 **Web Frontend**
- Página principal con video de presentación
- Galería interactiva con 15+ fotos
- Carrusel de eventos
- Sistema de presupuestos en tiempo real
- Testimonios de clientes
- Formulario de contacto
- Responsive en móvil/tablet/desktop

### ⚙️ **Panel de Administración** (`/admin`)
- **Empresa:** Logo, datos de contacto
- **Servicios:** Agregar/editar servicios
- **Galería:** Subir fotos/videos organizados por categoría
- **Comentarios:** Gestionar testimonios
- **Contactos:** Ver mensajes recibidos
- **Usuarios:** Gestión de acceso
- **Estadísticas:** Métricas del sitio

### 🔐 **Autenticación**
- Login por email/contraseña
- Sesiones seguras con JWT
- Datos almacenados en MongoDB

---

## 🚀 CÓMO USAR

### **1. Ver la Web en Vivo**
```
https://catering-profesional.onrender.com
```

### **2. Acceder al Admin**
```
URL: https://catering-profesional.onrender.com/admin
(Disponible para usuarios registrados)
```

### **3. Subir Fotos de Eventos**
1. Ir a Panel Admin → Galería
2. Clickear "Selecciona Archivos"
3. Elegir categoría (Bodas, Corporativo, Cumpleaños)
4. Clickear "Subir Archivos"
5. Las fotos aparecen en la web automáticamente

---

## 🛠️ TECNOLOGÍAS UTILIZADAS

- **Frontend:** HTML5, CSS3, JavaScript vanilla
- **Backend:** Node.js + Express
- **Base de Datos:** MongoDB Atlas (nube)
- **Hosting:** Render
- **Versión Control:** Git + GitHub

---

## 📂 ESTRUCTURA DEL PROYECTO

```
catering_profesional/
├── public/                    # Archivos públicos (web)
│   ├── index.html            # Página principal
│   ├── assets/
│   │   ├── css/styles.css    # Estilos CSS
│   │   ├── js/               # JavaScript del frontend
│   │   └── images/           # Imágenes (logo, etc)
│   └── uploads/              # Carpeta para fotos subidas
├── admin/                     # Panel administrativo
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── server.js                  # Servidor Node.js
├── package.json               # Dependencias npm
├── .env                       # Variables de entorno (local)
└── README.md                  # Este archivo
```

---

## 🔧 INSTALACIÓN LOCAL

### Requisitos:
- Node.js v16+
- npm o yarn
- MongoDB Atlas (cuenta gratis)

### Pasos:

```bash
# 1. Clonar repositorio
git clone https://github.com/titonet89/catering_profesional.git
cd catering_profesional

# 2. Instalar dependencias
npm install

# 3. Crear archivo .env (copiar .env.example)
# Agregar: MONGODB_URI=tu_url_mongodb

# 4. Iniciar servidor
npm start

# 5. Abrir en navegador
http://localhost:3000
```

---

## 📸 FUNCIONALIDADES DE GALERÍA

### Categorías Disponibles:
1. **Bodas** - Matrimonios, ceremonias, bodas civil
2. **Corporativo** - Eventos empresariales, conferencias
3. **Cumpleaños** - Fiestas, cumpleaños infantiles/adultos

### Archivos Soportados:
- Imágenes: JPG, PNG (máx 2MB)
- Videos: MP4, WebM (máx 5MB)

---

## 📞 INFORMACIÓN DE CONTACTO

**Empresa:** Catering Profesional
**Email:** contacto@cateringprofesional.com.ar
**Teléfono:** +54 9 388 123-4567
**WhatsApp:** +549388123567
**Ubicación:** San Salvador de Jujuy, Jujuy, Argentina

---

## 🔐 SEGURIDAD

- Contraseñas hasheadas con bcryptjs
- Tokens JWT para autenticación
- CORS configurado
- Variables sensibles en .env (no en GitHub)
- MongoDB con autenticación

---

## 📈 PRÓXIMOS PASOS (DESPUÉS DE DEPLOY)

### Fase 1: Consolidación (Esta semana)
- [ ] Subir fotos reales de eventos
- [ ] Personalizar información de empresa
- [ ] Recopilar feedback de amigos

### Fase 2: Mejoras (Próximas semanas)
- [ ] Agregar Google Analytics
- [ ] Integrar con WhatsApp automatizado
- [ ] Crear newsletter por email
- [ ] SEO básico (Google Search Console)

### Fase 3: Profesionalización (Después)
- [ ] Comprar dominio propio (ej: misitio.com.ar)
- [ ] Hosting premium ($7-15/mes)
- [ ] SSL/HTTPS certificado
- [ ] Hacer copias de seguridad automáticas

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### "La página tarda mucho en cargar"
- Esto es normal la primera vez (Render se "despierta")
- Las siguientes visitas serán más rápidas

### "No puedo subir fotos en admin"
- Verificar que estés logueado
- Comprobar que el archivo sea < 2MB
- Refreshear la página e intentar de nuevo

### "Las fotos no aparecen en la web"
- Esperar 10 segundos después de subir
- Refreshear la página (Ctrl+R)
- Verificar que la categoría sea correcta

---

## 👨‍💻 DESARROLLO

### Para hacer cambios locales:

```bash
# 1. Editar código
# (Cambiar archivo que necesites)

# 2. Verificar cambios localmente
npm start
# Abrir http://localhost:3000

# 3. Subir a GitHub
git add .
git commit -m "Descripción del cambio"
git push

# 4. Render redeploy automático (2-3 minutos)
# Tu sitio se actualiza automáticamente
```

---

## 📊 ESTADÍSTICAS

- **Páginas:** 1 principal + 1 admin
- **Secciones:** 6 (Inicio, Servicios, Carrusel, Galería, Testimonios, Contacto)
- **Fotos:** 15+ en galería
- **Categorías:** 3 (Bodas, Corporativo, Cumpleaños)
- **Usuarios:** Acceso restringido a admin

---

## 📝 LICENCIA

Proyecto privado de Catering Profesional. Todos los derechos reservados.

---

## 📧 SOPORTE

Para preguntas o problemas técnicos:
- Email: contacto@cateringprofesional.com.ar
- WhatsApp: +549388123567

---

**Última actualización:** Noviembre 2024
**Versión:** 2.0
**Estado:** ✅ En producción
