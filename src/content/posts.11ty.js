export const data = {
    pagination: {
        data: "sanity.posts",
        size: 1,
        addAllPagesToCollections: true,
        alias: "data",
    },
    tags: "posts",
    layout: "layouts/posts/show.liquid",
    permalink: ({ data }) => `${data.slug}/`,
};
