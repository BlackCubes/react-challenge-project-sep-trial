/**
 * Gets the input date and creates a local time string in military format, or
 * provide no input date which still creates the current local time string in
 * military format.
 * @param {String | null} inputDate
 * @returns {String} A local time string in military format.
 */
export const localTimeStringMilitary = (inputDate) => {
  const localDate = !inputDate ? new Date() : new Date(inputDate);

  const localMilitaryTime = localDate.toLocaleTimeString(undefined, {
    hour12: false,
  });

  return localMilitaryTime;
};
