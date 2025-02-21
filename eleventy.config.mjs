/** @link https://www.11ty.dev/docs/config/ */

import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import sitemap_plugin from "@quasibit/eleventy-plugin-sitemap";
import { filters } from "./src/lib/filters/index.js";
import { shortcodes } from "./src/lib/shortcodes/index.js";
import { IdAttributePlugin } from "@11ty/eleventy";
// import { utils } from "./src/lib/utils/index.js";

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
    config.addPlugin(IdAttributePlugin, {
        checkDuplicates: false,
    });
    config.addPlugin(sitemap_plugin, {
        sitemap: {
            hostname: "https://movewithcait.com",
        },
    });
    // config.addPlugin(eleventyImageTransformPlugin, {
    //     formats: ["webp"],
    //     widths: ["auto"],
    //     htmlOptions: {
    //         imgAttributes: {
    //             alt: "",
    //             loading: "lazy",
    //             decoding: "async",
    //         },
    //     },
    // });

    /* Custom Collections */
    config.addCollection("offerings", function (collectionsApi) {
        const all_pages = collectionsApi.getFilteredByTag("pages");
        return all_pages
            .filter(({ data }) => data.data.layout == "offering")
            .sort((a, b) => {
                const aTitle = a.data.data.title;
                const bTitle = b.data.data.title;
                if (aTitle < bTitle) {
                    return -1;
                }
                if (aTitle > bTitle) {
                    return 1;
                }
                return 0;
            });
    });

    config.addCollection("upcoming_events", function (collectionsApi) {
        const all_events = collectionsApi.getFilteredByTag("events");
        return filters.upcoming_dates(
            all_events,
            "data.data.details.startDate"
        );
    });

    config.addCollection("past_events", function (collectionsApi) {
        const all_events = collectionsApi.getFilteredByTag("events");
        const past_dates = filters.past_dates(
            all_events,
            "data.data.details.startDate"
        );
        return past_dates.filter((event) => !event.data.data.enrolling);
    });

    config.addCollection("other_enrolling_events", function (collectionsApi) {
        const all_events = collectionsApi.getFilteredByTag("events");
        const past_dates = filters.past_dates(
            all_events,
            "data.data.details.startDate"
        );
        return past_dates.filter((event) => event.data.data.enrolling);
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
