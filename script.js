// URL Web App dari Google Apps Script kamu
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx4wtGO_ZL0F9jFnVc3ZiVJlR43o_OXl6Pxo50vWqE2deTIrqYzp_c1XlTmEFnPzlyAcg/exec";

// Ambil parameter ?to= dari URL
const urlParams = new URLSearchParams(window.location.search);
const namaTamu = urlParams.get('to');
const namaFinal = namaTamu ? decodeURIComponent(namaTamu) : "Tamu Undangan";

// Tampilkan nama di halaman
document.getElementById('namaTamuCover').textContent = namaFinal;
document.getElementById('namaTamu').textContent = namaFinal;

// Nama pasangan
document.getElementById('namaMempelai').textContent = "Zahra & Rian";

// Google Maps link
const mapsLink = "https://www.google.com/maps/place/Hotel+Grand+Garden+Jakarta";
document.getElementById('btnMaps').href = mapsLink;

// Transisi buka undangan
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

// 💬 UCAPAN TAMU
const formUcapan = document.getElementById('ucapanForm');
const daftarUcapan = document.getElementById('daftarUcapan');

formUcapan.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nama = document.getElementById('namaUcapan').value.trim();
  const pesan = document.getElementById('pesanUcapan').value.trim();

  if (nama && pesan) {
    const item = document.createElement('div');
    item.className = 'ucapan-item';
    item.innerHTML = `<strong>${nama}</strong><p>${pesan}</p>`;
    daftarUcapan.prepend(item);

    // Simpan ke Google Sheets
    await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({
        jenis: "Ucapan",
        nama: nama,
        pesan: pesan
      }),
      headers: { "Content-Type": "application/json" }
    });

    formUcapan.reset();
  }
});

// ✅ KONFIRMASI KEHADIRAN (RSVP)
const formRsvp = document.getElementById('rsvpForm');
const daftarRsvp = document.getElementById('daftarRsvp');

formRsvp.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nama = document.getElementById('namaRsvp').value.trim();
  const status = document.getElementById('statusRsvp').value;
  const jumlah = document.getElementById('jumlahTamu').value;
  const catatan = document.getElementById('catatanRsvp').value.trim();

  if (nama && status) {
    const item = document.createElement('div');
    item.className = 'rsvp-item';
    item.innerHTML = `
      <strong>${nama}</strong> - <em>${status}</em>
      ${jumlah ? `<p>Jumlah tamu: ${jumlah}</p>` : ""}
      ${catatan ? `<p><small>${catatan}</small></p>` : ""}
    `;
    daftarRsvp.prepend(item);

    // ⬅️⬅️ KIRIM ke GOOGLE SHEETS
    await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({
        jenis: "Kehadiran",
        nama: nama,
        status: status,
        jumlah: jumlah,
        catatan: catatan
      }),
      headers: { "Content-Type": "application/json" }
    });

    formRsvp.reset();
  }
});
