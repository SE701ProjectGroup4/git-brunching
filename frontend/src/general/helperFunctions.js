
const changePath = (path, history) => {
  history.push(path);
};

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

export {
  getDayForDate,
};

export default changePath;
