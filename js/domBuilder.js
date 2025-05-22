import { MEDIA_ROOT} from './domBuilderMain.js';

/* ---------- PUBLIC: buildReportDom(json) ---------- */
export function buildReportDom(report) {
  const frag = document.createDocumentFragment();

  /* HEADER ------------------------------------------------ */
  if (report.header) frag.append(buildHeader(report.header));

  /* SECTIONS ---------------------------------------------- */
  (report.sections || []).forEach(sec => {
    if (sec.type === 'cards') frag.append(buildCardsSection(sec));
    else console.warn('Unknown section type:', sec.type);
  });

  return frag;
}

/* ===== Modules ===== */

function buildHeader(hdr) {
  
  const header = document.createElement('header'); // Better to change to header than
  header.className = 'header';

  /* background image + optional custom height */
  header.style.setProperty('--header-bg', `url("${MEDIA_ROOT}${hdr.image}")`);
  if (hdr.height) header.style.height = hdr.height;

  const h1 = document.createElement('h1');
  h1.innerHTML = formatInline(hdr.title);   // span-markers, bold, etc.
  header.append(h1);

  return header;
}


function buildCardsSection(sec) {
  const sectionEl = document.createElement('section');
  sectionEl.className = 'cards';

  (sec.rows || []).forEach(row => sectionEl.append(buildRow(row)));

  return sectionEl;
}

function buildRow(row) {
  const hasGallery = row.gallery && Array.isArray(row.gallery.images);

  // ----- CASE 1: galery not empty → regular card__container
  if (hasGallery) {
    const container = document.createElement('div');
    container.className =
      'card__container' + (row.alternate ? ' alternate' : '');
    container.id = row.id;

    const galleryEl = buildGallery(row.gallery);
    const cardEl    = buildCard(row.card);

    row.alternate
      ? (container.append(galleryEl), container.append(cardEl))
      : (container.append(cardEl),   container.append(galleryEl));

    return container;
  }

  // ----- CASE 2: no galery (empty) → straight to <div class="card">
  const soloCard = buildCard(row.card);
  soloCard.id = row.id;                 // id anker
  return soloCard;
}

function buildCard(card) {
  const cardEl = document.createElement('div');
  cardEl.className = `card ${card.id ?? ''}`;
  cardEl.append(createEl('h2', card.title));

  (card.blocks || []).forEach(block => {
    const [tag, payload] = Object.entries(block)[0];
    const node = typeof payload === 'string'
      ? createEl(tag, payload)
      : createEl(tag, payload.text, payload.class);
    cardEl.append(node);
  });

  return cardEl;
}

function buildGallery(galeryObj) {
  // backwards-compat: if legacy array passed, wrap it
  const images = Array.isArray(galeryObj) ? galeryObj : galeryObj.images;
  const variant = galeryObj.type || 'a';        // default type = “a”

  const wrapper = document.createElement('div');
  wrapper.className = 'galleryContainer';

  const galery = document.createElement('div');
  //galery.className = `gallery gallery--${variant}`;  // if you need

  images.forEach((src, i) => {
    const fig = document.createElement('figure');
    /* gallery__item--1a  / 2a / 3a   etc. */
    fig.className = `gallery__item gallery__item--${i + 1}${variant}`;
    fig.append(
      createEl('img', '', 'gallery__img', {
        src: MEDIA_ROOT + src,
        alt: `gallery image ${i + 1}`
      })
    );
    galery.append(fig);
  });

  wrapper.append(galery);
  return wrapper;
}


function createEl(tag, html = '', cssClass = '', attrs = {}) {
  const el = document.createElement(tag);
  if (cssClass) el.className = cssClass;
  if (html) el.innerHTML = formatInline(html);
  Object.assign(el, attrs);
  return el;
}


// ----------------------  UTILITIES  -----------------------

/* ----------------  INLINE TEXT FORMATTER  -----------------
   • {{span:red}}text{{/span}}      → <span data-v="red">text</span>
   • **bold** / _italic_            → <strong> / <em>
   • \n                             → <br>
------------------------------------------------------------ */


export function formatInline(raw) {
  return raw
    /* 1. **bold**  → <strong> */
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

    /* 2. _italic_  → <em> */
    .replace(
      /(^|[^A-Za-z0-9])_(?!_)([^_\n]+?)_(?!_)(?=[^A-Za-z0-9]|$)/g,
      '$1<em>$2</em>'
    )

    /* 3 ── <span class="variant"> … </span>
            insert{{span:red-v2}} … {{/span}}  OR
                       {{span:red-v2}} … {{/span:red-v2}}  */
    .replace(
      /\{\{span:([-\w]+)\}\}([\s\S]*?)\{\{\/span(?:[:\-]\1)?\}\}/g,
      (_, variant, inner) => `<span class="${variant}">${inner}</span>`
    )

    /* 4. \n  → <br> */
    .replace(/\n/g, '<br>');
}