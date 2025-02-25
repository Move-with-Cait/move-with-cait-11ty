import groq from "groq";
import { sanity_client } from "../../lib/sanity/sanity_client.js";
import Image from "@11ty/eleventy-img";
import ImageUrlBuilder from "@sanity/image-url";

const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0] {
    title,
    description,
    domain,
    "default_og_image": defaultOgImage {
        ...,
        asset->
    },
    "profile_image": profileImage {
        ...,
        asset->
    },
    "profile_name": profileName,
    socialLinks[] {
        url,
        text,
        icon
    }
}`;

export default async function () {
    const data = await sanity_client.fetch(SITE_SETTINGS_QUERY);

    const image_builder = ImageUrlBuilder(sanity_client);

    const image_link = image_builder
        .image(data.default_og_image)
        .width(1200)
        .height(630)
        .url();

    const avatar_link = image_builder
        .image(data.profile_image)
        .width(300)
        .height(300)
        .url();

    const image_metadata = await Image(image_link, {
        widths: [1200],
        formats: ["jpeg"],
        outputDir: "./_site/open_graph/",
        urlPath: "/open_graph/",
    });

    const image_data = image_metadata.jpeg[0];

    const avatar_metadata = await Image(avatar_link, {
        widths: [300],
        formats: ["webp"],
        outputDir: "./_site/img/",
        urlPath: "/img/",
    });

    const avatar_data = avatar_metadata.webp[0];

    return {
        default_og_image: data.domain + image_data.url,
        avatar: avatar_data.url,
        profile_name: data.profile_name,
        title: data.title,
        description: data.description,
        domain: data.domain,
    };
}
