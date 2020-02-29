export const getPriorityColor = priority => {
  switch (priority) {
    case "lowest":
      return "green.300";
    case "low":
      return "green.400";
    case "medium":
      return "yellow.400";
    case "high":
      return "orange.400";
    case "highest":
      return "red.400";
    default:
      return "green.300";
  }
};
