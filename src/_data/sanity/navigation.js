import groq from "groq";
import { sanity_client } from "../../lib/sanity/sanity_client.js";
import { LINK_PROJECTION } from "../../lib/sanity/groq_fragments/common_projections.js";

const NAVIGATION_QUERY = groq`*[_type == "navigation"] {
    _id,
    _type,
    title,
    "items": items[] {
        _type,
        _type == "link" => ${LINK_PROJECTION},
        _type == "linkList" => {
            label,
            "links": links[] ${LINK_PROJECTION}
        }
    }
}`;

export default async function () {
    const data = await sanity_client.fetch(NAVIGATION_QUERY);
    // console.log(data);
    return data;
}
