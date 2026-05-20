/*
  Dataset prototype untuk Mental Health Safe Zone System.
  Catatan: koordinat RTH disusun dari materi presentasi dan dinormalisasi
  ke decimal degree agar dapat digunakan di Leaflet/OpenStreetMap.
*/
window.SAFEZONE_DATA = [
  {
    id: 'rth-01', name: 'Wisdom Park UGM', category: 'rth', type: 'Ruang Terbuka Hijau',
    lat: -7.770780, lng: 110.381619, calmScore: 92,
    facilities: ['Ruang terbuka', 'Area jalan kaki', 'Vegetasi teduh'],
    description: 'RTH kampus yang cocok untuk jeda singkat, berjalan santai, dan menurunkan stimulus lingkungan.',
    hours: 'Pagi–sore', stressLevel: 'Rendah'
  },
  {
    id: 'rth-02', name: 'Lembah UGM', category: 'rth', type: 'Ruang Terbuka Hijau',
    lat: -7.769122, lng: 110.382466, calmScore: 88,
    facilities: ['Area olahraga ringan', 'Ruang terbuka', 'Akses kampus'],
    description: 'Area terbuka di sekitar kampus yang dapat digunakan untuk pemulihan emosi setelah aktivitas padat.',
    hours: 'Pagi–sore', stressLevel: 'Rendah'
  },
  {
    id: 'rth-03', name: 'Sendang Somobetri', category: 'rth', type: 'Ruang Terbuka Hijau',
    lat: -7.771835, lng: 110.420873, calmScore: 80,
    facilities: ['Area air', 'Lingkungan tenang', 'Ruang alami'],
    description: 'Titik ruang alami yang dapat dipakai sebagai alternatif area tenang di kawasan perkotaan.',
    hours: 'Fleksibel', stressLevel: 'Rendah'
  },
  {
    id: 'rth-04', name: 'Embung Tambakboyo', category: 'rth', type: 'Ruang Terbuka Hijau',
    lat: -7.756186, lng: 110.414962, calmScore: 86,
    facilities: ['Danau/embung', 'Jogging track', 'Area duduk'],
    description: 'Ruang terbuka dengan lanskap air yang baik untuk relaksasi ringan dan aktivitas fisik sederhana.',
    hours: 'Pagi–sore', stressLevel: 'Rendah'
  },
  {
    id: 'rth-05', name: 'Taman PTBB FT UNY', category: 'rth', type: 'Ruang Terbuka Hijau',
    lat: -7.768753, lng: 110.387859, calmScore: 76,
    facilities: ['Area kampus', 'Taman kecil', 'Tempat duduk'],
    description: 'Taman kampus yang dapat menjadi titik rehat singkat bagi mahasiswa dan masyarakat sekitar.',
    hours: 'Jam kampus', stressLevel: 'Sedang'
  },
  {
    id: 'rth-06', name: 'Taman Kearifan UGM', category: 'rth', type: 'Ruang Terbuka Hijau',
    lat: -7.775314, lng: 110.380433, calmScore: 84,
    facilities: ['Area teduh', 'Taman kampus', 'Ruang refleksi'],
    description: 'Taman yang dapat dipakai sebagai safe pause point untuk menurunkan tekanan mental ringan.',
    hours: 'Pagi–sore', stressLevel: 'Rendah'
  },
  {
    id: 'rth-07', name: 'Hutan Kota', category: 'rth', type: 'Ruang Terbuka Hijau',
    lat: -7.773366, lng: 110.396701, calmScore: 89,
    facilities: ['Vegetasi rapat', 'Udara terbuka', 'Ruang teduh'],
    description: 'Area hijau dengan potensi sebagai zona pemulihan emosi berbasis alam.',
    hours: 'Pagi–sore', stressLevel: 'Rendah'
  },
  {
    id: 'rth-08', name: 'Taman Winasutan Asri', category: 'rth', type: 'Ruang Terbuka Hijau',
    lat: -7.767686, lng: 110.442079, calmScore: 79,
    facilities: ['Taman lingkungan', 'Ruang komunal', 'Area duduk'],
    description: 'Ruang terbuka lingkungan yang dapat menjadi safe point untuk warga sekitar.',
    hours: 'Fleksibel', stressLevel: 'Sedang'
  },
  {
    id: 'rth-09', name: 'Sendang Mulyo Kali Grojokan', category: 'rth', type: 'Ruang Terbuka Hijau',
    lat: -7.776039, lng: 110.428233, calmScore: 81,
    facilities: ['Area air', 'Lingkungan alami', 'Ruang lokal'],
    description: 'Area berbasis lanskap air yang dapat dipertimbangkan sebagai titik pemulihan berbasis komunitas.',
    hours: 'Fleksibel', stressLevel: 'Rendah'
  },
  {
    id: 'rth-10', name: 'Bendung Glendongan', category: 'rth', type: 'Ruang Terbuka Hijau',
    lat: -7.777251, lng: 110.419563, calmScore: 74,
    facilities: ['Area air', 'Ruang terbuka', 'Akses lokal'],
    description: 'Ruang luar yang dapat digunakan untuk jeda visual dan aktivitas pemulihan sederhana.',
    hours: 'Fleksibel', stressLevel: 'Sedang'
  },
  {
    id: 'counsel-01', name: 'Pusat Konseling Kampus', category: 'counseling', type: 'Konseling / Support System',
    lat: -7.771914, lng: 110.378985, calmScore: 70,
    facilities: ['Konseling awal', 'Rujukan profesional', 'Privasi konsultasi'],
    description: 'Contoh titik layanan konseling kampus untuk dukungan psikologis awal.',
    hours: 'Senin–Jumat', stressLevel: 'Sedang'
  },
  {
    id: 'counsel-02', name: 'Community Listening Corner', category: 'counseling', type: 'Konseling / Support System',
    lat: -7.759450, lng: 110.397040, calmScore: 68,
    facilities: ['Peer support', 'Ruang bicara', 'Rujukan layanan'],
    description: 'Ruang dukungan komunitas untuk mendengar keluhan awal dan menghubungkan pengguna ke bantuan lanjutan.',
    hours: 'Berdasarkan jadwal', stressLevel: 'Sedang'
  },
  {
    id: 'health-01', name: 'Klinik Psikologi & Kesehatan Jiwa', category: 'health', type: 'Fasilitas Kesehatan',
    lat: -7.764890, lng: 110.388750, calmScore: 64,
    facilities: ['Psikolog', 'Konsultasi', 'Rujukan medis'],
    description: 'Contoh fasilitas layanan kesehatan mental yang perlu diverifikasi dari data resmi.',
    hours: 'Jam kerja', stressLevel: 'Sedang'
  },
  {
    id: 'safe-01', name: 'Quiet Room Perpustakaan', category: 'safe-space', type: 'Safe Space',
    lat: -7.769902, lng: 110.381012, calmScore: 90,
    facilities: ['Area tenang', 'Minim kebisingan', 'Tempat duduk'],
    description: 'Ruang sunyi untuk jeda mental, membaca, atau menenangkan diri dari tekanan akademik.',
    hours: 'Jam perpustakaan', stressLevel: 'Rendah'
  },
  {
    id: 'safe-02', name: 'Mindful Study Garden', category: 'safe-space', type: 'Safe Space',
    lat: -7.763801, lng: 110.409210, calmScore: 87,
    facilities: ['Taman kecil', 'Area refleksi', 'Ruang duduk'],
    description: 'Safe space luar ruang dengan visual hijau dan kepadatan rendah.',
    hours: 'Pagi–sore', stressLevel: 'Rendah'
  },
  {
    id: 'stress-01', name: 'Koridor Kampus Padat', category: 'stress-zone', type: 'Zona Stres',
    lat: -7.769050, lng: 110.389250, calmScore: 32,
    facilities: ['Kepadatan tinggi', 'Kebisingan', 'Mobilitas padat'],
    description: 'Contoh area dengan tekanan lingkungan tinggi yang perlu dikompensasi dengan safe point terdekat.',
    hours: 'Jam sibuk', stressLevel: 'Tinggi'
  },
  {
    id: 'stress-02', name: 'Simpul Lalu Lintas Ramai', category: 'stress-zone', type: 'Zona Stres',
    lat: -7.758230, lng: 110.401340, calmScore: 28,
    facilities: ['Lalu lintas', 'Kebisingan', 'Antrian'],
    description: 'Contoh zona tekanan akibat mobilitas dan kebisingan perkotaan.',
    hours: 'Jam sibuk', stressLevel: 'Tinggi'
  }
];

window.SAFEZONE_CATEGORIES = {
  'rth': { label: 'RTH', color: '#95f2a8' },
  'counseling': { label: 'Konseling', color: '#c6a4ff' },
  'health': { label: 'Fasilitas', color: '#8fc7ff' },
  'safe-space': { label: 'Safe Space', color: '#7df9d4' },
  'stress-zone': { label: 'Zona Stres', color: '#ff7a8a' }
};
