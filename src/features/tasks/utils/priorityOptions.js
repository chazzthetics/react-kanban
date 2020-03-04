export const priorityOptions = ["Lowest", "Low", "Medium", "High", "Highest"];

export const getPriorityName = priority => {
  switch (priority) {
    case 1:
      return "Lowest";
    case 2:
      return "Low";
    case 3:
      return "Medium";
    case 4:
      return "High";
    case 5:
      return "Highest";
    default:
      return "";
  }
};
