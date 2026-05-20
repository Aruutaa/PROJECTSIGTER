(function () {
  const DATA = window.MHZ_DATA;
  const U = window.MHZ_UTILS;
  if (!DATA || !U) return;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const state = { query: "", category: "all", stress: "all" };

  function rows() {
    const q = state.query.trim().toLowerCase();
    return DATA.features.filter(item => {
      if (state.category !== "all" && item.category !== state.category) return false;
      if (state.stress !== "all" && item.stressLevel !== state.stress) return false;
      if (!q) return true;
      return [item.name, item.category, item.village, item.district, item.description, item.tags.join(" ")].join(" ").toLowerCase().includes(q);
    });
  }

  function render() {
    const tbody = document.getElementById("dataTableBody");
    const count = document.getElementById("dataCount");
    if (!tbody) return;
    const filtered = rows();
    if (count) count.textContent = `${filtered.length} record`;
    tbody.innerHTML = filtered.map(item => {
      const cat = U.categoryInfo(item.category);
      return `
        <tr>
          <td><strong>${item.name}</strong><br><span class="text-soft">${item.id}</span></td>
          <td><span class="badge" style="color:${cat.color};border-color:${cat.color}55">${cat.icon} ${cat.label}</span></td>
          <td>${item.lat.toFixed(6)}, ${item.lng.toFixed(6)}<br><span class="text-soft">Radius ${item.radius || "-"} m</span></td>
          <td>${item.village}<br><span class="text-soft">${item.district}</span></td>
          <td><span class="badge ${U.stressClass(item.stressLevel)}">${U.stressLabel(item.stressLevel)}</span></td>
          <td>${item.recoveryScore}</td>
          <td>${item.accessScore}</td>
          <td>${item.openHours}</td>
          <td>${item.sourceType}</td>
        </tr>
      `;
    }).join("");
  }

  function bind() {
    $("#dataSearch")?.addEventListener("input", e => { state.query = e.target.value; render(); });
    $("#dataCategory")?.addEventListener("change", e => { state.category = e.target.value; render(); });
    $("#dataStress")?.addEventListener("change", e => { state.stress = e.target.value; render(); });
    $("#downloadCsv")?.addEventListener("click", () => U.download("mental-health-safe-zone-data.csv", U.toCSV(rows()), "text/csv"));
    $("#downloadJson")?.addEventListener("click", () => U.download("mental-health-safe-zone-data.geojson", JSON.stringify(U.toGeoJSON(rows()), null, 2), "application/geo+json"));
    $("#copySchema")?.addEventListener("click", async () => {
      const schema = document.getElementById("schemaBlock")?.textContent || "";
      try {
        await navigator.clipboard.writeText(schema.trim());
        $("#copySchema").textContent = "Schema tersalin";
        setTimeout(() => { $("#copySchema").textContent = "Copy schema"; }, 1200);
      } catch (error) {
        console.warn(error);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    render();
    bind();
  });
})();
