/**
 * Modern Fashion Store - Customer Application
 * Full bilingual support (Arabic / English), responsive cart, real-time sync
 */

// --- Translations Dictionary ---
const translations = {
  ar: {
    siteTitle: 'بوتيك الملابس | كولكشن عصري وشياكة',
    contactUs: 'تواصل معنا',
    cart: 'السلة',
    cartTitle: 'سلة المشتريات',
    cartEmpty: 'سلتك فارغة حالياً',
    cartEmptyDesc: 'أضف بعض المنتجات المميزة واستمتع بالشياكة!',
    continueShopping: 'تصفح المنتجات',
    subtotal: 'إجمالي المنتجات:',
    shipping: 'الشحن:',
    codAvailable: 'الدفع عند الاستلام',
    total: 'الإجمالي الكلي:',
    proceedToCheckout: 'إتمام الطلب الآن',
    newCollection: '🔥 كولكشن الموسم الجديد',
    shopNow: 'تسوق الآن',
    orderOnWhatsapp: 'اطلب عبر واتساب',
    catAll: 'الكل',
    catHoodies: 'هودي',
    catPants: 'بناطيل',
    catShirts: 'قمصان',
    catTshirts: 'تيشيرتات',
    catJackets: 'جواكت',
    searchPlaceholder: 'ابحث عن منتج بالاسم...',
    productsFound: 'منتج متاح',
    loading: 'جاري تحميل المنتجات...',
    noProducts: 'لا توجد منتجات في هذا القسم حالياً',
    tryAnotherCat: 'جرب اختيار فئة أخرى أو ابحث باسم مختلف',
    showAll: 'عرض كل المنتجات',
    orderNow: 'اطلب الآن',
    addToCart: 'إضافة إلى السلة',
    buyNow: 'شراء فوري',
    selectSize: 'اختر المقاس:',
    quantity: 'الكمية:',
    completeOrderTitle: 'بيانات استلام الأوردر',
    completeOrderSub: 'يرجى كتابة بياناتك بدقة لتوصيل الأوردر بأسرع وقت',
    fullName: 'الاسم بالكامل',
    namePlaceholder: 'مثال: أحمد محمد علي',
    phoneNumber: 'رقم الهاتف / الموبايل',
    phoneHint: 'سنتصل بك لتأكيد ميعاد التوصيل',
    address: 'العنوان بالتفصيل',
    addressPlaceholder: 'المحافظة - المنطقة - اسم الشارع - رقم العمارة والشقة',
    orderNotes: 'ملاحظات إضافية (اختياري)',
    notesPlaceholder: 'ميعاد الاستلام المفضل، أو أي ملاحظات للمندوب',
    finalTotal: 'المبلغ المطلوب عند الاستلام:',
    confirmOrderNow: 'تأكيد الأوردر الآن',
    orderSuccessTitle: 'تم تسجيل طلبك بنجاح! 🎉',
    orderSuccessSub: 'شكراً لثقتك بنا، سنقوم بتجهيز أوردرك والتواصل معك فوراً.',
    orderNumber: 'رقم الأوردر:',
    sendOrderToWhatsapp: 'متابعة الأوردر على واتساب المحل',
    done: 'تم، العودة للمتجر',
    categories: 'الأقسام',
    customerCare: 'خدمة العملاء',
    codBadge: 'الدفع عند الاستلام بعد المعاينة',
    adminLogin: 'لوحة تحكم صاحب المحل',
    allRightsReserved: 'جميع الحقوق محفوظة',
    itemAdded: 'تمت إضافة المنتج إلى السلة بنجاح!',
    pleaseFillAllFields: 'يرجى ملء جميع الحقول المطلوبة بشكل صحيح',
    orderPlacedSuccess: 'تم إرسال الطلب بنجاح!',
    currency: 'ج.م'
  },
  en: {
    siteTitle: 'Fashion Boutique | Modern & Trendy Apparel',
    contactUs: 'Contact Us',
    cart: 'Cart',
    cartTitle: 'Shopping Cart',
    cartEmpty: 'Your cart is empty',
    cartEmptyDesc: 'Discover our premium collection and start shopping!',
    continueShopping: 'Browse Products',
    subtotal: 'Subtotal:',
    shipping: 'Shipping:',
    codAvailable: 'Cash on Delivery',
    total: 'Grand Total:',
    proceedToCheckout: 'Proceed to Checkout',
    newCollection: '🔥 New Season Drop',
    shopNow: 'Shop Now',
    orderOnWhatsapp: 'Order via WhatsApp',
    catAll: 'All',
    catHoodies: 'Hoodies',
    catPants: 'Pants',
    catShirts: 'Shirts',
    catTshirts: 'T-Shirts',
    catJackets: 'Jackets',
    searchPlaceholder: 'Search products by name...',
    productsFound: 'items available',
    loading: 'Loading products...',
    noProducts: 'No products found in this category',
    tryAnotherCat: 'Try choosing another category or search keyword',
    showAll: 'Show All Products',
    orderNow: 'Order Now',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    selectSize: 'Select Size:',
    quantity: 'Quantity:',
    completeOrderTitle: 'Shipping & Delivery Details',
    completeOrderSub: 'Please enter your shipping information accurately',
    fullName: 'Full Name',
    namePlaceholder: 'e.g., John Doe',
    phoneNumber: 'Phone Number',
    phoneHint: 'We will call you to confirm order delivery',
    address: 'Detailed Address',
    addressPlaceholder: 'City, District, Street name, Building & Apt #',
    orderNotes: 'Additional Notes (Optional)',
    notesPlaceholder: 'Preferred delivery time or courier notes',
    finalTotal: 'Total Due upon Delivery:',
    confirmOrderNow: 'Confirm Order Now',
    orderSuccessTitle: 'Order Placed Successfully! 🎉',
    orderSuccessSub: 'Thank you for shopping with us! We will contact you shortly.',
    orderNumber: 'Order Number:',
    sendOrderToWhatsapp: 'Follow Up Order on WhatsApp',
    done: 'Done, Back to Store',
    categories: 'Categories',
    customerCare: 'Customer Support',
    codBadge: 'Cash on Delivery with Inspection',
    adminLogin: 'Store Owner Dashboard',
    allRightsReserved: 'All rights reserved',
    itemAdded: 'Product added to cart!',
    pleaseFillAllFields: 'Please fill in all required fields accurately',
    orderPlacedSuccess: 'Order submitted successfully!',
    currency: 'EGP'
  }
};

// --- App State ---
const state = {
  lang: localStorage.getItem('store_lang') || 'ar',
  settings: {},
  products: [],
  filteredProducts: [],
  currentCategory: 'all',
  searchQuery: '',
  cart: JSON.parse(localStorage.getItem('store_cart') || '[]'),
  selectedProduct: null,
  selectedSize: null,
  selectedQty: 1
};

// --- DOM Elements ---
const elements = {
  html: document.documentElement,
  siteTitle: document.getElementById('site-title'),
  langToggleBtn: document.getElementById('lang-toggle-btn'),
  langBtnText: document.getElementById('lang-btn-text'),
  brandName: document.getElementById('brand-name'),
  brandSlogan: document.getElementById('brand-slogan'),
  brandLogoImg: document.getElementById('brand-logo-img'),
  brandIconFallback: document.getElementById('brand-icon-fallback'),
  headerWaBtn: document.getElementById('header-whatsapp-btn'),
  heroWaBtn: document.getElementById('hero-wa-btn'),
  floatingWaBtn: document.getElementById('floating-whatsapp-btn'),
  heroTitle: document.getElementById('hero-title'),
  heroSubtitle: document.getElementById('hero-subtitle'),
  categoriesNav: document.getElementById('categories-nav'),
  catPills: document.querySelectorAll('.cat-pill'),
  searchInput: document.getElementById('search-input'),
  clearSearchBtn: document.getElementById('clear-search-btn'),
  productsCountNum: document.getElementById('products-count-number'),
  productsGrid: document.getElementById('products-grid'),
  emptyState: document.getElementById('empty-state'),
  resetFilterBtn: document.getElementById('reset-filter-btn'),
  
  // Product Modal
  productModal: document.getElementById('product-modal'),
  modalOverlay: document.getElementById('modal-overlay'),
  modalCloseBtn: document.getElementById('modal-close-btn'),
  modalProductImg: document.getElementById('modal-product-img'),
  modalProductCat: document.getElementById('modal-product-category'),
  modalProductTitle: document.getElementById('modal-product-title'),
  modalProductPrice: document.getElementById('modal-product-price'),
  modalProductOldPrice: document.getElementById('modal-product-old-price'),
  modalProductDiscount: document.getElementById('modal-product-discount'),
  modalProductDesc: document.getElementById('modal-product-desc'),
  modalSizesList: document.getElementById('modal-sizes-list'),
  selectedSizeLabel: document.getElementById('selected-size-label'),
  modalQtyValue: document.getElementById('modal-qty-value'),
  qtyMinusBtn: document.getElementById('qty-minus-btn'),
  qtyPlusBtn: document.getElementById('qty-plus-btn'),
  modalAddCartBtn: document.getElementById('modal-add-cart-btn'),
  modalBuyNowBtn: document.getElementById('modal-buy-now-btn'),
  
  // Cart Drawer
  cartDrawer: document.getElementById('cart-drawer'),
  cartDrawerOverlay: document.getElementById('cart-drawer-overlay'),
  openCartBtn: document.getElementById('open-cart-btn'),
  closeCartBtn: document.getElementById('close-cart-btn'),
  cartCountBadge: document.getElementById('cart-count-badge'),
  cartHeaderCount: document.getElementById('cart-header-count'),
  cartItemsContainer: document.getElementById('cart-items-container'),
  cartEmptyMessage: document.getElementById('cart-empty-message'),
  cartFooter: document.getElementById('cart-footer'),
  cartSubtotalPrice: document.getElementById('cart-subtotal-price'),
  cartTotalPrice: document.getElementById('cart-total-price'),
  continueShoppingBtn: document.getElementById('continue-shopping-btn'),
  proceedCheckoutBtn: document.getElementById('proceed-checkout-btn'),
  
  // Checkout Modal
  checkoutModal: document.getElementById('checkout-modal'),
  checkoutModalOverlay: document.getElementById('checkout-modal-overlay'),
  checkoutCloseBtn: document.getElementById('checkout-close-btn'),
  checkoutForm: document.getElementById('checkout-form'),
  custName: document.getElementById('cust-name'),
  custPhone: document.getElementById('cust-phone'),
  custAddress: document.getElementById('cust-address'),
  custNotes: document.getElementById('cust-notes'),
  checkoutTotalDisplay: document.getElementById('checkout-total-display'),
  submitOrderBtn: document.getElementById('submit-order-btn'),
  
  // Success Modal
  successModal: document.getElementById('success-modal'),
  successModalOverlay: document.getElementById('success-modal-overlay'),
  successOrderId: document.getElementById('success-order-id'),
  successWaBtn: document.getElementById('success-whatsapp-btn'),
  successDoneBtn: document.getElementById('success-done-btn'),
  
  // Footer
  footerBrandName: document.getElementById('footer-brand-name'),
  footerSlogan: document.getElementById('footer-slogan'),
  footerPhone: document.getElementById('footer-phone'),
  footerCopyStore: document.getElementById('footer-copy-store'),
  currentYear: document.getElementById('current-year'),
  toastContainer: document.getElementById('toast-container')
};

// --- Sound / Audio Synthesizer ---
function playChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (e) {
    // Audio context may require user gesture on some browsers
  }
}

// --- Toast Notifications ---
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fa-solid fa-${type === 'success' ? 'circle-check' : 'circle-exclamation'}"></i>
    <span>${message}</span>
  `;
  elements.toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// --- Category Names Map ---
function getCategoryName(catKey) {
  const map = {
    hoodies: state.lang === 'ar' ? 'هودي' : 'Hoodies',
    pants: state.lang === 'ar' ? 'بناطيل' : 'Pants',
    shirts: state.lang === 'ar' ? 'قمصان' : 'Shirts',
    tshirts: state.lang === 'ar' ? 'تيشيرتات' : 'T-Shirts',
    jackets: state.lang === 'ar' ? 'جواكت' : 'Jackets'
  };
  return map[catKey] || catKey;
}

// --- Get Currency Symbol ---
function getCurrency() {
  if (state.lang === 'ar') {
    return state.settings.currencyAr || 'ج.م';
  }
  return state.settings.currencyEn || 'EGP';
}

// --- Language Switching ---
function setLanguage(lang) {
  state.lang = lang;
  localStorage.setItem('store_lang', lang);
  
  // Set HTML attributes
  elements.html.lang = lang;
  elements.html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  elements.langBtnText.textContent = lang === 'ar' ? 'English' : 'عربي';

  // Apply translations to static elements
  const dict = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.placeholder = dict[key];
    }
  });

  // Re-apply store branding according to active language
  applyBranding();

  // Re-render products and cart
  renderProducts();
  renderCart();
}

// --- Apply Branding from Settings ---
function applyBranding() {
  const isAr = state.lang === 'ar';
  const name = isAr ? (state.settings.storeNameAr || 'بوتيك مودرن فاشون') : (state.settings.storeNameEn || 'Modern Fashion Store');
  const slogan = isAr ? (state.settings.sloganAr || 'أحدث صيحات الملابس الرجالية والشبابية') : (state.settings.sloganEn || 'Premium modern streetwear collection');

  elements.brandName.textContent = name;
  elements.footerBrandName.textContent = name;
  elements.footerCopyStore.textContent = name;
  elements.brandSlogan.textContent = slogan;
  elements.footerSlogan.textContent = slogan;
  elements.siteTitle.textContent = `${name} | ${slogan}`;

  if (state.settings.logoUrl) {
    elements.brandLogoImg.src = state.settings.logoUrl;
    elements.brandLogoImg.style.display = 'block';
    elements.brandIconFallback.style.display = 'none';
  } else {
    elements.brandLogoImg.style.display = 'none';
    elements.brandIconFallback.style.display = 'block';
  }

  // WhatsApp Links
  const rawWa = state.settings.whatsapp || '201012345678';
  const cleanWa = rawWa.replace(/\D/g, '');
  const greeting = isAr ? encodeURIComponent('مرحباً، أود الاستفسار عن كولكشن الملابس في متجركم!') : encodeURIComponent('Hello, I would like to inquire about your clothing collection!');
  const waUrl = `https://wa.me/${cleanWa}?text=${greeting}`;

  elements.headerWaBtn.href = waUrl;
  elements.heroWaBtn.href = waUrl;
  elements.floatingWaBtn.href = waUrl;

  if (state.settings.phone) {
    elements.footerPhone.textContent = state.settings.phone;
  }
}

// --- Fetch Settings ---
async function fetchSettings() {
  try {
    const res = await fetch('/api/settings');
    if (res.ok) {
      state.settings = await res.json();
      applyBranding();
    }
  } catch (err) {
    console.error('Failed to load settings:', err);
  }
}

// --- Fetch Products ---
async function fetchProducts() {
  try {
    const res = await fetch('/api/products');
    if (res.ok) {
      state.products = await res.json();
      filterProducts();
    }
  } catch (err) {
    console.error('Failed to load products:', err);
    elements.productsGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <h3>حدث خطأ أثناء تحميل المنتجات</h3>
        <p>يرجى التأكد من تشغيل السيرفر والمحاولة مرة أخرى</p>
      </div>
    `;
  }
}

// --- Filter and Search Products ---
function filterProducts() {
  const query = state.searchQuery.toLowerCase().trim();
  
  state.filteredProducts = state.products.filter(product => {
    // Category match
    const catMatch = (state.currentCategory === 'all') || (product.category === state.currentCategory);
    
    // Search match (in Arabic or English name)
    const nameAr = (product.nameAr || '').toLowerCase();
    const nameEn = (product.nameEn || '').toLowerCase();
    const descAr = (product.descriptionAr || '').toLowerCase();
    const descEn = (product.descriptionEn || '').toLowerCase();
    
    const searchMatch = !query || 
      nameAr.includes(query) || 
      nameEn.includes(query) || 
      descAr.includes(query) || 
      descEn.includes(query);

    return catMatch && searchMatch;
  });

  renderProducts();
}

// --- Render Products Grid ---
function renderProducts() {
  elements.productsCountNum.textContent = state.filteredProducts.length;

  if (state.filteredProducts.length === 0) {
    elements.productsGrid.innerHTML = '';
    elements.emptyState.style.display = 'block';
    return;
  }

  elements.emptyState.style.display = 'none';
  const currency = getCurrency();
  const isAr = state.lang === 'ar';

  elements.productsGrid.innerHTML = state.filteredProducts.map(product => {
    const title = isAr ? (product.nameAr || product.nameEn) : (product.nameEn || product.nameAr);
    const catLabel = getCategoryName(product.category);
    const hasDiscount = product.oldPrice && product.oldPrice > product.price;
    const discountPercent = hasDiscount ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
    const sizes = Array.isArray(product.sizes) ? product.sizes : ['M', 'L', 'XL'];
    const fallbackImg = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80';
    const imgSrc = product.image || fallbackImg;

    // Direct WhatsApp message link for this item
    const cleanWa = (state.settings.whatsapp || '201012345678').replace(/\D/g, '');
    const waText = encodeURIComponent(
      isAr 
        ? `مرحباً، أود حجز المنتج: "${title}" بسعر ${product.price} ${currency}` 
        : `Hello, I'd like to order: "${title}" for ${product.price} ${currency}`
    );
    const itemWaUrl = `https://wa.me/${cleanWa}?text=${waText}`;

    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-image-container" onclick="openProductModal('${product.id}')">
          <img src="${imgSrc}" alt="${title}" loading="lazy" onerror="this.src='${fallbackImg}'">
          <div class="product-badge-group">
            <span class="card-badge badge-cat">${catLabel}</span>
            ${hasDiscount ? `<span class="card-badge badge-sale">${isAr ? `خصم ${discountPercent}%` : `${discountPercent}% OFF`}</span>` : ''}
          </div>
        </div>

        <div class="product-info">
          <h3 class="product-title" onclick="openProductModal('${product.id}')" title="${title}">${title}</h3>
          
          <div class="product-card-price-row">
            <span class="card-price">${product.price} ${currency}</span>
            ${hasDiscount ? `<span class="card-old-price">${product.oldPrice} ${currency}</span>` : ''}
          </div>

          <div class="product-sizes-tags">
            ${sizes.map(s => `<span class="size-tag">${s}</span>`).join('')}
          </div>

          <div class="product-actions">
            <button class="btn-card-order" onclick="openProductModal('${product.id}')">
              <i class="fa-solid fa-cart-shopping"></i>
              <span>${translations[state.lang].orderNow}</span>
            </button>
            <a href="${itemWaUrl}" target="_blank" class="btn-card-wa" title="طلب مباشر واتساب">
              <i class="fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// --- Product Modal (Quick View & Size Selector) ---
window.openProductModal = function (productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  state.selectedProduct = product;
  state.selectedQty = 1;
  const sizes = Array.isArray(product.sizes) && product.sizes.length ? product.sizes : ['M', 'L', 'XL'];
  state.selectedSize = sizes[0];

  const isAr = state.lang === 'ar';
  const currency = getCurrency();
  const title = isAr ? (product.nameAr || product.nameEn) : (product.nameEn || product.nameAr);
  const desc = isAr ? (product.descriptionAr || '') : (product.descriptionEn || product.descriptionAr || '');

  elements.modalProductImg.src = product.image || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80';
  elements.modalProductCat.textContent = getCategoryName(product.category);
  elements.modalProductTitle.textContent = title;
  elements.modalProductPrice.textContent = `${product.price} ${currency}`;
  elements.modalProductDesc.textContent = desc || (isAr ? 'خامة قطنية مريحة وفاخرة مناسبة لكل الأوقات.' : 'Premium comfortable cotton fabric, perfect for every occasion.');

  // Discount
  if (product.oldPrice && product.oldPrice > product.price) {
    const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
    elements.modalProductOldPrice.textContent = `${product.oldPrice} ${currency}`;
    elements.modalProductOldPrice.style.display = 'inline';
    elements.modalProductDiscount.textContent = isAr ? `خصم ${discount}%` : `${discount}% OFF`;
    elements.modalProductDiscount.style.display = 'inline-block';
  } else {
    elements.modalProductOldPrice.style.display = 'none';
    elements.modalProductDiscount.style.display = 'none';
  }

  // Sizes List
  elements.selectedSizeLabel.textContent = state.selectedSize;
  elements.modalSizesList.innerHTML = sizes.map((s, idx) => `
    <button class="size-pill-btn ${idx === 0 ? 'active' : ''}" onclick="selectSize('${s}', this)">${s}</button>
  `).join('');

  // Qty reset
  elements.modalQtyValue.textContent = '1';

  elements.productModal.classList.add('active');
  elements.productModal.setAttribute('aria-hidden', 'false');
};

window.selectSize = function (size, btn) {
  state.selectedSize = size;
  elements.selectedSizeLabel.textContent = size;
  elements.modalSizesList.querySelectorAll('.size-pill-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
};

function closeProductModal() {
  elements.productModal.classList.remove('active');
  elements.productModal.setAttribute('aria-hidden', 'true');
}

// --- Cart Operations ---
function saveCart() {
  localStorage.setItem('store_cart', JSON.stringify(state.cart));
  updateCartBadge();
  renderCart();
}

function updateCartBadge() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  elements.cartCountBadge.textContent = totalCount;
  elements.cartHeaderCount.textContent = totalCount;
}

function addToCart(product, size, quantity = 1, showFeedback = true) {
  const existingIndex = state.cart.findIndex(
    item => item.productId === product.id && item.size === size
  );

  const title = state.lang === 'ar' ? (product.nameAr || product.nameEn) : (product.nameEn || product.nameAr);

  if (existingIndex > -1) {
    state.cart[existingIndex].quantity += quantity;
  } else {
    state.cart.push({
      productId: product.id,
      name: title,
      nameAr: product.nameAr,
      nameEn: product.nameEn,
      price: product.price,
      image: product.image,
      size: size,
      quantity: quantity
    });
  }

  saveCart();
  playChime();

  if (showFeedback) {
    showToast(translations[state.lang].itemAdded, 'success');
  }
}

window.changeCartQty = function (index, delta) {
  if (state.cart[index]) {
    state.cart[index].quantity += delta;
    if (state.cart[index].quantity <= 0) {
      state.cart.splice(index, 1);
    }
    saveCart();
  }
};

window.removeFromCart = function (index) {
  if (state.cart[index]) {
    state.cart.splice(index, 1);
    saveCart();
  }
};

function renderCart() {
  const currency = getCurrency();
  const isAr = state.lang === 'ar';

  if (state.cart.length === 0) {
    elements.cartItemsContainer.style.display = 'none';
    elements.cartFooter.style.display = 'none';
    elements.cartEmptyMessage.style.display = 'block';
    return;
  }

  elements.cartEmptyMessage.style.display = 'none';
  elements.cartItemsContainer.style.display = 'flex';
  elements.cartFooter.style.display = 'block';

  let subtotal = 0;

  elements.cartItemsContainer.innerHTML = state.cart.map((item, idx) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    const title = isAr ? (item.nameAr || item.name) : (item.nameEn || item.name);
    const fallbackImg = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80';

    return `
      <div class="cart-item">
        <img src="${item.image || fallbackImg}" alt="${title}" class="cart-item-img" onerror="this.src='${fallbackImg}'">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${title}</h4>
          <div class="cart-item-meta">${isAr ? 'المقاس' : 'Size'}: <strong>${item.size}</strong></div>
          <div class="cart-item-bottom">
            <span class="cart-item-price">${itemTotal} ${currency}</span>
            <div class="cart-item-qty">
              <button class="cart-qty-btn" onclick="changeCartQty(${idx}, -1)">-</button>
              <span class="cart-qty-num">${item.quantity}</span>
              <button class="cart-qty-btn" onclick="changeCartQty(${idx}, 1)">+</button>
            </div>
          </div>
        </div>
        <button class="cart-remove-btn" onclick="removeFromCart(${idx})" title="حذف">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;
  }).join('');

  elements.cartSubtotalPrice.textContent = `${subtotal} ${currency}`;
  elements.cartTotalPrice.textContent = `${subtotal} ${currency}`;
}

function openCart() {
  renderCart();
  elements.cartDrawer.classList.add('active');
  elements.cartDrawer.setAttribute('aria-hidden', 'false');
}

function closeCart() {
  elements.cartDrawer.classList.remove('active');
  elements.cartDrawer.setAttribute('aria-hidden', 'true');
}

// --- Checkout Modal Operations ---
function openCheckout() {
  if (state.cart.length === 0) {
    showToast(translations[state.lang].cartEmpty, 'error');
    return;
  }

  const currency = getCurrency();
  const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  elements.checkoutTotalDisplay.textContent = `${total} ${currency}`;

  closeCart();
  elements.checkoutModal.classList.add('active');
  elements.checkoutModal.setAttribute('aria-hidden', 'false');
}

function closeCheckout() {
  elements.checkoutModal.classList.remove('active');
  elements.checkoutModal.setAttribute('aria-hidden', 'true');
}

// --- Order Submission ---
async function handleCheckoutSubmit(e) {
  e.preventDefault();

  const name = elements.custName.value.trim();
  const phone = elements.custPhone.value.trim();
  const address = elements.custAddress.value.trim();
  const notes = elements.custNotes.value.trim();

  if (!name || !phone || !address) {
    showToast(translations[state.lang].pleaseFillAllFields, 'error');
    return;
  }

  const currency = getCurrency();
  const totalPrice = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const orderPayload = {
    customerName: name,
    phone: phone,
    address: address,
    notes: notes,
    items: state.cart,
    totalPrice: totalPrice
  };

  elements.submitOrderBtn.disabled = true;
  elements.submitOrderBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${state.lang === 'ar' ? 'جاري تأكيد الأوردر...' : 'Placing Order...'}`;

  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });

    const data = await res.json();

    if (res.ok && data.success) {
      // Order created successfully
      const createdOrder = data.order;
      
      // Clear cart
      state.cart = [];
      saveCart();

      // Reset form
      elements.checkoutForm.reset();
      closeCheckout();

      // Open Success Modal
      elements.successOrderId.textContent = createdOrder.id;

      // Prepare formatted WhatsApp message
      const isAr = state.lang === 'ar';
      const cleanWa = (state.settings.whatsapp || '201012345678').replace(/\D/g, '');

      let waMessage = isAr 
        ? `*طلب جديد #${createdOrder.id}*\n`
        : `*New Order #${createdOrder.id}*\n`;

      waMessage += `${isAr ? 'الاسم' : 'Name'}: ${createdOrder.customerName}\n`;
      waMessage += `${isAr ? 'الموبايل' : 'Phone'}: ${createdOrder.phone}\n`;
      waMessage += `${isAr ? 'العنوان' : 'Address'}: ${createdOrder.address}\n`;
      if (createdOrder.notes) {
        waMessage += `${isAr ? 'ملاحظات' : 'Notes'}: ${createdOrder.notes}\n`;
      }
      waMessage += `\n*${isAr ? 'المنتجات المطلوبة:' : 'Ordered Items:'}*\n`;

      createdOrder.items.forEach(it => {
        waMessage += `- ${it.name} (${isAr ? 'مقاس' : 'Size'}: ${it.size}) × ${it.quantity} = ${it.price * it.quantity} ${currency}\n`;
      });

      waMessage += `\n*${isAr ? 'الإجمالي المطلوب عند الاستلام:' : 'Total Due upon Delivery:'}* ${createdOrder.totalPrice} ${currency}`;

      elements.successWaBtn.href = `https://wa.me/${cleanWa}?text=${encodeURIComponent(waMessage)}`;

      elements.successModal.classList.add('active');
      playChime();
    } else {
      showToast(data.error || 'حدث خطأ أثناء إرسال الأوردر', 'error');
    }
  } catch (err) {
    console.error('Checkout error:', err);
    showToast('تعذر الاتصال بالسيرفر، تأكد من الاتصال بالشبكة', 'error');
  } finally {
    elements.submitOrderBtn.disabled = false;
    elements.submitOrderBtn.innerHTML = `
      <i class="fa-solid fa-check-circle"></i> <span>${translations[state.lang].confirmOrderNow}</span>
    `;
  }
}

// --- Real-time SSE Synchronization ---
function setupRealTimeEvents() {
  const evtSource = new EventSource('/api/events');

  evtSource.onmessage = function (e) {
    try {
      const data = JSON.parse(e.data);
      if (data.type === 'products_updated') {
        // Products were added/edited/deleted on another device! Reload products automatically!
        fetchProducts();
      } else if (data.type === 'settings_updated') {
        // Store name or logo updated!
        fetchSettings();
      }
    } catch (err) {
      console.error('SSE parse error:', err);
    }
  };

  evtSource.onerror = function () {
    // Reconnects automatically
  };
}

// --- Event Listeners Initialization ---
function initEventListeners() {
  // Language switcher
  elements.langToggleBtn.addEventListener('click', () => {
    const nextLang = state.lang === 'ar' ? 'en' : 'ar';
    setLanguage(nextLang);
  });

  // Category navigation tabs
  elements.catPills.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.catPills.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentCategory = btn.getAttribute('data-category');
      filterProducts();
    });
  });

  // Footer category links
  document.querySelectorAll('.footer-links a[data-category]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetCat = link.getAttribute('data-category');
      const pill = document.querySelector(`.cat-pill[data-category="${targetCat}"]`);
      if (pill) {
        pill.click();
        elements.categoriesNav.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Search input
  elements.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    elements.clearSearchBtn.style.display = state.searchQuery ? 'block' : 'none';
    filterProducts();
  });

  elements.clearSearchBtn.addEventListener('click', () => {
    elements.searchInput.value = '';
    state.searchQuery = '';
    elements.clearSearchBtn.style.display = 'none';
    filterProducts();
  });

  elements.resetFilterBtn.addEventListener('click', () => {
    const allPill = document.querySelector('.cat-pill[data-category="all"]');
    if (allPill) allPill.click();
    elements.searchInput.value = '';
    state.searchQuery = '';
    elements.clearSearchBtn.style.display = 'none';
    filterProducts();
  });

  // Modal interactions
  elements.modalCloseBtn.addEventListener('click', closeProductModal);
  elements.modalOverlay.addEventListener('click', closeProductModal);

  // Qty in modal
  elements.qtyMinusBtn.addEventListener('click', () => {
    if (state.selectedQty > 1) {
      state.selectedQty--;
      elements.modalQtyValue.textContent = state.selectedQty;
    }
  });

  elements.qtyPlusBtn.addEventListener('click', () => {
    state.selectedQty++;
    elements.modalQtyValue.textContent = state.selectedQty;
  });

  // Add to cart from modal
  elements.modalAddCartBtn.addEventListener('click', () => {
    if (state.selectedProduct) {
      addToCart(state.selectedProduct, state.selectedSize, state.selectedQty, true);
      closeProductModal();
    }
  });

  // Buy now from modal
  elements.modalBuyNowBtn.addEventListener('click', () => {
    if (state.selectedProduct) {
      addToCart(state.selectedProduct, state.selectedSize, state.selectedQty, false);
      closeProductModal();
      openCheckout();
    }
  });

  // Cart Drawer
  elements.openCartBtn.addEventListener('click', openCart);
  elements.closeCartBtn.addEventListener('click', closeCart);
  elements.cartDrawerOverlay.addEventListener('click', closeCart);
  elements.continueShoppingBtn.addEventListener('click', closeCart);
  elements.proceedCheckoutBtn.addEventListener('click', openCheckout);

  // Checkout Modal
  elements.checkoutCloseBtn.addEventListener('click', closeCheckout);
  elements.checkoutModalOverlay.addEventListener('click', closeCheckout);
  elements.checkoutForm.addEventListener('submit', handleCheckoutSubmit);

  // Success Modal
  elements.successDoneBtn.addEventListener('click', () => {
    elements.successModal.classList.remove('active');
  });
  elements.successModalOverlay.addEventListener('click', () => {
    elements.successModal.classList.remove('active');
  });

  // Footer current year
  if (elements.currentYear) {
    elements.currentYear.textContent = new Date().getFullYear();
  }
}

// --- Initialize App ---
async function init() {
  initEventListeners();
  updateCartBadge();
  setLanguage(state.lang);
  await fetchSettings();
  await fetchProducts();
  setupRealTimeEvents();
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', init);
