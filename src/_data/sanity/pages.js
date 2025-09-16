import groq from "groq";
import { sanity_client } from "../../lib/sanity/sanity_client.js";
import {
    OPEN_GRAPH_PROJECTION,
    SEO_PROJECTION,
    PAGE_HEADER_PROJECTION,
} from "../../lib/sanity/groq_fragments/common_projections.js";
import {
    RICH_TEXT_PROJECTION,
    GRID_PROJECTION,
    PRESENTATION_SECTION,
    CALLOUT_PROJECTION,
    COLLECTION_LIST_PROJECTION,
    CTA_PROJECTION,
    CTA_TWO_COLUMNS_PROJECTION,
    TWO_COLUMNS_PROJECTION,
} from "../../lib/sanity/groq_fragments/module_projections.js";

const PAGES_QUERY = groq`*[_type == "page"] {
    _id,
    title,
    "slug": pageSlug.current,
    layout,
    "parent": parent[0]->{
        title,
        "slug": pageSlug.current
    },
    pageHeader ${PAGE_HEADER_PROJECTION},
    "modules": coalesce(
        modules[] {
            _type,
            ${RICH_TEXT_PROJECTION},
            ${GRID_PROJECTION},
            ${PRESENTATION_SECTION},
            ${CALLOUT_PROJECTION},
            ${COLLECTION_LIST_PROJECTION},
            ${CTA_PROJECTION},
            ${CTA_TWO_COLUMNS_PROJECTION},
            ${TWO_COLUMNS_PROJECTION}
        },
        []
    ),
    seo ${SEO_PROJECTION},
    "open_graph": openGraph ${OPEN_GRAPH_PROJECTION}
}`;

export default async function () {
    const data = await sanity_client.fetch(PAGES_QUERY);
    // console.log(data);
    return data;
}
