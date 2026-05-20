(function () {
  const DATA = window.MHZ_DATA;
  const U = window.MHZ_UTILS;
  if (!DATA || !U) return;
  const $ = (selector, scope = document) => scope.querySelector(selector);

  function setMetric(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function metrics() {
    const features = DATA.features;
    const avgRecovery = Math.round(features.reduce((sum, f) => sum + f.recoveryScore, 0) / features.length);
    const avgAccess = Math.round(features.reduce((sum, f) => sum + f.accessScore, 0) / features.length);
    const supportNodes = features.filter(f => ["counseling", "health", "community"].includes(f.category)).length;
    const highStress = features.filter(f => f.stressLevel === "high").length;
    setMetric("metricLocations", features.length);
    setMetric("metricRecovery", avgRecovery);
    setMetric("metricAccess", avgAccess);
    setMetric("metricSupport", supportNodes);
    setMetric("metricHighStress", highStress);
  }

  function chartColors() {
    return Object.values(DATA.categories).map(cat => cat.color);
  }

  function buildCharts() {
    if (!window.Chart) {
      document.querySelectorAll(".chart-box").forEach(box => {
        box.innerHTML = "<p>Chart.js tidak termuat. Pastikan internet aktif saat membuka halaman.</p>";
      });
      return;
    }
    Chart.defaults.color = "#aebad1";
    Chart.defaults.borderColor = "rgba(255,255,255,.12)";
    Chart.defaults.font.family = "Inter, system-ui, sans-serif";

    const categoryLabels = Object.keys(DATA.categories).map(k => DATA.categories[k].short);
    const categoryCounts = Object.keys(DATA.categories).map(k => DATA.features.filter(f => f.category === k).length);
    const categoryCanvas = document.getElementById("categoryChart");
    if (categoryCanvas) {
      new Chart(categoryCanvas, {
        type: "doughnut",
        data: { labels: categoryLabels, datasets: [{ data: categoryCounts, backgroundColor: chartColors(), borderWidth: 0 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } }, cutout: "64%" }
      });
    }

    const topRecovery = [...DATA.features].filter(f => f.category !== "stress_zone").sort((a, b) => b.recoveryScore - a.recoveryScore).slice(0, 8).reverse();
    const recoveryCanvas = document.getElementById("recoveryChart");
    if (recoveryCanvas) {
      new Chart(recoveryCanvas, {
        type: "bar",
        data: {
          labels: topRecovery.map(f => f.name.length > 18 ? f.name.slice(0, 18) + "…" : f.name),
          datasets: [{ label: "Recovery score", data: topRecovery.map(f => f.recoveryScore), backgroundColor: "rgba(94,234,212,.68)", borderRadius: 12 }]
        },
        options: { indexAxis: "y", responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { min: 0, max: 100 } } }
      });
    }

    const stressLabels = ["Rendah", "Sedang", "Tinggi", "Dukungan"];
    const stressKeys = ["low", "medium", "high", "support"];
    const stressCanvas = document.getElementById("stressChart");
    if (stressCanvas) {
      new Chart(stressCanvas, {
        type: "radar",
        data: {
          labels: stressLabels,
          datasets: [{ label: "Jumlah titik", data: stressKeys.map(key => DATA.features.filter(f => f.stressLevel === key).length), backgroundColor: "rgba(139,124,255,.18)", borderColor: "#8b7cff", pointBackgroundColor: "#5eead4" }]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { r: { beginAtZero: true, ticks: { precision: 0 } } } }
      });
    }

    const accessCanvas = document.getElementById("accessChart");
    const scatter = DATA.features.map(f => ({ x: f.accessScore, y: f.recoveryScore, label: f.name }));
    if (accessCanvas) {
      new Chart(accessCanvas, {
        type: "scatter",
        data: { datasets: [{ label: "Akses vs Recovery", data: scatter, backgroundColor: "rgba(255,140,198,.7)", pointRadius: 6, pointHoverRadius: 9 }] },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { tooltip: { callbacks: { label: ctx => `${ctx.raw.label}: akses ${ctx.raw.x}, recovery ${ctx.raw.y}` } } },
          scales: { x: { title: { display: true, text: "Access score" }, min: 50, max: 100 }, y: { title: { display: true, text: "Recovery score" }, min: 20, max: 100 } }
        }
      });
    }
  }

  function priorityList() {
    const target = document.getElementById("priorityList");
    if (!target) return;
    const priorities = DATA.features
      .filter(f => f.category !== "stress_zone")
      .map(f => {
        const stressBonus = f.stressLevel === "low" ? 8 : f.stressLevel === "medium" ? 2 : 0;
        const score = Math.round((f.recoveryScore * 0.5) + (f.accessScore * 0.25) + stressBonus + (f.category === "rth" ? 5 : 0));
        return { ...f, priorityScore: Math.min(100, score) };
      })
      .sort((a, b) => b.priorityScore - a.priorityScore)
      .slice(0, 8);
    target.innerHTML = priorities.map((item, index) => {
      const cat = U.categoryInfo(item.category);
      return `
        <div class="priority-item">
          <div class="rank">${index + 1}</div>
          <div>
            <strong>${cat.icon} ${item.name}</strong>
            <p>${cat.label} · recovery ${item.recoveryScore} · akses ${item.accessScore}</p>
          </div>
          <span class="badge mint">${item.priorityScore}</span>
        </div>
      `;
    }).join("");
  }

  function simulator() {
    const sliders = ["noise", "crowd", "green", "access"].map(id => document.getElementById(`sim-${id}`)).filter(Boolean);
    const score = document.getElementById("sim-score");
    const ring = document.getElementById("sim-ring");
    const output = document.getElementById("sim-output");
    if (!sliders.length || !score || !ring || !output) return;
    const update = () => {
      const noise = Number(document.getElementById("sim-noise").value);
      const crowd = Number(document.getElementById("sim-crowd").value);
      const green = Number(document.getElementById("sim-green").value);
      const access = Number(document.getElementById("sim-access").value);
      const value = Math.max(0, Math.min(100, Math.round((green * .42) + (access * .26) + ((100 - noise) * .18) + ((100 - crowd) * .14))));
      score.textContent = value;
      ring.style.setProperty("--score", `${value}%`);
      const label = value >= 80 ? "Sangat layak sebagai zona pemulihan emosi." : value >= 65 ? "Layak, tetapi butuh perbaikan pada kebisingan/akses." : value >= 50 ? "Cukup, perlu intervensi desain dan pengelolaan." : "Belum ideal untuk direkomendasikan sebagai safe zone utama.";
      output.textContent = label;
      sliders.forEach(slider => {
        const valueEl = document.querySelector(`[data-range-value="${slider.id}"]`);
        if (valueEl) valueEl.textContent = slider.value;
      });
    };
    sliders.forEach(slider => slider.addEventListener("input", update));
    update();
  }

  document.addEventListener("DOMContentLoaded", () => {
    metrics();
    buildCharts();
    priorityList();
    simulator();
  });
})();
