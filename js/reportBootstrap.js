/* Load ?file=  → fetch JSON → render into <main> */
import { buildReportDom } from './domBuilder.js';
import { JSON_ROOT }      from './config.js';

const file = new URLSearchParams(location.search).get('file');
if (!file) {
  document.body.innerHTML =
    '<h1 style="margin:4rem;text-align:center">No report specified</h1>';
  throw new Error('reportBootstrap: ?file param is missing');
}

const main = document.querySelector('main');

fetch(JSON_ROOT + file)
  .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
  .then(json => main.append(buildReportDom(json)))
  .catch(err => {
    main.innerHTML =
      '<h1 style="margin:4rem;text-align:center">Failed to load report</h1>';
    console.error('reportBootstrap:', err);
  });
