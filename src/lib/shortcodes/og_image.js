import Image from "@11ty/eleventy-img";
import { sanity_url_for_image } from "../filters/sanity_url_for_image.js";

/** Liquid shortcode: Generate an open graph image from Sanity with 11ty Image.
 * @param {Object} image - Sanity link object type.
 * @param {string} url - The domain URL to prefix to the processed image path.
 * @returns {string} Processed image URL path.
 */
export const og_image = async (source, url) => {
    const image_link = sanity_url_for_image(source)
        .width(1200)
        .height(630)
        .url();

    const image_metadata = await Image(image_link, {
        widths: [1200],
        formats: ["jpeg"],
        outputDir: "./_site/open_graph/",
        urlPath: "/open_graph/",
    });

    const image_data = image_metadata.jpeg[0];

    return url + image_data.url;
};
