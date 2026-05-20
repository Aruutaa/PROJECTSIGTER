(function(){
  const data = window.SAFEZONE_DATA || [];
  const categories = window.SAFEZONE_CATEGORIES || {};
  const tbody = document.querySelector('#dataTable tbody');
  const search = document.getElementById('tableSearch');
  const download = document.getElementById('downloadCsv');

  function label(category){ return categories[category]?.label || category; }

  function renderTable(keyword = ''){
    if(!tbody) return;
    const q = keyword.toLowerCase();
    const rows = data.filter(item => {
      const text = `${item.name} ${item.category} ${item.type} ${(item.facilities || []).join(' ')}`.toLowerCase();
      return !q || text.includes(q);
    });
    tbody.innerHTML = rows.map(item => `
      <tr>
        <td>${item.name}</td>
        <td>${label(item.category)}</td>
        <td>${item.lat.toFixed(6)}</td>
        <td>${item.lng.toFixed(6)}</td>
        <td>${item.calmScore}/100</td>
        <td>${(item.facilities || []).join(', ')}</td>
      </tr>
    `).join('');
  }

  if(search){
    search.addEventListener('input', () => renderTable(search.value.trim()));
  }

  if(download){
    download.addEventListener('click', () => {
      const header = ['id','name','category','type','latitude','longitude','calm_score','stress_level','facilities','description'];
      const lines = [header.join(',')].concat(data.map(item => [
        item.id,
        csv(item.name),
        item.category,
        csv(item.type),
        item.lat,
        item.lng,
        item.calmScore,
        csv(item.stressLevel),
        csv((item.facilities || []).join('; ')),
        csv(item.description)
      ].join(',')));
      const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mental-health-safezone-data.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  }

  function csv(value){
    return `"${String(value ?? '').replaceAll('"','""')}"`;
  }

  renderTable();
})();
