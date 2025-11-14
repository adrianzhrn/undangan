// =======================================
// KONFIGURASI SHEETDB
// =======================================
const SHEETDB_URL = "https://sheetdb.io/api/v1/1r6knwksbaj2m";

// =======================================
// AMBIL PARAMETER NAMA TAMU
// =======================================
const urlParams = new URLSearchParams(window.location.search);
const namaTamu = urlParams.get('to');
const namaFinal = namaTamu ? decodeURIComponent(namaTamu) : "Tamu Undangan";

document.getElementById('namaTamuCover').textContent = namaFinal;
document.getElementById('namaTamu').textContent = namaFinal;

// Nama mempelai
document.getElementById('namaMempelai').textContent = "Zahra & Rian";

// Google Maps link
document.getElementById('btnMaps').href = 
  "https://www.google.com/maps/place/Hotel+Grand+Garden+Jakarta";

// =======================================
// TRANSISI BUKA UNDANGAN
// =======================================
const cover = document.getElementById('cover');
const invitation = document.getElementById('invitation');

document.getElementById('openButton').addEventListener('click', () => {
  cover.classList.add('fade');
  setTimeout(() => {
    cover.style.display = 'none';
    invitation.classList.remove('hidden');
    setTimeout(() => invitation.classList.add('show'), 100);
  }, 600);
});


// =======================================
// FORM UCAPAN
// =======================================
const formUcapan = document.getElementById('ucapanForm');
const daftarUcapan = document.getElementById('daftarUcapan');

formUcapan.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nama = document.getElementById('namaUcapan').value.trim();
  const pesan = document.getElementById('pesanUcapan').value.trim();

  if (!nama || !pesan) return;

  // Tampilkan langsung di halaman
  const item = document.createElement("div");
  item.classList.add("ucapan-item");
  item.innerHTML = `<strong>${nama}</strong><p>${pesan}</p>`;
  daftarUcapan.prepend(item);

  // Kirim ke SheetDB
  await fetch(SHEETDB_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        timestamp: new Date().toISOString(),
        jenis: "Ucapan",
        nama: nama,
        pesan_status: pesan,
        jumlah: "",
        catatan: ""
      }
    })
  });

  formUcapan.reset();
});


// =======================================
// FORM RSVP KEHADIRAN
// =======================================
const formRsvp = document.getElementById('rsvpForm');
const daftarRsvp = document.getElementById('daftarRsvp');

formRsvp.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nama = document.getElementById('namaRsvp').value.trim();
  const status = document.getElementById('statusRsvp').value;
  const jumlah = document.getElementById('jumlahTamu').value;
  const catatan = document.getElementById('catatanRsvp').value.trim();

  if (!nama || !status) return;

  // Tampilkan langsung
  const item = document.createElement("div");
  item.classList.add("rsvp-item");
  item.innerHTML = `
    <strong>${nama}</strong> - <em>${status}</em>
    ${jumlah ? `<p>Jumlah tamu: ${jumlah}</p>` : ""}
    ${catatan ? `<p><small>${catatan}</small></p>` : ""}
  `;
  daftarRsvp.prepend(item);

  // Kirim ke SheetDB
  await fetch(SHEETDB_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        timestamp: new Date().toISOString(),
        jenis: "Kehadiran",
        nama: nama,
        pesan_status: status,
        jumlah: jumlah,
        catatan: catatan
      }
    })
  });

  formRsvp.reset();
});
