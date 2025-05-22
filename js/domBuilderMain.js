import { buildReportDom }  from './domBuilder.js';

/* ----------------  CHANGE PATHS ONCE HERE  ---------------- */
export const JSON_ROOT  = '../data/';     // Folder for *.json reports
export const MEDIA_ROOT = '../';          // Prefix for every img / bg

export const TARGET_TAG = 'main';         // Tag where to insert render


document.addEventListener('DOMContentLoaded', async () => {
  const main = document.querySelector(TARGET_TAG); 
  if (!main) return console.error(`<${TARGET_TAG}> tag not found`);

  main.innerHTML = '';         // clear before start

                                        // test file  
  const res  = await fetch(JSON_ROOT + 'impact_test.json');
  const json = await res.json();

  main.append(buildReportDom(json));
});






