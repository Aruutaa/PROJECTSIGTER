(function () {
  function initQuiz() {
    const form = document.getElementById("selfCheckForm");
    const result = document.getElementById("selfCheckResult");
    if (!form || !result) return;
    form.addEventListener("submit", event => {
      event.preventDefault();
      const data = new FormData(form);
      const values = ["q1", "q2", "q3", "q4", "q5"].map(key => Number(data.get(key) || 0));
      if (values.some(v => v === 0)) {
        result.classList.add("show");
        result.innerHTML = "<strong>Lengkapi semua pertanyaan terlebih dahulu.</strong><p>Pilih skala 1–5 agar sistem bisa memberi rekomendasi awal.</p>";
        return;
      }
      const total = values.reduce((sum, value) => sum + value, 0);
      let label = "Ringan";
      let advice = "Coba gunakan peta untuk mencari RTH atau quiet space terdekat. Lakukan jeda napas 2–5 menit dan kurangi paparan pemicu sementara.";
      let link = "map.html?focus=rth";
      if (total >= 18) {
        label = "Tinggi";
        advice = "Pertimbangkan menghubungi orang tepercaya atau layanan profesional. Gunakan peta untuk melihat titik konseling/fasilitas kesehatan. Jika merasa tidak aman, cari bantuan darurat terdekat.";
        link = "map.html?focus=counseling";
      } else if (total >= 12) {
        label = "Sedang";
        advice = "Pilih ruang pemulihan yang rendah kebisingan, lakukan grounding, dan jadwalkan dukungan sosial bila tekanan berlanjut.";
        link = "map.html?focus=safe_space";
      }
      result.classList.add("show");
      result.innerHTML = `
        <strong>Indikasi tekanan: ${label}</strong>
        <p>Skor awal Anda: ${total}/25. ${advice}</p>
        <a class="btn primary" href="${link}">Lihat rekomendasi peta</a>
      `;
    });
  }
  document.addEventListener("DOMContentLoaded", initQuiz);
})();
