const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_DIR = path.join(__dirname, 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial default settings
const defaultSettings = {
  storeNameAr: 'بوتيك مودرن فاشون',
  storeNameEn: 'Modern Fashion Store',
  sloganAr: 'أقوى كولكشن ملابس شبابية - شياكة وجودة لا مثيل لها',
  sloganEn: 'Premium Streetwear & Modern Clothing Collection',
  logoUrl: '',
  phone: '01012345678',
  whatsapp: '201012345678',
  currencyAr: 'ج.م',
  currencyEn: 'EGP',
  adminPin: 'admin123',
  address: 'القاهرة، مصر',
  deliveryFee: 0,
  deliveryNoteAr: 'التوصيل لجميع المحافظات والدفع عند الاستلام',
  deliveryNoteEn: 'Delivery available nationwide, Cash on Delivery'
};

// Initial sample products
const defaultProducts = [
  {
    id: 'prod_1',
    nameAr: 'هودي أوفر سايز أسود فخم',
    nameEn: 'Black Oversized Premium Hoodie',
    category: 'hoodies',
    price: 450,
    oldPrice: 550,
    sizes: ['M', 'L', 'XL', 'XXL'],
    descriptionAr: 'هودي قطن ميلتون ثقيل مع بطانة ناعمة، تصميم أوفر سايز مريح ومثالي للشتاء.',
    descriptionEn: 'Heavyweight cotton fleece oversized hoodie with soft lining, ultimate winter comfort.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod_2',
    nameAr: 'هودي كاجوال بيج كلاسيك',
    nameEn: 'Classic Beige Streetwear Hoodie',
    category: 'hoodies',
    price: 420,
    oldPrice: 500,
    sizes: ['S', 'M', 'L', 'XL'],
    descriptionAr: 'هودي لون بيج عصري بخامة قطنية عالية الجودة وكابيشون مزدوج.',
    descriptionEn: 'Modern beige streetwear hoodie made of premium cotton with double hood.',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod_3',
    nameAr: 'بنطلون كارجو زيتي مريح',
    nameEn: 'Military Olive Cargo Pants',
    category: 'pants',
    price: 390,
    oldPrice: 470,
    sizes: ['30', '32', '34', '36', '38'],
    descriptionAr: 'بنطلون كارجو بجيوب جانبية متعددة وقصة ستريت مريحة وعملية جداً.',
    descriptionEn: 'Cargo pants with multiple functional pockets and comfortable straight cut.',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod_4',
    nameAr: 'بنطلون جينز كلاسيك أسود',
    nameEn: 'Classic Black Slim-Fit Jeans',
    category: 'pants',
    price: 380,
    oldPrice: 450,
    sizes: ['30', '32', '34', '36'],
    descriptionAr: 'جينز قطن ليكرا مرن، لون ثابت ضد الغسيل، قصة سليم عصرية.',
    descriptionEn: 'Flexible stretch cotton denim, colorfast wash, modern slim fit.',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod_5',
    nameAr: 'قميص كتان أبيض صيفي',
    nameEn: 'White Pure Linen Casual Shirt',
    category: 'shirts',
    price: 350,
    oldPrice: 420,
    sizes: ['M', 'L', 'XL', 'XXL'],
    descriptionAr: 'قميص كتان 100% طبيعي، بارد ومريح جداً للمناسبات والخروجات اليومية.',
    descriptionEn: '100% pure linen casual shirt, breathable and elegant for any occasion.',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod_6',
    nameAr: 'قميص كاروهات كاجوال شبابي',
    nameEn: 'Flannel Plaid Shirt',
    category: 'shirts',
    price: 330,
    oldPrice: 390,
    sizes: ['S', 'M', 'L', 'XL'],
    descriptionAr: 'قميص كاروهات خامة ناعمة يمكن ارتداؤه مفتوح على تيشيرت أو مغلق.',
    descriptionEn: 'Soft flannel plaid shirt, great layered or buttoned up.',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod_7',
    nameAr: 'تيشيرت قطن أوفر سايز أبيض بطبعة',
    nameEn: 'White Graphic Oversized T-Shirt',
    category: 'tshirts',
    price: 260,
    oldPrice: 320,
    sizes: ['M', 'L', 'XL', 'XXL'],
    descriptionAr: 'تيشيرت قطن مصري 100% مشط مريح جداً بطبعة ديجيتال ثابتة عالية الدقة.',
    descriptionEn: '100% combed Egyptian cotton oversized tee with high definition graphic print.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod_8',
    nameAr: 'تيشيرت بيزك أسود قطن فاخر',
    nameEn: 'Luxury Black Essential T-Shirt',
    category: 'tshirts',
    price: 220,
    oldPrice: 280,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    descriptionAr: 'تيشيرت بيزك أساسي لا غنى عنه، قطن معالج ضد الانكماش وناعم الملمس.',
    descriptionEn: 'Premium essential basic black t-shirt, pre-shrunk soft cotton.',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod_9',
    nameAr: 'جاكيت بامب ووتربروف مبطن',
    nameEn: 'Waterproof Puffer Winter Jacket',
    category: 'jackets',
    price: 680,
    oldPrice: 850,
    sizes: ['M', 'L', 'XL', 'XXL'],
    descriptionAr: 'جاكيت شتوي منفوخ مقاوم للماء والرياح، بطانة حرارية للتدفئة القصوى.',
    descriptionEn: 'Windproof & waterproof padded puffer jacket with heavy thermal insulation.',
    image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod_10',
    nameAr: 'جاكيت جينز أزرق كلاسيك',
    nameEn: 'Classic Denim Trucker Jacket',
    category: 'jackets',
    price: 520,
    oldPrice: 620,
    sizes: ['M', 'L', 'XL'],
    descriptionAr: 'جاكيت جينز متين بتطريزات متقنة، قطعة كلاسيكية تتماشى مع كل الإطلالات.',
    descriptionEn: 'Heavy-duty classic denim jacket, timeless style for any casual outfit.',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    createdAt: new Date().toISOString()
  }
];

// Helper: safe atomic write to file
function safeWriteJSON(filePath, data) {
  const tempPath = `${filePath}.${Date.now()}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tempPath, filePath);
}

// Helper: safe read
function safeReadJSON(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) {
      safeWriteJSON(filePath, fallback);
      return fallback;
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return fallback;
  }
}

// Database interface
const db = {
  // --- SETTINGS ---
  getSettings() {
    return safeReadJSON(SETTINGS_FILE, defaultSettings);
  },

  updateSettings(updates) {
    const current = this.getSettings();
    const updated = { ...current, ...updates };
    // Keep adminPin protected if not changing
    if (!updates.adminPin) {
      updated.adminPin = current.adminPin;
    }
    safeWriteJSON(SETTINGS_FILE, updated);
    return updated;
  },

  verifyAdmin(pin) {
    const current = this.getSettings();
    return pin && pin.toString() === current.adminPin.toString();
  },

  // --- PRODUCTS ---
  getProducts(category = null) {
    let products = safeReadJSON(PRODUCTS_FILE, defaultProducts);
    if (category && category !== 'all' && category !== 'الكل') {
      products = products.filter(p => p.category === category);
    }
    // Return sorted newest first
    return products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  getProductById(id) {
    const products = safeReadJSON(PRODUCTS_FILE, defaultProducts);
    return products.find(p => p.id === id);
  },

  addProduct(productData) {
    const products = safeReadJSON(PRODUCTS_FILE, defaultProducts);
    const newProduct = {
      id: 'prod_' + crypto.randomUUID().slice(0, 8),
      nameAr: productData.nameAr || productData.name || 'منتج جديد',
      nameEn: productData.nameEn || productData.nameAr || 'New Product',
      category: productData.category || 'tshirts',
      price: parseFloat(productData.price) || 0,
      oldPrice: productData.oldPrice ? parseFloat(productData.oldPrice) : null,
      sizes: Array.isArray(productData.sizes) 
        ? productData.sizes 
        : (productData.sizes ? productData.sizes.toString().split(',').map(s => s.trim()).filter(Boolean) : ['M', 'L', 'XL']),
      descriptionAr: productData.descriptionAr || '',
      descriptionEn: productData.descriptionEn || '',
      image: productData.image || '',
      inStock: productData.inStock !== false && productData.inStock !== 'false',
      createdAt: new Date().toISOString()
    };
    products.unshift(newProduct);
    safeWriteJSON(PRODUCTS_FILE, products);
    return newProduct;
  },

  updateProduct(id, updates) {
    const products = safeReadJSON(PRODUCTS_FILE, defaultProducts);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    if (updates.price) updates.price = parseFloat(updates.price);
    if (updates.oldPrice !== undefined) {
      updates.oldPrice = updates.oldPrice ? parseFloat(updates.oldPrice) : null;
    }
    if (updates.sizes && !Array.isArray(updates.sizes)) {
      updates.sizes = updates.sizes.toString().split(',').map(s => s.trim()).filter(Boolean);
    }

    products[index] = { ...products[index], ...updates };
    safeWriteJSON(PRODUCTS_FILE, products);
    return products[index];
  },

  deleteProduct(id) {
    let products = safeReadJSON(PRODUCTS_FILE, defaultProducts);
    const initialLen = products.length;
    products = products.filter(p => p.id !== id);
    if (products.length !== initialLen) {
      safeWriteJSON(PRODUCTS_FILE, products);
      return true;
    }
    return false;
  },

  // --- ORDERS ---
  getOrders(status = null) {
    let orders = safeReadJSON(ORDERS_FILE, []);
    if (status) {
      orders = orders.filter(o => o.status === status);
    }
    // Return newest first
    return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  createOrder(orderData) {
    const orders = safeReadJSON(ORDERS_FILE, []);
    const orderNum = orders.length + 1001;
    const newOrder = {
      id: `ORD-${orderNum}`,
      customerName: orderData.customerName || 'زبون بدون اسم',
      phone: orderData.phone || '',
      address: orderData.address || '',
      notes: orderData.notes || '',
      items: Array.isArray(orderData.items) ? orderData.items : [],
      totalPrice: parseFloat(orderData.totalPrice) || 0,
      status: 'pending', // 'pending' | 'delivered' | 'cancelled'
      createdAt: new Date().toISOString()
    };
    orders.unshift(newOrder);
    safeWriteJSON(ORDERS_FILE, orders);
    return newOrder;
  },

  // Mark as delivered and remove from active list (or permanently delete / archive)
  deliverOrder(id, removeImmediately = true) {
    let orders = safeReadJSON(ORDERS_FILE, []);
    const order = orders.find(o => o.id === id);
    if (!order) return null;

    if (removeImmediately) {
      // Per user request: "ولما يعمل تسليم الاورد تتشال علطول"
      orders = orders.filter(o => o.id !== id);
      safeWriteJSON(ORDERS_FILE, orders);
      return { success: true, removed: true, orderId: id };
    } else {
      order.status = 'delivered';
      order.deliveredAt = new Date().toISOString();
      safeWriteJSON(ORDERS_FILE, orders);
      return order;
    }
  },

  deleteOrder(id) {
    let orders = safeReadJSON(ORDERS_FILE, []);
    const initialLen = orders.length;
    orders = orders.filter(o => o.id !== id);
    if (orders.length !== initialLen) {
      safeWriteJSON(ORDERS_FILE, orders);
      return true;
    }
    return false;
  }
};

module.exports = db;
