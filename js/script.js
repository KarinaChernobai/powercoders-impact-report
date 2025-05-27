import { JsonData, Page } from './types.js';
import { loadReport } from './parser.js';

/**
 * Reads from Json.
 * @param {string} filePath - The path to the json file.
 * @throws {Error} Throws an error if filePath is not provided.
 * @returns {JsonData} Returns parsed data
 */
async function readFromJson(filePath) {
    const data = new JsonData();
    // parse Json 
    return data;
}

/**
 * Fetches data.
 * @param {string} folderPath - The path to the json folder.
 * @throws {Error} Throws an error if folderPath is not provided.
 * @returns {JsonData[]} Returns an array of data
 */
async function fetchData(folderPath) {
    // looks in the data folder and cycles through files
    // picks only the ones that start with impact

    // for each element
    const data = readFromJson();
    // data.display();
}


// new fetching algorythm
async function fetchDataNew(filePath) {
  const report = await loadReport(filePath);
  //  then report goes into renderer,
  //  or console, or where needed:
  console.log(report);
}
// testing new fetching date script
document.addEventListener('DOMContentLoaded', () =>
  fetchDataNew('../data/impact_test.json')
);

//  
// document.addEventListener("DOMContentLoaded", async () => {
//     await fetchData();
// });