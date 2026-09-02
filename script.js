/**
 * RESTOCORE — Next-Gen Restaurant Management System Engine
 * Comprehensive Reactive Data Store, POS, KDS, Recipe BOM, Floor Manager
 */

// ============================================================================
// 1. DATA LAYER (MOCK DATA & LOCALSTORAGE PERSISTENCE)
// ============================================================================

const RestoStore = {
  currency: 'EGP',
  vatRate: 0.14,
  serviceRate: 0.12,

  // Product Catalog
  products: [
    { id: 'p1', name: 'Smoked Truffle Angus Burger', category: 'Burgers', price: 245, cal: '780 kcal', icon: '🍔' },
    { id: 'p2', name: 'Double Aged Cheddar Smash', category: 'Burgers', price: 215, cal: '820 kcal', icon: '🍔' },
    { id: 'p3', name: 'Neapolitan Burrata Margherita', category: 'Pizza', price: 195, cal: '690 kcal', icon: '🍕' },
    { id: 'p4', name: 'Black Truffle Wild Mushroom Pizza', category: 'Pizza', price: 260, cal: '710 kcal', icon: '🍕' },
    { id: 'p5', name: 'Handmade Tagliatelle Bolognese', category: 'Pasta', price: 230, cal: '640 kcal', icon: '🍝' },
    { id: 'p6', name: 'Classic Artisanal Flat White', category: 'Coffee', price: 75, cal: '120 kcal', icon: '☕' },
    { id: 'p7', name: 'V60 Single Origin Ethiopian Yirgacheffe', category: 'Coffee', price: 95, cal: '5 kcal', icon: '☕' },
    { id: 'p8', name: 'Cold Brew Citrus Nitro Infusion', category: 'Cold Drinks', price: 110, cal: '45 kcal', icon: '🍹' },
    { id: 'p9', name: 'Classic Madagascar Vanilla Tiramisu', category: 'Desserts', price: 140, cal: '480 kcal', icon: '🍰' },
    { id: 'p10', name: 'San Sebastian Basque Cheesecake', category: 'Desserts', price: 165, cal: '520 kcal', icon: '🍰' }
  ],

  // Raw Inventory Ingredients
  inventory: [
    { id: 'inv-1', name: 'Prime Black Angus Minced Beef', category: 'Proteins', balance: 28.5, unit: 'kg', minPar: 10, costPerUnit: 480, supplier: 'Cairo Premium Butchers', expiry: '2026-09-12' },
    { id: 'inv-2', name: 'Artisan Brioche Burger Buns', category: 'Bakery', balance: 140, unit: 'pcs', minPar: 40, costPerUnit: 8.5, supplier: 'Baguette Bakery', expiry: '2026-09-06' },
    { id: 'inv-3', name: 'Aged English Red Cheddar Slices', category: 'Dairy', balance: 6.2, unit: 'kg', minPar: 3, costPerUnit: 340, supplier: 'Euro Gourmet Dairy', expiry: '2026-10-15' },
    { id: 'inv-4', name: 'Specialty Arabica Coffee Beans', category: 'Coffee', balance: 18.0, unit: 'kg', minPar: 5, costPerUnit: 850, supplier: 'Mokha Roasters', expiry: '2026-12-01' },
    { id: 'inv-5', name: 'Fresh Full Cream Milk', category: 'Dairy', balance: 4.5, unit: 'L', minPar: 15, costPerUnit: 38, supplier: 'Almarai Direct', expiry: '2026-09-08' },
    { id: 'inv-6', name: 'Italian San Marzano Tomato Sauce', category: 'Pantry', balance: 22.0, unit: 'kg', minPar: 8, costPerUnit: 120, supplier: 'Napoli Imports', expiry: '2027-01-10' }
  ],

  // Bill of Materials (BOM) Recipes & Cost Engine
  recipes: [
    {
      productId: 'p1',
      productName: 'Smoked Truffle Angus Burger',
      sellingPrice: 245,
      ingredients: [
        { invId: 'inv-1', name: 'Angus Beef', qty: 0.18, unit: 'kg', unitCost: 480 },
        { invId: 'inv-2', name: 'Brioche Bun', qty: 1, unit: 'pcs', unitCost: 8.5 },
        { invId: 'inv-3', name: 'Aged Cheddar', qty: 0.04, unit: 'kg', unitCost: 340 }
      ]
    },
    {
      productId: 'p6',
      productName: 'Classic Artisanal Flat White',
      sellingPrice: 75,
      ingredients: [
        { invId: 'inv-4', name: 'Arabica Coffee Beans', qty: 0.018, unit: 'kg', unitCost: 850 },
        { invId: 'inv-5', name: 'Fresh Milk', qty: 0.18, unit: 'L', unitCost: 38 }
      ]
    }
  ],

  // Dining Tables Matrix
  tables: [
    { id: 'T-01', seats: 2, status: 'OCCUPIED', orderId: '#1039', bill: 460, server: 'M. Kamel' },
    { id: 'T-02', seats: 4, status: 'AVAILABLE', orderId: null, bill: 0, server: '-' },
    { id: 'T-03', seats: 6, status: 'OCCUPIED', orderId: '#1042', bill: 820, server: 'S. Nabil' },
    { id: 'T-04', seats: 4, status: 'RESERVED', orderId: null, bill: 0, server: '-' },
    { id: 'T-05', seats: 2, status: 'CLEANING', orderId: null, bill: 0, server: '-' },
    { id: 'T-06', seats: 8, status: 'AVAILABLE', orderId: null, bill: 0, server: '-' },
    { id: 'T-07', seats: 4, status: 'OCCUPIED', orderId: '#1041', bill: 310, server: 'M. Kamel' },
    { id: 'T-08', seats: 2, status: 'AVAILABLE', orderId: null, bill: 0, server: '-' }
  ],

  // Active Kitchen and Barista Orders
  orders: [
    {
      id: 1041,
      table: 'T-07',
      type: 'Dine-In',
      station: 'GRILL',
      timer: 8,
      status: 'PREPARING',
      priority: 'NORMAL',
      items: [
        { name: 'Smoked Truffle Angus Burger', qty: 2, notes: 'Medium Rare, No Pickles' }
      ]
    },
    {
      id: 1042,
      table: 'T-03',
      type: 'Dine-In',
      station: 'BARISTA',
      timer: 4,
      status: 'NEW',
      priority: 'URGENT',
      items: [
        { name: 'Classic Artisanal Flat White', qty: 2, notes: 'Oat Milk substitute' },
        { name: 'Cold Brew Citrus Nitro', qty: 1, notes: 'Extra ice' }
      ]
    }
  ],

  // Staff & Net Payroll Data
  staff: [
    { id: 'emp-1', name: 'Mahmoud Kamel', role: 'Head of Operations', status: 'Shift On', base: 28000, overtime: 2400, bonus: 3000, deductions: 500 },
    { id: 'emp-2', name: 'Tarek Al-Sayed', role: 'Executive Head Chef', status: 'Shift On', base: 32000, overtime: 1800, bonus: 2000, deductions: 0 },
    { id: 'emp-3', name: 'Nouran Hany', role: 'Lead Barista & Quality', status: 'Shift On', base: 14000, overtime: 800, bonus: 1000, deductions: 200 },
    { id: 'emp-4', name: 'Sameh Nabil', role: 'Senior Floor Captain', status: 'Shift Off', base: 11000, overtime: 0, bonus: 500, deductions: 150 }
  ],

  // Suppliers Directory
  suppliers: [
    { id: 'sup-1', name: 'Cairo Premium Butchers', phone: '+20 100 892 1100', balance: 34500, status: 'Active' },
    { id: 'sup-2', name: 'Mokha Roasters Specialty', phone: '+20 112 400 9988', balance: 12800, status: 'Active' },
    { id: 'sup-3', name: 'Almarai Dairy Distribution', phone: '+20 122 334 5566', balance: 4200, status: 'Settled' }
  ],

  // Live POS Cart State
  cart: [],
  cartDiscountPct: 0,
  selectedOrderType: 'Dine-In',

  // Save all to localStorage
  syncStorage() {
    localStorage.setItem('restocore_state', JSON.stringify({
      inventory: this.inventory,
      tables: this.tables,
      orders: this.orders
    }));
  },

  // Load from localStorage if present
  init() {
    const saved = localStorage.getItem('restocore_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.inventory) this.inventory = parsed.inventory;
        if (parsed.tables) this.tables = parsed.tables;
        if (parsed.orders) this.orders = parsed.orders;
      } catch (e) {
        console.warn('RestoCore state parsing reset', e);
      }
    }
  }
};

// ============================================================================
// 2. VIEW CONTROLLER & ROUTING NAVIGATION
// ============================================================================

const AppNavigation = {
  currentModule: 'dash',

  init() {
    // Navigation buttons in sidebar
    document.querySelectorAll('.nav-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        this.switchTab(target);
      });
    });

    // Landing Page Navigation Trigger
    const btnLaunch = document.getElementById('btn-launch-terminal');
    const btnHero = document.getElementById('btn-hero-explore');
    const btnExit = document.getElementById('btn-back-to-landing');

    if (btnLaunch) btnLaunch.addEventListener('click', () => this.enterTerminal());
    if (btnHero) btnHero.addEventListener('click', () => this.enterTerminal());
    if (btnExit) btnExit.addEventListener('click', () => this.exitTerminal());

    // Customer Menu Toggle
    const btnCustMenu = document.getElementById('btn-goto-menu');
    const btnCloseCustMenu = document.getElementById('btn-close-customer-menu');
    const btnRemoteKiosk = document.getElementById('btn-open-remote-kiosk');

    if (btnCustMenu) btnCustMenu.addEventListener('click', () => this.toggleCustomerMenu(true));
    if (btnRemoteKiosk) btnRemoteKiosk.addEventListener('click', () => this.toggleCustomerMenu(true));
    if (btnCloseCustMenu) btnCloseCustMenu.addEventListener('click', () => this.toggleCustomerMenu(false));

    // Mobile Sidebar Drawer
    const mobileMenuTrigger = document.getElementById('mobile-menu-trigger');
    const sidebar = document.getElementById('app-sidebar');
    if (mobileMenuTrigger && sidebar) {
      mobileMenuTrigger.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
      });
    }

    // Role switcher dropdown
    const roleSelect = document.getElementById('role-select');
    if (roleSelect) {
      roleSelect.addEventListener('change', (e) => {
        const role = e.target.value;
        document.getElementById('current-user-role').textContent = role;
        Toast.notify(`Security context switched to: ${role}`);
      });
    }
  },

  enterTerminal() {
    document.getElementById('view-landing').classList.add('hidden');
    document.getElementById('view-app-shell').classList.remove('hidden');
    this.switchTab('dash');
    Toast.notify('RESTOCORE OS Connected — Branch: New Cairo Node');
  },

  exitTerminal() {
    document.getElementById('view-app-shell').classList.add('hidden');
    document.getElementById('view-landing').classList.remove('hidden');
  },

  toggleCustomerMenu(open) {
    const view = document.getElementById('view-customer-menu');
    if (open) {
      view.classList.remove('hidden');
      MenuModule.renderCustomerCatalog();
    } else {
      view.classList.add('hidden');
    }
  },

  switchTab(targetId) {
    this.currentModule = targetId;

    // Update active nav button
    document.querySelectorAll('.nav-item-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-target') === targetId);
    });

    // Hide all panes & show target pane
    document.querySelectorAll('.module-pane').forEach(pane => {
      pane.classList.remove('active-pane');
    });

    const targetPane = document.getElementById(`pane-${targetId}`);
    if (targetPane) {
      targetPane.classList.add('active-pane');
    }

    // Lazy view refresh triggers
    if (targetId === 'pos') POSModule.renderCatalog();
    if (targetId === 'kds') KDSModule.render();
    if (targetId === 'barista') BaristaModule.render();
    if (targetId === 'tables') TableModule.render();
    if (targetId === 'inventory') InventoryModule.render();
    if (targetId === 'recipes') RecipeModule.render();
    if (targetId === 'staff') StaffModule.render();
    if (targetId === 'suppliers') SuppliersModule.render();
    if (targetId === 'dash') DashboardModule.render();
  }
};

// ============================================================================
// 3. TOAST & MODAL MICRO-FRAMEWORK
// ============================================================================

const Toast = {
  notify(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }
};

const UIModal = {
  open(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('hidden');
  },
  close(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('hidden');
  }
};

// ============================================================================
// 4. POS CASHIER SYSTEM
// ============================================================================

const POSModule = {
  activeCategory: 'ALL',

  init() {
    // POS Category tabs
    document.querySelectorAll('#pos-category-tabs .cat-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#pos-category-tabs .cat-pill').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        this.activeCategory = btn.getAttribute('data-cat');
        this.renderCatalog();
      });
    });

    // Search filter
    const search = document.getElementById('pos-search-box');
    if (search) {
      search.addEventListener('input', () => this.renderCatalog());
    }

    // Order type buttons
    document.querySelectorAll('#pos-order-type-switch .type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#pos-order-type-switch .type-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        RestoStore.selectedOrderType = btn.getAttribute('data-type');
      });
    });

    // Clear cart button
    const clearBtn = document.getElementById('btn-clear-cart');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        RestoStore.cart = [];
        this.updateCartView();
        Toast.notify('Order ticket cleared');
      });
    }

    // Checkout modal trigger
    const checkoutBtn = document.getElementById('btn-checkout-order');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (RestoStore.cart.length === 0) {
          Toast.notify('Order slip is empty. Add items first.');
          return;
        }
        const calc = this.calculateMath();
        document.getElementById('settle-grand-total').textContent = `EGP ${calc.grandTotal.toFixed(2)}`;
        UIModal.open('modal-checkout');
      });
    }

    // Finalize payment button
    const finalizeBtn = document.getElementById('btn-finalize-payment');
    if (finalizeBtn) {
      finalizeBtn.addEventListener('click', () => this.processSettlement());
    }
  },

  renderCatalog() {
    const grid = document.getElementById('pos-products-grid');
    if (!grid) return;
    const query = (document.getElementById('pos-search-box')?.value || '').toLowerCase();

    const filtered = RestoStore.products.filter(item => {
      const matchCat = this.activeCategory === 'ALL' || item.category === this.activeCategory;
      const matchQuery = item.name.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });

    grid.innerHTML = filtered.map(item => `
      <div class="pos-prod-card" onclick="POSModule.addToCart('${item.id}')">
        <div class="prod-img-placeholder">${item.icon}</div>
        <div class="prod-name">${item.name}</div>
        <div class="prod-cal">${item.cal}</div>
        <div class="prod-bottom">
          <span class="prod-price">EGP ${item.price.toFixed(2)}</span>
          <button class="btn-micro">+ Add</button>
        </div>
      </div>
    `).join('');
  },

  addToCart(prodId) {
    const prod = RestoStore.products.find(p => p.id === prodId);
    if (!prod) return;
    const existing = RestoStore.cart.find(i => i.id === prodId);
    if (existing) {
      existing.qty += 1;
    } else {
      RestoStore.cart.push({ id: prod.id, name: prod.name, price: prod.price, qty: 1 });
    }
    this.updateCartView();
  },

  updateQty(prodId, delta) {
    const itemIndex = RestoStore.cart.findIndex(i => i.id === prodId);
    if (itemIndex > -1) {
      RestoStore.cart[itemIndex].qty += delta;
      if (RestoStore.cart[itemIndex].qty <= 0) {
        RestoStore.cart.splice(itemIndex, 1);
      }
    }
    this.updateCartView();
  },

  calculateMath() {
    const subtotal = RestoStore.cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const tax = subtotal * RestoStore.vatRate;
    const service = RestoStore.selectedOrderType === 'Dine-In' ? subtotal * RestoStore.serviceRate : 0;
    const discount = subtotal * (RestoStore.cartDiscountPct / 100);
    const grandTotal = Math.max(0, subtotal + tax + service - discount);

    return { subtotal, tax, service, discount, grandTotal };
  },

  updateCartView() {
    const container = document.getElementById('pos-cart-items');
    const subtotalEl = document.getElementById('pos-subtotal');
    const taxEl = document.getElementById('pos-tax');
    const serviceEl = document.getElementById('pos-service');
    const discountEl = document.getElementById('pos-discount');
    const grandTotalEl = document.getElementById('pos-grand-total');

    if (RestoStore.cart.length === 0) {
      container.innerHTML = `
        <div class="empty-cart-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <p>No items in ticket. Select items from menu catalog.</p>
        </div>`;
    } else {
      container.innerHTML = RestoStore.cart.map(item => `
        <div class="cart-item-row">
          <div class="item-meta-side">
            <div class="item-name">${item.name}</div>
            <div class="item-unit-price">EGP ${item.price.toFixed(2)}</div>
          </div>
          <div class="item-qty-ctrls">
            <button class="qty-btn" onclick="POSModule.updateQty('${item.id}', -1)">-</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="POSModule.updateQty('${item.id}', 1)">+</button>
          </div>
          <div class="item-total-val">EGP ${(item.price * item.qty).toFixed(2)}</div>
        </div>
      `).join('');
    }

    const math = this.calculateMath();
    subtotalEl.textContent = `EGP ${math.subtotal.toFixed(2)}`;
    taxEl.textContent = `EGP ${math.tax.toFixed(2)}`;
    serviceEl.textContent = `EGP ${math.service.toFixed(2)}`;
    discountEl.textContent = `- EGP ${math.discount.toFixed(2)}`;
    grandTotalEl.textContent = `EGP ${math.grandTotal.toFixed(2)}`;

    // Update active count badge in sidebar
    const badge = document.getElementById('pos-active-count');
    if (badge) badge.textContent = RestoStore.cart.reduce((a, b) => a + b.qty, 0);
  },

  processSettlement() {
    const math = this.calculateMath();
    const newOrderId = Math.floor(1040 + Math.random() * 800);
    const tableSelected = document.getElementById('pos-table-select').value;

    // Automatic Bill of Materials Inventory Deduction
    RestoStore.cart.forEach(cartItem => {
      const recipe = RestoStore.recipes.find(r => r.productId === cartItem.id);
      if (recipe) {
        recipe.ingredients.forEach(ing => {
          const invItem = RestoStore.inventory.find(i => i.id === ing.invId);
          if (invItem) {
            invItem.balance = Math.max(0, invItem.balance - (ing.qty * cartItem.qty));
          }
        });
      }
    });

    // Create New KDS Order
    RestoStore.orders.push({
      id: newOrderId,
      table: tableSelected,
      type: RestoStore.selectedOrderType,
      station: 'GRILL',
      timer: 0,
      status: 'NEW',
      priority: 'NORMAL',
      items: RestoStore.cart.map(i => ({ name: i.name, qty: i.qty, notes: 'Standard Prep' }))
    });

    // Populate Printable Receipt Modal
    document.getElementById('rcpt-order-id').textContent = `ORDER #${newOrderId}`;
    document.getElementById('rcpt-table-id').textContent = `Table: ${tableSelected}`;
    document.getElementById('rcpt-subtotal').textContent = `EGP ${math.subtotal.toFixed(2)}`;
    document.getElementById('rcpt-vat').textContent = `EGP ${math.tax.toFixed(2)}`;
    document.getElementById('rcpt-service').textContent = `EGP ${math.service.toFixed(2)}`;
    document.getElementById('rcpt-total').textContent = `EGP ${math.grandTotal.toFixed(2)}`;

    const rcptItemsContainer = document.getElementById('rcpt-items-list');
    rcptItemsContainer.innerHTML = RestoStore.cart.map(i => `
      <div class="receipt-row-split">
        <span>${i.qty}x ${i.name}</span>
        <span>EGP ${(i.price * i.qty).toFixed(2)}</span>
      </div>
    `).join('');

    // Reset Cart & Close Settlement Modal
    RestoStore.cart = [];
    this.updateCartView();
    RestoStore.syncStorage();
    UIModal.close('modal-checkout');
    UIModal.open('modal-receipt');
    Toast.notify(`Payment Authorized! Order #${newOrderId} sent to KDS stations.`);
  }
};

// ============================================================================
// 5. KITCHEN DISPLAY (KDS) & BARISTA SYSTEMS
// ============================================================================

const KDSModule = {
  render() {
    const board = document.getElementById('kds-board');
    if (!board) return;
    const active = RestoStore.orders.filter(o => o.station !== 'BARISTA');

    board.innerHTML = active.map(order => `
      <div class="kds-card ${order.priority === 'URGENT' ? 'urgent' : ''}">
        <div class="kds-card-head">
          <span class="kds-order-num">#${order.id} • ${order.table}</span>
          <span class="kds-timer ${order.timer > 10 ? 'overdue' : ''}">${order.timer}m ago</span>
        </div>
        <div class="kds-card-body">
          ${order.items.map(i => `
            <div class="kds-item-line">
              <div>
                <span class="kds-item-qty">${i.qty}x</span>
                <span class="kds-item-name">${i.name}</span>
                ${i.notes ? `<span class="kds-item-mod">↳ ${i.notes}</span>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
        <div class="kds-card-foot">
          <button class="btn btn-primary kds-action-btn" onclick="KDSModule.advanceStatus(${order.id})">
            ${order.status === 'NEW' ? 'Start Preparing' : 'Mark Ready &amp; Serve'}
          </button>
        </div>
      </div>
    `).join('');

    // Update pending counter
    const countEl = document.getElementById('kds-pending-count');
    if (countEl) countEl.textContent = active.length;
  },

  advanceStatus(orderId) {
    const idx = RestoStore.orders.findIndex(o => o.id === orderId);
    if (idx > -1) {
      if (RestoStore.orders[idx].status === 'NEW') {
        RestoStore.orders[idx].status = 'PREPARING';
        Toast.notify(`Order #${orderId} moved to PREPARING.`);
      } else {
        RestoStore.orders.splice(idx, 1);
        Toast.notify(`Order #${orderId} marked COMPLETED & SERVED.`);
      }
      this.render();
      RestoStore.syncStorage();
    }
  }
};

const BaristaModule = {
  render() {
    const board = document.getElementById('barista-board');
    if (!board) return;
    const active = RestoStore.orders.filter(o => o.station === 'BARISTA');

    board.innerHTML = active.map(order => `
      <div class="kds-card urgent">
        <div class="kds-card-head">
          <span class="kds-order-num">#${order.id} • ${order.table}</span>
          <span class="kds-timer">${order.timer}m ago</span>
        </div>
        <div class="kds-card-body">
          ${order.items.map(i => `
            <div class="kds-item-line">
              <div>
                <span class="kds-item-qty">${i.qty}x</span>
                <span class="kds-item-name">${i.name}</span>
                ${i.notes ? `<span class="kds-item-mod">↳ ${i.notes}</span>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
        <div class="kds-card-foot">
          <button class="btn btn-primary kds-action-btn" onclick="BaristaModule.completeDrink(${order.id})">
            Brew &amp; Complete
          </button>
        </div>
      </div>
    `).join('');
  },

  completeDrink(orderId) {
    const idx = RestoStore.orders.findIndex(o => o.id === orderId);
    if (idx > -1) {
      RestoStore.orders.splice(idx, 1);
      Toast.notify(`Beverage #${orderId} dispatched to floor.`);
      this.render();
      RestoStore.syncStorage();
    }
  }
};

// ============================================================================
// 6. INVENTORY & RECIPE COSTING ENGINES
// ============================================================================

const InventoryModule = {
  render() {
    const tbody = document.getElementById('inventory-table-body');
    if (!tbody) return;

    tbody.innerHTML = RestoStore.inventory.map(item => {
      const isCritical = item.balance <= item.minPar;
      return `
        <tr>
          <td><b>${item.name}</b></td>
          <td>${item.category}</td>
          <td><b>${item.balance.toFixed(2)}</b></td>
          <td>${item.unit}</td>
          <td>${item.minPar} ${item.unit}</td>
          <td>EGP ${item.costPerUnit.toFixed(2)}</td>
          <td>${item.supplier}</td>
          <td>${item.expiry}</td>
          <td>
            <span class="status-tag ${isCritical ? 'danger' : 'good'}">
              ${isCritical ? 'CRITICAL LOW' : 'OPTIMAL'}
            </span>
          </td>
          <td>
            <button class="btn-micro" onclick="InventoryModule.replenish('${item.id}')">+ Re-Order</button>
          </td>
        </tr>
      `;
    }).join('');

    // Update alert count
    const alerts = RestoStore.inventory.filter(i => i.balance <= i.minPar).length;
    const alertCountEl = document.getElementById('inv-alert-count');
    if (alertCountEl) alertCountEl.textContent = alerts;
  },

  replenish(id) {
    const item = RestoStore.inventory.find(i => i.id === id);
    if (item) {
      item.balance += 25;
      Toast.notify(`Restocked +25 ${item.unit} for ${item.name}`);
      this.render();
      RestoStore.syncStorage();
    }
  }
};

const RecipeModule = {
  activeRecipeIndex: 0,

  render() {
    const list = document.getElementById('recipe-nav-list');
    const details = document.getElementById('recipe-details-card');
    if (!list || !details) return;

    list.innerHTML = RestoStore.recipes.map((rec, idx) => `
      <div class="recipe-select-item ${idx === this.activeRecipeIndex ? 'active' : ''}" onclick="RecipeModule.select(${idx})">
        <span>${rec.productName}</span>
        <span class="font-mono">EGP ${rec.sellingPrice}</span>
      </div>
    `).join('');

    const current = RestoStore.recipes[this.activeRecipeIndex];
    if (!current) return;

    // Calculate BOM food cost
    const totalCost = current.ingredients.reduce((acc, ing) => acc + (ing.qty * ing.unitCost), 0);
    const grossProfit = current.sellingPrice - totalCost;
    const foodCostPct = (totalCost / current.sellingPrice) * 100;

    details.innerHTML = `
      <div class="pane-header-row">
        <div>
          <h3 class="pane-title">${current.productName}</h3>
          <span class="pane-subtitle">Standardized Formulation Bill of Materials (BOM)</span>
        </div>
        <div class="stats-mini-ribbon">
          <span>Target Food Cost: <b class="${foodCostPct > 32 ? 'text-rose' : 'text-emerald'}">${foodCostPct.toFixed(1)}%</b></span>
        </div>
      </div>

      <table class="data-table" style="margin: 20px 0;">
        <thead>
          <tr>
            <th>Ingredient Raw Material</th>
            <th>Required Dosage</th>
            <th>Unit Cost</th>
            <th>Ext. Ingredient Cost</th>
          </tr>
        </thead>
        <tbody>
          ${current.ingredients.map(ing => `
            <tr>
              <td>${ing.name}</td>
              <td>${ing.qty} ${ing.unit}</td>
              <td>EGP ${ing.unitCost.toFixed(2)}</td>
              <td><b>EGP ${(ing.qty * ing.unitCost).toFixed(2)}</b></td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="dashboard-charts-layout">
        <div class="glass-panel" style="padding: 16px; flex: 1;">
          <div class="subcard-metric-label">Total Plate BOM Cost</div>
          <div class="metric-number text-amber">EGP ${totalCost.toFixed(2)}</div>
        </div>
        <div class="glass-panel" style="padding: 16px; flex: 1;">
          <div class="subcard-metric-label">Gross Margin per Plate</div>
          <div class="metric-number text-emerald">EGP ${grossProfit.toFixed(2)}</div>
        </div>
        <div class="glass-panel" style="padding: 16px; flex: 1;">
          <div class="subcard-metric-label">Selling Price</div>
          <div class="metric-number text-cyan">EGP ${current.sellingPrice.toFixed(2)}</div>
        </div>
      </div>
    `;
  },

  select(idx) {
    this.activeRecipeIndex = idx;
    this.render();
  }
};

// ============================================================================
// 7. TABLE MANAGEMENT MATRIX
// ============================================================================

const TableModule = {
  render() {
    const grid = document.getElementById('floor-tables-grid');
    if (!grid) return;

    grid.innerHTML = RestoStore.tables.map(table => `
      <div class="floor-table-node ${table.status}" onclick="TableModule.toggleTable('${table.id}')">
        <div style="display: flex; justify-content: space-between;">
          <span class="bold" style="font-size: 16px;">${table.id}</span>
          <span class="status-tag ${table.status === 'AVAILABLE' ? 'good' : 'danger'}">${table.status}</span>
        </div>
        <div>
          <div style="font-size: 11px; color: var(--text-muted);">${table.seats} Seats • Server: ${table.server}</div>
          <div style="font-family: var(--font-mono); font-weight: 700; margin-top: 4px;">
            ${table.bill > 0 ? `Bill: EGP ${table.bill.toFixed(2)}` : 'No Open Bill'}
          </div>
        </div>
      </div>
    `).join('');
  },

  toggleTable(id) {
    const table = RestoStore.tables.find(t => t.id === id);
    if (!table) return;

    if (table.status === 'AVAILABLE') {
      table.status = 'OCCUPIED';
      table.bill = 350;
      table.server = 'M. Kamel';
      Toast.notify(`${table.id} marked as OCCUPIED`);
    } else if (table.status === 'OCCUPIED') {
      table.status = 'CLEANING';
      table.bill = 0;
      Toast.notify(`${table.id} marked for SANITIZATION`);
    } else {
      table.status = 'AVAILABLE';
      Toast.notify(`${table.id} is now CLEAN & AVAILABLE`);
    }
    this.render();
    RestoStore.syncStorage();
  }
};

// ============================================================================
// 8. STAFF PAYROLL & SUPPLIERS MODULES
// ============================================================================

const StaffModule = {
  render() {
    const tbody = document.getElementById('staff-payroll-body');
    if (!tbody) return;

    tbody.innerHTML = RestoStore.staff.map(emp => {
      const net = emp.base + emp.overtime + emp.bonus - emp.deductions;
      return `
        <tr>
          <td><b>${emp.name}</b></td>
          <td>${emp.role}</td>
          <td><span class="status-tag good">${emp.status}</span></td>
          <td>EGP ${emp.base.toLocaleString()}</td>
          <td class="text-emerald">+EGP ${emp.overtime}</td>
          <td class="text-emerald">+EGP ${emp.bonus}</td>
          <td class="text-rose">-EGP ${emp.deductions}</td>
          <td><b class="text-cyan font-mono" style="font-size: 15px;">EGP ${net.toLocaleString()}</b></td>
          <td><button class="btn-micro" onclick="Toast.notify('Direct Bank ACH Initiated for ${emp.name}')">Disburse Net</button></td>
        </tr>
      `;
    }).join('');
  }
};

const SuppliersModule = {
  render() {
    const grid = document.getElementById('suppliers-card-grid');
    if (!grid) return;

    grid.innerHTML = RestoStore.suppliers.map(sup => `
      <div class="glass-panel" style="padding: 24px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
          <h3 class="box-title">${sup.name}</h3>
          <span class="status-tag good">${sup.status}</span>
        </div>
        <p style="color: var(--text-muted); font-size: 12px; margin-bottom: 16px;">Direct Line: ${sup.phone}</p>
        <div style="background: rgba(255, 255, 255, 0.02); padding: 14px; border-radius: 8px; margin-bottom: 16px;">
          <div style="font-size: 11px; color: var(--text-muted);">Outstanding Balance</div>
          <div style="font-size: 22px; font-weight: 800; font-family: var(--font-mono); color: #f43f5e;">
            EGP ${sup.balance.toLocaleString()}
          </div>
        </div>
        <button class="btn btn-secondary w-full" onclick="Toast.notify('Statement generated for ${sup.name}')">Download Invoicing Statement</button>
      </div>
    `).join('');
  }
};

// ============================================================================
// 9. DASHBOARD TELEMETRY & SVG CHARTS
// ============================================================================

const DashboardModule = {
  render() {
    // Generate Dynamic SVG Velocity Line
    const chartStage = document.getElementById('revenue-chart-stage');
    if (chartStage) {
      chartStage.innerHTML = `
        <svg viewBox="0 0 500 180" style="width: 100%; height: 100%; overflow: visible;">
          <defs>
            <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.4"/>
              <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <path d="M 10 140 Q 90 40, 160 90 T 320 60 T 490 20" fill="none" stroke="#3b82f6" stroke-width="3"/>
          <path d="M 10 140 Q 90 40, 160 90 T 320 60 T 490 20 L 490 180 L 10 180 Z" fill="url(#chartGlow)"/>
          <circle cx="490" cy="20" r="5" fill="#60a5fa"/>
        </svg>
      `;
    }

    // Category progress bars
    const catBars = document.getElementById('category-progress-bars');
    if (catBars) {
      const items = [
        { name: 'Burgers & Grill', pct: 42, val: 'EGP 28,740' },
        { name: 'Stone Baked Pizza', pct: 28, val: 'EGP 19,160' },
        { name: 'Specialty Coffee', pct: 18, val: 'EGP 12,317' },
        { name: 'Artisan Desserts', pct: 12, val: 'EGP 8,213' }
      ];
      catBars.innerHTML = items.map(c => `
        <div class="cat-progress-item">
          <div class="cat-progress-meta">
            <span>${c.name}</span>
            <span class="bold font-mono">${c.val} (${c.pct}%)</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width: ${c.pct}%;"></div>
          </div>
        </div>
      `).join('');
    }

    // Low stock alerts table in dashboard
    const lowStockBody = document.getElementById('dash-low-stock-body');
    if (lowStockBody) {
      lowStockBody.innerHTML = RestoStore.inventory.slice(0, 3).map(i => `
        <tr>
          <td>${i.name}</td>
          <td><b>${i.balance} ${i.unit}</b></td>
          <td>${i.minPar} ${i.unit}</td>
          <td><span class="status-tag ${i.balance <= i.minPar ? 'danger' : 'good'}">${i.balance <= i.minPar ? 'Reorder Due' : 'Stable'}</span></td>
          <td><button class="btn-micro" onclick="InventoryModule.replenish('${i.id}')">Restock</button></td>
        </tr>
      `).join('');
    }
  }
};

// ============================================================================
// 10. CUSTOMER-FACING SMART MENU & ORDERING
// ============================================================================

const MenuModule = {
  customerCart: [],

  renderCustomerCatalog() {
    const container = document.getElementById('customer-products-container');
    if (!container) return;

    container.innerHTML = RestoStore.products.map(p => `
      <div class="glass-panel" style="padding: 16px; margin-bottom: 14px; display: flex; gap: 14px; align-items: center;">
        <div style="font-size: 38px;">${p.icon}</div>
        <div style="flex-grow: 1;">
          <h4 style="font-size: 14px; font-weight: 700;">${p.name}</h4>
          <span style="font-size: 11px; color: var(--text-muted);">${p.cal}</span>
          <div style="font-family: var(--font-mono); font-weight: 700; color: #60a5fa; margin-top: 4px;">
            EGP ${p.price.toFixed(2)}
          </div>
        </div>
        <button class="btn btn-primary" onclick="MenuModule.addCustomerCart('${p.id}')">+ Add</button>
      </div>
    `).join('');
  },

  addCustomerCart(id) {
    this.customerCart.push(id);
    const counter = document.getElementById('customer-cart-counter');
    if (counter) counter.textContent = this.customerCart.length;
    Toast.notify('Item added to Table #4 order slip');
  }
};

// ============================================================================
// 11. 3D CARD TILT MICRO-INTERACTIONS
// ============================================================================

function initTiltEffects() {
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = -(y / rect.height) * 12;
      const rotateY = (x / rect.width) * 12;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  });
}

// Global System Initialization
window.addEventListener('DOMContentLoaded', () => {
  RestoStore.init();
  AppNavigation.init();
  POSModule.init();
  initTiltEffects();
});

