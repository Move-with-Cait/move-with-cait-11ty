import { format } from "@formkit/tempo";

/** Filter: Format a date string with the Tempo library.
 * @param {string} date - Date string (ISO format).
 * @returns {string} Formatted date string.
 */
/* TODO: Add additional arguments for format options */
export const format_date = (date) => {
    return format({
        date: date,
        format: "medium",
        tz: "UTC",
    });
};
