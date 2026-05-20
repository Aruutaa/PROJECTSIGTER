(function(){
  const data = window.SAFEZONE_DATA || [];
  const categories = window.SAFEZONE_CATEGORIES || {};
  const byId = id => document.getElementById(id);
  const counts = data.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  if(byId('totalLocations')) byId('totalLocations').textContent = data.length;
  if(byId('rthCount')) byId('rthCount').textContent = counts.rth || 0;
  if(byId('counselingCount')) byId('counselingCount').textContent = counts.counseling || 0;
  if(byId('safeSpaceCount')) byId('safeSpaceCount').textContent = counts['safe-space'] || 0;

  const chart = byId('barChart');
  if(chart){
    const max = Math.max(...Object.values(counts), 1);
    chart.innerHTML = Object.entries(categories).map(([key, meta]) => {
      const value = counts[key] || 0;
      const width = Math.max((value / max) * 100, 4);
      return `
        <div class="bar-row">
          <span>${meta.label}</span>
          <div class="bar-track"><div class="bar-fill" style="width:${width}%;background:linear-gradient(90deg, ${meta.color}, #ffffff99)"></div></div>
          <strong>${value}</strong>
        </div>
      `;
    }).join('');
  }
})();
