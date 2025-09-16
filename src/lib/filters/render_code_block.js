import htm from "htm";
import vhtml from "vhtml";

const html = htm.bind(vhtml);

/** Filter: Render a standalone code block from Sanity
 * @param {Object} code - Sanity code block
 */
export const render_code_block = (block) => {
    if (block.language == "html") {
        return html`${block.code}`;
    }
    return "";
};
