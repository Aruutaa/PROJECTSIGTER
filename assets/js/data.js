/* Global prototype dataset. RTH coordinates were normalized from the presentation table into decimal degrees for web mapping. Non-RTH records are prototype placeholders and should be replaced by verified survey data before publication. */
window.MHZ_DATA = {
  meta: {
    title: "Mental Health Safe Zone System",
    area: "Kecamatan Depok, Kabupaten Sleman, DI Yogyakarta",
    lastUpdated: "2026-05-20",
    status: "Prototype academic WebGIS",
    disclaimer: "Data non-RTH bersifat contoh untuk prototipe. Validasi lapangan, izin data, dan verifikasi lembaga diperlukan sebelum digunakan sebagai layanan publik."
  },
  categories: {
    rth: { label: "Ruang Terbuka Hijau", icon: "🌿", color: "#5eead4", short: "RTH" },
    counseling: { label: "Konseling & Support", icon: "🫶", color: "#8b7cff", short: "Konseling" },
    health: { label: "Fasilitas Kesehatan", icon: "🏥", color: "#6ecbff", short: "Faskes" },
    safe_space: { label: "Ruang Pemulihan", icon: "🧘", color: "#ff8cc6", short: "Safe Space" },
    community: { label: "Komunitas Pendukung", icon: "🤝", color: "#ffd166", short: "Komunitas" },
    stress_zone: { label: "Zona Stress", icon: "⚡", color: "#ff6b6b", short: "Stress" }
  },
  features: [
    {
      id: "rth-wisdom-park-ugm", name: "Wisdom Park UGM", category: "rth", type: "point",
      lat: -7.770780, lng: 110.381619, radius: 180, village: "Caturtunggal", district: "Depok",
      stressLevel: "low", recoveryScore: 94, crowd: "Sedang", noise: "Rendah", accessScore: 86,
      openHours: "06.00–18.00", distanceHint: "Dekat area kampus UGM", sourceType: "Slide RTH",
      description: "Ruang hijau kampus yang cocok untuk walking break, regulasi emosi ringan, dan jeda dari kepadatan aktivitas akademik.",
      tags: ["green recovery", "campus", "quiet walk", "shade"], recommendation: "Prioritas sebagai zona pemulihan emosi karena teduh, luas, dan dekat area mahasiswa."
    },
    {
      id: "rth-lembah-ugm", name: "Lembah UGM", category: "rth", type: "point",
      lat: -7.769122, lng: 110.382466, radius: 160, village: "Caturtunggal", district: "Depok",
      stressLevel: "low", recoveryScore: 88, crowd: "Sedang", noise: "Rendah", accessScore: 84,
      openHours: "06.00–18.00", distanceHint: "Kawasan lembah kampus", sourceType: "Slide RTH",
      description: "Area terbuka kampus yang mendukung relaksasi pasif, duduk tenang, dan aktivitas ringan luar ruang.",
      tags: ["campus park", "calm", "outdoor pause"], recommendation: "Cocok untuk titik rekomendasi saat pengguna mencari lokasi tenang di sekitar kampus."
    },
    {
      id: "rth-sendang-somobetri", name: "Sendang Somobetri", category: "rth", type: "point",
      lat: -7.771835, lng: 110.420873, radius: 155, village: "Maguwoharjo", district: "Depok",
      stressLevel: "low", recoveryScore: 82, crowd: "Rendah", noise: "Rendah", accessScore: 73,
      openHours: "06.00–17.30", distanceHint: "Area timur Depok", sourceType: "Slide RTH",
      description: "Ruang alami berbasis elemen air dan vegetasi yang dapat diposisikan sebagai titik pemulihan suasana hati.",
      tags: ["water element", "natural", "low crowd"], recommendation: "Baik untuk pengguna yang memerlukan lokasi rendah keramaian."
    },
    {
      id: "rth-embung-tambakboyo", name: "Embung Tambakboyo", category: "rth", type: "point",
      lat: -7.756186, lng: 110.414962, radius: 340, village: "Condongcatur", district: "Depok",
      stressLevel: "medium", recoveryScore: 86, crowd: "Tinggi pada sore", noise: "Sedang", accessScore: 88,
      openHours: "05.30–18.30", distanceHint: "Utara-timur kawasan kampus", sourceType: "Slide RTH",
      description: "Ruang terbuka luas yang mendukung aktivitas jalan santai dan olahraga ringan, tetapi perlu penanda kepadatan pada jam ramai.",
      tags: ["lake", "walking", "sport", "popular"], recommendation: "Tampilkan indikator jam ramai agar pengguna sensitif keramaian bisa memilih waktu lebih tenang."
    },
    {
      id: "rth-taman-ptbb-ft-uny", name: "Taman PTBB FT UNY", category: "rth", type: "point",
      lat: -7.768753, lng: 110.387859, radius: 115, village: "Caturtunggal", district: "Depok",
      stressLevel: "low", recoveryScore: 80, crowd: "Sedang", noise: "Sedang", accessScore: 80,
      openHours: "07.00–17.00", distanceHint: "Dekat area UNY", sourceType: "Slide RTH",
      description: "Taman kampus yang relevan sebagai ruang jeda singkat bagi mahasiswa dan civitas akademika.",
      tags: ["campus", "micro-break", "near classroom"], recommendation: "Cocok sebagai micro recovery point di antara jadwal kuliah."
    },
    {
      id: "rth-taman-kearifan-ugm", name: "Taman Kearifan UGM", category: "rth", type: "point",
      lat: -7.775314, lng: 110.380433, radius: 140, village: "Caturtunggal", district: "Depok",
      stressLevel: "low", recoveryScore: 87, crowd: "Rendah–Sedang", noise: "Rendah", accessScore: 78,
      openHours: "06.00–18.00", distanceHint: "Barat daya UGM", sourceType: "Slide RTH",
      description: "Ruang hijau dengan suasana relatif tenang, cocok untuk grounding, membaca, dan jeda digital.",
      tags: ["grounding", "quiet", "reading"], recommendation: "Direkomendasikan untuk fitur filter 'butuh hening'."
    },
    {
      id: "rth-hutan-kota", name: "Hutan Kota", category: "rth", type: "point",
      lat: -7.773366, lng: 110.396701, radius: 210, village: "Caturtunggal", district: "Depok",
      stressLevel: "low", recoveryScore: 91, crowd: "Rendah", noise: "Rendah", accessScore: 74,
      openHours: "06.00–17.30", distanceHint: "Kawasan hijau kota", sourceType: "Slide RTH",
      description: "Ruang hijau kota dengan potensi besar sebagai area pemulihan emosi berbasis vegetasi dan ketenangan lingkungan.",
      tags: ["urban forest", "low noise", "nature therapy"], recommendation: "Prioritas untuk program smart health berbasis ruang hijau."
    },
    {
      id: "rth-taman-winasutan-asri", name: "Taman Winasutan Asri", category: "rth", type: "point",
      lat: -7.767686, lng: 110.442079, radius: 120, village: "Maguwoharjo", district: "Depok",
      stressLevel: "low", recoveryScore: 76, crowd: "Rendah", noise: "Rendah", accessScore: 70,
      openHours: "06.00–18.00", distanceHint: "Timur Depok", sourceType: "Slide RTH",
      description: "Taman lingkungan yang dapat menjadi titik pemulihan emosional skala permukiman.",
      tags: ["neighbourhood", "low crowd", "local park"], recommendation: "Butuh validasi fasilitas pendukung seperti tempat duduk, pencahayaan, dan akses difabel."
    },
    {
      id: "rth-sendang-mulyo-kali-grojokan", name: "Sendang Mulyo Kali Grojokan", category: "rth", type: "point",
      lat: -7.776039, lng: 110.428233, radius: 130, village: "Maguwoharjo", district: "Depok",
      stressLevel: "low", recoveryScore: 78, crowd: "Rendah", noise: "Rendah", accessScore: 68,
      openHours: "06.00–17.30", distanceHint: "Area aliran air", sourceType: "Slide RTH",
      description: "Ruang alami berbasis sungai/sendang yang bisa digunakan sebagai referensi titik tenang dengan catatan keamanan akses.",
      tags: ["water", "nature", "quiet"], recommendation: "Tambahkan survei keamanan, pencahayaan, dan akses jalur."
    },
    {
      id: "rth-bendung-glendongan", name: "Bendung Glendongan", category: "rth", type: "point",
      lat: -7.777251, lng: 110.419563, radius: 150, village: "Maguwoharjo", district: "Depok",
      stressLevel: "medium", recoveryScore: 74, crowd: "Rendah", noise: "Sedang", accessScore: 66,
      openHours: "06.00–17.30", distanceHint: "Kawasan bendung", sourceType: "Slide RTH",
      description: "Area ruang terbuka berbasis lanskap air, potensial untuk pemulihan ringan tetapi memerlukan asesmen keamanan.",
      tags: ["water", "open space", "safety check"], recommendation: "Tandai sebagai zona potensial, bukan rekomendasi utama sampai data keselamatan terverifikasi."
    },
    {
      id: "counseling-campus-north", name: "Pusat Konseling Kampus Utara", category: "counseling", type: "point",
      lat: -7.766950, lng: 110.381140, radius: 80, village: "Caturtunggal", district: "Depok",
      stressLevel: "support", recoveryScore: 89, crowd: "Berdasarkan jadwal", noise: "Rendah", accessScore: 82,
      openHours: "Senin–Jumat 08.00–16.00", distanceHint: "Dekat klaster kampus", sourceType: "Prototype placeholder",
      description: "Contoh titik layanan konseling kampus. Ganti dengan nama lembaga, jam layanan, dan kanal kontak resmi setelah verifikasi.",
      tags: ["counseling", "student support", "appointment"], recommendation: "Gunakan sebagai kategori layanan profesional dengan tombol kontak dan rute."
    },
    {
      id: "counseling-community-care", name: "Ruang Konseling Komunitas", category: "counseling", type: "point",
      lat: -7.758690, lng: 110.405350, radius: 90, village: "Condongcatur", district: "Depok",
      stressLevel: "support", recoveryScore: 83, crowd: "Berdasarkan jadwal", noise: "Rendah", accessScore: 76,
      openHours: "Reservasi", distanceHint: "Tengah kawasan permukiman", sourceType: "Prototype placeholder",
      description: "Contoh layanan support komunitas untuk edukasi kesehatan mental dan rujukan awal.",
      tags: ["community support", "reservation", "mental health literacy"], recommendation: "Butuh integrasi kontak resmi, SOP privasi, dan alur rujukan."
    },
    {
      id: "health-primary-care", name: "Fasilitas Kesehatan Primer", category: "health", type: "point",
      lat: -7.765820, lng: 110.392840, radius: 90, village: "Caturtunggal", district: "Depok",
      stressLevel: "support", recoveryScore: 78, crowd: "Sedang", noise: "Sedang", accessScore: 82,
      openHours: "08.00–20.00", distanceHint: "Koridor layanan publik", sourceType: "Prototype placeholder",
      description: "Contoh fasilitas kesehatan primer yang dapat menjadi simpul rujukan apabila pengguna membutuhkan bantuan lebih lanjut.",
      tags: ["health facility", "referral", "public service"], recommendation: "Tambahkan klasifikasi layanan mental health, biaya, BPJS, dan kontak resmi."
    },
    {
      id: "health-emergency-node", name: "Node Rujukan Darurat", category: "health", type: "point",
      lat: -7.783150, lng: 110.381820, radius: 120, village: "Caturtunggal", district: "Depok",
      stressLevel: "support", recoveryScore: 81, crowd: "Tinggi", noise: "Sedang", accessScore: 88,
      openHours: "24 jam", distanceHint: "Akses jalan utama", sourceType: "Prototype placeholder",
      description: "Contoh simpul rujukan darurat. Untuk implementasi nyata, tampilkan nomor resmi dan protokol krisis yang valid.",
      tags: ["emergency", "24 hours", "referral"], recommendation: "Jangan tampilkan klaim layanan sebelum diverifikasi dari institusi terkait."
    },
    {
      id: "safe-space-library", name: "Quiet Library Corner", category: "safe_space", type: "point",
      lat: -7.775960, lng: 110.386880, radius: 70, village: "Caturtunggal", district: "Depok",
      stressLevel: "low", recoveryScore: 84, crowd: "Rendah–Sedang", noise: "Rendah", accessScore: 78,
      openHours: "09.00–17.00", distanceHint: "Dekat area literasi", sourceType: "Prototype placeholder",
      description: "Contoh ruang tenang indoor untuk membaca, self-regulation, dan menghindari overstimulation sementara.",
      tags: ["indoor calm", "quiet", "reading"], recommendation: "Cocok ditambahkan sebagai alternatif saat cuaca tidak mendukung ruang luar."
    },
    {
      id: "safe-space-mindful-walk", name: "Mindful Walk Corridor", category: "safe_space", type: "point",
      lat: -7.761790, lng: 110.415770, radius: 180, village: "Condongcatur", district: "Depok",
      stressLevel: "low", recoveryScore: 79, crowd: "Sedang", noise: "Sedang", accessScore: 80,
      openHours: "05.30–18.00", distanceHint: "Koridor jalan kaki", sourceType: "Prototype placeholder",
      description: "Contoh koridor jalan kaki yang dapat diarahkan sebagai rute pemulihan ringan selama 10–15 menit.",
      tags: ["walking route", "breathing", "short recovery"], recommendation: "Tambahkan rute aman, pencahayaan, dan rekomendasi durasi berjalan."
    },
    {
      id: "community-peer-circle", name: "Peer Support Circle", category: "community", type: "point",
      lat: -7.772670, lng: 110.390860, radius: 80, village: "Caturtunggal", district: "Depok",
      stressLevel: "support", recoveryScore: 77, crowd: "Berdasarkan kegiatan", noise: "Sedang", accessScore: 74,
      openHours: "Event terjadwal", distanceHint: "Area komunitas mahasiswa", sourceType: "Prototype placeholder",
      description: "Contoh titik komunitas pendukung untuk kegiatan sharing, edukasi, dan dukungan sebaya non-klinis.",
      tags: ["peer support", "event", "community"], recommendation: "Bedakan jelas antara dukungan sebaya dan layanan klinis profesional."
    },
    {
      id: "stress-zone-campus-core", name: "Zona Padat Aktivitas Akademik", category: "stress_zone", type: "zone",
      lat: -7.770600, lng: 110.386700, radius: 520, village: "Caturtunggal", district: "Depok",
      stressLevel: "high", recoveryScore: 38, crowd: "Tinggi", noise: "Sedang–Tinggi", accessScore: 92,
      openHours: "Puncak 07.00–16.00", distanceHint: "Koridor kampus", sourceType: "Prototype analysis zone",
      description: "Zona contoh dengan potensi stres karena kepadatan jadwal akademik, mobilitas mahasiswa, dan intensitas kegiatan harian.",
      tags: ["academic pressure", "crowd", "time pressure"], recommendation: "Prioritaskan wayfinding menuju RTH terdekat dan notifikasi jam tenang."
    },
    {
      id: "stress-zone-traffic-corridor", name: "Zona Tekanan Lalu Lintas", category: "stress_zone", type: "zone",
      lat: -7.758360, lng: 110.400850, radius: 620, village: "Condongcatur", district: "Depok",
      stressLevel: "high", recoveryScore: 34, crowd: "Tinggi", noise: "Tinggi", accessScore: 90,
      openHours: "Puncak 07.00–09.00 & 16.00–18.00", distanceHint: "Koridor mobilitas padat", sourceType: "Prototype analysis zone",
      description: "Zona contoh tekanan lingkungan perkotaan dari kepadatan lalu lintas, kebisingan, dan commuting stress.",
      tags: ["traffic", "noise", "commuting stress"], recommendation: "Tampilkan rute alternatif ke ruang pemulihan dan filter low-noise space."
    },
    {
      id: "stress-zone-commercial", name: "Zona Komersial Ramai", category: "stress_zone", type: "zone",
      lat: -7.783200, lng: 110.401900, radius: 500, village: "Caturtunggal", district: "Depok",
      stressLevel: "medium", recoveryScore: 49, crowd: "Tinggi malam", noise: "Sedang–Tinggi", accessScore: 86,
      openHours: "Puncak 18.00–22.00", distanceHint: "Area aktivitas komersial", sourceType: "Prototype analysis zone",
      description: "Zona contoh overstimulation karena kepadatan komersial, cahaya, kebisingan, dan aktivitas malam.",
      tags: ["commercial", "night crowd", "sensory load"], recommendation: "Tambahkan indikator jam ramai agar pengguna dapat memilih waktu dan rute lebih nyaman."
    }
  ]
};

window.MHZ_UTILS = {
  slug(text) {
    return String(text).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  },
  categoryInfo(category) {
    return window.MHZ_DATA.categories[category] || { label: category, icon: "•", color: "#ffffff", short: category };
  },
  stressLabel(value) {
    const map = { low: "Rendah", medium: "Sedang", high: "Tinggi", support: "Dukungan" };
    return map[value] || value;
  },
  stressClass(value) {
    const map = { low: "mint", medium: "peach", high: "pink", support: "lavender" };
    return map[value] || "mint";
  },
  haversine(a, b) {
    const R = 6371;
    const dLat = (b.lat - a.lat) * Math.PI / 180;
    const dLng = (b.lng - a.lng) * Math.PI / 180;
    const lat1 = a.lat * Math.PI / 180;
    const lat2 = b.lat * Math.PI / 180;
    const x = Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
    return 2 * R * Math.asin(Math.sqrt(x));
  },
  toGeoJSON(features = window.MHZ_DATA.features) {
    return {
      type: "FeatureCollection",
      name: "mental_health_safe_zone_system",
      metadata: window.MHZ_DATA.meta,
      features: features.map(item => ({
        type: "Feature",
        geometry: { type: "Point", coordinates: [item.lng, item.lat] },
        properties: { ...item, lat: undefined, lng: undefined }
      }))
    };
  },
  toCSV(features = window.MHZ_DATA.features) {
    const keys = ["id", "name", "category", "type", "lat", "lng", "radius", "village", "district", "stressLevel", "recoveryScore", "crowd", "noise", "accessScore", "openHours", "sourceType", "description", "tags", "recommendation"];
    const escape = value => `"${String(Array.isArray(value) ? value.join("; ") : value ?? "").replaceAll('"', '""')}"`;
    return [keys.join(","), ...features.map(item => keys.map(k => escape(item[k])).join(","))].join("\n");
  },
  download(filename, content, mime = "text/plain") {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }
};
