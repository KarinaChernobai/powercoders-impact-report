export { JsonData, Page };

/**
 * Create a JsonData object.
 * @param {number} year - The year of the report.
 * @param {Page[]} pages - An array of Page instances.
 * @throws {Error} Throws an error if year is not provided.
 * @throws {Error} Throws an error if pages are not provided.
 */
class JsonData {
    constructor(year, pages) {
        // validation
    }

    display(container) {
        // displays the content on the page
    }
}

/**
     * Create a Page.
     * @param {string} title - The title of the page (required).
     * @param {string[]} images - An array of image URLs (at least one is required).
     * @param {string} paragraph - An optional paragraph of text.
     * @param {string[]} highlights - An optional array of highlights.
     * @throws {Error} Throws an error if title is not provided.
     * @throws {Error} Throws an error if images are not provided.
 */
class Page {
    constructor(title, images, paragraph = "", highlights = []) {
        // validation
    }

    display(container) {
        // displays the page
    }
}