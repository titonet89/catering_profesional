// ═══════════════════════════════════════════════════════════════════════════════
// SERVIDOR PRINCIPAL - CATERING PROFESIONAL
// ═══════════════════════════════════════════════════════════════════════════════

const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// ═══════════════════════════════════════════════════════════════════════════════
// MIDDLEWARE
// ═══════════════════════════════════════════════════════════════════════════════

// CORS y parseo de datos
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  createParentPath: true,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
}));

// ═══════════════════════════════════════════════════════════════════════════════
// ARCHIVOS ESTÁTICOS
// ═══════════════════════════════════════════════════════════════════════════════

// Servir página principal y public desde raíz
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',
  etag: false
}));

// Servir assets (CSS, JS, fonts) con caché
app.use(express.static(path.join(__dirname, 'public/assets'), {
  maxAge: '7d',
  etag: false
}));

// Servir panel admin
app.use('/admin', express.static(path.join(__dirname, 'admin'), {
  maxAge: '1d',
  etag: false
}));

// Servir uploads
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'), {
  maxAge: '30d'
}));

// ═══════════════════════════════════════════════════════════════════════════════
// RUTAS PRINCIPALES
// ═══════════════════════════════════════════════════════════════════════════════

// Página principal
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'public/index.html');
  console.log('📄 Sirviendo index.html desde:', indexPath);
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('❌ Error sirviendo index.html:', err);
      res.status(500).send('Error: No se puede servir index.html');
    }
  });
});

// API para obtener configuración del sitio
app.get('/api/config', (req, res) => {
  const config = {
    nombre: process.env.EMPRESA_NOMBRE || 'Catering Profesional',
    telefono: process.env.EMPRESA_TELEFONO || '+54 9 388 123-4567',
    email: process.env.EMPRESA_EMAIL || 'contacto@cateringprofesional.com.ar',
    ubicacion: process.env.EMPRESA_UBICACION || 'San Salvador de Jujuy, Jujuy',
    whatsapp: process.env.EMPRESA_WHATSAPP || '+549388123567',
    años_experiencia: 12,
    eventos_realizados: 500,
    satisfaccion: 98,
    redes: {
      facebook: '#',
      instagram: '#',
      whatsapp: process.env.EMPRESA_WHATSAPP || '+549388123567'
    }
  };
  res.json(config);
});

// API para obtener servicios
app.get('/api/servicios', (req, res) => {
  const servicios = [
    {
      id: 1,
      nombre: 'Bodas',
      descripcion: 'Menús personalizados para tu día especial con servicio completo de catering y bartending.',
      precio: 2500,
      imagen: '/images/bodas.jpg'
    },
    {
      id: 2,
      nombre: 'Eventos Corporativos',
      descripcion: 'Soluciones de catering profesionales para conferencias, lanzamientos y reuniones empresariales.',
      precio: 1800,
      imagen: '/images/corporativo.jpg'
    },
    {
      id: 3,
      nombre: 'Cumpleaños y Celebraciones',
      descripcion: 'Fiestas memorables con menús variados y servicio atento para todas las edades.',
      precio: 1200,
      imagen: '/images/cumpleanos.jpg'
    }
  ];
  res.json(servicios);
});

// API para subir fotos
app.post('/api/upload/foto', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'No se subió archivo' });
  }

  const file = req.files.file;
  const filename = Date.now() + '_' + file.name;
  const uploadPath = path.join(__dirname, 'public/uploads/fotos', filename);

  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      success: true,
      url: `/uploads/fotos/${filename}`,
      filename: filename
    });
  });
});

// API para subir videos
app.post('/api/upload/video', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'No se subió archivo' });
  }

  const file = req.files.file;
  const filename = Date.now() + '_' + file.name;
  const uploadPath = path.join(__dirname, 'public/uploads/videos', filename);

  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      success: true,
      url: `/uploads/videos/${filename}`,
      filename: filename
    });
  });
});

// API para obtener galería
app.get('/api/galeria', (req, res) => {
  const filtro = req.query.filtro;
  const limit = req.query.limit || 100;

  // Datos de ejemplo - en producción vendría de MongoDB
  const galeria = [
    { id: 1, titulo: 'Boda Elegante', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop', categoria: 'bodas', tipo: 'foto' },
    { id: 2, titulo: 'Ceremonia Especial', url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400&h=300&fit=crop', categoria: 'bodas', tipo: 'foto' },
    { id: 3, titulo: 'Fiesta de Casamiento', url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop', categoria: 'bodas', tipo: 'foto' },
    { id: 4, titulo: 'Brindis Nupcial', url: 'https://images.unsplash.com/photo-1530519387789-4c1017266635?w=400&h=300&fit=crop', categoria: 'bodas', tipo: 'foto' },
    { id: 5, titulo: 'Decoración Floral', url: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=300&fit=crop', categoria: 'bodas', tipo: 'foto' },
    { id: 6, titulo: 'Evento Corporativo 1', url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop', categoria: 'corporativo', tipo: 'foto' },
    { id: 7, titulo: 'Evento Corporativo 2', url: 'https://images.unsplash.com/photo-1540575467063-178f50002cce?w=400&h=300&fit=crop', categoria: 'corporativo', tipo: 'foto' },
    { id: 8, titulo: 'Conferencia Empresarial', url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop', categoria: 'corporativo', tipo: 'foto' },
    { id: 9, titulo: 'Almuerzo Ejecutivo', url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop', categoria: 'corporativo', tipo: 'foto' },
    { id: 10, titulo: 'Cumpleaños 1', url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=400&h=300&fit=crop', categoria: 'cumpleanos', tipo: 'foto' },
    { id: 11, titulo: 'Cumpleaños 2', url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop', categoria: 'cumpleanos', tipo: 'foto' },
    { id: 12, titulo: 'Fiesta Infantil', url: 'https://images.unsplash.com/photo-1510578406352-481852e94b03?w=400&h=300&fit=crop', categoria: 'cumpleanos', tipo: 'foto' },
    { id: 13, titulo: 'Repostería Artesanal', url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop', categoria: 'cumpleanos', tipo: 'foto' },
    { id: 14, titulo: 'Presentación de Platos', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop', categoria: 'bodas', tipo: 'foto' },
    { id: 15, titulo: 'Mesa Principal', url: 'https://images.unsplash.com/photo-1504674900769-e6b99cd60006?w=400&h=300&fit=crop', categoria: 'corporativo', tipo: 'foto' }
  ];

  let resultado = galeria;

  if (filtro && filtro !== 'todas') {
    resultado = galeria.filter(item => item.categoria === filtro);
  }

  resultado = resultado.slice(0, limit);
  res.json(resultado);
});

// API para obtener comentarios
app.get('/api/comentarios', (req, res) => {
  // Datos de ejemplo - en producción vendría de MongoDB
  const comentarios = [
    {
      id: 1,
      nombre: 'María García',
      email: 'maria@example.com',
      texto: 'Excelente servicio de catering. El equipo fue muy profesional y la comida estuvo deliciosa.',
      calificacion: 5,
      aprobado: true,
      fecha: new Date('2024-01-15')
    },
    {
      id: 2,
      nombre: 'Juan Rodríguez',
      email: 'juan@example.com',
      texto: 'Nuestra boda fue perfecta gracias a Catering Profesional. Todo fue impecable.',
      calificacion: 5,
      aprobado: true,
      fecha: new Date('2024-02-20')
    },
    {
      id: 3,
      nombre: 'Laura López',
      email: 'laura@example.com',
      texto: 'Muy recomendable. Precios justos y excelente atención al cliente.',
      calificacion: 5,
      aprobado: true,
      fecha: new Date('2024-03-10')
    }
  ];

  res.json(comentarios);
});

// API para enviar comentarios/testimonios
app.post('/api/comentarios', (req, res) => {
  const { nombre, email, texto, calificacion } = req.body;

  // Validar datos
  if (!nombre || !email || !texto || !calificacion) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  // En producción se guardaría en MongoDB
  // Por ahora solo confirmamos recepción
  console.log('Nuevo comentario recibido:', {
    nombre,
    email,
    texto,
    calificacion,
    fecha: new Date()
  });

  res.json({
    success: true,
    mensaje: 'Comentario recibido. Será revisado antes de publicarse.'
  });
});

// API para formulario de contacto
app.post('/api/contacto', (req, res) => {
  const { nombre, email, telefono, fecha, servicio, personas, detalles } = req.body;

  // Validar datos
  if (!nombre || !email || !telefono || !fecha || !servicio || !personas) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  // En producción se guardaría en MongoDB
  // Por ahora solo confirmamos recepción
  console.log('Nueva solicitud de contacto:', {
    nombre,
    email,
    telefono,
    fecha,
    servicio,
    personas,
    detalles,
    fechaRecepcion: new Date()
  });

  res.json({
    success: true,
    mensaje: 'Solicitud recibida. Nos pondremos en contacto pronto.'
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// AUTENTICACIÓN - MIDDLEWARE Y RUTAS
// ═══════════════════════════════════════════════════════════════════════════════

// Middleware para verificar JWT
function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_clave_super_secreta_cambiar_en_produccion_12345');
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

// API para autenticación con Google
app.post('/api/auth/google', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Token requerido' });
    }

    // En producción, verificar el token con la librería google-auth-library
    // Para demostración, asumimos que el token es válido
    // const { OAuth2Client } = require('google-auth-library');
    // const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    // const ticket = await client.verifyIdToken({...});

    // Simular datos del usuario desde Google
    const datosUsuario = {
      id: 'google_' + Math.random().toString(36).substr(2, 9),
      email: 'usuario@gmail.com', // En producción vendría del token
      name: 'Usuario Google',
      picture: 'https://lh3.googleusercontent.com/a/default-user'
    };

    // Crear JWT
    const jwtToken = jwt.sign(
      {
        userId: datosUsuario.id,
        email: datosUsuario.email,
        proveedor: 'google'
      },
      process.env.JWT_SECRET || 'tu_clave_super_secreta_cambiar_en_produccion_12345',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token: jwtToken,
      user: datosUsuario
    });
  } catch (error) {
    console.error('Error Google Auth:', error);
    res.status(401).json({ error: 'Autenticación con Google fallida' });
  }
});

// API para autenticación con Facebook
app.post('/api/auth/facebook', async (req, res) => {
  try {
    const { id, name, email, picture } = req.body;

    if (!id || !name || !email) {
      return res.status(400).json({ error: 'Datos incompletos' });
    }

    // En producción, verificar el token de Facebook
    const datosUsuario = {
      id: 'facebook_' + id,
      email,
      name,
      picture: picture || 'https://platform-lookaside.fbsbx.com/platform/default_user.jpg'
    };

    // Crear JWT
    const jwtToken = jwt.sign(
      {
        userId: datosUsuario.id,
        email: datosUsuario.email,
        proveedor: 'facebook'
      },
      process.env.JWT_SECRET || 'tu_clave_super_secreta_cambiar_en_produccion_12345',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token: jwtToken,
      user: datosUsuario
    });
  } catch (error) {
    console.error('Error Facebook Auth:', error);
    res.status(401).json({ error: 'Autenticación con Facebook fallida' });
  }
});

// API para autenticación con email y contraseña
app.post('/api/auth/email', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña requeridos' });
    }

    // En producción, validar contra base de datos
    // Por ahora solo permitimos login de demostración
    if (email === 'demo@example.com' && password === 'demo123') {
      const datosUsuario = {
        id: 'email_demo',
        email: 'demo@example.com',
        name: 'Usuario Demo',
        picture: null
      };

      const jwtToken = jwt.sign(
        {
          userId: datosUsuario.id,
          email: datosUsuario.email,
          proveedor: 'email'
        },
        process.env.JWT_SECRET || 'tu_clave_super_secreta_cambiar_en_produccion_12345',
        { expiresIn: '7d' }
      );

      return res.json({
        success: true,
        token: jwtToken,
        user: datosUsuario
      });
    }

    // Cualquier otro email también puede autenticarse en modo demo
    const datosUsuario = {
      id: 'email_' + Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      picture: null
    };

    const jwtToken = jwt.sign(
      {
        userId: datosUsuario.id,
        email: datosUsuario.email,
        proveedor: 'email'
      },
      process.env.JWT_SECRET || 'tu_clave_super_secreta_cambiar_en_produccion_12345',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token: jwtToken,
      user: datosUsuario
    });
  } catch (error) {
    console.error('Error Email Auth:', error);
    res.status(401).json({ error: 'Error al autenticar' });
  }
});

// API para logout
app.post('/api/auth/logout', verificarToken, (req, res) => {
  // En producción, invalidad el token en base de datos/caché
  res.json({ success: true, mensaje: 'Sesión cerrada' });
});

// Ruta protegida de ejemplo
app.get('/api/usuario/perfil', verificarToken, (req, res) => {
  res.json({
    success: true,
    usuario: req.usuario,
    mensaje: 'Acceso a perfil autorizado'
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// PANEL DE ADMINISTRACIÓN
// ═══════════════════════════════════════════════════════════════════════════════

// Ruta del admin
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin/index.html'));
});

// ═══════════════════════════════════════════════════════════════════════════════
// INICIAR SERVIDOR
// ═══════════════════════════════════════════════════════════════════════════════

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════════════════════════════╗
  ║      🍽️  CATERING PROFESIONAL - SERVIDOR INICIADO 🍽️          ║
  ╚════════════════════════════════════════════════════════════════╝

  Servidor corriendo en: http://localhost:${PORT}
  Admin Panel: http://localhost:${PORT}/admin

  Presiona Ctrl+C para detener el servidor
  `);
});
