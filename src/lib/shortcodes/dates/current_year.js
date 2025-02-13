import { format } from "@formkit/tempo";

/** Liquid shortcode: Get the current year with the Tempo library.
 * @returns {string} Today's date as YYYY format.
 */
export const current_year = () => {
    const today = new Date();
    return format({
        date: today,
        format: "YYYY",
        tz: "UTC",
    });
};
