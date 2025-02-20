import { format, sameYear } from "@formkit/tempo";

/** Filter: Format a date range string with the Tempo library.
 * @param {Object} details - Events details object from Sanity.
 * @returns {string} Formatted date range string.
 */
/* TODO: Add additional arguments for format options */
export const format_date_range = (details) => {
    if (details.startDate && details.endDate) {
        if (sameYear(new Date(details.startDate), new Date(details.endDate))) {
            return `${format(details.startDate, "MMM D ")}–${format(
                details.endDate,
                " MMM D, YYYY"
            )}`;
        } else {
            return `${format(details.startDate, "MMM D, YYYY ")}–${format(
                details.endDate,
                " MMM D, YYYY"
            )}`;
        }
    } else {
        return format(details.startDate, "MMM D, YYYY");
    }
};
