// ═══════════════════════════════════════════════════════════════════════════════
// SERVIDOR PRINCIPAL - CATERING PROFESIONAL
// ═══════════════════════════════════════════════════════════════════════════════

const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Verificar variables de entorno críticas
if (!process.env.JWT_SECRET) {
  console.error('FATAL: JWT_SECRET no está configurado en .env');
  process.exit(1);
}
if (!process.env.MONGODB_URI) {
  console.error('FATAL: MONGODB_URI no está configurado en .env');
  process.exit(1);
}

const app = express();

// ═══════════════════════════════════════════════════════════════════════════════
// ESQUEMAS MONGOOSE
// ═══════════════════════════════════════════════════════════════════════════════

const configSchema = new mongoose.Schema({
  nombre: { type: String, default: 'Catering Profesional' },
  telefono: { type: String, default: '+54 9 388 123-4567' },
  email: { type: String, default: 'contacto@cateringprofesional.com.ar' },
  ubicacion: { type: String, default: 'San Salvador de Jujuy, Jujuy' },
  whatsapp: { type: String, default: '+549388123567' },
  logo: { type: String, default: '/images/logo.png' },
  facebook: { type: String, default: '#' },
  instagram: { type: String, default: '#' }
}, { timestamps: true });
const Config = mongoose.model('Config', configSchema);

const serviceSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  imagen: { type: String, default: '' },
  active: { type: Boolean, default: true }
}, { timestamps: true });
const Service = mongoose.model('Service', serviceSchema);

const gallerySchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  categoria: { type: String, enum: ['bodas', 'corporativo', 'cumpleanos', 'otro'], required: true },
  url: { type: String, required: true },
  tipo: { type: String, enum: ['foto', 'video'], default: 'foto' },
  active: { type: Boolean, default: true }
}, { timestamps: true });
const Gallery = mongoose.model('Gallery', gallerySchema);

const commentSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  texto: { type: String, required: true },
  calificacion: { type: Number, min: 1, max: 5, required: true },
  aprobado: { type: Boolean, default: false }
}, { timestamps: true });
const Comment = mongoose.model('Comment', commentSchema);

const contactSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  telefono: { type: String, required: true },
  fecha: { type: String, required: true },
  servicio: { type: String, required: true },
  personas: { type: Number, required: true },
  detalles: { type: String, default: '' },
  contactado: { type: Boolean, default: false },
  fechaRecibido: { type: Date, default: Date.now }
}, { timestamps: true });
const Contact = mongoose.model('Contact', contactSchema);

// ═══════════════════════════════════════════════════════════════════════════════
// MIDDLEWARE
// ═══════════════════════════════════════════════════════════════════════════════

app.use(compression());
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  createParentPath: true,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
}));

// Rate limiters
const limiterContacto = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Demasiadas solicitudes. Espera 15 minutos antes de intentar nuevamente.' }
});

const limiterComentarios = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: { error: 'Demasiadas solicitudes. Espera 15 minutos antes de intentar nuevamente.' }
});

// ═══════════════════════════════════════════════════════════════════════════════
// ARCHIVOS ESTÁTICOS
// ═══════════════════════════════════════════════════════════════════════════════

app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',
  etag: false
}));

app.use(express.static(path.join(__dirname, 'public/assets'), {
  maxAge: '7d',
  etag: false
}));

app.use('/admin', express.static(path.join(__dirname, 'admin'), {
  maxAge: '1d',
  etag: false
}));

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'), {
  maxAge: '30d'
}));

// ═══════════════════════════════════════════════════════════════════════════════
// MIDDLEWARE DE AUTENTICACIÓN
// ═══════════════════════════════════════════════════════════════════════════════

function verificarAdmin(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Token requerido.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'No autorizado.' });
    }
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado.' });
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// RUTAS PRINCIPALES
// ═══════════════════════════════════════════════════════════════════════════════

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'), (err) => {
    if (err) res.status(500).send('Error al cargar la página');
  });
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin/index.html'));
});

// ═══════════════════════════════════════════════════════════════════════════════
// API PÚBLICA
// ═══════════════════════════════════════════════════════════════════════════════

// Configuración de la empresa
app.get('/api/config', async (req, res) => {
  try {
    let config = await Config.findOne();
    if (!config) config = await Config.create({});
    res.json({
      nombre: config.nombre,
      telefono: config.telefono,
      email: config.email,
      ubicacion: config.ubicacion,
      whatsapp: config.whatsapp,
      logo: config.logo,
      redes: {
        facebook: config.facebook,
        instagram: config.instagram,
        whatsapp: config.whatsapp
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Servicios
app.get('/api/servicios', async (req, res) => {
  try {
    const servicios = await Service.find({ active: true });
    res.json(servicios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Galería
app.get('/api/galeria', async (req, res) => {
  try {
    const { filtro, limit = 100 } = req.query;
    const query = { active: true };
    if (filtro && filtro !== 'todas') query.categoria = filtro;
    const items = await Gallery.find(query).limit(parseInt(limit));
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Comentarios aprobados
app.get('/api/comentarios', async (req, res) => {
  try {
    const comentarios = await Comment.find({ aprobado: true }).sort({ createdAt: -1 });
    res.json(comentarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Enviar comentario (con rate limit)
app.post('/api/comentarios', limiterComentarios, async (req, res) => {
  const { nombre, email, texto, calificacion } = req.body;
  if (!nombre || !email || !texto || !calificacion) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    await Comment.create({
      nombre: nombre.substring(0, 100),
      email: email.substring(0, 200),
      texto: texto.substring(0, 500),
      calificacion: Math.min(5, Math.max(1, parseInt(calificacion)))
    });
    res.json({ success: true, mensaje: 'Comentario recibido. Será revisado antes de publicarse.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Formulario de contacto (con rate limit)
app.post('/api/contacto', limiterContacto, async (req, res) => {
  const { nombre, email, telefono, fecha, servicio, personas, detalles } = req.body;
  if (!nombre || !email || !telefono || !fecha || !servicio || !personas) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    await Contact.create({
      nombre: nombre.substring(0, 100),
      email: email.substring(0, 200),
      telefono: telefono.substring(0, 50),
      fecha,
      servicio: servicio.substring(0, 100),
      personas: parseInt(personas),
      detalles: detalles ? detalles.substring(0, 1000) : ''
    });
    res.json({ success: true, mensaje: 'Solicitud recibida. Nos pondremos en contacto pronto.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// UPLOADS
// ═══════════════════════════════════════════════════════════════════════════════

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];

app.post('/api/upload/foto', verificarAdmin, (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: 'No se subió archivo' });
  }
  const file = req.files.file;
  if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
    return res.status(400).json({ error: 'Solo se permiten imágenes JPG, PNG, WebP o GIF' });
  }
  const ext = path.extname(file.name).toLowerCase();
  const safeName = Date.now() + '_' + Math.random().toString(36).substr(2, 9) + ext;
  const uploadPath = path.join(__dirname, 'public/uploads/fotos', safeName);
  file.mv(uploadPath, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, url: `/uploads/fotos/${safeName}`, filename: safeName });
  });
});

app.post('/api/upload/video', verificarAdmin, (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: 'No se subió archivo' });
  }
  const file = req.files.file;
  if (!ALLOWED_VIDEO_TYPES.includes(file.mimetype)) {
    return res.status(400).json({ error: 'Solo se permiten videos MP4, WebM u OGG' });
  }
  const ext = path.extname(file.name).toLowerCase();
  const safeName = Date.now() + '_' + Math.random().toString(36).substr(2, 9) + ext;
  const uploadPath = path.join(__dirname, 'public/uploads/videos', safeName);
  file.mv(uploadPath, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, url: `/uploads/videos/${safeName}`, filename: safeName });
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// API ADMIN - LOGIN
// ═══════════════════════════════════════════════════════════════════════════════

app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña requeridos' });
  }
  try {
    const isAdmin = email === process.env.ADMIN_EMAIL;
    const isValid = isAdmin && await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
    if (!isValid) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// API ADMIN - EMPRESA
// ═══════════════════════════════════════════════════════════════════════════════

app.put('/api/admin/config', verificarAdmin, async (req, res) => {
  try {
    const { nombre, telefono, email, ubicacion, whatsapp, facebook, instagram } = req.body;
    const config = await Config.findOneAndUpdate(
      {},
      { nombre, telefono, email, ubicacion, whatsapp, facebook, instagram },
      { upsert: true, new: true }
    );
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// API ADMIN - SERVICIOS
// ═══════════════════════════════════════════════════════════════════════════════

app.post('/api/admin/servicios', verificarAdmin, async (req, res) => {
  try {
    const servicio = await Service.create(req.body);
    res.status(201).json(servicio);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/admin/servicios/:id', verificarAdmin, async (req, res) => {
  try {
    const servicio = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!servicio) return res.status(404).json({ error: 'Servicio no encontrado' });
    res.json(servicio);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/admin/servicios/:id', verificarAdmin, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// API ADMIN - GALERÍA
// ═══════════════════════════════════════════════════════════════════════════════

app.post('/api/admin/galeria', verificarAdmin, async (req, res) => {
  try {
    const item = await Gallery.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/admin/galeria/:id', verificarAdmin, async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// API ADMIN - COMENTARIOS
// ═══════════════════════════════════════════════════════════════════════════════

app.get('/api/admin/comentarios', verificarAdmin, async (req, res) => {
  try {
    const comentarios = await Comment.find().sort({ createdAt: -1 });
    res.json(comentarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/admin/comentarios/:id', verificarAdmin, async (req, res) => {
  try {
    const comentario = await Comment.findByIdAndUpdate(req.params.id, { aprobado: req.body.aprobado }, { new: true });
    if (!comentario) return res.status(404).json({ error: 'Comentario no encontrado' });
    res.json(comentario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/comentarios/:id', verificarAdmin, async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// API ADMIN - CONTACTOS
// ═══════════════════════════════════════════════════════════════════════════════

app.get('/api/admin/contactos', verificarAdmin, async (req, res) => {
  try {
    const contactos = await Contact.find().sort({ fechaRecibido: -1 });
    res.json(contactos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/admin/contactos/:id', verificarAdmin, async (req, res) => {
  try {
    const contacto = await Contact.findByIdAndUpdate(req.params.id, { contactado: req.body.contactado }, { new: true });
    if (!contacto) return res.status(404).json({ error: 'Contacto no encontrado' });
    res.json(contacto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// SEED DE BASE DE DATOS (datos iniciales)
// ═══════════════════════════════════════════════════════════════════════════════

async function seedDatabase() {
  const configCount = await Config.countDocuments();
  if (configCount === 0) {
    await Config.create({
      nombre: process.env.EMPRESA_NOMBRE || 'Catering Profesional',
      telefono: process.env.EMPRESA_TELEFONO || '+54 9 388 123-4567',
      email: process.env.EMPRESA_EMAIL || 'contacto@cateringprofesional.com.ar',
      ubicacion: process.env.EMPRESA_UBICACION || 'San Salvador de Jujuy, Jujuy',
      whatsapp: process.env.EMPRESA_WHATSAPP || '+549388123567'
    });
    console.log('Config inicial creada');
  }

  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    await Service.insertMany([
      { nombre: 'Bodas', descripcion: 'Menús personalizados para tu día especial con servicio completo de catering y bartending.', precio: 2500, imagen: '/images/bodas.jpg' },
      { nombre: 'Eventos Corporativos', descripcion: 'Soluciones de catering profesionales para conferencias, lanzamientos y reuniones empresariales.', precio: 1800, imagen: '/images/corporativo.jpg' },
      { nombre: 'Cumpleaños y Celebraciones', descripcion: 'Fiestas memorables con menús variados y servicio atento para todas las edades.', precio: 1200, imagen: '/images/cumpleanos.jpg' }
    ]);
    console.log('Servicios iniciales creados');
  }

  const galleryCount = await Gallery.countDocuments();
  if (galleryCount === 0) {
    await Gallery.insertMany([
      { titulo: 'Boda Elegante', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop', categoria: 'bodas', tipo: 'foto' },
      { titulo: 'Ceremonia Especial', url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400&h=300&fit=crop', categoria: 'bodas', tipo: 'foto' },
      { titulo: 'Fiesta de Casamiento', url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop', categoria: 'bodas', tipo: 'foto' },
      { titulo: 'Brindis Nupcial', url: 'https://images.unsplash.com/photo-1530519387789-4c1017266635?w=400&h=300&fit=crop', categoria: 'bodas', tipo: 'foto' },
      { titulo: 'Decoración Floral', url: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=300&fit=crop', categoria: 'bodas', tipo: 'foto' },
      { titulo: 'Evento Corporativo 1', url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop', categoria: 'corporativo', tipo: 'foto' },
      { titulo: 'Evento Corporativo 2', url: 'https://images.unsplash.com/photo-1540575467063-178f50002cce?w=400&h=300&fit=crop', categoria: 'corporativo', tipo: 'foto' },
      { titulo: 'Conferencia Empresarial', url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop', categoria: 'corporativo', tipo: 'foto' },
      { titulo: 'Almuerzo Ejecutivo', url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop', categoria: 'corporativo', tipo: 'foto' },
      { titulo: 'Cumpleaños 1', url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=400&h=300&fit=crop', categoria: 'cumpleanos', tipo: 'foto' },
      { titulo: 'Cumpleaños 2', url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop', categoria: 'cumpleanos', tipo: 'foto' },
      { titulo: 'Fiesta Infantil', url: 'https://images.unsplash.com/photo-1510578406352-481852e94b03?w=400&h=300&fit=crop', categoria: 'cumpleanos', tipo: 'foto' },
      { titulo: 'Repostería Artesanal', url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop', categoria: 'cumpleanos', tipo: 'foto' },
      { titulo: 'Presentación de Platos', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop', categoria: 'bodas', tipo: 'foto' },
      { titulo: 'Mesa Principal', url: 'https://images.unsplash.com/photo-1504674900769-e6b99cd60006?w=400&h=300&fit=crop', categoria: 'corporativo', tipo: 'foto' }
    ]);
    console.log('Galería inicial creada');
  }

  const commentCount = await Comment.countDocuments();
  if (commentCount === 0) {
    await Comment.insertMany([
      { nombre: 'María García', email: 'maria@example.com', texto: 'Excelente servicio de catering. El equipo fue muy profesional y la comida estuvo deliciosa.', calificacion: 5, aprobado: true },
      { nombre: 'Juan Rodríguez', email: 'juan@example.com', texto: 'Nuestra boda fue perfecta gracias a Catering Profesional. Todo fue impecable.', calificacion: 5, aprobado: true },
      { nombre: 'Laura López', email: 'laura@example.com', texto: 'Muy recomendable. Precios justos y excelente atención al cliente.', calificacion: 5, aprobado: true }
    ]);
    console.log('Comentarios iniciales creados');
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONEXIÓN A MONGODB E INICIO DEL SERVIDOR
// ═══════════════════════════════════════════════════════════════════════════════

const PORT = process.env.PORT || 3000;

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB conectado correctamente');
    await seedDatabase();
  } catch (error) {
    console.error('');
    console.error('══════════════════════════════════════════════════════════');
    console.error('  ERROR AL CONECTAR CON MONGODB');
    console.error('══════════════════════════════════════════════════════════');
    console.error('  Motivo:', error.message);
    console.error('');
    console.error('  SOLUCIÓN:');
    console.error('  1. Ingresá a https://cloud.mongodb.com');
    console.error('  2. Buscá tu cluster y copiá el connection string');
    console.error('  3. Actualizá MONGODB_URI en el archivo .env');
    console.error('');
    console.error('  El servidor arrancará de todas formas pero las APIs');
    console.error('  que usan la base de datos retornarán error 503.');
    console.error('══════════════════════════════════════════════════════════');
    console.error('');
  }

  app.listen(PORT, () => {
    console.log(`
  ╔════════════════════════════════════════════════════════════════╗
  ║       CATERING PROFESIONAL - SERVIDOR INICIADO                ║
  ╚════════════════════════════════════════════════════════════════╝

  Servidor:    http://localhost:${PORT}
  Admin Panel: http://localhost:${PORT}/admin

  Presiona Ctrl+C para detener el servidor
    `);
  });
}

connectDB();
