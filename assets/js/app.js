// State Management
const state = {
  theme: localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  selectedProduct: 'banner', // 'banner', 'stempel', 'stiker', 'undangan'
  activePortfolioFilter: 'all',
  
  // Banner config
  banner: {
    panjang: 2,
    lebar: 1,
    bahan: 'flexi-standar',
    finishing: 'mata-ayam',
    qty: 1
  },
  
  // Stempel config
  stempel: {
    ukuran: 'bulat-40',
    warnaQty: 1,
    tinta: 'Biru',
    qty: 1
  },
  
  // Stiker config
  stiker: {
    bahan: 'vinyl-glossy',
    cutting: 'kiss-cut',
    laminasi: 'none',
    qty: 5
  },
  
  // Undangan config
  undangan: {
    tipe: 'brosur-a4',
    finishing: 'standar',
    qty: 300
  }
};

// Pricing Database
const pricing = {
  banner: {
    materials: {
      'flexi-standar': { name: 'Flexi Standar 280 gsm', pricePerM2: 25000 },
      'flexi-higires': { name: 'Flexi Higires 340 gsm', pricePerM2: 35000 },
      'flexi-korea': { name: 'Flexi Korea 440 gsm', pricePerM2: 50000 },
      'flexi-jerman': { name: 'Flexi Jerman 510 gsm', pricePerM2: 85000 }
    },
    finishing: {
      'mata-ayam': { name: 'Mata Ayam Tiap Sudut (Termasuk)', extra: 0 },
      'lipat-pres': { name: 'Lipat Pres Keliling Saja', extra: 2000 },
      'kolong-kayu': { name: 'Kolong Bambu / Kayu (Atas-Bawah)', extra: 5000 },
      'potong-pas': { name: 'Potong Pas Gambar (Tanpa Lebih)', extra: 0 }
    },
    leadTime: '1 - 2 Hari Kerja'
  },
  stempel: {
    types: {
      'bulat-40': { name: 'Bulat Standar (Ø 40 mm)', basePrice: 75000 },
      'bulat-28': { name: 'Bulat Kecil (Ø 28 mm)', basePrice: 55000 },
      'persegi-22-55': { name: 'Persegi Panjang (22 x 55 mm)', basePrice: 65000 },
      'kotak-35': { name: 'Kotak Standar (35 x 35 mm)', basePrice: 70000 },
      'oval-30-45': { name: 'Oval Standar (30 x 45 mm)', basePrice: 75000 }
    },
    extraColor: { 1: 0, 2: 15000, 3: 25000 },
    leadTime: '1 Hari Kerja'
  },
  stiker: {
    materials: {
      'vinyl-glossy': { name: 'Vinyl Glossy Waterproof', pricePerLbr: 18000 },
      'vinyl-doff': { name: 'Vinyl Doff Matte Waterproof', pricePerLbr: 19000 },
      'chromo': { name: 'Chromo / Bontax', pricePerLbr: 12000 },
      'transparan': { name: 'Vinyl Transparan', pricePerLbr: 20000 },
      'hologram': { name: 'Hologram Rainbow Premium', pricePerLbr: 32000 }
    },
    cutting: {
      'kiss-cut': { name: 'Kiss-Cut (Setengah Putus / Lembaran)', price: 3000 },
      'die-cut': { name: 'Die-Cut (Potong Putus per Pcs)', price: 6000 },
      'none': { name: 'Tanpa Cutting (Cetak Saja)', price: 0 }
    },
    laminasi: {
      'none': { name: 'Tanpa Laminasi', price: 0 },
      'glossy': { name: 'Laminasi Glossy', price: 3000 },
      'doff': { name: 'Laminasi Doff', price: 3500 }
    },
    leadTime: '1 - 2 Hari Kerja'
  },
  undangan: {
    types: {
      'brosur-a4': { name: 'Brosur A4 Art Paper 150gsm', pricePerUnit: 650 },
      'flyer-a5': { name: 'Flyer A5 Art Paper 150gsm', pricePerUnit: 350 },
      'undangan-softcover': { name: 'Undangan Softcover Art Carton 260gsm', pricePerUnit: 3500 },
      'undangan-hardcover': { name: 'Undangan Hardcover Jasmine Luxury', pricePerUnit: 7500 }
    },
    finishing: {
      'standar': { name: 'Standar Lipat / Potong Rapi', extraPerUnit: 0 },
      'hotprint-gold': { name: 'Hotprint Foil Gold Elegan', extraPerUnit: 800 },
      'spot-uv': { name: 'Laminasi Doff + Spot UV', extraPerUnit: 950 }
    },
    leadTime: '2 - 3 Hari Kerja'
  }
};

// Currency Formatter
function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);
}

// Theme Controls
function initTheme() {
  if (state.theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  updateThemeIcon();
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', state.theme);
  if (state.theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  updateThemeIcon();
}

function updateThemeIcon() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const isDark = state.theme === 'dark';
  
  const iconMarkup = isDark 
    ? `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-amber-400 transform transition-transform hover:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path>
        <path d="m17.66 17.66 1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="m6.34 17.66-1.41 1.41"></path>
        <path d="m19.07 4.93-1.41 1.41"></path>
      </svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-700 transform transition-transform hover:-rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
      </svg>`;
      
  if (toggleBtn) toggleBtn.innerHTML = iconMarkup;
}

// Live Quote Calculations
function calculateQuote() {
  const p = state.selectedProduct;
  let total = 0;
  let productName = '';
  let specsDesc = '';
  let qtyText = '';
  let leadTime = '';
  
  if (p === 'banner') {
    productName = 'Spanduk / Banner Outdoor';
    const area = Math.max(0.1, state.banner.panjang * state.banner.lebar);
    const billableArea = Math.max(1, area);
    const mat = pricing.banner.materials[state.banner.bahan];
    const fin = pricing.banner.finishing[state.banner.finishing];
    
    const unitPrice = (billableArea * mat.pricePerM2) + fin.extra;
    total = unitPrice * state.banner.qty;
    
    // Exactly matches Image 3: "2×1m • Flexi Standar 280 gsm • Mata Ayam Tiap Sudut (Termasuk)"
    specsDesc = `${state.banner.panjang}×${state.banner.lebar}m • ${mat.name} • ${fin.name}`;
    qtyText = `${state.banner.qty} meter`;
    leadTime = pricing.banner.leadTime;
    
    const luasBadge = document.getElementById('calc-luas-badge');
    if (luasBadge) {
      luasBadge.textContent = `Total Luas: ${area.toFixed(2)} m²`;
    }
  } else if (p === 'stempel') {
    productName = 'Stempel Cap Otomatis';
    const type = pricing.stempel.types[state.stempel.ukuran];
    const extraColor = pricing.stempel.extraColor[state.stempel.warnaQty] || 0;
    
    total = (type.basePrice + extraColor) * state.stempel.qty;
    specsDesc = `${type.name} • ${state.stempel.warnaQty} Warna (${state.stempel.tinta})`;
    qtyText = `${state.stempel.qty} unit`;
    leadTime = pricing.stempel.leadTime;
  } else if (p === 'stiker') {
    productName = 'Stiker Cutting Lembar A3+';
    const mat = pricing.stiker.materials[state.stiker.bahan];
    const cut = pricing.stiker.cutting[state.stiker.cutting];
    const lam = pricing.stiker.laminasi[state.stiker.laminasi];
    
    const perSheet = mat.pricePerLbr + cut.price + lam.price;
    total = perSheet * state.stiker.qty;
    specsDesc = `${mat.name} • ${cut.name}`;
    qtyText = `${state.stiker.qty} lembar`;
    leadTime = pricing.stiker.leadTime;
  } else if (p === 'undangan') {
    productName = 'Undangan & Brosur Offset';
    const type = pricing.undangan.types[state.undangan.tipe];
    const fin = pricing.undangan.finishing[state.undangan.finishing];
    
    const perUnit = type.pricePerUnit + fin.extraPerUnit;
    total = perUnit * state.undangan.qty;
    specsDesc = `${type.name} • ${fin.name}`;
    qtyText = `${state.undangan.qty} eksemplar`;
    leadTime = pricing.undangan.leadTime;
  }
  
  // Update DOM Elements
  const elProduct = document.getElementById('summary-product-name');
  const elSpecs = document.getElementById('summary-specs');
  const elQty = document.getElementById('summary-qty');
  const elLead = document.getElementById('summary-lead-time');
  const elPrice = document.getElementById('summary-total-price');
  
  if (elProduct) elProduct.textContent = productName;
  if (elSpecs) elSpecs.textContent = specsDesc;
  if (elQty) elQty.textContent = qtyText;
  if (elLead) elLead.textContent = leadTime;
  if (elPrice) elPrice.textContent = formatRupiah(total);
  
  // State for WhatsApp link
  state.currentOrderSummary = {
    productName,
    specsDesc,
    qtyText,
    leadTime,
    total: formatRupiah(total)
  };
}

// Generate WhatsApp Link
function getWhatsAppUrl(customMsg) {
  const phone = '6289527361356';
  let message = '';
  
  if (customMsg) {
    message = customMsg;
  } else if (state.currentOrderSummary) {
    const o = state.currentOrderSummary;
    message = `Halo WIDURI Studio Cetak, saya ingin memesan cetak dengan spesifikasi hasil kalkulator:\n\n` +
      `📌 *Produk*: ${o.productName}\n` +
      `⚙️ *Spesifikasi*: ${o.specsDesc}\n` +
      `📦 *Jumlah*: ${o.qtyText}\n` +
      `⏱️ *Estimasi Waktu*: ${o.leadTime}\n` +
      `💰 *Total Perkiraan Biaya*: ${o.total}\n\n` +
      `Mohon konfirmasi ketersediaan dan panduan pengiriman file desain. Terima kasih!`;
  } else {
    message = 'Halo WIDURI Studio Cetak, saya ingin konsultasi mengenai kebutuhan cetak.';
  }
  
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

// Product Selector
function selectProduct(productKey) {
  state.selectedProduct = productKey;
  
  const tabs = document.querySelectorAll('.product-tab-btn');
  tabs.forEach(tab => {
    const key = tab.getAttribute('data-product');
    const dot = tab.querySelector('.tab-indicator-dot');
    if (key === productKey) {
      tab.classList.add('border-emerald-500', 'bg-emerald-50/40', 'dark:bg-emerald-950/20', 'shadow-sm');
      tab.classList.remove('border-gray-200', 'dark:border-zinc-800', 'bg-white', 'dark:bg-[#0F1D17]');
      if (dot) {
        dot.classList.add('bg-emerald-500');
        dot.classList.remove('bg-gray-300', 'dark:bg-zinc-600');
      }
    } else {
      tab.classList.remove('border-emerald-500', 'bg-emerald-50/40', 'dark:bg-emerald-950/20', 'shadow-sm');
      tab.classList.add('border-gray-200', 'dark:border-zinc-800', 'bg-white', 'dark:bg-[#0F1D17]');
      if (dot) {
        dot.classList.remove('bg-emerald-500');
        dot.classList.add('bg-gray-300', 'dark:bg-zinc-600');
      }
    }
  });
  
  renderProductForm(productKey);
  calculateQuote();
}

// Dynamic Product Forms
function renderProductForm(productKey) {
  const container = document.getElementById('calc-form-container');
  if (!container) return;
  
  if (productKey === 'banner') {
    container.innerHTML = `
      <div class="flex items-center justify-between pb-3">
        <div>
          <span class="font-mono text-[11px] font-bold text-emerald-600 dark:text-[#00E599] tracking-wider block mb-1">SPESIFIKASI</span>
          <h3 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Spanduk / Banner Outdoor</h3>
        </div>
        <span class="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-[#00E599] border border-emerald-200/50 dark:border-emerald-800/30">
          Est: 1 - 2 Hari Kerja
        </span>
      </div>

      <!-- Ukuran Inputs -->
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <label class="font-mono text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">UKURAN CETAK (METER)</label>
          <span id="calc-luas-badge" class="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-[#00E599] border border-emerald-200/40">Total Luas: 2.00 m²</span>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <div class="relative">
              <input type="number" id="input-panjang" step="0.5" min="0.5" max="50" value="${state.banner.panjang}" 
                class="w-full pl-3 pr-8 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 text-gray-900 dark:text-white font-bold font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none transition">
              <span class="absolute right-3 top-2.5 font-mono text-xs text-gray-400">m</span>
            </div>
            <p class="text-[11px] text-gray-400 mt-1">Panjang</p>
          </div>
          <div>
            <div class="relative">
              <input type="number" id="input-lebar" step="0.5" min="0.5" max="50" value="${state.banner.lebar}" 
                class="w-full pl-3 pr-8 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 text-gray-900 dark:text-white font-bold font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none transition">
              <span class="absolute right-3 top-2.5 font-mono text-xs text-gray-400">m</span>
            </div>
            <p class="text-[11px] text-gray-400 mt-1">Lebar / Tinggi</p>
          </div>
        </div>
      </div>

      <!-- Bahan Dropdown -->
      <div class="space-y-2">
        <label class="font-mono text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">PILIHAN BAHAN UTAMA</label>
        <select id="select-bahan" class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 text-gray-900 dark:text-white text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none transition">
          <option value="flexi-standar" ${state.banner.bahan === 'flexi-standar' ? 'selected' : ''}>Flexi Standar 280 gsm (Rp 25.000/m²)</option>
          <option value="flexi-higires" ${state.banner.bahan === 'flexi-higires' ? 'selected' : ''}>Flexi Higires 340 gsm (Rp 35.000/m²)</option>
          <option value="flexi-korea" ${state.banner.bahan === 'flexi-korea' ? 'selected' : ''}>Flexi Korea 440 gsm (Rp 50.000/m²)</option>
          <option value="flexi-jerman" ${state.banner.bahan === 'flexi-jerman' ? 'selected' : ''}>Flexi Jerman 510 gsm (Rp 85.000/m²)</option>
        </select>
      </div>

      <!-- Finishing Dropdown -->
      <div class="space-y-2">
        <label class="font-mono text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">OPSI FINISHING TEPIAN</label>
        <select id="select-finishing" class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 text-gray-900 dark:text-white text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none transition">
          <option value="mata-ayam" ${state.banner.finishing === 'mata-ayam' ? 'selected' : ''}>Mata Ayam Tiap Sudut (Termasuk) (Gratis / Standar)</option>
          <option value="lipat-pres" ${state.banner.finishing === 'lipat-pres' ? 'selected' : ''}>Lipat Pres Keliling Saja (+Rp 2.000)</option>
          <option value="kolong-kayu" ${state.banner.finishing === 'kolong-kayu' ? 'selected' : ''}>Kolong Bambu / Kayu (Atas-Bawah) (+Rp 5.000)</option>
          <option value="potong-pas" ${state.banner.finishing === 'potong-pas' ? 'selected' : ''}>Potong Pas Gambar (Tanpa Lebih)</option>
        </select>
      </div>

      <!-- Qty Stepper -->
      <div class="space-y-2">
        <label class="font-mono text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">JUMLAH CETAK</label>
        <div class="flex items-center space-x-3">
          <div class="flex items-center border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900/80">
            <button type="button" id="btn-qty-minus" class="px-3.5 py-2 text-gray-600 dark:text-gray-300 hover:text-emerald-500 hover:bg-gray-100 dark:hover:bg-zinc-800 transition font-bold">−</button>
            <input type="number" id="input-qty" min="1" max="1000" value="${state.banner.qty}" class="w-12 text-center bg-transparent text-gray-900 dark:text-white font-bold font-mono text-sm focus:outline-none">
            <button type="button" id="btn-qty-plus" class="px-3.5 py-2 text-gray-600 dark:text-gray-300 hover:text-emerald-500 hover:bg-gray-100 dark:hover:bg-zinc-800 transition font-bold">+</button>
          </div>
          <span class="font-mono text-xs text-gray-500 dark:text-gray-400">Lembar Banner</span>
        </div>
      </div>
    `;

    document.getElementById('input-panjang').addEventListener('input', (e) => {
      state.banner.panjang = parseFloat(e.target.value) || 0.5;
      calculateQuote();
    });
    document.getElementById('input-lebar').addEventListener('input', (e) => {
      state.banner.lebar = parseFloat(e.target.value) || 0.5;
      calculateQuote();
    });
    document.getElementById('select-bahan').addEventListener('change', (e) => {
      state.banner.bahan = e.target.value;
      calculateQuote();
    });
    document.getElementById('select-finishing').addEventListener('change', (e) => {
      state.banner.finishing = e.target.value;
      calculateQuote();
    });
    document.getElementById('btn-qty-minus').addEventListener('click', () => {
      if (state.banner.qty > 1) {
        state.banner.qty--;
        document.getElementById('input-qty').value = state.banner.qty;
        calculateQuote();
      }
    });
    document.getElementById('btn-qty-plus').addEventListener('click', () => {
      state.banner.qty++;
      document.getElementById('input-qty').value = state.banner.qty;
      calculateQuote();
    });
    document.getElementById('input-qty').addEventListener('input', (e) => {
      state.banner.qty = Math.max(1, parseInt(e.target.value) || 1);
      calculateQuote();
    });
  } else if (productKey === 'stempel') {
    container.innerHTML = `
      <div class="flex items-center justify-between pb-3">
        <div>
          <span class="font-mono text-[11px] font-bold text-emerald-600 dark:text-[#00E599] tracking-wider block mb-1">SPESIFIKASI</span>
          <h3 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Stempel Cap Otomatis (Flash)</h3>
        </div>
        <span class="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-[#00E599] border border-emerald-200/50 dark:border-emerald-800/30">
          Est: 1 Hari Kerja
        </span>
      </div>

      <div class="space-y-2">
        <label class="font-mono text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">UKURAN / TIPE GAGANG</label>
        <select id="select-ukuran-stempel" class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 text-gray-900 dark:text-white text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none transition">
          <option value="bulat-40" ${state.stempel.ukuran === 'bulat-40' ? 'selected' : ''}>Bulat Standar (Ø 40 mm) - Rp 75.000</option>
          <option value="bulat-28" ${state.stempel.ukuran === 'bulat-28' ? 'selected' : ''}>Bulat Kecil (Ø 28 mm) - Rp 55.000</option>
          <option value="persegi-22-55" ${state.stempel.ukuran === 'persegi-22-55' ? 'selected' : ''}>Persegi Panjang (22 x 55 mm) - Rp 65.000</option>
          <option value="kotak-35" ${state.stempel.ukuran === 'kotak-35' ? 'selected' : ''}>Kotak Standar (35 x 35 mm) - Rp 70.000</option>
          <option value="oval-30-45" ${state.stempel.ukuran === 'oval-30-45' ? 'selected' : ''}>Oval Standar (30 x 45 mm) - Rp 75.000</option>
        </select>
      </div>

      <div class="space-y-2">
        <label class="font-mono text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">JUMLAH WARNA TINTA</label>
        <div class="grid grid-cols-3 gap-1.5 sm:gap-2">
          ${[1, 2, 3].map(w => `
            <button type="button" data-warna-qty="${w}" class="btn-stempel-warna-qty py-2 px-1 sm:px-3 rounded-xl border text-[11px] sm:text-xs font-semibold font-mono transition text-center ${state.stempel.warnaQty === w ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-600 dark:text-[#00E599]' : 'border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 text-gray-600 dark:text-gray-400'}">
              <span class="block font-bold">${w} Warna</span>
              <span class="block text-[9px] opacity-80 mt-0.5">${w > 1 ? `+${formatRupiah(pricing.stempel.extraColor[w])}` : 'Standar'}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <div class="space-y-2">
        <label class="font-mono text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">PILIHAN WARNA TINTA</label>
        <select id="select-tinta" class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 text-gray-900 dark:text-white text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none transition">
          <option value="Biru" ${state.stempel.tinta === 'Biru' ? 'selected' : ''}>Biru Standar</option>
          <option value="Merah" ${state.stempel.tinta === 'Merah' ? 'selected' : ''}>Merah Standar</option>
          <option value="Hitam" ${state.stempel.tinta === 'Hitam' ? 'selected' : ''}>Hitam Pekat</option>
          <option value="Ungu" ${state.stempel.tinta === 'Ungu' ? 'selected' : ''}>Ungu Kantor</option>
          <option value="Hijau" ${state.stempel.tinta === 'Hijau' ? 'selected' : ''}>Hijau Standar</option>
        </select>
      </div>

      <div class="space-y-2">
        <label class="font-mono text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">JUMLAH CETAK</label>
        <div class="flex items-center space-x-3">
          <div class="flex items-center border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900/80">
            <button type="button" id="btn-stempel-minus" class="px-3.5 py-2 text-gray-600 dark:text-gray-300 hover:text-emerald-500 hover:bg-gray-100 dark:hover:bg-zinc-800 transition font-bold">−</button>
            <input type="number" id="input-stempel-qty" min="1" max="500" value="${state.stempel.qty}" class="w-12 text-center bg-transparent text-gray-900 dark:text-white font-bold font-mono text-sm focus:outline-none">
            <button type="button" id="btn-stempel-plus" class="px-3.5 py-2 text-gray-600 dark:text-gray-300 hover:text-emerald-500 hover:bg-gray-100 dark:hover:bg-zinc-800 transition font-bold">+</button>
          </div>
          <span class="font-mono text-xs text-gray-500 dark:text-gray-400">Pcs Gagang</span>
        </div>
      </div>
    `;

    document.getElementById('select-ukuran-stempel').addEventListener('change', (e) => {
      state.stempel.ukuran = e.target.value;
      calculateQuote();
    });
    document.querySelectorAll('.btn-stempel-warna-qty').forEach(btn => {
      btn.addEventListener('click', () => {
        state.stempel.warnaQty = parseInt(btn.getAttribute('data-warna-qty'));
        renderProductForm('stempel');
        calculateQuote();
      });
    });
    document.getElementById('select-tinta').addEventListener('change', (e) => {
      state.stempel.tinta = e.target.value;
      calculateQuote();
    });
    document.getElementById('btn-stempel-minus').addEventListener('click', () => {
      if (state.stempel.qty > 1) {
        state.stempel.qty--;
        document.getElementById('input-stempel-qty').value = state.stempel.qty;
        calculateQuote();
      }
    });
    document.getElementById('btn-stempel-plus').addEventListener('click', () => {
      state.stempel.qty++;
      document.getElementById('input-stempel-qty').value = state.stempel.qty;
      calculateQuote();
    });
  } else if (productKey === 'stiker') {
    container.innerHTML = `
      <div class="flex items-center justify-between pb-3">
        <div>
          <span class="font-mono text-[11px] font-bold text-emerald-600 dark:text-[#00E599] tracking-wider block mb-1">SPESIFIKASI</span>
          <h3 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Stiker Cutting Lembar A3+</h3>
        </div>
        <span class="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-[#00E599] border border-emerald-200/50 dark:border-emerald-800/30">
          Est: 1 - 2 Hari Kerja
        </span>
      </div>

      <div class="space-y-2">
        <label class="font-mono text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">JENIS BAHAN STIKER</label>
        <select id="select-bahan-stiker" class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 text-gray-900 dark:text-white text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none transition">
          <option value="vinyl-glossy" ${state.stiker.bahan === 'vinyl-glossy' ? 'selected' : ''}>Vinyl Glossy Waterproof (Rp 18.000/lbr)</option>
          <option value="vinyl-doff" ${state.stiker.bahan === 'vinyl-doff' ? 'selected' : ''}>Vinyl Doff Matte Waterproof (Rp 19.000/lbr)</option>
          <option value="chromo" ${state.stiker.bahan === 'chromo' ? 'selected' : ''}>Chromo / Bontax (Rp 12.000/lbr)</option>
          <option value="transparan" ${state.stiker.bahan === 'transparan' ? 'selected' : ''}>Vinyl Transparan (Rp 20.000/lbr)</option>
          <option value="hologram" ${state.stiker.bahan === 'hologram' ? 'selected' : ''}>Hologram Rainbow Premium (Rp 32.000/lbr)</option>
        </select>
      </div>

      <div class="space-y-2">
        <label class="font-mono text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">POLA CUTTING</label>
        <select id="select-cutting-stiker" class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 text-gray-900 dark:text-white text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none transition">
          <option value="kiss-cut" ${state.stiker.cutting === 'kiss-cut' ? 'selected' : ''}>Kiss-Cut (Setengah Putus / Lembaran) (+Rp 3.000)</option>
          <option value="die-cut" ${state.stiker.cutting === 'die-cut' ? 'selected' : ''}>Die-Cut (Potong Putus per Pcs) (+Rp 6.000)</option>
          <option value="none" ${state.stiker.cutting === 'none' ? 'selected' : ''}>Tanpa Cutting (Hanya Cetak A3+)</option>
        </select>
      </div>

      <div class="space-y-2">
        <label class="font-mono text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">LAMINASI PELINDUNG</label>
        <select id="select-laminasi-stiker" class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 text-gray-900 dark:text-white text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none transition">
          <option value="none" ${state.stiker.laminasi === 'none' ? 'selected' : ''}>Tanpa Laminasi</option>
          <option value="glossy" ${state.stiker.laminasi === 'glossy' ? 'selected' : ''}>Laminasi Glossy (+Rp 3.000/lbr)</option>
          <option value="doff" ${state.stiker.laminasi === 'doff' ? 'selected' : ''}>Laminasi Doff (+Rp 3.500/lbr)</option>
        </select>
      </div>

      <div class="space-y-2">
        <label class="font-mono text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">JUMLAH LEMBAR A3+</label>
        <div class="flex items-center space-x-3">
          <div class="flex items-center border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900/80">
            <button type="button" id="btn-stiker-minus" class="px-3.5 py-2 text-gray-600 dark:text-gray-300 hover:text-emerald-500 hover:bg-gray-100 dark:hover:bg-zinc-800 transition font-bold">−</button>
            <input type="number" id="input-stiker-qty" min="1" max="1000" value="${state.stiker.qty}" class="w-12 text-center bg-transparent text-gray-900 dark:text-white font-bold font-mono text-sm focus:outline-none">
            <button type="button" id="btn-stiker-plus" class="px-3.5 py-2 text-gray-600 dark:text-gray-300 hover:text-emerald-500 hover:bg-gray-100 dark:hover:bg-zinc-800 transition font-bold">+</button>
          </div>
          <span class="font-mono text-xs text-gray-500 dark:text-gray-400">Lembar A3+ (32 x 48 cm)</span>
        </div>
      </div>
    `;

    document.getElementById('select-bahan-stiker').addEventListener('change', (e) => {
      state.stiker.bahan = e.target.value;
      calculateQuote();
    });
    document.getElementById('select-cutting-stiker').addEventListener('change', (e) => {
      state.stiker.cutting = e.target.value;
      calculateQuote();
    });
    document.getElementById('select-laminasi-stiker').addEventListener('change', (e) => {
      state.stiker.laminasi = e.target.value;
      calculateQuote();
    });
    document.getElementById('btn-stiker-minus').addEventListener('click', () => {
      if (state.stiker.qty > 1) {
        state.stiker.qty--;
        document.getElementById('input-stiker-qty').value = state.stiker.qty;
        calculateQuote();
      }
    });
    document.getElementById('btn-stiker-plus').addEventListener('click', () => {
      state.stiker.qty++;
      document.getElementById('input-stiker-qty').value = state.stiker.qty;
      calculateQuote();
    });
  } else if (productKey === 'undangan') {
    container.innerHTML = `
      <div class="flex items-center justify-between pb-3">
        <div>
          <span class="font-mono text-[11px] font-bold text-emerald-600 dark:text-[#00E599] tracking-wider block mb-1">SPESIFIKASI</span>
          <h3 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Undangan & Brosur Offset</h3>
        </div>
        <span class="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-[#00E599] border border-emerald-200/50 dark:border-emerald-800/30">
          Est: 2 - 3 Hari Kerja
        </span>
      </div>

      <div class="space-y-2">
        <label class="font-mono text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">TIPE PRODUK & KERTAS</label>
        <select id="select-tipe-undangan" class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 text-gray-900 dark:text-white text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none transition">
          <option value="brosur-a4" ${state.undangan.tipe === 'brosur-a4' ? 'selected' : ''}>Brosur A4 Art Paper 150gsm (Rp 650/pcs)</option>
          <option value="flyer-a5" ${state.undangan.tipe === 'flyer-a5' ? 'selected' : ''}>Flyer A5 Art Paper 150gsm (Rp 350/pcs)</option>
          <option value="undangan-softcover" ${state.undangan.tipe === 'undangan-softcover' ? 'selected' : ''}>Undangan Softcover Art Carton 260gsm (Rp 3.500/pcs)</option>
          <option value="undangan-hardcover" ${state.undangan.tipe === 'undangan-hardcover' ? 'selected' : ''}>Undangan Hardcover Jasmine Luxury (Rp 7.500/pcs)</option>
        </select>
      </div>

      <div class="space-y-2">
        <label class="font-mono text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">OPSI FINISHING</label>
        <select id="select-finishing-undangan" class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 text-gray-900 dark:text-white text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none transition">
          <option value="standar" ${state.undangan.finishing === 'standar' ? 'selected' : ''}>Standar Lipat / Potong Rapi</option>
          <option value="hotprint-gold" ${state.undangan.finishing === 'hotprint-gold' ? 'selected' : ''}>Hotprint Foil Gold Elegan (+Rp 800/pcs)</option>
          <option value="spot-uv" ${state.undangan.finishing === 'spot-uv' ? 'selected' : ''}>Laminasi Doff + Spot UV (+Rp 950/pcs)</option>
        </select>
      </div>

      <div class="space-y-2">
        <label class="font-mono text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">JUMLAH EKSEMPLAR (PCS)</label>
        <div class="grid grid-cols-4 gap-2">
          ${[100, 300, 500, 1000].map(q => `
            <button type="button" data-undangan-qty="${q}" class="btn-undangan-qty py-2 rounded-xl border text-xs font-bold font-mono transition ${state.undangan.qty === q ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-600 dark:text-[#00E599]' : 'border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 text-gray-600 dark:text-gray-400'}">
              ${q} Pcs
            </button>
          `).join('')}
        </div>
      </div>
    `;

    document.getElementById('select-tipe-undangan').addEventListener('change', (e) => {
      state.undangan.tipe = e.target.value;
      calculateQuote();
    });
    document.getElementById('select-finishing-undangan').addEventListener('change', (e) => {
      state.undangan.finishing = e.target.value;
      calculateQuote();
    });
    document.querySelectorAll('.btn-undangan-qty').forEach(btn => {
      btn.addEventListener('click', () => {
        state.undangan.qty = parseInt(btn.getAttribute('data-undangan-qty'));
        renderProductForm('undangan');
        calculateQuote();
      });
    });
  }
}

// Portfolio Data Store (Real photos uploaded from workshop - 8 curated products)
const portfolioData = [
  {
    id: 1,
    title: 'Signage & Huruf Timbul Akrilik Gedung SMK Muhammadiyah Gisting',
    category: 'akrilik',
    categoryName: 'Signage & Plakat',
    description: 'Plang identitas gedung bertingkat presisi tinggi dengan huruf timbul akrilik laser-cut dan plat solid tahan terpaan cuaca outdoor.',
    tag: 'Akrilik Solid • Laser Cut',
    image: 'assets/images/portfolio-signage-gisting.jpg',
    badge: 'Signage Gedung'
  },
  {
    id: 2,
    title: 'Map Raport K13 & Merdeka Emboss Foil Emas Tut Wuri Handayani',
    category: 'map',
    categoryName: 'Map & Dokumen',
    description: 'Sampul raport & ijazah hardcover bahan kulit ASE berkualitas prima (SDN 1 Kalibening Raya), hotprint foil emas Tut Wuri Handayani, dan siku logam pengaman.',
    tag: 'Hardcover ASE • Foil Emas Timbul',
    image: 'assets/images/portfolio-map-raport.jpg',
    badge: 'SDN 1 Kalibening'
  },
  {
    id: 3,
    title: 'Prasasti & Nisan Granit Hitam Grafir Kaligrafi Emas',
    category: 'prasasti',
    categoryName: 'Prasasti Granit',
    description: 'Batu granit alam hitam pekat berkualitas tinggi dengan ukiran pahat grafir kaligrafi ayat suci presisi tinggi dan polesan cat emas awet anti luntur.',
    tag: 'Batu Granit Murni • Grafir Kaligrafi 24K',
    image: 'assets/images/portfolio-prasasti-granit.jpg',
    badge: 'Grafir Granit Alam'
  },
  {
    id: 4,
    title: 'Buku Yasin & Majmu\' Syarif Hardcover Gold Eksklusif',
    category: 'undangan',
    categoryName: 'Undangan & Yasin',
    description: 'Buku Yasin & tahlil hardcover ornamen kubah poly emas mewah dengan lafadz Allah timbul, pelindung siku ornamen, serta pita pembatas rumbai tasbih.',
    tag: 'Hardcover Gold • Rumbai Tasbih',
    image: 'assets/images/portfolio-buku-yasin.jpg',
    badge: 'Buku Doa & Yasin'
  },
  {
    id: 5,
    title: 'Suite Undangan Pernikahan Custom Gold Foil & Emboss',
    category: 'undangan',
    categoryName: 'Undangan & Yasin',
    description: 'Paket kartu undangan pernikahan estetik mewah dengan hotprint poly emas berkilau, floral ornamen emboss timbul, amplop custom tebal, dan pita segel modern.',
    tag: 'Jasmine 230gsm • Poly Emas Mewah',
    image: 'assets/images/portfolio-undangan-nikah.jpg',
    badge: 'Wedding Suite'
  },
  {
    id: 6,
    title: 'ID Card Visitor & Gantungan Yoyo Clip PT Japfa Comfeed',
    category: 'idcard',
    categoryName: 'ID Card & Merchandise',
    description: 'Kartu tanda pengenal visitor tamu instansi/perusahaan bahan PVC glossy tebal anti patah dengan cetak UV tajam, dilengkapi gantungan yoyo putar logo custom.',
    tag: 'PVC Card Glossy • Yoyo Clip Retractable',
    image: 'assets/images/portfolio-idcard-japfa.jpg',
    badge: 'PT Japfa Comfeed'
  },
  {
    id: 7,
    title: 'Plakat Akrilik Kenang-Kenangan KKN & PPL STIT Gisting',
    category: 'akrilik',
    categoryName: 'Signage & Plakat',
    description: 'Vandel plakat penghargaan dan cinderamata akrilik bening pemotongan laser bersudut presisi, cetak grafir UV nama mahasiswa dan ornamen motif khas kampus.',
    tag: 'Akrilik Bening 5mm • Laser Cut & UV Print',
    image: 'assets/images/portfolio-plakat-akrilik.jpg',
    badge: 'STIT Tanggamus'
  },
  {
    id: 8,
    title: 'Papan Nama Dada Akrilik Resin Cembung Magnet',
    category: 'idcard',
    categoryName: 'ID Card & Merchandise',
    description: 'Name tag dada dinas & sekolah berbahan akrilik hitam dengan lapisan resin cembung mengkilap tahan gores, logo instansi full-color, dan pengait magnet kuat tanpa merusak kain baju. Tersedia juga opsi kustom bentuk Menara Siger Lampung.',
    tag: 'Akrilik Hitam • Resin Cembung • Magnet',
    image: 'assets/images/portfolio-nametag-resin.jpg',
    secondaryImage: 'assets/images/portfolio-nametag-siger.jpg',
    badge: 'Name Tag Dinas & Sekolah'
  }
];

const portfolioState = {
  activeFilter: 'all',
  currentPage: 1,
  itemsPerPage: 4
};

function getFilteredPortfolio() {
  if (portfolioState.activeFilter === 'all') {
    return portfolioData;
  }
  return portfolioData.filter(item => item.category === portfolioState.activeFilter);
}

function renderPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  const pageIndicatorTop = document.getElementById('portfolio-page-indicator-top');
  const prevBtnTop = document.getElementById('portfolio-prev-btn-top');
  const nextBtnTop = document.getElementById('portfolio-next-btn-top');
  const prevBtnBottom = document.getElementById('portfolio-prev-btn');
  const nextBtnBottom = document.getElementById('portfolio-next-btn');
  const dotsContainer = document.getElementById('portfolio-dots');
  const infoText = document.getElementById('portfolio-info-text');

  if (!grid) return;

  const filtered = getFilteredPortfolio();
  const totalPages = Math.max(1, Math.ceil(filtered.length / portfolioState.itemsPerPage));

  // Ensure current page is in valid bounds
  if (portfolioState.currentPage > totalPages) {
    portfolioState.currentPage = totalPages;
  }
  if (portfolioState.currentPage < 1) {
    portfolioState.currentPage = 1;
  }

  const startIdx = (portfolioState.currentPage - 1) * portfolioState.itemsPerPage;
  const currentItems = filtered.slice(startIdx, startIdx + portfolioState.itemsPerPage);

  // Update navigation button states
  const isFirstPage = portfolioState.currentPage <= 1;
  const isLastPage = portfolioState.currentPage >= totalPages;

  if (prevBtnTop) prevBtnTop.disabled = isFirstPage;
  if (nextBtnTop) nextBtnTop.disabled = isLastPage;
  if (prevBtnBottom) prevBtnBottom.disabled = isFirstPage;
  if (nextBtnBottom) nextBtnBottom.disabled = isLastPage;

  if (pageIndicatorTop) {
    pageIndicatorTop.textContent = `Hal ${portfolioState.currentPage} / ${totalPages}`;
  }

  if (infoText) {
    infoText.textContent = `Menampilkan ${currentItems.length} dari ${filtered.length} hasil karya cetak (Halaman ${portfolioState.currentPage} dari ${totalPages})`;
  }

  // Render Dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let p = 1; p <= totalPages; p++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Halaman ${p}`);
      dot.className = p === portfolioState.currentPage
        ? 'w-7 h-2.5 rounded-full bg-emerald-500 shadow-sm transition-all duration-300'
        : 'w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-zinc-700 hover:bg-emerald-400 dark:hover:bg-emerald-600 transition-all duration-300';
      dot.addEventListener('click', () => {
        if (portfolioState.currentPage !== p) {
          portfolioState.currentPage = p;
          animatePortfolioTransition();
        }
      });
      dotsContainer.appendChild(dot);
    }
  }

  // Generate Cards HTML
  // Bento Layout logic:
  // If 4 items: [7 cols, 5 cols, 4 cols, 8 cols] matching Image 4
  // If 1 item: 12 cols (horizontal highlight card)
  // If 2 items: 6 cols each
  // If 3 items: 4 cols each
  let cardsHtml = '';
  const totalInPage = currentItems.length;

  currentItems.forEach((item, index) => {
    let colClass = '';
    let imgHeight = 'h-64 sm:h-72 md:h-80';

    if (totalInPage === 1) {
      cardsHtml += `
        <div class="portfolio-card cursor-pointer group rounded-2xl sm:rounded-3xl overflow-hidden bg-white dark:bg-[#0F1D17] border border-gray-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-xl hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all duration-300 md:col-span-12 grid grid-cols-1 md:grid-cols-12" data-item-id="${item.id}">
          <div class="relative overflow-hidden h-72 sm:h-96 md:h-[400px] bg-gray-100 dark:bg-zinc-800 md:col-span-7">
            <img src="${item.image}" alt="${item.title}" loading="lazy" class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 sm:p-5">
              <span class="text-xs font-mono font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                Lihat Foto Penuh 🔍
              </span>
              <span class="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/30">
                ${item.badge}
              </span>
            </div>
            <div class="absolute top-3 left-3 sm:top-4 sm:left-4">
              <span class="px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold bg-white/95 dark:bg-black/85 backdrop-blur-md text-emerald-800 dark:text-[#00E599] border border-emerald-500/30 shadow-sm">
                ${item.categoryName}
              </span>
            </div>
          </div>
          <div class="p-6 sm:p-8 md:p-10 md:col-span-5 flex flex-col justify-between space-y-4">
            <div class="space-y-3">
              <span class="text-xs font-mono font-semibold text-emerald-600 dark:text-[#00E599] block">${item.tag}</span>
              <h3 class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-500 transition leading-snug">
                ${item.title}
              </h3>
              <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                ${item.description}
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono font-bold text-emerald-600 dark:text-[#00E599]">
              <span>KLIK UNTUK MELIHAT FOTO UTUH</span>
              <span class="text-base transform group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </div>
      `;
      return;
    }

    if (totalInPage === 2) {
      colClass = 'md:col-span-6';
    } else if (totalInPage === 3) {
      colClass = 'md:col-span-4';
    } else {
      // 4 items exact Bento layout matching Image 4
      const bentoLayout = ['md:col-span-7', 'md:col-span-5', 'md:col-span-4', 'md:col-span-8'];
      colClass = bentoLayout[index % 4];
    }

    cardsHtml += `
      <div class="portfolio-card cursor-pointer group rounded-2xl sm:rounded-3xl overflow-hidden bg-white dark:bg-[#0F1D17] border border-gray-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-xl hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all duration-300 flex flex-col ${colClass}" data-item-id="${item.id}">
        <div class="relative overflow-hidden ${imgHeight} bg-gray-100 dark:bg-zinc-800 shrink-0">
          <img src="${item.image}" alt="${item.title}" loading="lazy" class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500">
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3 sm:p-4">
            <span class="text-[10px] sm:text-xs font-mono font-bold text-white bg-black/60 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full border border-white/20">
              Lihat Foto Penuh 🔍
            </span>
            <span class="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-emerald-500/30">
              ${item.badge}
            </span>
          </div>
          <div class="absolute top-3 left-3">
            <span class="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-white/95 dark:bg-black/85 backdrop-blur-md text-emerald-800 dark:text-[#00E599] border border-emerald-500/30 shadow-sm">
              ${item.categoryName}
            </span>
          </div>
        </div>
        <div class="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
          <div class="space-y-1.5">
            <span class="text-[10px] sm:text-[11px] font-mono font-semibold text-emerald-600 dark:text-[#00E599] block">${item.tag}</span>
            <h3 class="text-sm sm:text-base lg:text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-500 transition line-clamp-2">
              ${item.title}
            </h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 sm:line-clamp-3">
              ${item.description}
            </p>
          </div>
          <div class="pt-3 border-t border-gray-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-gray-400 group-hover:text-emerald-500 transition">
            <span>Detail & Spesifikasi</span>
            <span class="transform group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </div>
    `;
  });

  grid.innerHTML = cardsHtml;

  // Bind click event to each card to open Lightbox Modal
  grid.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.getAttribute('data-item-id'));
      const foundItem = portfolioData.find(p => p.id === id);
      if (foundItem) {
        openPortfolioModal(foundItem);
      }
    });
  });
}

function animatePortfolioTransition() {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) {
    renderPortfolio();
    return;
  }
  grid.style.opacity = '0';
  grid.style.transform = 'translateY(6px)';
  setTimeout(() => {
    renderPortfolio();
    grid.style.opacity = '1';
    grid.style.transform = 'translateY(0)';
  }, 140);
}

function openPortfolioModal(item) {
  const modal = document.getElementById('portfolio-modal');
  const modalImg = document.getElementById('portfolio-modal-img');
  const modalBadge = document.getElementById('portfolio-modal-badge');
  const modalTag = document.getElementById('portfolio-modal-tag');
  const modalTitle = document.getElementById('portfolio-modal-title');
  const modalDesc = document.getElementById('portfolio-modal-desc');
  const modalWaBtn = document.getElementById('portfolio-modal-wa-btn');
  const variantsContainer = document.getElementById('portfolio-modal-variants');
  const thumbsContainer = document.getElementById('portfolio-modal-thumbs');

  if (!modal) return;

  if (modalImg) {
    modalImg.src = item.image;
    modalImg.alt = item.title;
  }
  if (modalBadge) modalBadge.textContent = item.badge || item.categoryName;
  if (modalTag) modalTag.textContent = item.tag;
  if (modalTitle) modalTitle.textContent = item.title;
  if (modalDesc) modalDesc.textContent = item.description;
  if (modalWaBtn) {
    modalWaBtn.href = getWhatsAppUrl(`Halo WIDURI Studio Cetak, saya tertarik dengan hasil cetak di portofolio:\n*${item.title}*\n\nBisa minta informasi spesifikasi dan estimasi harga untuk pesanan serupa? Terima kasih.`);
  }

  // Handle secondary photo thumbnail toggle (e.g. Siger Lampung name tag variant)
  if (variantsContainer && thumbsContainer) {
    if (item.secondaryImage) {
      variantsContainer.classList.remove('hidden');
      thumbsContainer.innerHTML = `
        <button type="button" class="variant-thumb-btn border-2 border-emerald-500 rounded-lg overflow-hidden w-12 h-12 shadow-sm transition transform hover:scale-105" data-img="${item.image}" aria-label="Lihat Model Standar">
          <img src="${item.image}" alt="Model Standar" class="w-full h-full object-cover">
        </button>
        <button type="button" class="variant-thumb-btn border-2 border-transparent hover:border-emerald-400 rounded-lg overflow-hidden w-12 h-12 shadow-sm transition transform hover:scale-105" data-img="${item.secondaryImage}" aria-label="Lihat Model Siger Lampung">
          <img src="${item.secondaryImage}" alt="Model Siger Lampung" class="w-full h-full object-cover">
        </button>
        <span class="text-[11px] font-mono text-gray-500 dark:text-gray-400">Klik untuk switch foto varian Siger Lampung</span>
      `;
      thumbsContainer.querySelectorAll('.variant-thumb-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const imgSrc = btn.getAttribute('data-img');
          if (modalImg) modalImg.src = imgSrc;
          thumbsContainer.querySelectorAll('.variant-thumb-btn').forEach(b => {
            b.classList.remove('border-emerald-500');
            b.classList.add('border-transparent');
          });
          btn.classList.add('border-emerald-500');
          btn.classList.remove('border-transparent');
        });
      });
    } else {
      variantsContainer.classList.add('hidden');
      thumbsContainer.innerHTML = '';
    }
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  setTimeout(() => {
    modal.classList.remove('opacity-0');
    const card = document.getElementById('portfolio-modal-card');
    if (card) {
      card.classList.remove('scale-95');
      card.classList.add('scale-100');
    }
  }, 20);
}

function closePortfolioModal() {
  const modal = document.getElementById('portfolio-modal');
  const card = document.getElementById('portfolio-modal-card');
  if (!modal) return;

  if (card) {
    card.classList.remove('scale-100');
    card.classList.add('scale-95');
  }
  modal.classList.add('opacity-0');
  setTimeout(() => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }, 200);
}

function initPortfolio() {
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const prevBtnTop = document.getElementById('portfolio-prev-btn-top');
  const nextBtnTop = document.getElementById('portfolio-next-btn-top');
  const prevBtnBottom = document.getElementById('portfolio-prev-btn');
  const nextBtnBottom = document.getElementById('portfolio-next-btn');
  const modalClose = document.getElementById('portfolio-modal-close');
  const modal = document.getElementById('portfolio-modal');
  const grid = document.getElementById('portfolio-grid');

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      portfolioState.activeFilter = filter;
      portfolioState.currentPage = 1; // Reset to page 1 on filter switch

      filterBtns.forEach(b => {
        if (b === btn) {
          b.classList.add('bg-emerald-500', 'text-white', 'shadow-sm');
          b.classList.remove('bg-white', 'dark:bg-[#0F1D17]', 'text-gray-600', 'dark:text-gray-300', 'border', 'border-gray-200', 'dark:border-zinc-800');
        } else {
          b.classList.remove('bg-emerald-500', 'text-white', 'shadow-sm');
          b.classList.add('bg-white', 'dark:bg-[#0F1D17]', 'text-gray-600', 'dark:text-gray-300', 'border', 'border-gray-200', 'dark:border-zinc-800');
        }
      });

      animatePortfolioTransition();
    });
  });

  // Slider Navigation handlers
  function goPrev() {
    if (portfolioState.currentPage > 1) {
      portfolioState.currentPage--;
      animatePortfolioTransition();
    }
  }

  function goNext() {
    const totalPages = Math.ceil(getFilteredPortfolio().length / portfolioState.itemsPerPage);
    if (portfolioState.currentPage < totalPages) {
      portfolioState.currentPage++;
      animatePortfolioTransition();
    }
  }

  if (prevBtnTop) prevBtnTop.addEventListener('click', goPrev);
  if (nextBtnTop) nextBtnTop.addEventListener('click', goNext);
  if (prevBtnBottom) prevBtnBottom.addEventListener('click', goPrev);
  if (nextBtnBottom) nextBtnBottom.addEventListener('click', goNext);

  // Mobile Touch Swipe Gesture Support
  if (grid) {
    let touchStartX = 0;
    let touchStartY = 0;

    grid.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    grid.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // Only handle horizontal swipe if horizontal movement is larger than vertical
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        if (diffX < 0) {
          goNext(); // Swipe left -> Next page
        } else {
          goPrev(); // Swipe right -> Prev page
        }
      }
    }, { passive: true });
  }

  // Lightbox Modal Controls
  if (modalClose) modalClose.addEventListener('click', closePortfolioModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePortfolioModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePortfolioModal();
  });

  // Initial render
  renderPortfolio();
}

// Mobile Navigation Drawer Toggle
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const dropdown = document.getElementById('mobile-menu-dropdown');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !dropdown) return;

  function toggleMenu() {
    const isHidden = dropdown.classList.contains('hidden');
    if (isHidden) {
      dropdown.classList.remove('hidden');
      if (hamburgerIcon) hamburgerIcon.classList.add('hidden');
      if (closeIcon) closeIcon.classList.remove('hidden');
    } else {
      dropdown.classList.add('hidden');
      if (hamburgerIcon) hamburgerIcon.classList.remove('hidden');
      if (closeIcon) closeIcon.classList.add('hidden');
    }
  }

  menuBtn.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      dropdown.classList.add('hidden');
      if (hamburgerIcon) hamburgerIcon.classList.remove('hidden');
      if (closeIcon) closeIcon.classList.add('hidden');
    });
  });
}

// Document Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTheme);
  }
  
  document.querySelectorAll('.product-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const productKey = btn.getAttribute('data-product');
      selectProduct(productKey);
    });
  });
  
  selectProduct('banner');
  
  const btnOrder = document.getElementById('btn-order-whatsapp');
  if (btnOrder) {
    btnOrder.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(getWhatsAppUrl(), '_blank');
    });
  }
  
  const floatingWa = document.getElementById('floating-wa-btn');
  if (floatingWa) {
    floatingWa.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(getWhatsAppUrl('Halo Admin WIDURI Studio Cetak, saya ingin bertanya tentang layanan cetak.'), '_blank');
    });
  }
  
  const heroCtaCalc = document.getElementById('hero-cta-calc');
  if (heroCtaCalc) {
    heroCtaCalc.addEventListener('click', () => {
      document.getElementById('kalkulator')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
  const heroCtaWa = document.getElementById('hero-cta-wa');
  if (heroCtaWa) {
    heroCtaWa.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(getWhatsAppUrl('Halo WIDURI, saya ingin konsultasi proofing warna & pemesanan langsung.'), '_blank');
    });
  }
  
  initPortfolio();
});
