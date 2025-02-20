import { sanity_url_for_image } from "../../filters/sanity_url_for_image.js";
import Image from "@11ty/eleventy-img";

/** Liquid shortcode: Generate an image from a Sanity image asset and process with 11ty image.
 * @param {Object} image - Sanity link object type.
 * @param {string} dimensions - Width and height as comma-separated string.
 * @param {string} loading
 * @param {boolean} crop
 * @param {string} classes - Optional comma-separated string of class names.
 * @param {string} attrs - Other attributes for the tag parsed as-is
 * @returns {string} HTML image tag.
 */
export const sanity_image = async (
    image,
    dimensions = "",
    loading = "lazy",
    crop = false,
    classes = "",
    attrs = ""
) => {
    /* TODO: Update dimensions to accept original aspect ratio and only width */
    /* TODO: Update to figure if caption is present */
    let width = null;
    let height = null;

    let image_link = sanity_url_for_image(image);

    if (dimensions) {
        const parsed_dimensions = dimensions.split(",");
        width = parsed_dimensions[0];
        height = parsed_dimensions[1];
        image_link = image_link.width(width).height(height);
    }

    if (crop) {
        image_link = image_link.fit("crop").crop("focalpoint");
    }

    image_link = image_link.url();

    // console.log("image link:", image_link);

    const image_metadata = await Image(image_link, {
        widths: [width ?? "auto"],
        formats: ["webp", "jpeg"],
        outputDir: "./_site/img/",
        urlPath: "/img/",
    });

    const image_data = image_metadata.webp[image_metadata.webp.length - 1];

    // console.log(image_data);
    /* TODO: Rewrite html attrs as object and spread through <img> tag, like 11ty image does */

    return `<img src="${image_data.url}" width="${image_data.width}" height="${
        image_data.height
    }" alt="${image.alt}" class="${
        classes ? `${classes.split(",").join(" ")} with-lqip` : "with-lqip"
    }" ${attrs ?? ""} loading="${loading}" decoding="${
        loading == "lazy" ? "async" : "auto"
    }" style="background-image: url(${image.asset.metadata.lqip})">`;
};
