  /**
   * Create a JsonData object.
   * @param {number} year - The year of the report.
   * @param {Page[]} pages - An array of Page instances.
   */
class JsonData {
    constructor(year, pages) {
        // validation
    }

    displayHTML(container){
        // displays the content on the page
    }
}

/**
     * Create a Page.
     * @param {string} title - The title of the page (required).
     * @param {string[]} images - An array of image URLs (at least one is required).
     * @param {string} paragraph - An optional paragraph of text.
     * @param {string[]} highlights - An optional array of highlights.
 */
class Page {
    constructor(title, images, paragraph = "", highlights = []) {
        // validation
    }

    displayHTML(container){
        // displays the page
    }
}