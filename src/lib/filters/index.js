import { format_date } from "./dates/format_date.js";
import { format_date_range } from "./dates/format_date_range.js";
import { past_dates } from "./dates/past_dates.js";
import { upcoming_dates } from "./dates/upcoming_dates.js";
import { sanity_url_for_image } from "./sanity_url_for_image.js";
import { rich_text_to_html } from "./rich_text_to_html.js";

export const filters = {
    format_date,
    format_date_range,
    past_dates,
    upcoming_dates,
    sanity_url_for_image,
    rich_text_to_html,
};
