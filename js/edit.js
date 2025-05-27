import { JsonData, Page } from './types.js';

function validate() {
    // title and at least one image is required
}

/**
 * Creates json object and saves it.
 * @param {string} filePath - The path to the json file.
 *  @param {JsonData} data - The data object.
 * @throws {Error} Throws an error if filePath is not provided.
 * @throws {Error} Throws an error if data is not provided.
 */
function createJson(filePath, data) {
    
}

// saves the content into the new json file
function submit() {
    validate();
    createJson();
}

document.addEventListener("DOMContentLoaded", async () => {
    // add event listener to the submit button
});