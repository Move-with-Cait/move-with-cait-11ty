import groq from "groq";
import { sanity_client } from "../../lib/sanity/sanity_client.js";
import {
    OPEN_GRAPH_PROJECTION,
    SEO_PROJECTION,
    LINK_PROJECTION,
} from "../../lib/sanity/groq_fragments/common_projections.js";
import {
    RICH_TEXT_PROJECTION,
    CTA_PROJECTION,
} from "../../lib/sanity/groq_fragments/module_projections.js";

const EVENTS_QUERY = groq`*[_type == "class" && archive != true] | order(details.startDate asc) {
    _id,
    title,
    "slug": pageSlug.current,
    preview,
    enrolling,
    richContent {
        ${RICH_TEXT_PROJECTION}
    },
    image {
        ...,
        asset->
    },
    details {
        startDate,
        endDate,
        meetingTime,
        meetingPlace,
        price,
        priceDescription
    },
    "link": coalesce(
        links[] ${LINK_PROJECTION},
        []
    ),
    seo ${SEO_PROJECTION},
    "open_graph": openGraph ${OPEN_GRAPH_PROJECTION}
}`;

export default async function () {
    const data = await sanity_client.fetch(EVENTS_QUERY);

    return data;
}
