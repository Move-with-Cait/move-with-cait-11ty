/** Liquid shortcode: Generate a link from a Sanity link object.
 * @param {Object} link_object - Sanity link object type.
 * @param {string} classes - Optional comma-separated string of class names.
 * @param {string} attrs - Other attributes for the tag parsed as-is
 * @returns {string} HTML anchor tag.
 */
export const sanity_link = (link_object, classes = "", attrs = "") => {
    let url = "";
    let label = "";
    let target = "";

    /* TODO: URLs should always be valid from Sanity (i.e. starting with /), but
        also should add check here */
    /* TODO: ⚠️ Sanitize links */
    switch (link_object.type) {
        case "external":
            url = link_object.href;
            label = link_object.label;
            if (link_object.target) {
                target = "_blank";
            }
            break;
        case "reference":
            url = link_object.reference.slug;
            label = link_object.label ?? link_object.reference.title;
            break;
        default:
            url = link_object.href;
            label = link_object.label;
            break;
    }

    return `<a href="${url}" ${target ? `target="${target}"` : ""} ${
        classes ? `class="${classes.split(",").join(" ")}"` : ""
    } ${attrs ?? ""}>${label}</a>`;
};
