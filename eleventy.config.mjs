/** @link https://www.11ty.dev/docs/config/ */

import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { filters } from "./src/lib/filters/index.js";
import { shortcodes } from "./src/lib/shortcodes/index.js";

/** @param {import("@11ty/eleventy").UserConfig} config */
export default function (config) {
    /** Liquid Template Settings */
    config.setLayoutResolution(false);
    config.setLiquidOptions({ jsTruthy: true, dynamicPartials: true });

    /** Passthrough directories */
    // use `static` directory for any public/unprocessed files
    // outputs directly to output root
    config.addPassthroughCopy({ "src/static": "/" });

    /* Plugins */
    config.addPlugin(eleventyNavigationPlugin);
    config.addPlugin(eleventyImageTransformPlugin, {
        formats: ["webp"],
        widths: ["auto"],
        htmlOptions: {
            imgAttributes: {
                alt: "",
                loading: "lazy",
                decoding: "async",
            },
        },
    });

    /* Shortcodes */
    for (const key in shortcodes) {
        if (shortcodes.hasOwnProperty(key)) {
            config.addShortcode(key, shortcodes[key]);
        }
    }

    /* Filters */
    for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
            config.addFilter(key, filters[key]);
        }
    }

    return {
        dir: {
            input: "src",
        },
        templateFormats: ["html", "liquid", "md", "11ty.js"],
        htmlTemplateEngine: "liquid",
        markdownTemplateEngine: "liquid",
    };
}
