import { buildReportDom }  from './domBuilder.js';

/* ----------------  CHANGE PATHS ONCE HERE  ---------------- */
const repoFolder = '/' + window.location.pathname.split('/')[1];
const BASE_PATH = window.location.hostname !== 'localhost' ? repoFolder : '';
export const JSON_ROOT  = BASE_PATH + '/data/reports/';     // Folder for *.json reports

export const MEDIA_ROOT = BASE_PATH + '/';          // Prefix for every img / bg

export const TARGET_TAG = 'main';         // Tag where to insert render



document.addEventListener('DOMContentLoaded', async () => {
  const main = document.querySelector(TARGET_TAG); 
  if (!main) return console.error(`<${TARGET_TAG}> tag not found`);

  //main.innerHTML = '';         // clear before start

                                        // test file  
  const res  = await fetch(JSON_ROOT + 'impact_test.json');
  const json = await res.json();

  main.append(buildReportDom(json));
});






