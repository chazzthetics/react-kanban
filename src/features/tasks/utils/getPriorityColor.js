export const getPriorityColor = priority => {
  switch (priority) {
    case 1:
      return "green.300";
    case 2:
      return "green.400";
    case 3:
      return "yellow.400";
    case 4:
      return "orange.400";
    case 5:
      return "red.400";
    default:
      return "green.300";
  }
};
