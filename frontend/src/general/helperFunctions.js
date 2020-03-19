/**
 * Allows the path of the history to be changed
 * This works for all types of histories
 * @param path
 * @param history
 */
const changePath = (path, history) => {
  history.push(path);
};

/**
 * ISO date to string.
 * The string matches the day in the openhours endpoint
 * @param date
 * @returns {string}
 */
const getDayForDate = (date) => {
  switch (date.getDay()) {
    case 0:
      return "sun";
    case 1:
      return "mon";
    case 2:
      return "tue";
    case 3:
      return "wed";
    case 4:
      return "thu";
    case 5:
      return "fri";
    case 6:
      return "sat";
    default:
      return "error";
  }
};

/**
 * Generate all the times when a restaurant is opened
 * @param start
 * @param end
 * @returns {[]}
 */
const generateAllTimes = (start, end) => {
  const times = [];
  for (let i = start; i < end; i += 1) {
    times.push({
      time: i > 9 ? `${i}:00:00` : `0${i}:00:00`,
    });
  }
  return times;
};

export {
  getDayForDate,
  generateAllTimes,
};

export default changePath;
