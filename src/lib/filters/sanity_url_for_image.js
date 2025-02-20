import ImageUrlBuilder from "@sanity/image-url";
import { sanity_client } from "../sanity/sanity_client.js";

const image_builder = ImageUrlBuilder(sanity_client);

/** Filter: Generate a URL from Sanity's image builder string.
 * @param {Object} source - Sanity image type.
 * @returns {string} Image query string.
 */
export const sanity_url_for_image = (source) => {
    return image_builder.image(source);
};
