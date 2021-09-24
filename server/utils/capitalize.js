/**
 * Transforms the string with the first letter capitalize.
 * @param {String} s
 * @returns {String} A string.
 */
module.exports = (s = "") => {
  if (typeof s !== "string") {
    return "";
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
};
