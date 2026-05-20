(function () {
  const DATA = window.MHZ_DATA;
  const U = window.MHZ_UTILS;
  if (!DATA || !U) return;

  const state = {
    activeCategories: new Set(Object.keys(DATA.categories)),
    search: "",
    stress: "all",
    selectedId: null,
    userLocation: null,
    routeLine: null,
    markers: new Map(),
    circles: new Map(),
    map: null,
    userMarker: null,
    baseLayers: {}
  };

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  function initMap() {
    if (!window.L || !$("#map")) return;
    state.map = L.map("map", {
      zoomControl: true,
      preferCanvas: true,
      scrollWheelZoom: true
    }).setView([-7.7703, 110.3974], 13);

    state.baseLayers.dark = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 20,
      attribution: "&copy; OpenStreetMap contributors &copy; CARTO"
    });
    state.baseLayers.light = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 20,
      attribution: "&copy; OpenStreetMap contributors &copy; CARTO"
    });
    state.baseLayers.osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 20,
      attribution: "&copy; OpenStreetMap contributors"
    });
    state.baseLayers.dark.addTo(state.map);

    const legend = L.control({ position: "bottomleft" });
    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "legend");
      div.innerHTML = Object.entries(DATA.categories).map(([key, cat]) => `
        <div class="legend-row"><span class="legend-dot" style="background:${cat.color}"></span>${cat.label}</div>
      `).join("");
      return div;
    };
    legend.addTo(state.map);

    renderLayers();
    fitAll();
  }

  function createIcon(item) {
    const cat = U.categoryInfo(item.category);
    return L.divIcon({
      className: "",
      html: `<div class="mhz-marker marker-${item.category}"><span>${cat.icon}</span></div>`,
      iconSize: [42, 42],
      iconAnchor: [21, 38],
      popupAnchor: [0, -36]
    });
  }

  function popupHTML(item) {
    const cat = U.categoryInfo(item.category);
    return `
      <div style="min-width:220px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <span style="font-size:20px">${cat.icon}</span>
          <strong>${item.name}</strong>
        </div>
        <div style="color:#aebad1;font-size:12px;margin-bottom:8px">${cat.label} · ${item.village}, ${item.district}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">
          <span class="badge ${U.stressClass(item.stressLevel)}">Stress: ${U.stressLabel(item.stressLevel)}</span>
          <span class="badge mint">Recovery ${item.recoveryScore}</span>
        </div>
        <p style="color:#aebad1;line-height:1.45;margin:0 0 10px">${item.description}</p>
        <button type="button" class="btn small primary" onclick="window.MHZ_MAP.select('${item.id}')">Detail lokasi</button>
      </div>
    `;
  }

  function clearLayers() {
    state.markers.forEach(marker => marker.remove());
    state.circles.forEach(circle => circle.remove());
    state.markers.clear();
    state.circles.clear();
  }

  function filteredFeatures() {
    const q = state.search.trim().toLowerCase();
    return DATA.features.filter(item => {
      if (!state.activeCategories.has(item.category)) return false;
      if (state.stress !== "all" && item.stressLevel !== state.stress) return false;
      if (!q) return true;
      const haystack = [item.name, item.category, item.village, item.district, item.description, item.tags.join(" "), item.recommendation].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }

  function renderLayers() {
    if (!state.map) return;
    clearLayers();
    const features = filteredFeatures();
    features.forEach(item => {
      if (item.type === "zone") {
        const cat = U.categoryInfo(item.category);
        const circle = L.circle([item.lat, item.lng], {
          radius: item.radius || 400,
          color: cat.color,
          fillColor: cat.color,
          fillOpacity: item.stressLevel === "high" ? 0.18 : 0.12,
          opacity: 0.88,
          weight: 2,
          dashArray: "8 8"
        }).addTo(state.map);
        circle.bindPopup(popupHTML(item));
        circle.on("click", () => selectLocation(item.id));
        state.circles.set(item.id, circle);
      }
      const marker = L.marker([item.lat, item.lng], { icon: createIcon(item), title: item.name }).addTo(state.map);
      marker.bindPopup(popupHTML(item));
      marker.on("click", () => selectLocation(item.id));
      state.markers.set(item.id, marker);
    });
    renderList(features);
    renderStats(features);
  }

  function renderStats(features) {
    const total = features.length;
    const recovery = total ? Math.round(features.reduce((sum, item) => sum + item.recoveryScore, 0) / total) : 0;
    const stressZones = features.filter(item => item.category === "stress_zone").length;
    const support = features.filter(item => ["counseling", "health", "community"].includes(item.category)).length;
    const set = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
    set("statTotal", total);
    set("statRecovery", recovery);
    set("statStress", stressZones);
    set("statSupport", support);
  }

  function renderList(features) {
    const list = $("#locationList");
    if (!list) return;
    if (!features.length) {
      list.innerHTML = `<div class="notice">Tidak ada lokasi sesuai filter. Coba ubah kategori, level stres, atau kata kunci.</div>`;
      return;
    }
    const sorted = [...features].sort((a, b) => {
      if (a.category === "stress_zone" && b.category !== "stress_zone") return 1;
      if (b.category === "stress_zone" && a.category !== "stress_zone") return -1;
      return b.recoveryScore - a.recoveryScore;
    });
    list.innerHTML = sorted.map(item => {
      const cat = U.categoryInfo(item.category);
      return `
        <button class="location-item ${state.selectedId === item.id ? "active" : ""}" data-id="${item.id}" type="button">
          <div class="top">
            <h3>${cat.icon} ${item.name}</h3>
            <span class="badge ${U.stressClass(item.stressLevel)}">${U.stressLabel(item.stressLevel)}</span>
          </div>
          <p>${cat.label} · ${item.village}. Recovery score <strong>${item.recoveryScore}</strong>. ${item.distanceHint}</p>
        </button>
      `;
    }).join("");
    $$(".location-item", list).forEach(button => button.addEventListener("click", () => selectLocation(button.dataset.id)));
  }

  function selectLocation(id) {
    const item = DATA.features.find(feature => feature.id === id);
    if (!item || !state.map) return;
    state.selectedId = id;
    const marker = state.markers.get(id);
    state.map.flyTo([item.lat, item.lng], item.type === "zone" ? 15 : 16, { duration: 0.85 });
    if (marker) marker.openPopup();
    renderDetail(item);
    renderLayers();
  }

  function renderDetail(item) {
    const panel = $("#detailPanel");
    if (!panel) return;
    const cat = U.categoryInfo(item.category);
    let distance = "Aktifkan lokasi untuk menghitung jarak";
    if (state.userLocation) {
      const km = U.haversine(state.userLocation, { lat: item.lat, lng: item.lng });
      distance = `${km.toFixed(2)} km dari posisi Anda`;
    }
    panel.innerHTML = `
      <div class="detail-head">
        <div>
          <span class="badge" style="border-color:${cat.color}55;color:${cat.color}">${cat.icon} ${cat.label}</span>
          <h3 style="margin-top:10px">${item.name}</h3>
        </div>
        <button class="close-btn" type="button" aria-label="Tutup detail" id="closeDetail">×</button>
      </div>
      <div class="detail-body">
        <p>${item.description}</p>
        <div class="tags">
          <span class="badge ${U.stressClass(item.stressLevel)}">Stress: ${U.stressLabel(item.stressLevel)}</span>
          <span class="badge mint">Recovery ${item.recoveryScore}</span>
          <span class="badge lavender">Akses ${item.accessScore}</span>
          <span class="badge peach">${item.openHours}</span>
        </div>
        <div class="glass-card" style="padding:16px;border-radius:18px">
          <strong>Rekomendasi Sistem</strong>
          <p style="margin-top:8px">${item.recommendation}</p>
        </div>
        <div class="resource-list">
          <div class="resource-item"><span class="num">📍</span><div><strong>Jarak</strong><p>${distance}</p></div></div>
          <div class="resource-item"><span class="num">👥</span><div><strong>Keramaian</strong><p>${item.crowd}</p></div></div>
          <div class="resource-item"><span class="num">🔉</span><div><strong>Kebisingan</strong><p>${item.noise}</p></div></div>
        </div>
        <div class="detail-actions">
          <button class="btn primary" type="button" id="routeBtn">Buat rute</button>
          <a class="btn" href="https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}" target="_blank" rel="noopener">Google Maps</a>
        </div>
      </div>
    `;
    panel.classList.add("open");
    $("#closeDetail")?.addEventListener("click", () => panel.classList.remove("open"));
    $("#routeBtn")?.addEventListener("click", () => drawRoute(item));
  }

  function drawRoute(item) {
    if (!state.map) return;
    if (state.routeLine) state.routeLine.remove();
    const origin = state.userLocation || { lat: state.map.getCenter().lat, lng: state.map.getCenter().lng };
    state.routeLine = L.polyline([[origin.lat, origin.lng], [item.lat, item.lng]], {
      color: "#5eead4",
      weight: 4,
      opacity: .92,
      dashArray: "12 12"
    }).addTo(state.map);
    state.map.fitBounds(state.routeLine.getBounds(), { padding: [80, 80] });
  }

  function fitAll() {
    if (!state.map) return;
    const features = filteredFeatures();
    if (!features.length) return;
    const group = L.featureGroup(features.map(item => L.marker([item.lat, item.lng])));
    state.map.fitBounds(group.getBounds(), { padding: [45, 45], maxZoom: 14 });
  }

  function locateUser() {
    if (!navigator.geolocation || !state.map) {
      alert("Browser tidak mendukung geolocation.");
      return;
    }
    navigator.geolocation.getCurrentPosition(pos => {
      state.userLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      if (state.userMarker) state.userMarker.remove();
      state.userMarker = L.circleMarker([state.userLocation.lat, state.userLocation.lng], {
        radius: 9,
        color: "#ffffff",
        weight: 3,
        fillColor: "#5eead4",
        fillOpacity: .95
      }).addTo(state.map).bindPopup("Posisi Anda");
      state.map.flyTo([state.userLocation.lat, state.userLocation.lng], 15);
      if (state.selectedId) {
        const item = DATA.features.find(f => f.id === state.selectedId);
        if (item) renderDetail(item);
      }
    }, () => alert("Lokasi tidak dapat diakses. Izinkan akses lokasi pada browser."), { enableHighAccuracy: true, timeout: 9000 });
  }

  function nearestSafeZone() {
    const origin = state.userLocation || { lat: state.map.getCenter().lat, lng: state.map.getCenter().lng };
    const candidates = DATA.features.filter(item => item.category !== "stress_zone" && item.recoveryScore >= 75);
    const nearest = candidates.map(item => ({ item, km: U.haversine(origin, item) })).sort((a, b) => a.km - b.km)[0];
    if (nearest) {
      selectLocation(nearest.item.id);
      drawRoute(nearest.item);
    }
  }

  function switchBasemap() {
    const select = $("#basemapSelect");
    if (!select || !state.map) return;
    Object.values(state.baseLayers).forEach(layer => layer.remove());
    state.baseLayers[select.value].addTo(state.map);
  }

  function bindUI() {
    $("#searchInput")?.addEventListener("input", e => {
      state.search = e.target.value;
      renderLayers();
    });
    $("#stressFilter")?.addEventListener("change", e => {
      state.stress = e.target.value;
      renderLayers();
    });
    $("#basemapSelect")?.addEventListener("change", switchBasemap);
    $$("[data-category-filter]").forEach(input => {
      input.addEventListener("change", () => {
        if (input.checked) state.activeCategories.add(input.value);
        else state.activeCategories.delete(input.value);
        renderLayers();
      });
    });
    $("#locateBtn")?.addEventListener("click", locateUser);
    $("#nearestBtn")?.addEventListener("click", nearestSafeZone);
    $("#fitBtn")?.addEventListener("click", fitAll);
    $("#downloadGeojsonBtn")?.addEventListener("click", () => {
      U.download("mental-health-safe-zone-filtered.geojson", JSON.stringify(U.toGeoJSON(filteredFeatures()), null, 2), "application/geo+json");
    });
  }

  window.MHZ_MAP = { select: selectLocation, locate: locateUser, nearest: nearestSafeZone };

  document.addEventListener("DOMContentLoaded", () => {
    initMap();
    bindUI();
  });
})();
