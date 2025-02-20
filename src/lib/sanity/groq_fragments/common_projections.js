import groq from "groq";

export const SEO_PROJECTION = groq`{
    title,
    description
}`;

export const OPEN_GRAPH_PROJECTION = groq`{
    "title": ogTitle,
    "image": ogImage {
        ...,
        asset->
    }
}`;

export const LINK_PROJECTION = groq`{
    type,
    label,
    is_cta,
    type == "reference" => {
        reference-> {
            _id,
            "slug": pageSlug.current,
            title
        }
    },
    type == "internal" => {
        "href": internal
    },
    type == "external" => {
        "href": external,
        target
    }
}`;

/* Deprecated */
export const NAVIGATION_LINK_PROJECTION = groq`{
    "type": _type,
    name,
    href[0]{
        _type == 'page' => @-> {
            "type": ^._type,
            "page_title": title,
            "slug": slug.current
        },
        _type == 'slugString' => {
            "type": _type,
            slug,
        },
        _type == 'externalLink' => {
            "type": _type,
            url
        }
    }
}`;

export const PAGE_HEADER_PROJECTION = groq`{
    layout,
    eyebrow,
    tagline,
    layout == "withImage" => {
        image {
            ...,
            asset->
        },
    },
    layout == "full" => {
        image {
            ...,
            asset->
        },
        preview,
        "cta": coalesce(
            cta[] ${LINK_PROJECTION},
            []
        )
    }
}`;
