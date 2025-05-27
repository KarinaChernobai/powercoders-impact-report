/* Build <li><a …> tiles inside <ul class="reports"> */
const MANIFEST = './data/reports/index.json';
const REPORT_PAGE = 'report_template.html';       // target page

const listEl = document.querySelector('.reports');
if (!listEl) {
  console.error('.reports UL not found on this page');
} else {
  buildReportList(listEl);
}

export async function buildReportList(container) {
  if (!container) {
    console.error('buildReportList: no container given');
    return;
  }

  container.innerHTML = '';                       // ← wipe previous items
  try {
    const items = await (await fetch('./data/reports/index.json')).json();

    items.forEach(({ filename, title, img }) => {
      const li  = document.createElement('li');

      const a   = document.createElement('a');
      a.className = 'report';
      a.href      = `report_template.html?file=${encodeURIComponent(filename)}`;

      a.innerHTML = `
        <img class="report__img" src="${img}" alt="${title}">
        <br>${title}
      `;

      li.append(a);
      container.append(li);
    });
  } catch (err) {
    console.error('buildReportList: cannot load manifest', err);
  }
}

