/** Assign liquid layout based on data template property */
function assignLayout(data) {
    let layout = "";
    switch (data.layout) {
        case "home":
            layout = "home";
            break;
        case "landing":
            layout = "landing";
            break;
        case "index":
            layout = "index";
            break;
        case "offering":
            layout = "offering";
            break;
        case "parent":
            layout = "parent";
            break;
        default:
            layout = "default";
            break;
    }
    return `layouts/${layout}.liquid`;
}

export const data = {
    pagination: {
        data: "sanity.pages",
        size: 1,
        addAllPagesToCollections: true,
        alias: "data",
    },
    tags: "pages",
    permalink: ({ data }) => {
        if (data._id === "970760c8-aeaf-489a-b5fa-496210382a9a") {
            return "/";
        } else {
            return `${data.slug}/`;
        }
    },
    eleventyComputed: {
        layout: ({ data }) => assignLayout(data),
    },
};
