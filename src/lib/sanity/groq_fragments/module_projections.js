import groq from "groq";
import {
    LINK_PROJECTION,
    NAVIGATION_LINK_PROJECTION,
} from "./common_projections.js";

export const RICH_TEXT_PROJECTION = groq`_type == "richContent" => {
    blocks[] {
        ...,
        _type == "image" => {
            ...,
            asset->
        },
        _type == "logoCloud" => {
            _type,
            items[] {
                title,
                "logo": logo.asset->
            }
        },
        _type == "toc" => {
            addToc,
            "toc": ^.blocks[] {
                style == "h2" || style == "h3" => {
                    style,
                    "heading": children[0].text
                }
            }
        },
        markDefs[] {
            ...,
            _type == "richTextLink" => ${LINK_PROJECTION}
        }
    }
}`;

export const GRID_PROJECTION = groq`_type == "grid" => {
    heading,
    "items": gridItems[] {
        heading,
        text,
        image {
            ...,
            asset->
        },
        icon
    }
}`;

export const PRESENTATION_SECTION = groq`_type == "presentationSection" => {
    heading,
    items[] {
        heading,
        preview,
        image {
            ...,
            asset->
        },
        "cta": coalesce(
            cta[] ${LINK_PROJECTION},
            []
        ),
        "options": {
            imagePosition
        }
    }
}`;

export const CALLOUT_PROJECTION = groq`_type == "callout" => {
    eyebrow,
    tagline,
    image {
        ...,
        asset->
    },
    preview,
    "cta": coalesce(
        cta[] ${LINK_PROJECTION},
        []
    )
}`;

export const COLLECTION_LIST_PROJECTION = groq`_type == "collectionList" => {
    heading,
    "type": coalesce(
        items[],
        []
    )
}`;

export const CTA_PROJECTION = groq`_type == "cta" => {
    heading,
    text,
    image {
        ...,
        asset->
    },
    "link": coalesce(
        links[] ${LINK_PROJECTION},
        []
    )
}`;
