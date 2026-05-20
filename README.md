# Mental Health Safe Zone System

Prototype website statis berbasis WebGIS untuk topik **Smart City: Mental Health Safe Zone System**. Website ini dirancang untuk GitHub Pages dan memakai HTML, CSS, JavaScript, Leaflet, serta OpenStreetMap/CARTO basemap.

## Halaman

- `index.html` — landing page interaktif dan ringkasan konsep.
- `map.html` — WebGIS utama dengan peta Leaflet, filter kategori, daftar lokasi, detail lokasi, dan tombol rute.
- `dashboard.html` — ringkasan indikator dan distribusi kategori.
- `data.html` — tabel data lokasi dan fitur download CSV.
- `methodology.html` — alur kerja SIG/SDI, analisis spasial, dan prinsip etika.
- `resources.html` — panduan singkat mental health awareness.
- `about.html` — identitas proyek dan struktur peran.

## Cara menjalankan lokal

Cukup buka `index.html` di browser modern. Untuk hasil terbaik, jalankan local server:

```bash
python -m http.server 8000
```

Lalu buka:

```text
http://localhost:8000
```

## Deploy ke GitHub Pages

1. Buat repository baru di GitHub.
2. Upload semua file dan folder dari proyek ini.
3. Masuk ke **Settings > Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/root`.
6. Simpan, lalu tunggu GitHub Pages aktif.

## Struktur data

Data lokasi berada di:

```text
assets/js/data.js
```

Setiap lokasi memiliki atribut:

- `id`
- `name`
- `category`
- `type`
- `lat`
- `lng`
- `calmScore`
- `facilities`
- `description`
- `hours`
- `stressLevel`

## Catatan validasi

Koordinat pada data awal perlu diverifikasi ulang sebelum digunakan sebagai produk publik. Data contoh dalam proyek ini ditujukan untuk prototipe akademik, bukan sistem layanan darurat atau diagnosis kesehatan mental.
