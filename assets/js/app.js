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
        <div class="grid grid-cols-3 gap-2">
          ${[1, 2, 3].map(w => `
            <button type="button" data-warna-qty="${w}" class="btn-stempel-warna-qty py-2 px-3 rounded-xl border text-xs font-semibold font-mono transition ${state.stempel.warnaQty === w ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-600 dark:text-[#00E599]' : 'border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 text-gray-600 dark:text-gray-400'}">
              ${w} Warna ${w > 1 ? `(+${formatRupiah(pricing.stempel.extraColor[w])})` : ''}
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

// Portfolio Filter Logic (Matching Exact Tabs in Image 4: Semua, Stempel, Undangan, Spanduk, Stiker A3+)
function initPortfolio() {
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const items = document.querySelectorAll('.portfolio-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      state.activePortfolioFilter = filter;
      
      filterBtns.forEach(b => {
        if (b === btn) {
          b.classList.add('bg-emerald-500', 'text-white', 'shadow-sm');
          b.classList.remove('bg-white', 'dark:bg-[#0F1D17]', 'text-gray-600', 'dark:text-gray-300', 'border', 'border-gray-200', 'dark:border-zinc-800');
        } else {
          b.classList.remove('bg-emerald-500', 'text-white', 'shadow-sm');
          b.classList.add('bg-white', 'dark:bg-[#0F1D17]', 'text-gray-600', 'dark:text-gray-300', 'border', 'border-gray-200', 'dark:border-zinc-800');
        }
      });
      
      items.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat.includes(filter)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Document Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  
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
