import { isAfter } from "@formkit/tempo";
/** Filter: Filter only upcoming dates from a collection (compared to now) and order by closest to now to future.
 * @param {Object} collection - 11ty collection.
 * @param {string} date_field - Date field to filter on/
 * @returns {Object} Filtered collection.
 */
export const upcoming_dates = (collection, date_field = "date") => {
    const now = new Date();
    const filtered = collection
        .sort((a, b) => a[date_field] - b[date_field])
        .filter((item) => {
            return isAfter(item[date_field], now);
        });
    return filtered.length ? filtered : collection;
};
