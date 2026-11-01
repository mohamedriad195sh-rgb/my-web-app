/**
 * Modern Fashion Store - Admin Dashboard Logic
 * Full control over products, orders, settings, and multi-device sync
 */

// --- Admin State ---
const adminState = {
  pin: localStorage.getItem('admin_pin') || '',
  activeTab: 'orders',
  settings: {},
  orders: [],
  products: [],
  filteredProducts: [],
  editingProductId: null,
  productToDelete: null,
  orderToDeliver: null
};

// --- DOM Elements ---
const el = {
  loginScreen: document.getElementById('login-screen'),
  adminApp: document.getElementById('admin-app'),
  loginForm: document.getElementById('login-form'),
  adminPinInput: document.getElementById('admin-pin-input'),
  loginError: document.getElementById('login-error'),
  logoutBtn: document.getElementById('logout-btn'),
  
  // Header Branding
  adminStoreName: document.getElementById('admin-store-name'),
  adminBrandLogo: document.getElementById('admin-brand-logo'),
  adminBrandIcon: document.getElementById('admin-brand-icon'),
  
  // Navigation Tabs
  navTabs: document.querySelectorAll('.nav-tab'),
  tabPanes: document.querySelectorAll('.admin-tab-pane'),
  ordersBadgeCount: document.getElementById('orders-badge-count'),
  productsBadgeCount: document.getElementById('products-badge-count'),
  
  // Stats
  statPendingOrders: document.getElementById('stat-pending-orders'),
  statPendingRevenue: document.getElementById('stat-pending-revenue'),
  statTotalProducts: document.getElementById('stat-total-products'),
  
  // Orders
  ordersListContainer: document.getElementById('orders-list-container'),
  ordersEmptyState: document.getElementById('orders-empty-state'),
  refreshOrdersBtn: document.getElementById('refresh-orders-btn'),
  
  // Products Management
  adminProductsContainer: document.getElementById('admin-products-container'),
  adminProductSearch: document.getElementById('admin-product-search'),
  adminProductCatFilter: document.getElementById('admin-product-cat-filter'),
  
  // Add / Edit Product Form
  productFormTitle: document.getElementById('product-form-title'),
  addProductForm: document.getElementById('add-product-form'),
  prodEditId: document.getElementById('prod-edit-id'),
  prodNameAr: document.getElementById('prod-name-ar'),
  prodNameEn: document.getElementById('prod-name-en'),
  prodCategory: document.getElementById('prod-category'),
  prodPrice: document.getElementById('prod-price'),
  prodOldPrice: document.getElementById('prod-old-price'),
  prodDescAr: document.getElementById('prod-desc-ar'),
  prodDescEn: document.getElementById('prod-desc-en'),
  prodFileInput: document.getElementById('prod-file-input'),
  prodUploadZone: document.getElementById('prod-upload-zone'),
  prodImgPreview: document.getElementById('prod-img-preview'),
  prodImgPlaceholder: document.getElementById('prod-img-placeholder'),
  prodImageUrl: document.getElementById('prod-image-url'),
  cancelEditBtn: document.getElementById('cancel-edit-btn'),
  saveProductBtn: document.getElementById('save-product-btn'),
  
  // Settings Form
  settingsForm: document.getElementById('settings-form'),
  setNameAr: document.getElementById('set-name-ar'),
  setNameEn: document.getElementById('set-name-en'),
  setSloganAr: document.getElementById('set-slogan-ar'),
  setSloganEn: document.getElementById('set-slogan-en'),
  setLogoPreview: document.getElementById('set-logo-preview'),
  setLogoFallback: document.getElementById('set-logo-fallback'),
  logoFileInput: document.getElementById('logo-file-input'),
  setLogoUrl: document.getElementById('set-logo-url'),
  setWhatsapp: document.getElementById('set-whatsapp'),
  setPhone: document.getElementById('set-phone'),
  setCurrencyAr: document.getElementById('set-currency-ar'),
  setCurrencyEn: document.getElementById('set-currency-en'),
  setAdminPin: document.getElementById('set-admin-pin'),
  
  // Modals
  deleteModal: document.getElementById('delete-modal'),
  deleteProductName: document.getElementById('delete-product-name'),
  confirmDeleteBtn: document.getElementById('confirm-delete-btn'),
  deliverModal: document.getElementById('deliver-modal'),
  deliverOrderInfo: document.getElementById('deliver-order-info'),
  confirmDeliverBtn: document.getElementById('confirm-deliver-btn'),
  toastContainer: document.getElementById('admin-toast-container')
};

// --- Sound Synthesizer for Notifications ---
function playOrderAlert() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    // Play a 2-tone melodic notification
    const now = ctx.currentTime;
    
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(523.25, now); // C5
    gain1.gain.setValueAtTime(0.2, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc1.start(now);
    osc1.stop(now + 0.2);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(659.25, now + 0.15); // E5
    gain2.gain.setValueAtTime(0.25, now + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc2.start(now + 0.15);
    osc2.stop(now + 0.5);
  } catch (e) {
    // Ignore audio autoplay restrictions
  }
}

// --- Toast Notification ---
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `admin-toast ${type}`;
  toast.innerHTML = `
    <i class="fa-solid fa-${type === 'success' ? 'circle-check' : 'circle-exclamation'}"></i>
    <span>${message}</span>
  `;
  el.toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// --- Category Names Helper ---
function getCategoryLabel(cat) {
  const map = {
    hoodies: '🧥 هودي',
    pants: '👖 بناطيل',
    shirts: '👔 قمصان',
    tshirts: '👕 تيشيرتات',
    jackets: '🧥 جواكت'
  };
  return map[cat] || cat;
}

// --- Tab Switching ---
window.switchTab = function (tabId) {
  adminState.activeTab = tabId;
  el.navTabs.forEach(t => {
    t.classList.toggle('active', t.getAttribute('data-tab') === tabId);
  });
  el.tabPanes.forEach(p => {
    p.classList.toggle('active', p.id === `tab-${tabId}`);
  });

  if (tabId === 'orders') fetchOrders();
  if (tabId === 'products') fetchProducts();
  if (tabId === 'settings') populateSettingsForm();
};

// --- Authentication ---
async function verifyPin(pinToVerify) {
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin: pinToVerify })
    });
    const data = await res.json();
    return data.success;
  } catch (e) {
    return false;
  }
}

async function handleLogin(e) {
  if (e) e.preventDefault();
  const enteredPin = el.adminPinInput.value.trim();
  el.loginError.style.display = 'none';

  const valid = await verifyPin(enteredPin);
  if (valid) {
    adminState.pin = enteredPin;
    localStorage.setItem('admin_pin', enteredPin);
    el.loginScreen.style.display = 'none';
    el.adminApp.style.display = 'block';
    await initAdminData();
  } else {
    el.loginError.textContent = 'رمز المرور غير صحيح! الرمز الافتراضي هو admin123';
    el.loginError.style.display = 'block';
  }
}

function handleLogout() {
  localStorage.removeItem('admin_pin');
  adminState.pin = '';
  el.adminApp.style.display = 'none';
  el.loginScreen.style.display = 'flex';
  el.adminPinInput.value = '';
}

// --- Fetch Settings ---
async function fetchSettings() {
  try {
    const res = await fetch('/api/settings');
    if (res.ok) {
      adminState.settings = await res.json();
      applySettingsBranding();
    }
  } catch (err) {
    console.error('Failed to load settings:', err);
  }
}

function applySettingsBranding() {
  const s = adminState.settings;
  el.adminStoreName.textContent = s.storeNameAr || 'لوحة تحكم المحل';

  if (s.logoUrl) {
    el.adminBrandLogo.src = s.logoUrl;
    el.adminBrandLogo.style.display = 'block';
    el.adminBrandIcon.style.display = 'none';
  } else {
    el.adminBrandLogo.style.display = 'none';
    el.adminBrandIcon.style.display = 'block';
  }
}

function populateSettingsForm() {
  const s = adminState.settings;
  el.setNameAr.value = s.storeNameAr || '';
  el.setNameEn.value = s.storeNameEn || '';
  el.setSloganAr.value = s.sloganAr || '';
  el.setSloganEn.value = s.sloganEn || '';
  el.setWhatsapp.value = s.whatsapp || '';
  el.setPhone.value = s.phone || '';
  el.setCurrencyAr.value = s.currencyAr || 'ج.م';
  el.setCurrencyEn.value = s.currencyEn || 'EGP';
  el.setLogoUrl.value = s.logoUrl || '';

  if (s.logoUrl) {
    el.setLogoPreview.src = s.logoUrl;
    el.setLogoPreview.style.display = 'block';
    el.setLogoFallback.style.display = 'none';
  } else {
    el.setLogoPreview.style.display = 'none';
    el.setLogoFallback.style.display = 'block';
  }
}

// --- Save Settings ---
async function handleSettingsSubmit(e) {
  e.preventDefault();

  const payload = {
    storeNameAr: el.setNameAr.value.trim(),
    storeNameEn: el.setNameEn.value.trim(),
    sloganAr: el.setSloganAr.value.trim(),
    sloganEn: el.setSloganEn.value.trim(),
    whatsapp: el.setWhatsapp.value.trim(),
    phone: el.setPhone.value.trim(),
    currencyAr: el.setCurrencyAr.value.trim() || 'ج.م',
    currencyEn: el.setCurrencyEn.value.trim() || 'EGP',
    logoUrl: el.setLogoUrl.value.trim()
  };

  const newPin = el.setAdminPin.value.trim();
  if (newPin) {
    payload.adminPin = newPin;
  }

  try {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-pin': adminState.pin
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (res.ok && data.success) {
      if (newPin) {
        adminState.pin = newPin;
        localStorage.setItem('admin_pin', newPin);
        el.setAdminPin.value = '';
      }
      adminState.settings = data.settings;
      applySettingsBranding();
      showToast('تم حفظ وتحديث إعدادات المحل بنجاح!');
    } else {
      showToast(data.error || 'حدث خطأ أثناء حفظ الإعدادات', 'error');
    }
  } catch (err) {
    showToast('تعذر الاتصال بالسيرفر', 'error');
  }
}

// --- Logo Upload ---
async function handleLogoUpload(file) {
  if (!file) return;

  const formData = new FormData();
  formData.append('image', file);

  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();

    if (res.ok && data.success) {
      el.setLogoUrl.value = data.url;
      el.setLogoPreview.src = data.url;
      el.setLogoPreview.style.display = 'block';
      el.setLogoFallback.style.display = 'none';
      showToast('تم رفع صورة اللوجو بنجاح!');
    } else {
      showToast('فشل رفع الصورة', 'error');
    }
  } catch (err) {
    showToast('خطأ أثناء رفع اللوجو', 'error');
  }
}

// --- Orders Management ---
async function fetchOrders() {
  try {
    const res = await fetch('/api/orders', {
      headers: { 'x-admin-pin': adminState.pin }
    });
    if (res.ok) {
      adminState.orders = await res.json();
      renderOrders();
      updateStats();
    }
  } catch (err) {
    console.error('Failed to load orders:', err);
  }
}

function updateStats() {
  const pending = adminState.orders.filter(o => o.status === 'pending');
  const revenue = pending.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
  const currency = adminState.settings.currencyAr || 'ج.م';

  el.ordersBadgeCount.textContent = pending.length;
  el.statPendingOrders.textContent = pending.length;
  el.statPendingRevenue.textContent = `${revenue} ${currency}`;
  el.statTotalProducts.textContent = adminState.products.length;
}

function renderOrders() {
  const currency = adminState.settings.currencyAr || 'ج.م';
  const pendingOrders = adminState.orders.filter(o => o.status === 'pending');

  if (pendingOrders.length === 0) {
    el.ordersListContainer.innerHTML = '';
    el.ordersEmptyState.style.display = 'block';
    return;
  }

  el.ordersEmptyState.style.display = 'none';

  el.ordersListContainer.innerHTML = pendingOrders.map(order => {
    const dateFormatted = new Date(order.createdAt).toLocaleString('ar-EG', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const cleanPhone = (order.phone || '').replace(/\D/g, '');
    const cleanWaNumber = cleanPhone.startsWith('0') ? '2' + cleanPhone : cleanPhone;
    const waChatUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(`مرحباً أستاذ ${order.customerName}، نتواصل معك بخصوص أوردرك رقم #${order.id} من متجرنا.`)}`;

    return `
      <div class="order-card" data-order-id="${order.id}">
        <div class="order-card-header">
          <div class="order-id-badge"><i class="fa-solid fa-receipt"></i> ${order.id}</div>
          <div class="order-date-text"><i class="fa-regular fa-clock"></i> ${dateFormatted}</div>
        </div>

        <div class="order-card-body">
          <!-- Customer Details -->
          <div class="customer-info-box">
            <h4>بيانات العميل</h4>
            <div class="cust-line">
              <i class="fa-solid fa-user"></i>
              <strong>${order.customerName}</strong>
            </div>
            <div class="cust-line">
              <i class="fa-solid fa-phone"></i>
              <span>${order.phone}</span>
            </div>
            <div class="cust-line">
              <i class="fa-solid fa-location-dot"></i>
              <span>${order.address}</span>
            </div>
            ${order.notes ? `
              <div class="cust-line">
                <i class="fa-solid fa-note-sticky"></i>
                <em>ملاحظة: ${order.notes}</em>
              </div>
            ` : ''}

            <!-- Direct Contact Actions -->
            <div class="cust-contact-actions">
              <a href="${waChatUrl}" target="_blank" class="btn-wa-direct" title="محادثة واتساب مباشرة">
                <i class="fa-brands fa-whatsapp"></i> واتساب العميل
              </a>
              <a href="tel:${order.phone}" class="btn-phone-call" title="اتصال هاتفي">
                <i class="fa-solid fa-phone"></i> اتصال
              </a>
            </div>
          </div>

          <!-- Items Ordered -->
          <div class="order-items-box">
            <h4>المنتجات المطلوبة (${order.items.length})</h4>
            <div class="order-items-sublist">
              ${order.items.map(it => `
                <div class="order-item-row">
                  <img src="${it.image || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80'}" class="order-item-img">
                  <div class="order-item-info">
                    <div class="order-item-name">${it.name || it.nameAr}</div>
                    <div class="order-item-sub">مقاس: <strong>${it.size}</strong> | كمية: <strong>${it.quantity}</strong></div>
                  </div>
                  <div class="order-item-price">${it.price * it.quantity} ${currency}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Order Card Footer (Deliver Action) -->
        <div class="order-card-footer">
          <div class="order-total-preview">
            إجمالي الفاتورة المطلوب تحصيله: <strong>${order.totalPrice} ${currency}</strong>
          </div>
          <div class="order-footer-actions">
            <!-- Mark Delivered button: immediately removes order per user requirement! -->
            <button class="btn-deliver-order" onclick="openDeliverModal('${order.id}', '${order.customerName}')">
              <i class="fa-solid fa-check"></i> تسليم الأوردر (إزالة من القائمة)
            </button>
            <button class="btn-delete-order" onclick="deleteOrderDirect('${order.id}')" title="حذف الأوردر">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Deliver Modal & Action
window.openDeliverModal = function (orderId, customerName) {
  adminState.orderToDeliver = orderId;
  el.deliverOrderInfo.textContent = `طلب رقم ${orderId} - للعميل: ${customerName}`;
  el.deliverModal.classList.add('active');
};

window.closeDeliverModal = function () {
  adminState.orderToDeliver = null;
  el.deliverModal.classList.remove('active');
};

el.confirmDeliverBtn.addEventListener('click', async () => {
  if (!adminState.orderToDeliver) return;
  const orderId = adminState.orderToDeliver;

  try {
    const res = await fetch(`/api/orders/${orderId}/deliver`, {
      method: 'PATCH',
      headers: { 'x-admin-pin': adminState.pin }
    });

    const data = await res.json();
    if (res.ok && data.success) {
      showToast(`تم تسليم الأوردر #${orderId} وحذفه فوراً من قائمة الطلبات!`);
      closeDeliverModal();
      fetchOrders();
    } else {
      showToast(data.error || 'حدث خطأ أثناء تسليم الأوردر', 'error');
    }
  } catch (err) {
    showToast('خطأ في الاتصال بالسيرفر', 'error');
  }
});

window.deleteOrderDirect = async function (orderId) {
  if (!confirm(`هل أنت متأكد من حذف الطلب #${orderId}؟`)) return;

  try {
    const res = await fetch(`/api/orders/${orderId}`, {
      method: 'DELETE',
      headers: { 'x-admin-pin': adminState.pin }
    });

    if (res.ok) {
      showToast('تم حذف الأوردر بنجاح');
      fetchOrders();
    }
  } catch (err) {
    showToast('خطأ في الاتصال', 'error');
  }
};

// --- Products Management ---
async function fetchProducts() {
  try {
    const res = await fetch('/api/products');
    if (res.ok) {
      adminState.products = await res.json();
      el.productsBadgeCount.textContent = adminState.products.length;
      filterAdminProducts();
      updateStats();
    }
  } catch (err) {
    console.error('Failed to load products:', err);
  }
}

function filterAdminProducts() {
  const query = (el.adminProductSearch.value || '').toLowerCase().trim();
  const selectedCat = el.adminProductCatFilter.value;

  adminState.filteredProducts = adminState.products.filter(p => {
    const catMatch = selectedCat === 'all' || p.category === selectedCat;
    const nameMatch = !query || 
      (p.nameAr || '').toLowerCase().includes(query) || 
      (p.nameEn || '').toLowerCase().includes(query);
    return catMatch && nameMatch;
  });

  renderAdminProducts();
}

function renderAdminProducts() {
  const currency = adminState.settings.currencyAr || 'ج.م';

  if (adminState.filteredProducts.length === 0) {
    el.adminProductsContainer.innerHTML = `
      <div class="empty-state-panel" style="grid-column: 1 / -1;">
        <i class="fa-solid fa-box-open"></i>
        <h3>لا توجد منتجات مطابقة للبحث</h3>
      </div>
    `;
    return;
  }

  el.adminProductsContainer.innerHTML = adminState.filteredProducts.map(p => {
    const fallbackImg = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80';
    const catLabel = getCategoryLabel(p.category);

    return `
      <div class="admin-prod-card" data-id="${p.id}">
        <div class="admin-prod-img-box">
          <img src="${p.image || fallbackImg}" alt="${p.nameAr}" onerror="this.src='${fallbackImg}'">
        </div>
        <div class="admin-prod-body">
          <span style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">${catLabel}</span>
          <h4 class="admin-prod-title" title="${p.nameAr}">${p.nameAr}</h4>
          <div class="admin-prod-price">${p.price} ${currency}</div>

          <div class="admin-prod-actions">
            <button class="btn btn-outline-dark btn-sm" onclick="editProduct('${p.id}')">
              <i class="fa-solid fa-pen-to-square"></i> تعديل
            </button>
            <button class="btn btn-danger-soft btn-sm" onclick="openDeleteModal('${p.id}', '${p.nameAr}')">
              <i class="fa-solid fa-trash-can"></i> حذف
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// --- Add / Edit Product ---
window.editProduct = function (id) {
  const product = adminState.products.find(p => p.id === id);
  if (!product) return;

  adminState.editingProductId = id;
  el.productFormTitle.textContent = `تعديل المنتج: ${product.nameAr}`;
  el.prodEditId.value = product.id;
  el.prodNameAr.value = product.nameAr || '';
  el.prodNameEn.value = product.nameEn || '';
  el.prodCategory.value = product.category || 'tshirts';
  el.prodPrice.value = product.price || '';
  el.prodOldPrice.value = product.oldPrice || '';
  el.prodDescAr.value = product.descriptionAr || '';
  el.prodDescEn.value = product.descriptionEn || '';
  el.prodImageUrl.value = product.image || '';

  if (product.image) {
    el.prodImgPreview.src = product.image;
    el.prodImgPreview.style.display = 'block';
    el.prodImgPlaceholder.style.display = 'none';
  }

  // Check sizes
  const sizes = Array.isArray(product.sizes) ? product.sizes : ['M', 'L', 'XL'];
  document.querySelectorAll('input[name="prod-size"]').forEach(cb => {
    cb.checked = sizes.includes(cb.value);
  });

  el.cancelEditBtn.style.display = 'inline-flex';
  el.saveProductBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> حفظ التعديلات';

  switchTab('add-product');
};

function resetProductForm() {
  adminState.editingProductId = null;
  el.productFormTitle.textContent = 'إضافة منتج جديد للمحل';
  el.addProductForm.reset();
  el.prodEditId.value = '';
  el.prodImageUrl.value = '';
  el.prodImgPreview.src = '';
  el.prodImgPreview.style.display = 'none';
  el.prodImgPlaceholder.innerHTML = '<i class="fa-regular fa-image"></i><span>معاينة الصورة</span>';
  el.prodImgPlaceholder.style.display = 'flex';
  el.cancelEditBtn.style.display = 'none';
  el.saveProductBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> حفظ ونشر المنتج الآن';
}

// Handle Image File Upload for Product
async function handleProductImageFile(file) {
  if (!file) return;

  // Show uploading spinner
  el.prodImgPreview.style.display = 'none';
  el.prodImgPlaceholder.style.display = 'flex';
  el.prodImgPlaceholder.innerHTML = `
    <div class="spinner" style="width:28px;height:28px;margin-bottom:6px;"></div>
    <span>جاري رفع الصورة...</span>
  `;

  const formData = new FormData();
  formData.append('image', file);

  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();

    if (res.ok && data.success) {
      el.prodImageUrl.value = data.url;
      el.prodImgPreview.src = data.url;
      el.prodImgPreview.style.display = 'block';
      el.prodImgPlaceholder.style.display = 'none';
      showToast('تم رفع صورة المنتج بنجاح!');
    } else {
      showToast(data.error || 'فشل رفع الصورة', 'error');
      el.prodImgPlaceholder.innerHTML = '<i class="fa-regular fa-image"></i><span>معاينة الصورة</span>';
    }
  } catch (err) {
    showToast('خطأ في رفع ملف الصورة', 'error');
    el.prodImgPlaceholder.innerHTML = '<i class="fa-regular fa-image"></i><span>معاينة الصورة</span>';
  }
}

async function handleProductSubmit(e) {
  e.preventDefault();

  const nameAr = el.prodNameAr.value.trim();
  const nameEn = el.prodNameEn.value.trim() || nameAr;
  const category = el.prodCategory.value;
  const price = parseFloat(el.prodPrice.value);
  const oldPrice = el.prodOldPrice.value ? parseFloat(el.prodOldPrice.value) : null;
  const descAr = el.prodDescAr.value.trim();
  const descEn = el.prodDescEn.value.trim();
  const image = el.prodImageUrl.value.trim();

  // Selected sizes
  const selectedSizes = [];
  document.querySelectorAll('input[name="prod-size"]:checked').forEach(cb => {
    selectedSizes.push(cb.value);
  });

  if (!nameAr || !price) {
    showToast('يرجى كتابة اسم المنتج والسعر بشكل صحيح', 'error');
    return;
  }

  if (!image) {
    showToast('يرجى اختيار ورفع صورة للمنتج من جهازك أولاً', 'error');
    return;
  }

  const payload = {
    nameAr,
    nameEn,
    category,
    price,
    oldPrice,
    sizes: selectedSizes.length ? selectedSizes : ['M', 'L', 'XL'],
    descriptionAr: descAr,
    descriptionEn: descEn,
    image: image
  };

  const isEditing = !!adminState.editingProductId;
  const url = isEditing ? `/api/products/${adminState.editingProductId}` : '/api/products';
  const method = isEditing ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'x-admin-pin': adminState.pin
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (res.ok && data.success) {
      showToast(isEditing ? 'تم تعديل المنتج بنجاح!' : 'تمت إضافة المنتج بنجاح ونشره في المتجر!');
      resetProductForm();
      switchTab('products');
      fetchProducts();
    } else {
      showToast(data.error || 'حدث خطأ أثناء حفظ المنتج', 'error');
    }
  } catch (err) {
    showToast('خطأ في الاتصال بالسيرفر', 'error');
  }
}

// --- Delete Product Modal ---
window.openDeleteModal = function (id, name) {
  adminState.productToDelete = id;
  el.deleteProductName.textContent = name;
  el.deleteModal.classList.add('active');
};

window.closeDeleteModal = function () {
  adminState.productToDelete = null;
  el.deleteModal.classList.remove('active');
};

el.confirmDeleteBtn.addEventListener('click', async () => {
  if (!adminState.productToDelete) return;

  try {
    const res = await fetch(`/api/products/${adminState.productToDelete}`, {
      method: 'DELETE',
      headers: { 'x-admin-pin': adminState.pin }
    });

    const data = await res.json();
    if (res.ok && data.success) {
      showToast('تم حذف المنتج بنجاح من المتجر');
      closeDeleteModal();
      fetchProducts();
    } else {
      showToast(data.error || 'فشل حذف المنتج', 'error');
    }
  } catch (err) {
    showToast('خطأ أثناء حذف المنتج', 'error');
  }
});

// --- Server-Sent Events (SSE) Real-Time Synchronization ---
function setupAdminRealtime() {
  const evtSource = new EventSource('/api/events');

  evtSource.onmessage = function (e) {
    try {
      const data = JSON.parse(e.data);

      if (data.type === 'new_order') {
        // A customer just placed an order from their phone or laptop!
        playOrderAlert();
        showToast(`🔔 أوردر جديد وصل الآن من: ${data.data.order.customerName}!`, 'success');
        fetchOrders();
      } else if (data.type === 'orders_updated') {
        fetchOrders();
      } else if (data.type === 'products_updated') {
        fetchProducts();
      } else if (data.type === 'settings_updated') {
        fetchSettings();
      }
    } catch (err) {
      console.error('Admin SSE parse error:', err);
    }
  };

  evtSource.onerror = function () {
    // Reconnects automatically
  };
}

// --- Initialize Event Listeners ---
function initAdminListeners() {
  // Login
  el.loginForm.addEventListener('submit', handleLogin);
  el.logoutBtn.addEventListener('click', handleLogout);

  // Tab buttons
  el.navTabs.forEach(t => {
    t.addEventListener('click', () => {
      switchTab(t.getAttribute('data-tab'));
    });
  });

  // Orders
  el.refreshOrdersBtn.addEventListener('click', fetchOrders);

  // Product Filters
  el.adminProductSearch.addEventListener('input', filterAdminProducts);
  el.adminProductCatFilter.addEventListener('change', filterAdminProducts);

  // Product File Upload
  el.prodFileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleProductImageFile(e.target.files[0]);
    }
  });

  // Product Form
  el.addProductForm.addEventListener('submit', handleProductSubmit);
  el.cancelEditBtn.addEventListener('click', resetProductForm);

  // Settings
  el.settingsForm.addEventListener('submit', handleSettingsSubmit);
  el.logoFileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleLogoUpload(e.target.files[0]);
    }
  });
}

// --- Init Admin Data ---
async function initAdminData() {
  await fetchSettings();
  await fetchOrders();
  await fetchProducts();
  setupAdminRealtime();
}

// --- Startup Check ---
async function init() {
  initAdminListeners();

  if (adminState.pin) {
    const valid = await verifyPin(adminState.pin);
    if (valid) {
      el.loginScreen.style.display = 'none';
      el.adminApp.style.display = 'block';
      await initAdminData();
      return;
    }
  }

  // Otherwise prompt login
  el.loginScreen.style.display = 'flex';
  el.adminApp.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', init);
