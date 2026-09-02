/**
 * ريستوكور — محرك إدارة المطعم باللغة العربية
 * منطق الكاشير، خصم الريسيبي، وشاشات المطبخ والباريستا
 */

// 1. قاعدة البيانات المحلية وقائمة الأصناف
const RestoDB = {
  // قائمة المنيو
  products: [
    { id: 'p1', name: 'ساندوتش برجر أنجوس بالجبنة', category: 'برجر', price: 210, station: 'KITCHEN', icon: '🍔' },
    { id: 'p2', name: 'برجر سماش دبل صوص خاص', category: 'برجر', price: 185, station: 'KITCHEN', icon: '🍔' },
    { id: 'p3', name: 'بيتزا مارجريتا نابولي حطب', category: 'بيتزا', price: 170, station: 'KITCHEN', icon: '🍕' },
    { id: 'p4', name: 'بيتزا ترافل بالمشروم الطازج', category: 'بيتزا', price: 235, station: 'KITCHEN', icon: '🍕' },
    { id: 'p5', name: 'باستا بيني وايت صوص وفراخ', category: 'باستا', price: 190, station: 'KITCHEN', icon: '🍝' },
    { id: 'p6', name: 'كوب فلات وايت دبل شوت', category: 'قهوة', price: 75, station: 'BARISTA', icon: '☕' },
    { id: 'p7', name: 'قهوة تركي بن محوج مظبوط', category: 'قهوة', price: 45, station: 'BARISTA', icon: '☕' },
    { id: 'p8', name: 'مشروب موهيتو ليمون نعناع منعش', category: 'قهوة', price: 65, station: 'BARISTA', icon: '🍹' },
    { id: 'p9', name: 'تشيز كيك سان سباستيان فراولة', category: 'حلو', price: 135, station: 'BARISTA', icon: '🍰' },
    { id: 'p10', name: 'أم علي بالمكسرات والقشطة البلدي', category: 'حلو', price: 85, station: 'KITCHEN', icon: '🍮' }
  ],

  // أرصدة خامات المخزن
  inventory: [
    { id: 'raw-1', name: 'لحم بقري مفروم فريش', cat: 'لحوم', qty: 25.4, unit: 'كجم', min: 10, cost: 440, sup: 'جزارة التجمع الحديثة' },
    { id: 'raw-2', name: 'عيش كايزر بريوش سمسم', cat: 'مخبوزات', qty: 120, unit: 'قطعة', min: 30, cost: 8, sup: 'مخبز الأهرام الآلي' },
    { id: 'raw-3', name: 'جبنة شيدر إنجليزي مستوردة', cat: 'ألبان', qty: 5.2, unit: 'كجم', min: 2.5, cost: 310, sup: 'المصرية للألبان' },
    { id: 'raw-4', name: 'بن أرابيكا برازيلي محمص', cat: 'بن', qty: 14.0, unit: 'كجم', min: 4, cost: 820, sup: 'محامص المخا' },
    { id: 'raw-5', name: 'حليب كامل الدسم فريش', cat: 'ألبان', qty: 18.0, unit: 'لتر', min: 10, cost: 36, sup: 'مزارع دينا' }
  ],

  // مكونات الوجبات للخصم الآلي (الريسيبي)
  recipes: [
    {
      productId: 'p1',
      name: 'برجر أنجوس بالجبنة',
      price: 210,
      items: [
        { rawId: 'raw-1', name: 'لحم مفروم', amount: 0.18, unit: 'كجم', cost: 440 },
        { rawId: 'raw-2', name: 'عيش بريوش', amount: 1, unit: 'قطعة', cost: 8 },
        { rawId: 'raw-3', name: 'جبنة شيدر', amount: 0.04, unit: 'كجم', cost: 310 }
      ]
    },
    {
      productId: 'p6',
      name: 'فلات وايت دبل شوت',
      price: 75,
      items: [
        { rawId: 'raw-4', name: 'بن أرابيكا', amount: 0.018, unit: 'كجم', cost: 820 },
        { rawId: 'raw-5', name: 'حليب فريش', amount: 0.18, unit: 'لتر', cost: 36 }
      ]
    }
  ],

  // الطاولات
  tables: [
    { id: 'طاولة 1', status: 'مشغولة', seats: 2, bill: 420 },
    { id: 'طاولة 2', status: 'فاضية', seats: 4, bill: 0 },
    { id: 'طاولة 3', status: 'فاضية', seats: 6, bill: 0 },
    { id: 'طاولة 4', status: 'تنظيف', seats: 4, bill: 0 }
  ],

  // الموظفين والرواتب
  staff: [
    { name: 'محمد كمال', role: 'مدير الصالة والشفت', status: 'موجود', base: 18000, over: 1200, bonus: 1500, ded: 0 },
    { name: 'الشيف إبراهيم سعد', role: 'شيف مشويات وسخن', status: 'موجود', base: 22000, over: 2000, bonus: 1000, ded: 300 },
    { name: 'سارة طارق', role: 'باريستا رئيسي', status: 'موجود', base: 11000, over: 600, bonus: 800, ded: 150 }
  ],

  // الأوردرات الجارية
  orders: [],
  cart: [],
  orderType: 'صالة'
};

// 2. إدارة التنبيهات
function showToast(msg) {
  const box = document.getElementById('toast-box');
  const toast = document.createElement('div');
  toast.className = 'toast-item';
  toast.textContent = msg;
  box.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

// 3. التنقل بين الصفحات
function setupNavigation() {
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.getAttribute('data-tab');
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active-pane'));
      document.getElementById(`tab-${target}`).classList.add('active-pane');

      // تحديث فوري عند فتح الصفحة
      if (target === 'inventory') renderInventory();
      if (target === 'recipes') renderRecipes();
      if (target === 'staff') renderStaff();
      if (target === 'tables') renderTables();
      if (target === 'kds') renderKitchen();
      if (target === 'barista') renderBarista();
    });
  });

  // منيو الموبايل
  const toggleBtn = document.getElementById('toggle-sidebar');
  const sidebar = document.getElementById('sidebar');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
  }
}

// 4. نظام الكاشير (POS)
function renderPOS() {
  const grid = document.getElementById('pos-grid');
  const searchVal = document.getElementById('pos-search').value.toLowerCase();
  const activeCat = document.querySelector('.cat-btn.active').getAttribute('data-cat');

  const filtered = RestoDB.products.filter(item => {
    const matchCat = activeCat === 'الكل' || item.category === activeCat;
    const matchSearch = item.name.toLowerCase().includes(searchVal);
    return matchCat && matchSearch;
  });

  grid.innerHTML = filtered.map(item => `
    <div class="product-card" onclick="addToCart('${item.id}')">
      <div class="product-icon">${item.icon}</div>
      <div class="product-name">${item.name}</div>
      <div class="product-bottom">
        <span class="product-price">${item.price} ج.م</span>
        <button class="btn-add-mini">+ ضيف</button>
      </div>
    </div>
  `).join('');
}

function addToCart(prodId) {
  const item = RestoDB.products.find(p => p.id === prodId);
  if (!item) return;

  const found = RestoDB.cart.find(c => c.id === prodId);
  if (found) {
    found.qty++;
  } else {
    RestoDB.cart.push({ ...item, qty: 1 });
  }
  updateCartUI();
}

function updateCartQty(prodId, delta) {
  const idx = RestoDB.cart.findIndex(c => c.id === prodId);
  if (idx > -1) {
    RestoDB.cart[idx].qty += delta;
    if (RestoDB.cart[idx].qty <= 0) RestoDB.cart.splice(idx, 1);
  }
  updateCartUI();
}

function updateCartUI() {
  const box = document.getElementById('cart-items-box');
  if (RestoDB.cart.length === 0) {
    box.innerHTML = `<div class="empty-state">الشيك فارغ، اضغط على أي صنف لإضافته.</div>`;
  } else {
    box.innerHTML = RestoDB.cart.map(c => `
      <div class="cart-row">
        <div class="cart-row-title">
          <b>${c.name}</b>
          <small>${c.price} × ${c.qty} = ${(c.price * c.qty)} ج.م</small>
        </div>
        <div class="cart-qty-ctrls">
          <button class="qty-btn" onclick="updateCartQty('${c.id}', -1)">-</button>
          <span class="qty-number">${c.qty}</span>
          <button class="qty-btn" onclick="updateCartQty('${c.id}', 1)">+</button>
        </div>
      </div>
    `).join('');
  }

  // حساب الإجماليات
  const subtotal = RestoDB.cart.reduce((s, i) => s + (i.price * i.qty), 0);
  const service = RestoDB.orderType === 'صالة' ? subtotal * 0.12 : 0;
  const vat = subtotal * 0.14;
  const grandTotal = subtotal + service + vat;

  document.getElementById('txt-subtotal').textContent = `${subtotal.toFixed(2)} ج.م`;
  document.getElementById('txt-service').textContent = `${service.toFixed(2)} ج.م`;
  document.getElementById('txt-vat').textContent = `${vat.toFixed(2)} ج.م`;
  document.getElementById('txt-total').textContent = `${grandTotal.toFixed(2)} ج.م`;
}

// 5. خصم الخامات أوتوماتيك وترحيل الطلب
function finalizeCheckout() {
  if (RestoDB.cart.length === 0) {
    showToast('من فضلك أضف أصناف أولاً قبل الدفع');
    return;
  }

  const orderNum = Math.floor(1050 + Math.random() * 800);
  const table = document.getElementById('cart-table-select').value;

  // فصل أصناف المطبخ عن الباريستا
  const kitchenItems = RestoDB.cart.filter(i => i.station === 'KITCHEN');
  const baristaItems = RestoDB.cart.filter(i => i.station === 'BARISTA');

  if (kitchenItems.length > 0) {
    RestoDB.orders.push({
      num: orderNum,
      station: 'KITCHEN',
      table: table,
      items: kitchenItems,
      time: 'الآن'
    });
  }

  if (baristaItems.length > 0) {
    RestoDB.orders.push({
      num: orderNum,
      station: 'BARISTA',
      table: table,
      items: baristaItems,
      time: 'الآن'
    });
  }

  // خصم الخامات المستهلكة من المخزن بناءً على الريسيبي
  RestoDB.cart.forEach(cartItem => {
    const rec = RestoDB.recipes.find(r => r.productId === cartItem.id);
    if (rec) {
      rec.items.forEach(ing => {
        const raw = RestoDB.inventory.find(i => i.id === ing.rawId);
        if (raw) {
          raw.qty = Math.max(0, raw.qty - (ing.amount * cartItem.qty));
        }
      });
    }
  });

  showToast(`تم دفع الطلب #${orderNum} وخروج بون المطبخ وخصم الخامات بنجاح`);
  RestoDB.cart = [];
  updateCartUI();
  updateStationBadges();
  document.getElementById('modal-payment').classList.add('hidden');
}

function updateStationBadges() {
  const kCount = RestoDB.orders.filter(o => o.station === 'KITCHEN').length;
  const bCount = RestoDB.orders.filter(o => o.station === 'BARISTA').length;
  document.getElementById('badge-kitchen').textContent = kCount;
  document.getElementById('badge-barista').textContent = bCount;
}

// 6. شاشة المطبخ KDS
function renderKitchen() {
  const board = document.getElementById('kds-kitchen-board');
  const kitchenOrders = RestoDB.orders.filter(o => o.station === 'KITCHEN');

  if (kitchenOrders.length === 0) {
    board.innerHTML = `<div class="empty-state">المطبخ هادئ، لا توجد طلبات جارية الآن.</div>`;
    return;
  }

  board.innerHTML = kitchenOrders.map((o, idx) => `
    <div class="ticket-card">
      <div class="ticket-head">
        <b>طلب #${o.num} (${o.table})</b>
        <span class="ticket-time">${o.time}</span>
      </div>
      <div class="ticket-body">
        ${o.items.map(i => `<div class="ticket-item-row">${i.qty} × ${i.name}</div>`).join('')}
      </div>
      <div class="ticket-foot">
        <button class="btn btn-primary" onclick="finishOrder(${o.num}, 'KITCHEN')">تم تجهيز الوجبة</button>
      </div>
    </div>
  `).join('');
}

// 7. شاشة الباريستا
function renderBarista() {
  const board = document.getElementById('kds-barista-board');
  const baristaOrders = RestoDB.orders.filter(o => o.station === 'BARISTA');

  if (baristaOrders.length === 0) {
    board.innerHTML = `<div class="empty-state">لا توجد مشروبات مطلوب تحضيرها الآن.</div>`;
    return;
  }

  board.innerHTML = baristaOrders.map(o => `
    <div class="ticket-card">
      <div class="ticket-head">
        <b>مشروبات #${o.num} (${o.table})</b>
        <span class="ticket-time">${o.time}</span>
      </div>
      <div class="ticket-body">
        ${o.items.map(i => `<div class="ticket-item-row">${i.qty} × ${i.name}</div>`).join('')}
      </div>
      <div class="ticket-foot">
        <button class="btn btn-primary" onclick="finishOrder(${o.num}, 'BARISTA')">تم التحضير وخروج المشروب</button>
      </div>
    </div>
  `).join('');
}

function finishOrder(num, station) {
  const idx = RestoDB.orders.findIndex(o => o.num === num && o.station === station);
  if (idx > -1) {
    RestoDB.orders.splice(idx, 1);
    updateStationBadges();
    if (station === 'KITCHEN') renderKitchen();
    if (station === 'BARISTA') renderBarista();
    showToast(`تم إنهاء طلب #${num} وتسليمه لصالة التقديم`);
  }
}

// 8. جدول المخزن
function renderInventory() {
  const tbody = document.getElementById('inventory-table-body');
  tbody.innerHTML = RestoDB.inventory.map(item => {
    const isLow = item.qty <= item.min;
    return `
      <tr>
        <td><b>${item.name}</b></td>
        <td>${item.cat}</td>
        <td><b>${item.qty.toFixed(2)} ${item.unit}</b></td>
        <td>${item.min} ${item.unit}</td>
        <td>${item.cost} ج.م</td>
        <td>${item.sup}</td>
        <td>
          <span class="status-pill ${isLow ? 'bad' : 'good'}">
            ${isLow ? 'ناقص (مطلوب شراء)' : 'متوفر وآمن'}
          </span>
        </td>
        <td>
          <button class="btn btn-secondary" onclick="restockItem('${item.id}')">+ توريد 10</button>
        </td>
      </tr>
    `;
  }).join('');
}

function restockItem(id) {
  const raw = RestoDB.inventory.find(i => i.id === id);
  if (raw) {
    raw.qty += 10;
    renderInventory();
    showToast(`تم استلام شحنة وتزويد +10 لـ ${raw.name}`);
  }
}

// 9. تكلفة الوجبات (الريسيبي)
let activeRecIndex = 0;
function renderRecipes() {
  const selector = document.getElementById('recipe-selector');
  const details = document.getElementById('recipe-details');

  selector.innerHTML = RestoDB.recipes.map((r, i) => `
    <div class="recipe-item-btn ${i === activeRecIndex ? 'active' : ''}" onclick="selectRecipe(${i})">
      <span>${r.name}</span>
      <span>${r.price} ج.م</span>
    </div>
  `).join('');

  const cur = RestoDB.recipes[activeRecIndex];
  if (!cur) return;

  const totalCost = cur.items.reduce((s, it) => s + (it.amount * it.cost), 0);
  const profit = cur.price - totalCost;
  const foodCostRatio = ((totalCost / cur.price) * 100).toFixed(1);

  details.innerHTML = `
    <h3>تحليل تكلفة: ${cur.name}</h3>
    <p style="color: var(--text-muted); margin-bottom: 14px;">جرامات المكونات الفعلية المخصومة من المخزن مع كل طبق متباع:</p>

    <table class="styled-table" style="margin-bottom: 16px;">
      <thead>
        <tr>
          <th>الخامة</th>
          <th>الكمية المحددة</th>
          <th>سعر الخامة</th>
          <th>التكلفة الفعلية</th>
        </tr>
      </thead>
      <tbody>
        ${cur.items.map(it => `
          <tr>
            <td>${it.name}</td>
            <td>${it.amount} ${it.unit}</td>
            <td>${it.cost} ج.م</td>
            <td><b>${(it.amount * it.cost).toFixed(2)} ج.م</b></td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <div style="display: flex; gap: 12px;">
      <div style="flex:1; background: var(--bg-main); padding: 12px; border-radius: 8px;">
        <span style="font-size:12px; color:var(--text-muted);">تكلفة الطبق الخام:</span>
        <h4 style="font-size: 18px; color: var(--color-orange);">${totalCost.toFixed(2)} ج.م</h4>
      </div>
      <div style="flex:1; background: var(--bg-main); padding: 12px; border-radius: 8px;">
        <span style="font-size:12px; color:var(--text-muted);">صافي ربح الصنف:</span>
        <h4 style="font-size: 18px; color: var(--color-green);">${profit.toFixed(2)} ج.م</h4>
      </div>
      <div style="flex:1; background: var(--bg-main); padding: 12px; border-radius: 8px;">
        <span style="font-size:12px; color:var(--text-muted);">نسبة Food Cost:</span>
        <h4 style="font-size: 18px; color: var(--color-blue);">${foodCostRatio}%</h4>
      </div>
    </div>
  `;
}

function selectRecipe(i) {
  activeRecIndex = i;
  renderRecipes();
}

// 10. جدول الموظفين
function renderStaff() {
  const tbody = document.getElementById('staff-table-body');
  tbody.innerHTML = RestoDB.staff.map(s => {
    const net = s.base + s.over + s.bonus - s.ded;
    return `
      <tr>
        <td><b>${s.name}</b></td>
        <td>${s.role}</td>
        <td><span class="status-pill good">${s.status}</span></td>
        <td>${s.base.toLocaleString()} ج.م</td>
        <td class="text-green">+${s.over} ج.م</td>
        <td class="text-green">+${s.bonus} ج.م</td>
        <td class="text-red">-${s.ded} ج.م</td>
        <td><b style="font-size:15px; color:var(--color-blue);">${net.toLocaleString()} ج.م</b></td>
        <td><button class="btn btn-secondary" onclick="showToast('تم إرسال إشعار الصرف لـ ${s.name}')">تحويل للبنك</button></td>
      </tr>
    `;
  }).join('');
}

// 11. خريطة الطاولات
function renderTables() {
  const grid = document.getElementById('tables-container');
  grid.innerHTML = RestoDB.tables.map(t => `
    <div class="table-node ${t.status}" onclick="cycleTableStatus('${t.id}')">
      <div style="display:flex; justify-content:space-between; margin-bottom: 8px;">
        <b>${t.id}</b>
        <span class="status-pill ${t.status === 'فاضية' ? 'good' : 'bad'}">${t.status}</span>
      </div>
      <div style="font-size: 12px; color: var(--text-muted);">${t.seats} كراسي</div>
      <div style="margin-top: 6px; font-weight: 700;">
        ${t.bill > 0 ? `شيك مفتوح: ${t.bill} ج.م` : 'لا يوجد حساب'}
      </div>
    </div>
  `).join('');
}

function cycleTableStatus(id) {
  const t = RestoDB.tables.find(x => x.id === id);
  if (!t) return;
  if (t.status === 'فاضية') {
    t.status = 'مشغولة';
    t.bill = 310;
  } else if (t.status === 'مشغولة') {
    t.status = 'تنظيف';
    t.bill = 0;
  } else {
    t.status = 'فاضية';
  }
  renderTables();
  showToast(`تم تحديث حالة ${t.id} إلى: ${t.status}`);
}

// تشغيل النظام عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  renderPOS();

  // فلاتر المنيو
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPOS();
    });
  });

  document.getElementById('pos-search').addEventListener('input', renderPOS);

  // أنواع الطلب (صالة / تيك أواي / دليفري)
  document.querySelectorAll('.type-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.type-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      RestoDB.orderType = btn.getAttribute('data-type');
      updateCartUI();
    });
  });

  document.getElementById('btn-clear-cart').addEventListener('click', () => {
    RestoDB.cart = [];
    updateCartUI();
  });

  // فتح نافذة الدفع
  document.getElementById('btn-checkout').addEventListener('click', () => {
    if (RestoDB.cart.length === 0) {
      showToast('أضف أصناف أولاً');
      return;
    }
    const totalTxt = document.getElementById('txt-total').textContent;
    document.getElementById('modal-pay-amount').textContent = totalTxt;
    document.getElementById('modal-payment').classList.remove('hidden');
  });

  document.getElementById('btn-close-modal').addEventListener('click', () => {
    document.getElementById('modal-payment').classList.add('hidden');
  });

  document.getElementById('btn-confirm-pay').addEventListener('click', finalizeCheckout);
});
