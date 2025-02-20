import { get_nested_value } from "../../utils/get_nested_value.js";
import { isAfter } from "@formkit/tempo";
/** Filter: Filter only upcoming dates from a collection (compared to now) and order by closest to now to future.
 * @param {Object} collection - 11ty collection.
 * @param {string} date_field - Date field to filter on/
 * @returns {Object} Filtered collection.
 */
export const upcoming_dates = (collection, date_field = "data.data.date") => {
    const now = new Date();
    const filtered = collection
        .sort((a, b) => {
            const date_a = new Date(get_nested_value(a, date_field));
            const date_b = new Date(get_nested_value(b, date_field));
            return date_a - date_b;
        })
        .filter((item) => {
            const field = get_nested_value(item, date_field);
            return isAfter(field, now);
        });
    return filtered.length ? filtered : [];
};
