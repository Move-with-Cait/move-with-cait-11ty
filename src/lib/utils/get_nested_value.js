/** Dynamically return an object's nested value given a dot-separated string.
 * @param {Object} object - Arbitrary object reference.
 * @param {string} path - Dot-separated path of value.
 * @returns {string} Value of the dynamically referenced path.
 */
export const get_nested_value = (object, path) =>
    path.split(".").reduce((acc, key) => acc && acc[key], object);
