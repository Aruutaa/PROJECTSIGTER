# Mental Health Safe Zone System — Smart City WebGIS

Prototype website statis untuk GitHub Pages. Topik: pemetaan zona stres dan ruang pemulihan emosi untuk mendukung smart city berbasis kesehatan mental.

## Struktur halaman

- `index.html` — landing page interaktif
- `map.html` — WebGIS utama berbasis Leaflet
- `dashboard.html` — dashboard indikator spasial berbasis Chart.js
- `data.html` — tabel dataset + export CSV/GeoJSON
- `methodology.html` — metodologi SIG, SDI, scoring, dan etika
- `resources.html` — self-check ringan dan panduan pengguna
- `about.html` — identitas project dan anggota kelompok

## Struktur folder

```text
assets/
  css/style.css
  js/data.js
  js/main.js
  js/map.js
  js/dashboard.js
  js/data-page.js
  js/resources.js
  img/logo.svg
data/
  mental-health-safe-zone.geojson
  locations.csv
  metadata.json
docs/
  project-brief.md
  design-system.md
```

## Cara menjalankan lokal

Langsung buka `index.html` di browser. Untuk hasil paling stabil, jalankan server lokal:

```bash
python -m http.server 8080
```

Lalu buka:

```text
http://localhost:8080
```

## Cara deploy ke GitHub Pages

1. Buat repository baru di GitHub.
2. Upload semua file dan folder dari project ini.
3. Masuk ke **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/root`.
6. Simpan. Website akan tersedia di URL GitHub Pages.

## Catatan data

- Titik RTH dinormalisasi dari materi presentasi ke format decimal degree agar bisa dibaca peta.
- Record selain RTH adalah placeholder untuk prototipe akademik.
- Untuk implementasi nyata, lakukan validasi koordinat, jam layanan, kontak resmi, status fasilitas, izin publikasi data, dan SOP privasi.

## Dependencies CDN

- Leaflet untuk WebGIS: `map.html`
- Chart.js untuk dashboard: `dashboard.html`
- Google Fonts: Inter dan Space Grotesk

Jika internet mati, halaman tetap terbuka, tetapi peta, chart, dan font eksternal tidak termuat sempurna.
