export const getSortedListOrder = (list, sortFn) => {
  return list.sort(sortFn).map(item => item.id);
};

export const sortByNewest = (first, second) => {
  return (
    new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime()
  );
};

export const sortByOldest = (first, second) => {
  return (
    new Date(first.createdAt).getTime() - new Date(second.createdAt).getTime()
  );
};

export const sortByPriority = (first, second) => {
  if (first.priority === second.priority) return 0;
  else if (first.priority === null) return 1;
  else if (second.priority === null) return -1;
  else return second.priority - first.priority;
};

export const sortByDueDate = (first, second) => {
  if (first.dueDate === second.dueDate) return 0;
  else if (first.dueDate === "") return 1;
  else if (second.dueDate === "") return -1;
  else {
    return (
      new Date(first.dueDate).getTime() - new Date(second.dueDate).getTime()
    );
  }
};

export const sortByName = (first, second) => {
  const firstContent = first.content.toLowerCase();
  const secondContent = second.content.toLowerCase();
  if (firstContent < secondContent) return -1;
  else if (firstContent > secondContent) return 1;
  else return 0;
};
