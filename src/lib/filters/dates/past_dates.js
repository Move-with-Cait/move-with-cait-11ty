import { isBefore } from "@formkit/tempo";
/** Filter: Filter only past dates from a collection (compared to now) and order by most recent to oldest.
 * @param {Object} collection - 11ty collection.
 * @param {string} date_field - Date field to filter on/
 * @returns {Object} Filtered collection.
 */
export const past_dates = (collection, date_field = "date") => {
    const now = new Date();
    const filtered = collection
        .sort((a, b) => b[date_field] - a[date_field])
        .filter((item) => {
            return isBefore(item[date_field], now);
        });
    return filtered.length ? filtered : collection;
};
