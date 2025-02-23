import htm from "htm";
import vhtml from "vhtml";
import voca from "voca";
import {
    toHTML,
    uriLooksSafe,
    escapeHTML,
    defaultComponents,
} from "@portabletext/to-html";
import { sanity_url_for_image } from "./sanity_url_for_image.js";

const html = htm.bind(vhtml);

/** Filter: Convert full rich text module to HTML with @portabletext/to-html package.
 * @param {Object} rich_text - Sanity portable text blocks
 */
export const rich_text_to_html = (rich_text) => {
    const components = {
        types: {
            pricingBlocks: ({ value }) => {
                return html`<div class="pricing-blocks">
                    ${value.items.map(
                        (item) => html`<div class="pricing-block">
                            <h3 class="small-title">${item.title}</h3>
                            <div>
                                <p class="price">${item.price}</p>
                                ${item.priceNote &&
                                html`<p><em>${item.priceNote}</em></p>`}
                            </div>
                        </div>`
                    )}
                </div>`;
            },
            highlightBlocks: ({ value }) => {
                return html`<div class="highlight-blocks">
                    ${value.highlights.map(
                        (highlight) => html`<div
                            class="highlight | flow"
                            data-tempo="allegro"
                        >
                            <img
                                class="rays"
                                src="/svg/rays.svg"
                                width="134"
                                height="50"
                                alt=""
                            />
                            <h3>${highlight.heading}</h3>
                            <p>${highlight.text}</p>
                        </div>`
                    )}
                </div>`;
            },
            logoCloud: ({ value }) => {
                return html`<div class="logo-cloud | fluid-grid">
                    ${value.items.map(
                        (item) => html`<div class="logo-block">
                            <img
                                src="${sanity_url_for_image(item.logo)
                                    .width(600)
                                    .auto("format")
                                    .url()}"
                                width="600"
                                height="${Math.floor(
                                    600 /
                                        item.logo.metadata.dimensions
                                            .aspectRatio
                                )}"
                                alt="${item.title} logo"
                            />
                        </div>`
                    )}
                </div>`;
            },
            toc: ({ value }) => {
                // console.log("toc", value);
                if (value.addToc) {
                    const toc = [];
                    for (let i = 0; i < value.toc.length; i++) {
                        const obj = value.toc[i];
                        if (obj.hasOwnProperty("style")) {
                            const toc_entry = {
                                level: obj.style,
                                text: obj.heading,
                                href: `#${voca.slugify(obj.heading)}`,
                            };

                            if (obj.style == "h2") {
                                toc_entry.children = [];
                                toc.push(toc_entry);
                            } else {
                                const last_h2 = toc.findLast(
                                    (item) => item.level == "h2"
                                );
                                last_h2.children.push(toc_entry);
                            }
                        }
                    }

                    if (toc.length > 0) {
                        return html`<details class="toc" open>
                            <summary class="small-title">
                                <span>On this page:</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="14"
                                    width="14"
                                    aria-hidden="true"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        d="M239 401c9.4 9.4 24.6 9.4 33.9 0L465 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-175 175L81 175c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L239 401z"
                                    />
                                </svg>
                            </summary>
                            <ul class="space-s-top" data-level="0">
                                ${toc.map(
                                    (entry) => html`<li>
                                        <a href="${entry.href}"
                                            >${entry.text}</a
                                        >
                                        ${entry.children.length > 0 &&
                                        html`<ul
                                            class="space-2xs-top"
                                            data-level="1"
                                        >
                                            ${entry.children.map(
                                                (child_entry) => html`<li>
                                                    <a
                                                        href="${child_entry.href}"
                                                        >${child_entry.text}</a
                                                    >
                                                </li>`
                                            )}
                                        </ul>`}
                                    </li>`
                                )}
                            </ul>
                        </details>`;
                    }
                }
            },
            image: ({ value }) => {
                const width = value.width || 900;
                const height = Math.floor(
                    width / value.asset.metadata.dimensions.aspectRatio
                );
                return html`<img
                    src="${sanity_url_for_image(value)
                        .width(width)
                        .height(height)
                        .auto("format")
                        .url()}"
                    alt="${value.alt}"
                    width="${width}"
                    height="${height}"
                    loading="lazy"
                    decoding="async"
                    class="with-lqip"
                    style="background-image: url(${value.asset.metadata.lqip})"
                />`;
            },
        },
        marks: {
            richTextLink: ({ children, value }) => {
                // console.log(children, value);
                // ⚠️ Sanitize links
                // console.log(children, value);
                let url = "";
                let target = "_self";

                // replicates logic of `sanityLink` shortcode
                switch (value.type) {
                    case "external":
                        url = value.href;
                        if (value.target) {
                            target = "_blank";
                        }
                        break;
                    case "reference":
                        url = value.reference.slug;
                        break;
                    default:
                        url = value.href;
                        break;
                }

                if (uriLooksSafe(url)) {
                    // console.log(children);
                    /* WARN: using html tag here escapes other embedded tags on the link like <em>, remove for now */
                    return `<a href="${url}" target="${target}">${`${children}`}</a>`;
                }

                // If the URI appears unsafe, render the children (eg, text) without the link
                return children;
            },
            link: ({ children, value }) => {
                return children;
            },
            link_reference: ({ children, value }) => {
                return children;
            },
            link_external: ({ children, value }) => {
                return children;
            },
        },
    };

    return toHTML(rich_text, { components });
};
