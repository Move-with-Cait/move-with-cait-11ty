import { get_nested_value } from "../../utils/get_nested_value.js";
import { date, isBefore } from "@formkit/tempo";
/** Filter: Filter only past dates from a collection (compared to now) and order by most recent to oldest.
 * @param {Object} collection - 11ty collection.
 * @param {string} date_field - Date field to filter on/
 * @returns {Object} Filtered collection.
 */
export const past_dates = (collection, date_field = "data.data.date") => {
    const now = new Date();
    const filtered = collection
        .sort((a, b) => {
            const date_b = new Date(get_nested_value(b, date_field));
            const date_a = new Date(get_nested_value(a, date_field));
            return date_b - date_a;
        })
        .filter((item) => {
            const field = get_nested_value(item, date_field);
            return isBefore(field, now);
        });
    return filtered.length ? filtered : [];
};
