export default {
    permalink: ({ page }) => {
        if (page.filePathStem === "/content/index") {
            return "/";
        } else {
            // slice '/content/' from filePathStem
            return `/${page.filePathStem.slice(9)}/`;
        }
    },
    layout: "layouts/default.liquid",
};
