import groq from "groq";
import { sanity_client } from "../../lib/sanity/sanity_client.js";
import {
    OPEN_GRAPH_PROJECTION,
    SEO_PROJECTION,
} from "../../lib/sanity/groq_fragments/common_projections.js";
import { RICH_TEXT_PROJECTION } from "../../lib/sanity/groq_fragments/module_projections.js";

const POSTS_QUERY = groq`*[_type == "post"] | order(displayDate desc) {
    _id,
    _type,
    title,
    "slug": pageSlug.current,
    image {
        ...,
        asset->
    },
    displayDate,
    preview,
    lede,
    richContent {
        ${RICH_TEXT_PROJECTION}
    },
    seo ${SEO_PROJECTION},
    "open_graph": openGraph ${OPEN_GRAPH_PROJECTION}
}`;

export default async function () {
    const data = await sanity_client.fetch(POSTS_QUERY);

    return data;
}
