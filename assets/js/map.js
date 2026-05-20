(function(){
  const data = window.SAFEZONE_DATA || [];
  const categories = window.SAFEZONE_CATEGORIES || {};
  const mapEl = document.getElementById('map');
  if(!mapEl || !window.L) return;

  const defaultCenter = [-7.7699, 110.3973];
  const map = L.map('map', {
    zoomControl: false,
    scrollWheelZoom: true
  }).setView(defaultCenter, 13);

  L.control.zoom({ position: 'bottomleft' }).addTo(map);

  const baseLayers = {
    'Calm Light': L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
    }),
    'Dark City': L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
    }),
    'OpenStreetMap': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    })
  };
  baseLayers['Calm Light'].addTo(map);
  L.control.layers(baseLayers, {}, { position: 'bottomright' }).addTo(map);

  const markerLayer = L.layerGroup().addTo(map);
  const radiusLayer = L.layerGroup().addTo(map);
  let activeFilter = 'all';
  let activeSearch = '';
  let selectedId = null;
  let userMarker = null;

  const els = {
    list: document.getElementById('locationList'),
    resultCount: document.getElementById('resultCount'),
    nearestLabel: document.getElementById('nearestLabel'),
    detail: document.getElementById('detailPanel'),
    search: document.getElementById('searchInput'),
    locate: document.getElementById('locateBtn'),
    reset: document.getElementById('resetBtn')
  };

  function markerIcon(category){
    return L.divIcon({
      className: '',
      html: `<div class="custom-marker ${category}"></div>`,
      iconSize: [24,24],
      iconAnchor: [12,12],
      popupAnchor: [0,-14]
    });
  }

  function categoryLabel(category){
    return categories[category]?.label || category;
  }

  function googleRouteUrl(item){
    return `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`;
  }

  function popupHtml(item){
    return `
      <div class="popup-title">${item.name}</div>
      <div class="popup-meta">${item.type} · Skor tenang ${item.calmScore}/100</div>
    `;
  }

  function matches(item){
    const filterMatch = activeFilter === 'all' || item.category === activeFilter;
    const haystack = `${item.name} ${item.category} ${item.type} ${item.description} ${(item.facilities || []).join(' ')}`.toLowerCase();
    const searchMatch = !activeSearch || haystack.includes(activeSearch.toLowerCase());
    return filterMatch && searchMatch;
  }

  function render(){
    markerLayer.clearLayers();
    radiusLayer.clearLayers();
    const filtered = data.filter(matches);
    if(els.resultCount) els.resultCount.textContent = filtered.length;

    filtered.forEach(item => {
      const circleColor = categories[item.category]?.color || '#7df9d4';
      const radius = item.category === 'stress-zone' ? 420 : item.category === 'rth' ? 270 : 190;
      L.circle([item.lat, item.lng], {
        radius,
        color: circleColor,
        weight: 1,
        fillColor: circleColor,
        fillOpacity: item.category === 'stress-zone' ? .13 : .08,
        opacity: .35
      }).addTo(radiusLayer);

      const marker = L.marker([item.lat, item.lng], { icon: markerIcon(item.category), title: item.name });
      marker.bindPopup(popupHtml(item));
      marker.on('click', () => selectItem(item.id, true));
      marker.addTo(markerLayer);
    });

    renderList(filtered);
    if(filtered.length){
      const group = L.featureGroup(filtered.map(item => L.marker([item.lat, item.lng])));
      map.fitBounds(group.getBounds().pad(0.16), { animate: true, maxZoom: 14 });
    }
  }

  function renderList(items){
    if(!els.list) return;
    if(!items.length){
      els.list.innerHTML = `<div class="location-card"><h3>Data tidak ditemukan</h3><p>Coba ubah kata kunci atau filter kategori.</p></div>`;
      return;
    }
    els.list.innerHTML = items.map(item => `
      <button class="location-card ${selectedId === item.id ? 'active' : ''}" data-id="${item.id}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="location-meta">
          <span class="badge">${categoryLabel(item.category)}</span>
          <span class="badge">Tenang ${item.calmScore}/100</span>
        </div>
      </button>
    `).join('');

    els.list.querySelectorAll('.location-card[data-id]').forEach(card => {
      card.addEventListener('click', () => selectItem(card.dataset.id, true));
    });
  }

  function selectItem(id, pan){
    selectedId = id;
    const item = data.find(d => d.id === id);
    if(!item) return;
    if(els.nearestLabel) els.nearestLabel.textContent = item.name.length > 19 ? item.name.slice(0, 19) + '…' : item.name;
    if(els.detail){
      els.detail.innerHTML = `
        <p class="eyebrow">${categoryLabel(item.category)}</p>
        <h2>${item.name}</h2>
        <p>${item.description}</p>
        <p><strong>Fasilitas:</strong> ${(item.facilities || []).join(', ')}</p>
        <p><strong>Jam:</strong> ${item.hours} · <strong>Level stres:</strong> ${item.stressLevel}</p>
        <div class="detail-actions">
          <a href="${googleRouteUrl(item)}" target="_blank" rel="noopener">Buka rute</a>
          <a href="https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}" target="_blank" rel="noopener">Lihat di Maps</a>
        </div>
      `;
    }
    renderList(data.filter(matches));
    if(pan){
      map.flyTo([item.lat, item.lng], 16, { duration: .85 });
    }
  }

  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      render();
    });
  });

  if(els.search){
    els.search.addEventListener('input', () => {
      activeSearch = els.search.value.trim();
      render();
    });
  }

  if(els.reset){
    els.reset.addEventListener('click', () => {
      activeFilter = 'all';
      activeSearch = '';
      selectedId = null;
      document.querySelectorAll('[data-filter]').forEach(b => b.classList.toggle('active', b.dataset.filter === 'all'));
      if(els.search) els.search.value = '';
      if(els.nearestLabel) els.nearestLabel.textContent = '-';
      if(els.detail){
        els.detail.innerHTML = '<p class="eyebrow">Detail lokasi</p><h2>Pilih marker atau daftar lokasi</h2><p>Informasi kategori, tingkat ketenangan, fasilitas, dan akses rute akan tampil di sini.</p>';
      }
      render();
    });
  }

  if(els.locate){
    els.locate.addEventListener('click', () => {
      if(!navigator.geolocation){
        alert('Browser tidak mendukung geolocation.');
        return;
      }
      els.locate.textContent = 'Mencari lokasi...';
      navigator.geolocation.getCurrentPosition((pos) => {
        const latlng = [pos.coords.latitude, pos.coords.longitude];
        if(userMarker) map.removeLayer(userMarker);
        userMarker = L.circleMarker(latlng, {
          radius: 10,
          color: '#ffffff',
          fillColor: '#ffe082',
          fillOpacity: .95,
          weight: 3
        }).addTo(map).bindPopup('Lokasi Anda').openPopup();
        map.flyTo(latlng, 15);
        els.locate.textContent = 'Gunakan lokasi saya';
        const nearest = nearestPlace(latlng[0], latlng[1], data.filter(d => d.category !== 'stress-zone'));
        if(nearest){
          selectItem(nearest.id, false);
          if(els.nearestLabel) els.nearestLabel.textContent = `${nearest.name.slice(0,16)}…`;
        }
      }, () => {
        els.locate.textContent = 'Gunakan lokasi saya';
        alert('Lokasi tidak dapat diakses. Pastikan izin lokasi aktif.');
      }, { enableHighAccuracy: true, timeout: 8000 });
    });
  }

  function nearestPlace(lat, lng, places){
    let best = null;
    let bestDistance = Infinity;
    places.forEach(place => {
      const d = haversine(lat,lng,place.lat,place.lng);
      if(d < bestDistance){ bestDistance = d; best = place; }
    });
    return best;
  }

  function haversine(lat1,lng1,lat2,lng2){
    const R = 6371;
    const dLat = toRad(lat2-lat1);
    const dLng = toRad(lng2-lng1);
    const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLng/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  }
  function toRad(v){ return v * Math.PI / 180; }

  render();
})();
