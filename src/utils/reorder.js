export const shouldReorder = (source, destination) => {
  if (!destination) return;

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  return true;
};

export const reorder = (source, destination, startList, endList = null) => {
  if (!endList) {
    const newOrder = [...startList];
    const [removed] = newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, removed);

    return newOrder;
  }

  const startOrder = [...startList];
  const [removed] = startOrder.splice(source.index, 1);
  const endOrder = [...endList];
  endOrder.splice(destination.index, 0, removed);

  return [startOrder, endOrder];
};
