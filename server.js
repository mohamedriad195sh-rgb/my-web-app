const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const os = require('os');
const multer = require('multer');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Uploads directory
const UPLOAD_DIR = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Multer storage for images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'img-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('يرجى رفع صور فقط (Only images allowed)'));
    }
  }
});

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Server-Sent Events (SSE) for Real-Time synchronization across devices
let sseClients = [];

app.get('/api/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const clientId = Date.now() + '-' + Math.random();
  const newClient = { id: clientId, res };
  sseClients.push(newClient);

  // Send initial ping
  res.write(`data: ${JSON.stringify({ type: 'connected', clientId })}\n\n`);

  req.on('close', () => {
    sseClients = sseClients.filter(c => c.id !== clientId);
  });
});

function broadcast(eventType, data = {}) {
  const payload = JSON.stringify({ type: eventType, data, timestamp: Date.now() });
  sseClients.forEach(client => {
    try {
      client.res.write(`data: ${payload}\n\n`);
    } catch (e) {
      // client disconnected
    }
  });
}

// Helper: Admin authentication middleware
function requireAdmin(req, res, next) {
  const pin = req.headers['x-admin-pin'] || req.query.pin;
  if (!db.verifyAdmin(pin)) {
    return res.status(401).json({ error: 'غير مصرح لك بالدخول، يرجى إدخال رمز المرور الصحيح' });
  }
  next();
}

// --- API ROUTES ---

// 1. Settings
app.get('/api/network-info', (req, res) => {
  const ip = getLocalIP();
  res.json({
    ip,
    port: PORT,
    storeUrl: `http://${ip}:${PORT}`,
    adminUrl: `http://${ip}:${PORT}/admin`
  });
});

app.get('/api/settings', (req, res) => {
  const settings = db.getSettings();
  // Don't expose adminPin directly to public
  const { adminPin, ...safeSettings } = settings;
  res.json(safeSettings);
});

app.post('/api/settings', requireAdmin, (req, res) => {
  try {
    const updated = db.updateSettings(req.body);
    broadcast('settings_updated', { storeNameAr: updated.storeNameAr, logoUrl: updated.logoUrl });
    const { adminPin, ...safe } = updated;
    res.json({ success: true, settings: safe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin verify login
app.post('/api/admin/login', (req, res) => {
  const { pin } = req.body;
  if (db.verifyAdmin(pin)) {
    return res.json({ success: true, message: 'تم تسجيل الدخول بنجاح' });
  }
  res.status(401).json({ success: false, error: 'رمز المرور غير صحيح!' });
});

// 2. Uploads
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'لم يتم اختيار ملف' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ success: true, url: fileUrl });
});

// 3. Products
app.get('/api/products', (req, res) => {
  const { category } = req.query;
  const products = db.getProducts(category);
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = db.getProductById(req.params.id);
  if (!product) return res.status(404).json({ error: 'المنتج غير موجود' });
  res.json(product);
});

app.post('/api/products', requireAdmin, (req, res) => {
  try {
    const newProduct = db.addProduct(req.body);
    broadcast('products_updated', { action: 'add', product: newProduct });
    res.status(201).json({ success: true, product: newProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/products/:id', requireAdmin, (req, res) => {
  try {
    const updated = db.updateProduct(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'المنتج غير موجود' });
    broadcast('products_updated', { action: 'update', product: updated });
    res.json({ success: true, product: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/products/:id', requireAdmin, (req, res) => {
  try {
    const success = db.deleteProduct(req.params.id);
    if (!success) return res.status(404).json({ error: 'المنتج غير موجود' });
    broadcast('products_updated', { action: 'delete', id: req.params.id });
    res.json({ success: true, message: 'تم حذف المنتج بنجاح' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Orders
app.get('/api/orders', requireAdmin, (req, res) => {
  const { status } = req.query;
  const orders = db.getOrders(status);
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  try {
    const { customerName, phone, address, notes, items, totalPrice } = req.body;
    if (!customerName || !phone || !address || !items || !items.length) {
      return res.status(400).json({ error: 'يرجى ملء جميع البيانات الأساسية والمنتجات' });
    }

    const order = db.createOrder({
      customerName,
      phone,
      address,
      notes,
      items,
      totalPrice
    });

    // Broadcast new order to Admin Panel in real time!
    broadcast('new_order', { order });
    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deliver order - per user requirement: "ولما يعمل تسليم الاورد تتشال علطول"
app.patch('/api/orders/:id/deliver', requireAdmin, (req, res) => {
  try {
    const result = db.deliverOrder(req.params.id, true); // true = remove immediately
    if (!result) return res.status(404).json({ error: 'الطلب غير موجود' });

    broadcast('orders_updated', { action: 'deliver', orderId: req.params.id });
    res.json({ success: true, message: 'تم تسليم الطلب وحذفه من قائمة الطلبات بنجاح', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/orders/:id', requireAdmin, (req, res) => {
  try {
    const success = db.deleteOrder(req.params.id);
    if (!success) return res.status(404).json({ error: 'الطلب غير موجود' });

    broadcast('orders_updated', { action: 'delete', orderId: req.params.id });
    res.json({ success: true, message: 'تم حذف الطلب بنجاح' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route for admin page
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html'));
});

// Helper: detect local IPv4 address
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const localIP = getLocalIP();

app.listen(PORT, '0.0.0.0', () => {
  console.log('\n======================================================');
  console.log('🚀 المتجر الإلكتروني يعمل بنجاح وبشكل متزامن عبر الشبكة!');
  console.log('======================================================');
  console.log(`💻 من هذا الكمبيوتر (Laptop):   http://localhost:${PORT}`);
  console.log(`📱 من الموبايل أو أي جهاز آخر: http://${localIP}:${PORT}`);
  console.log(`⚙️  لوحة تحكم صاحب المحل:      http://${localIP}:${PORT}/admin`);
  console.log(`🔑 رمز دخول لوحة التحكم الافتراضي: admin123`);
  console.log('======================================================\n');
});
