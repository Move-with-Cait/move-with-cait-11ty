import { isAfter } from "@formkit/tempo";

export const data = {
    pagination: {
        data: "sanity.events",
        size: 1,
        addAllPagesToCollections: true,
        alias: "data",
    },
    tags: "events",
    layout: "layouts/events/show.liquid",
    permalink: ({ data }) => `${data.slug}/`,
};
