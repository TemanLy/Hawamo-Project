/* ==========================================================
   HAWAMO COFFEE — script.js
   File logika utama untuk semua halaman
   Menggunakan Vanilla JavaScript (ES6+) murni
   ========================================================== */


/* ----------------------------------------------------------
   1. DATA PRODUK
   Array of objects berisi semua menu yang tersedia.
   Ini adalah "database" sementara di sisi klien.
   ---------------------------------------------------------- */
const menuData = [
  // --- KATEGORI: KOPI ---
  {
    id: 1,
    nama: "Kopi Kerinci",
    kategori: "kopi",
    harga: 28000,
    deskripsi: "Single origin dari dataran tinggi Kerinci, disajikan sebagai pour over yang bersih dan floral.",
    emoji: "☕",
    tersedia: true
  },
  {
    id: 2,
    nama: "Es Kopi Susu Hawamo",
    kategori: "kopi",
    harga: 32000,
    deskripsi: "Espresso double shot dipadukan susu segar pilihan, disajikan dingin dengan es batu kristal.",
    emoji: "🧊",
    tersedia: true
  },
  {
    id: 3,
    nama: "Kopi Tubruk Kampung",
    kategori: "kopi",
    harga: 18000,
    deskripsi: "Metode tradisional tanah Jambi — biji kopi kasar diseduh langsung, kental dan penuh karakter.",
    emoji: "🫖",
    tersedia: true
  },
  {
    id: 4,
    nama: "Cappuccino Classico",
    kategori: "kopi",
    harga: 35000,
    deskripsi: "Espresso lembut dengan microfoam susu yang creamy dan artistik.",
    emoji: "🍵",
    tersedia: true
  },
  {
    id: 5,
    nama: "Affogato",
    kategori: "kopi",
    harga: 38000,
    deskripsi: "Satu scoop es krim vanila premium yang 'tenggelam' dalam espresso panas. Kontras sempurna.",
    emoji: "🍨",
    tersedia: true
  },
  {
    id: 6,
    nama: "Cold Brew 24 Jam",
    kategori: "kopi",
    harga: 40000,
    deskripsi: "Diseduh dingin selama 24 jam penuh. Smooth, tidak pahit, dan kaya rasa.",
    emoji: "🫙",
    tersedia: false
  },

  // --- KATEGORI: NON-KOPI ---
  {
    id: 7,
    nama: "Matcha Latte",
    kategori: "non-kopi",
    harga: 34000,
    deskripsi: "Bubuk matcha ceremonial grade Jepang dikocok bersama susu oat hangat yang creamy.",
    emoji: "🍵",
    tersedia: true
  },
  {
    id: 8,
    nama: "Es Teh Manis Jambi",
    kategori: "non-kopi",
    harga: 15000,
    deskripsi: "Teh pilihan lokal Jambi yang diseduh kuat, disajikan manis dingin dengan es batu.",
    emoji: "🍹",
    tersedia: true
  },
  {
    id: 9,
    nama: "Cokelat Panas",
    kategori: "non-kopi",
    harga: 30000,
    deskripsi: "Dark chocolate 70% dilebur dengan susu full cream. Hangat, intens, dan memanjakan.",
    emoji: "🍫",
    tersedia: true
  },
  {
    id: 10,
    nama: "Lemon Squash Soda",
    kategori: "non-kopi",
    harga: 25000,
    deskripsi: "Perasan lemon segar dengan soda water dan sedikit madu. Segar dan ringan.",
    emoji: "🍋",
    tersedia: true
  },

  // --- KATEGORI: CAMILAN ---
  {
    id: 11,
    nama: "Roti Bakar Krim Cokelat",
    kategori: "camilan",
    harga: 22000,
    deskripsi: "Roti tawar tebal yang dibakar keemasan, diolesi krim cokelat dan mentega.",
    emoji: "🍞",
    tersedia: true
  },
  {
    id: 12,
    nama: "Singkong Goreng Kriuk",
    kategori: "camilan",
    harga: 18000,
    deskripsi: "Singkong lokal digoreng renyah dengan bumbu garam dan cabai kering. Pasangan kopi terbaik.",
    emoji: "🥔",
    tersedia: true
  },
  {
    id: 13,
    nama: "Pisang Kepok Bakar",
    kategori: "camilan",
    harga: 20000,
    deskripsi: "Pisang kepok matang dibakar dengan mentega dan taburan keju parut. Khas rumahan.",
    emoji: "🍌",
    tersedia: true
  },
  {
    id: 14,
    nama: "Cheese Cake Slice",
    kategori: "camilan",
    harga: 35000,
    deskripsi: "Cream cheese dengan base biskuit renyah. Tekstur lembut dan tidak terlalu manis.",
    emoji: "🍰",
    tersedia: true
  }
];

/* Tiga produk unggulan yang ditampilkan di halaman beranda (index.html) */
const featuredIds = [2, 7, 11]; /* Id: Es Kopi Susu, Matcha Latte, Roti Bakar */


/* ----------------------------------------------------------
   2. MODUL KERANJANG (CART MODULE)
   Semua operasi baca/tulis keranjang ke localStorage
   ---------------------------------------------------------- */

/**
 * Membaca data keranjang dari localStorage.
 * Jika belum ada data, kembalikan array kosong.
 * @returns {Array} Array of { id, nama, harga, emoji, qty }
 */
function getCart() {
  /* JSON.parse mengubah string JSON → objek JavaScript */
  const data = localStorage.getItem('hawamo_cart');
  return data ? JSON.parse(data) : [];
}

/**
 * Menyimpan data keranjang ke localStorage.
 * @param {Array} cart - Array keranjang yang akan disimpan
 */
function saveCart(cart) {
  /* JSON.stringify mengubah objek JavaScript → string JSON */
  localStorage.setItem('hawamo_cart', JSON.stringify(cart));
}

/**
 * Menambahkan produk ke keranjang.
 * Jika produk sudah ada, cukup tambah qty-nya (tidak duplikat).
 * @param {Object} produk - Objek produk dari menuData
 */
function addToCart(produk) {
  const cart = getCart(); /* Ambil data saat ini */

  /* Cek apakah produk sudah ada di keranjang */
  const index = cart.findIndex(item => item.id === produk.id);

  if (index !== -1) {
    /* Produk sudah ada → tambah qty */
    cart[index].qty += 1;
  } else {
    /* Produk baru → push ke array dengan qty awal 1 */
    cart.push({
      id: produk.id,
      nama: produk.nama,
      harga: produk.harga,
      emoji: produk.emoji,
      qty: 1
    });
  }

  saveCart(cart);        /* Simpan kembali ke localStorage */
  updateCartBadge();     /* Perbarui tampilan badge di navbar */
  showToast(`${produk.emoji} "${produk.nama}" ditambahkan ke keranjang!`, 'success');
}

/**
 * Mengubah jumlah (qty) item di keranjang.
 * Jika qty baru ≤ 0, item dihapus dari keranjang.
 * @param {number} id    - Id produk yang ingin diubah
 * @param {number} delta - Perubahan qty (+1 atau -1)
 */
function updateQty(id, delta) {
  let cart = getCart();

  /* Cari item berdasarkan id */
  const index = cart.findIndex(item => item.id === id);
  if (index === -1) return; /* Keluar jika item tidak ditemukan */

  cart[index].qty += delta; /* Tambah atau kurangi qty */

  if (cart[index].qty <= 0) {
    /* Hapus item jika qty sudah 0 atau kurang */
    cart.splice(index, 1);
  }

  saveCart(cart);
  renderCartPage(); /* Re-render tampilan keranjang */
  updateCartBadge();
}

/**
 * Menghapus satu item dari keranjang berdasarkan id.
 * @param {number} id - Id produk yang akan dihapus
 */
function removeFromCart(id) {
  let cart = getCart();
  /* filter() membuat array baru tanpa item yang dihapus */
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  renderCartPage();
  updateCartBadge();
  showToast('Item dihapus dari keranjang', 'error');
}

/**
 * Menghitung total harga semua item di keranjang.
 * @returns {number} Total harga dalam Rupiah
 */
function getCartTotal() {
  const cart = getCart();
  /* reduce() menjumlahkan (harga × qty) untuk setiap item */
  return cart.reduce((total, item) => total + (item.harga * item.qty), 0);
}

/**
 * Menghitung total jumlah item (bukan jumlah jenis, tapi total unit).
 * @returns {number} Total unit item
 */
function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.qty, 0);
}

/**
 * Memperbarui angka di badge keranjang pada navbar.
 * Badge disembunyikan jika keranjang kosong.
 */
function updateCartBadge() {
  /* Cari elemen badge di DOM */
  const badge = document.getElementById('cartBadge');
  if (!badge) return; /* Keluar jika elemen tidak ada di halaman ini */

  const count = getCartCount();
  badge.textContent = count;

  /* Sembunyikan badge jika keranjang kosong */
  badge.style.display = count === 0 ? 'none' : 'flex';

  /* Efek animasi pop saat angka berubah */
  badge.classList.remove('cart-badge--pop');
  /* void digunakan untuk memaksa browser me-reflow sebelum animasi ulang */
  void badge.offsetWidth;
  badge.classList.add('cart-badge--pop');
}


/* ----------------------------------------------------------
   3. MODUL FORMAT UTILITAS
   Fungsi-fungsi pembantu yang digunakan di banyak tempat
   ---------------------------------------------------------- */

/**
 * Memformat angka menjadi format mata uang Rupiah.
 * Contoh: 32000 → "Rp 32.000"
 * @param {number} angka - Nominal dalam Rupiah
 * @returns {string} String harga yang terformat
 */
function formatRupiah(angka) {
  /* Intl.NumberFormat adalah API bawaan JS untuk format angka */
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0, /* Tanpa desimal */
    maximumFractionDigits: 0
  }).format(angka);
}

/**
 * Menghasilkan ID pesanan unik berbasis waktu.
 * Contoh: "HWM-1704067200000"
 * @returns {string} Kode pesanan
 */
function generateOrderId() {
  return 'HWM-' + Date.now();
}


/* ----------------------------------------------------------
   4. KOMPONEN NOTIFIKASI TOAST
   Pesan singkat yang muncul di pojok bawah layar
   ---------------------------------------------------------- */

/**
 * Menampilkan notifikasi toast.
 * Toast otomatis menghilang setelah 3 detik.
 * @param {string} pesan  - Teks yang ditampilkan
 * @param {string} tipe   - 'success' atau 'error'
 */
function showToast(pesan, tipe = 'success') {
  /* Cari atau buat container toast */
  let container = document.querySelector('.toast-container');
  if (!container) {
    /* Buat container baru jika belum ada di DOM */
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  /* Buat elemen toast baru */
  const toast = document.createElement('div');
  toast.className = `toast toast--${tipe}`;

  /* Pilih ikon berdasarkan tipe */
  const ikon = tipe === 'success' ? '✓' : '✕';

  /* Isi konten toast */
  toast.innerHTML = `
    <span class="toast__icon">${ikon}</span>
    <span>${pesan}</span>
  `;

  /* Tambahkan toast ke container */
  container.appendChild(toast);

  /* Set timer untuk menghapus toast setelah 3 detik */
  setTimeout(() => {
    toast.classList.add('toast--leaving'); /* Mulai animasi keluar */
    /* Hapus elemen dari DOM setelah animasi selesai (300ms) */
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}


/* ----------------------------------------------------------
   5. RENDER HALAMAN BERANDA (index.html)
   Menampilkan 3 kartu menu unggulan di section #featuredGrid
   ---------------------------------------------------------- */

/**
 * Merender kartu menu unggulan di halaman beranda.
 * Dipanggil hanya jika elemen #featuredGrid ada di halaman.
 */
function renderFeaturedMenu() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return; /* Keluar jika bukan halaman beranda */

  /* Filter data menu berdasarkan featuredIds */
  const featured = menuData.filter(p => featuredIds.includes(p.id));

  /* Buat HTML untuk setiap kartu unggulan */
  grid.innerHTML = featured.map(produk => `
    <article class="menu-card animate-fade-up" data-id="${produk.id}">
      <div class="menu-card__image">
        <span aria-hidden="true">${produk.emoji}</span>
        <span class="menu-card__badge">${kapitalisasi(produk.kategori)}</span>
      </div>
      <div class="menu-card__body">
        <h3 class="menu-card__name">${produk.nama}</h3>
        <p class="menu-card__desc">${produk.deskripsi}</p>
        <div class="menu-card__footer">
          <span class="menu-card__price">${formatRupiah(produk.harga)}</span>
          <button
            class="btn btn--primary btn--sm"
            onclick="addToCart(menuData.find(p => p.id === ${produk.id}))"
            aria-label="Tambah ${produk.nama} ke keranjang"
          >
            + Pesan
          </button>
        </div>
      </div>
    </article>
  `).join(''); /* join('') menggabungkan array string menjadi satu string HTML */

  /* Aktifkan animasi fade-up setelah render */
  requestAnimationFrame(() => {
    document.querySelectorAll('.animate-fade-up').forEach((el, i) => {
      /* Delay bertahap untuk setiap kartu (stagger effect) */
      setTimeout(() => el.classList.add('is-visible'), i * 120);
    });
  });
}

/**
 * Mengubah huruf pertama string menjadi kapital.
 * Contoh: "non-kopi" → "Non-kopi"
 * @param {string} str
 * @returns {string}
 */
function kapitalisasi(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


/* ----------------------------------------------------------
   6. RENDER HALAMAN MENU (menu.html)
   Menampilkan semua produk dengan fitur filter kategori
   ---------------------------------------------------------- */

/* Menyimpan kategori filter yang sedang aktif */
let filterAktif = 'semua';

/**
 * Merender semua kartu menu berdasarkan filter aktif.
 * Dipanggil saat pertama load dan saat filter diklik.
 */
function renderMenuPage() {
  const grid = document.getElementById('menuGrid');
  if (!grid) return; /* Keluar jika bukan halaman menu */

  /* Filter produk: tampilkan semua atau hanya kategori tertentu */
  const produkTampil = filterAktif === 'semua'
    ? menuData
    : menuData.filter(p => p.kategori === filterAktif);

  /* Jika tidak ada produk di kategori ini, tampilkan pesan kosong */
  if (produkTampil.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon">☕</div>
        <h3 class="empty-state__title">Belum ada menu</h3>
        <p>Kategori ini sedang kosong. Coba kategori lain.</p>
      </div>
    `;
    return;
  }

  /* Buat HTML kartu untuk setiap produk */
  grid.innerHTML = produkTampil.map((produk, index) => `
    <article
      class="menu-card menu-card--visible"
      data-id="${produk.id}"
      data-kategori="${produk.kategori}"
      style="animation-delay: ${index * 60}ms"
    >
      <div class="menu-card__image">
        <span aria-hidden="true">${produk.emoji}</span>
        <span class="menu-card__badge">${kapitalisasi(produk.kategori)}</span>
      </div>
      <div class="menu-card__body">
        <h3 class="menu-card__name">${produk.nama}</h3>
        <p class="menu-card__desc">${produk.deskripsi}</p>
        <div class="menu-card__footer">
          <span class="menu-card__price">${formatRupiah(produk.harga)}</span>
          ${produk.tersedia
            /* Produk tersedia: tampilkan tombol tambah */
            ? `<button
                class="btn btn--primary btn--sm"
                onclick="addToCart(menuData.find(p => p.id === ${produk.id}))"
                aria-label="Tambah ${produk.nama} ke keranjang"
              >+ Tambah</button>`
            /* Produk habis: tampilkan label non-interaktif */
            : `<span class="btn btn--sm" style="opacity:0.45;cursor:not-allowed;border:1.5px solid var(--clr-sand)">Habis</span>`
          }
        </div>
      </div>
    </article>
  `).join('');
}

/**
 * Menangani klik tombol filter kategori.
 * Mengubah filterAktif dan re-render grid menu.
 * @param {string} kategori - Nilai kategori yang dipilih
 * @param {HTMLElement} tombol - Elemen tombol yang diklik
 */
function setFilter(kategori, tombol) {
  filterAktif = kategori; /* Simpan filter yang aktif */

  /* Hapus class active dari semua tombol filter */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-pressed', 'false');
  });

  /* Tambahkan class active ke tombol yang diklik */
  tombol.classList.add('active');
  tombol.setAttribute('aria-pressed', 'true');

  renderMenuPage(); /* Render ulang grid dengan filter baru */
}

/**
 * Inisialisasi event listener untuk tombol-tombol filter.
 */
function initFilterBar() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      /* Ambil nilai kategori dari atribut data-filter */
      const kategori = btn.dataset.filter;
      setFilter(kategori, btn);
    });
  });
}


/* ----------------------------------------------------------
   7. RENDER HALAMAN KERANJANG (cart.html)
   Menampilkan isi keranjang, total, dan form pemesan
   ---------------------------------------------------------- */

/**
 * Merender seluruh konten halaman keranjang.
 * Dipanggil saat halaman dimuat dan setelah setiap perubahan.
 */
function renderCartPage() {
  const container = document.getElementById('cartContainer');
  if (!container) return; /* Keluar jika bukan halaman keranjang */

  const cart = getCart();

  /* Jika keranjang kosong, tampilkan state kosong */
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty__icon">🛒</div>
        <h2 class="cart-empty__title">Keranjangmu masih kosong</h2>
        <p class="cart-empty__desc">Yuk, pilih minuman dan camilan favoritmu!</p>
        <a href="menu.html" class="btn btn--primary btn--lg">Lihat Menu</a>
      </div>
    `;
    return;
  }

  /* Hitung subtotal dan biaya layanan */
  const subtotal = getCartTotal();
  const biayaLayanan = 2000;     /* Biaya layanan tetap */
  const total = subtotal + biayaLayanan;

  /* Buat HTML untuk setiap item di keranjang */
  const itemsHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item__icon" aria-hidden="true">${item.emoji}</div>
      <div class="cart-item__info">
        <p class="cart-item__name">${item.nama}</p>
        <p class="cart-item__price">${formatRupiah(item.harga)} / item</p>
      </div>
      <!-- Kontrol qty: kurang, tampilkan angka, tambah -->
      <div class="qty-control" aria-label="Jumlah ${item.nama}">
        <button
          class="qty-btn"
          onclick="updateQty(${item.id}, -1)"
          aria-label="Kurangi jumlah"
        >−</button>
        <span class="qty-display">${item.qty}</span>
        <button
          class="qty-btn"
          onclick="updateQty(${item.id}, 1)"
          aria-label="Tambah jumlah"
        >+</button>
      </div>
      <!-- Harga per baris (qty × harga) -->
      <strong style="min-width:90px;text-align:right;color:var(--clr-coffee)">
        ${formatRupiah(item.harga * item.qty)}
      </strong>
      <!-- Tombol hapus item -->
      <button
        class="cart-item__remove"
        onclick="removeFromCart(${item.id})"
        aria-label="Hapus ${item.nama} dari keranjang"
        title="Hapus item"
      >✕</button>
    </div>
  `).join('');

  /* Render keseluruhan layout keranjang */
  container.innerHTML = `
    <div class="cart-layout">

      <!-- Kolom kiri: daftar item -->
      <section aria-label="Item pesanan">
        <h2 class="cart-section-title">Item Pesanan</h2>
        <div class="cart-items" id="cartItemsList">
          ${itemsHTML}
        </div>
      </section>

      <!-- Kolom kanan: ringkasan + form -->
      <aside class="cart-summary">
        <h2 class="cart-section-title">Ringkasan Pesanan</h2>

        <!-- Baris subtotal -->
        <div class="summary-row">
          <span class="summary-label">Subtotal</span>
          <span class="summary-value">${formatRupiah(subtotal)}</span>
        </div>

        <!-- Baris biaya layanan -->
        <div class="summary-row">
          <span class="summary-label">Biaya Layanan</span>
          <span class="summary-value">${formatRupiah(biayaLayanan)}</span>
        </div>

        <!-- Baris total akhir yang ditonjolkan -->
        <div class="summary-row summary-row--total">
          <span class="summary-label">Total</span>
          <span class="summary-value summary-value--highlight">${formatRupiah(total)}</span>
        </div>

        <!-- Form data diri dan nomor meja -->
        <div class="order-form">
          <h3 class="cart-section-title" style="font-size:var(--text-base);border:none;padding:0;margin-bottom:var(--sp-4)">
            Data Pemesan
          </h3>

          <div class="form-group">
            <label for="inputNama" class="form-label">Nama Lengkap</label>
            <input
              type="text"
              id="inputNama"
              class="form-input"
              placeholder="Contoh: Budi Santoso"
              required
            />
          </div>

          <div class="form-group">
            <label for="inputMeja" class="form-label">Nomor Meja</label>
            <input
              type="number"
              id="inputMeja"
              class="form-input"
              placeholder="Contoh: 5"
              min="1"
              max="30"
              required
            />
          </div>

          <div class="form-group">
            <label for="inputCatatan" class="form-label">Catatan (Opsional)</label>
            <textarea
              id="inputCatatan"
              class="form-input"
              rows="2"
              placeholder="Contoh: Es kopinya jangan terlalu manis"
            ></textarea>
          </div>

          <!-- Tombol submit pesanan -->
          <button
            class="btn btn--primary btn--full btn--lg"
            id="btnPesan"
            onclick="submitPesanan()"
            style="margin-top:var(--sp-2)"
          >
            ☕ Konfirmasi Pesanan
          </button>
        </div>
      </aside>
    </div>
  `;
}

/**
 * Memproses konfirmasi pesanan dari form di halaman keranjang.
 * Memvalidasi input, menyimpan pesanan, dan redirect ke halaman konfirmasi.
 */
function submitPesanan() {
  /* Ambil nilai dari setiap input form */
  const nama    = document.getElementById('inputNama')?.value.trim();
  const meja    = document.getElementById('inputMeja')?.value.trim();
  const catatan = document.getElementById('inputCatatan')?.value.trim();

  /* Validasi: pastikan nama dan nomor meja terisi */
  if (!nama) {
    showToast('Mohon isi nama lengkap Anda', 'error');
    document.getElementById('inputNama')?.focus();
    return; /* Hentikan proses jika validasi gagal */
  }

  if (!meja) {
    showToast('Mohon isi nomor meja Anda', 'error');
    document.getElementById('inputMeja')?.focus();
    return;
  }

  /* Susun objek data pesanan yang akan disimpan */
  const pesanan = {
    orderId:   generateOrderId(),
    nama:      nama,
    meja:      meja,
    catatan:   catatan || '-',
    items:     getCart(),
    total:     getCartTotal() + 2000,
    waktu:     new Date().toLocaleString('id-ID') /* Format waktu lokal Indonesia */
  };

  /* Simpan data pesanan ke localStorage (bisa dibaca oleh admin) */
  localStorage.setItem('hawamo_last_order', JSON.stringify(pesanan));

  /* Kosongkan keranjang setelah pesanan berhasil */
  localStorage.removeItem('hawamo_cart');

  /* Redirect ke halaman konfirmasi */
  window.location.href = `confirm.html?id=${pesanan.orderId}`;
}


/* ----------------------------------------------------------
   8. RENDER HALAMAN KONFIRMASI (confirm.html)
   Menampilkan ringkasan pesanan yang baru saja dikirim
   ---------------------------------------------------------- */

/**
 * Merender konten halaman konfirmasi pesanan.
 */
function renderConfirmPage() {
  const container = document.getElementById('confirmContainer');
  if (!container) return;

  /* Ambil data pesanan terakhir dari localStorage */
  const pesanan = JSON.parse(localStorage.getItem('hawamo_last_order'));

  /* Jika tidak ada data pesanan, redirect ke beranda */
  if (!pesanan) {
    window.location.href = 'index.html';
    return;
  }

  /* Render tampilan konfirmasi */
  container.innerHTML = `
    <div class="confirmation-page">
      <div class="container" style="text-align:center">
        <div class="confirmation-icon">✅</div>
        <h1 class="confirmation-title">Pesanan Diterima!</h1>
        <p class="confirmation-desc">
          Terima kasih, <strong>${pesanan.nama}</strong>!
          Pesananmu untuk <strong>Meja ${pesanan.meja}</strong> sedang kami siapkan.
        </p>
        <div class="order-id">ID Pesanan: ${pesanan.orderId}</div>
        <div style="margin-bottom:var(--sp-8)">
          <!-- Daftar item dalam pesanan yang dikonfirmasi -->
          ${pesanan.items.map(item => `
            <p style="color:var(--clr-stone);font-size:var(--text-sm);margin-bottom:4px">
              ${item.emoji} ${item.nama} × ${item.qty} =
              <strong style="color:var(--clr-coffee)">${formatRupiah(item.harga * item.qty)}</strong>
            </p>
          `).join('')}
          <p style="margin-top:var(--sp-4);font-weight:600;color:var(--clr-espresso)">
            Total: ${formatRupiah(pesanan.total)}
          </p>
          ${pesanan.catatan !== '-'
            ? `<p style="color:var(--clr-stone);font-size:var(--text-sm);margin-top:var(--sp-3)">📝 Catatan: ${pesanan.catatan}</p>`
            : ''
          }
        </div>
        <a href="index.html" class="btn btn--primary btn--lg">Kembali ke Beranda</a>
      </div>
    </div>
  `;
}


/* ----------------------------------------------------------
   9. RENDER HALAMAN ADMIN (admin.html)
   Dashboard pengelolaan menu dengan tabel dan aksi CRUD simulasi
   ---------------------------------------------------------- */

/* Data menu admin (salinan dari menuData, bisa dimodifikasi) */
let adminMenuData = [...menuData]; /* Spread operator untuk salin array */

/**
 * Merender tabel daftar menu di halaman admin.
 */
function renderAdminTable() {
  const tbody = document.getElementById('adminTableBody');
  if (!tbody) return;

  /* Buat baris HTML untuk setiap produk */
  tbody.innerHTML = adminMenuData.map(produk => `
    <tr>
      <td>${produk.id}</td>
      <td>
        <span style="margin-right:8px" aria-hidden="true">${produk.emoji}</span>
        ${produk.nama}
      </td>
      <td>
        <!-- Badge kategori dengan warna berbeda -->
        <span style="
          display:inline-block;
          padding:2px 10px;
          border-radius:999px;
          font-size:12px;
          background:var(--clr-fog);
          color:var(--clr-stone)
        ">${kapitalisasi(produk.kategori)}</span>
      </td>
      <td>${formatRupiah(produk.harga)}</td>
      <td>
        <!-- Badge status tersedia/habis -->
        <span class="status-badge ${produk.tersedia ? 'status-badge--available' : 'status-badge--unavailable'}">
          ${produk.tersedia ? '● Tersedia' : '● Habis'}
        </span>
      </td>
      <td>
        <div class="table-actions">
          <!-- Tombol edit membuka modal -->
          <button
            class="btn btn--outline btn--sm"
            onclick="bukaModalEdit(${produk.id})"
            aria-label="Edit ${produk.nama}"
          >Edit</button>
          <!-- Tombol hapus dengan konfirmasi -->
          <button
            class="btn btn--danger btn--sm"
            onclick="hapusMenuAdmin(${produk.id})"
            aria-label="Hapus ${produk.nama}"
          >Hapus</button>
        </div>
      </td>
    </tr>
  `).join('');

  /* Perbarui angka statistik di kartu ringkasan */
  updateAdminStats();
}

/**
 * Memperbarui kartu statistik ringkasan di dashboard admin.
 */
function updateAdminStats() {
  /* Hitung jumlah untuk setiap kategori */
  const totalMenu    = adminMenuData.length;
  const totalKopi    = adminMenuData.filter(p => p.kategori === 'kopi').length;
  const totalNonKopi = adminMenuData.filter(p => p.kategori === 'non-kopi').length;
  const totalCamilan = adminMenuData.filter(p => p.kategori === 'camilan').length;

  /* Update angka di elemen HTML (jika ada) */
  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  set('statTotalMenu',    totalMenu);
  set('statKopi',         totalKopi);
  set('statNonKopi',      totalNonKopi);
  set('statCamilan',      totalCamilan);
}

/**
 * Simulasi menghapus menu dari tabel admin.
 * Menggunakan window.confirm() untuk meminta konfirmasi.
 * @param {number} id - Id produk yang akan dihapus
 */
function hapusMenuAdmin(id) {
  /* Tampilkan dialog konfirmasi bawaan browser */
  const konfirmasi = window.confirm('Yakin ingin menghapus menu ini?');
  if (!konfirmasi) return; /* Batalkan jika pengguna klik "Batal" */

  /* Hapus produk dari array adminMenuData */
  adminMenuData = adminMenuData.filter(p => p.id !== id);
  renderAdminTable(); /* Render ulang tabel */
  showToast('Menu berhasil dihapus', 'error');
}

/**
 * Membuka modal edit dan mengisi form dengan data produk.
 * @param {number} id - Id produk yang akan diedit
 */
function bukaModalEdit(id) {
  const modal   = document.getElementById('modalEdit');
  const overlay = document.getElementById('modalOverlay');
  if (!modal || !overlay) return;

  /* Cari data produk berdasarkan id */
  const produk = adminMenuData.find(p => p.id === id);
  if (!produk) return;

  /* Isi field-field form modal dengan data produk */
  document.getElementById('editId').value        = produk.id;
  document.getElementById('editNama').value      = produk.nama;
  document.getElementById('editHarga').value     = produk.harga;
  document.getElementById('editKategori').value  = produk.kategori;
  document.getElementById('editTersedia').checked = produk.tersedia;

  /* Tampilkan modal dengan menambahkan class active */
  overlay.classList.add('modal-overlay--active');
}

/**
 * Menutup modal edit.
 */
function tutupModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.classList.remove('modal-overlay--active');
}

/**
 * Menyimpan perubahan dari form modal edit ke adminMenuData.
 */
function simpanEditMenu() {
  /* Ambil nilai dari setiap input di modal */
  const id       = parseInt(document.getElementById('editId').value);
  const nama     = document.getElementById('editNama').value.trim();
  const harga    = parseInt(document.getElementById('editHarga').value);
  const kategori = document.getElementById('editKategori').value;
  const tersedia = document.getElementById('editTersedia').checked;

  /* Validasi input tidak kosong */
  if (!nama || !harga) {
    showToast('Nama dan harga tidak boleh kosong', 'error');
    return;
  }

  /* Cari index produk dan update datanya */
  const index = adminMenuData.findIndex(p => p.id === id);
  if (index !== -1) {
    /* Spread operator untuk menjaga properti yang tidak diubah (seperti emoji) */
    adminMenuData[index] = {
      ...adminMenuData[index],
      nama,
      harga,
      kategori,
      tersedia
    };
  }

  tutupModal();
  renderAdminTable();
  showToast(`"${nama}" berhasil diperbarui`, 'success');
}

/**
 * Menambahkan menu baru ke adminMenuData (simulasi).
 */
function tambahMenuBaru() {
  /* Buat produk baru dengan id otomatis (id terbesar + 1) */
  const idBaru = Math.max(...adminMenuData.map(p => p.id)) + 1;

  const menuBaru = {
    id:        idBaru,
    nama:      `Menu Baru ${idBaru}`,
    kategori:  'kopi',
    harga:     25000,
    deskripsi: 'Deskripsi menu baru.',
    emoji:     '☕',
    tersedia:  true
  };

  /* Tambahkan ke array */
  adminMenuData.push(menuBaru);
  renderAdminTable();
  showToast('Menu baru berhasil ditambahkan!', 'success');

  /* Scroll ke bawah tabel untuk melihat menu baru */
  setTimeout(() => {
    document.querySelector('.table-wrapper')?.scrollTo({
      top: 9999,
      behavior: 'smooth'
    });
  }, 100);
}


/* ----------------------------------------------------------
   10. INISIALISASI NAVBAR
   Mengelola hamburger menu mobile dan efek scroll
   ---------------------------------------------------------- */

/**
 * Inisialisasi navbar: hamburger toggle + efek shadow saat scroll.
 */
function initNavbar() {
  const toggle  = document.getElementById('navToggle');
  const menu    = document.getElementById('navMenu');
  const navbar  = document.getElementById('navbar');

  /* === Hamburger toggle untuk mobile === */
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      /* Toggle class untuk membuka/menutup menu mobile */
      const isOpen = menu.classList.toggle('navbar__menu--open');
      navbar.classList.toggle('navbar--open', isOpen);

      /* Update atribut ARIA untuk aksesibilitas */
      toggle.setAttribute('aria-expanded', isOpen.toString());
    });

    /* Tutup menu mobile jika pengguna klik di luar navbar */
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && menu.classList.contains('navbar__menu--open')) {
        menu.classList.remove('navbar__menu--open');
        navbar.classList.remove('navbar--open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* === Efek bayangan navbar saat halaman di-scroll === */
  if (navbar) {
    window.addEventListener('scroll', () => {
      /* Tambah class --scrolled jika scroll > 10px */
      navbar.classList.toggle('navbar--scrolled', window.scrollY > 10);
    }, { passive: true }); /* passive:true meningkatkan performa scroll */
  }
}


/* ----------------------------------------------------------
   11. INISIALISASI ANIMASI SCROLL
   Elemen dengan class animate-fade-up muncul saat terlihat di viewport
   ---------------------------------------------------------- */

/**
 * Menggunakan Intersection Observer API untuk memicu animasi
 * saat elemen masuk ke area pandang pengguna.
 */
function initScrollAnimations() {
  /* Selector untuk semua elemen yang perlu dianimasikan */
  const elements = document.querySelectorAll('.animate-fade-up');
  if (!elements.length) return;

  /* IntersectionObserver: memantau apakah elemen terlihat di viewport */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          /* Elemen terlihat → tambah class is-visible untuk animasi CSS */
          entry.target.classList.add('is-visible');
          /* Berhenti memantau elemen setelah animasi dipicu (efisiensi) */
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 } /* Animasi dipicu saat 10% elemen terlihat */
  );

  /* Pantau setiap elemen */
  elements.forEach(el => observer.observe(el));
}


/* ----------------------------------------------------------
   12. TITIK MASUK UTAMA (ENTRY POINT)
   Dijalankan saat DOM selesai dimuat oleh browser
   ---------------------------------------------------------- */

/**
 * DOMContentLoaded: event yang dipicu ketika HTML selesai di-parse.
 * Semua inisialisasi dipanggil dari sini.
 */
document.addEventListener('DOMContentLoaded', () => {

  /* --- Inisialisasi komponen universal (semua halaman) --- */
  initNavbar();           /* Setup hamburger menu dan efek scroll */
  updateCartBadge();      /* Tampilkan jumlah item di badge keranjang */
  initScrollAnimations(); /* Aktifkan animasi elemen saat di-scroll */

  /* --- Deteksi halaman berdasarkan elemen kunci di DOM --- */

  /* Halaman Beranda: ada elemen #featuredGrid */
  if (document.getElementById('featuredGrid')) {
    renderFeaturedMenu();
  }

  /* Halaman Menu: ada elemen #menuGrid */
  if (document.getElementById('menuGrid')) {
    initFilterBar();   /* Setup event listener filter */
    renderMenuPage();  /* Render semua produk */
  }

  /* Halaman Keranjang: ada elemen #cartContainer */
  if (document.getElementById('cartContainer')) {
    renderCartPage();
  }

  /* Halaman Konfirmasi: ada elemen #confirmContainer */
  if (document.getElementById('confirmContainer')) {
    renderConfirmPage();
  }

  /* Halaman Admin: ada elemen #adminTableBody */
  if (document.getElementById('adminTableBody')) {
    renderAdminTable();

    /* Event listener tombol tutup modal (klik overlay) */
    const overlay = document.getElementById('modalOverlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        /* Tutup modal hanya jika yang diklik adalah overlay-nya sendiri */
        if (e.target === overlay) tutupModal();
      });
    }
  }

});
