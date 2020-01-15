import { useDispatch } from "react-redux";
import { shouldReorder, reorder } from "../utils/reorder";
import { columnReordered } from "../features/boards/slices";
import {
  taskReordered,
  taskReorderedBetweenColumns
} from "../features/columns/slices";

const useDrag = (currentBoard, columns, columnIds) => {
  const dispatch = useDispatch();

  const onDragEnd = result => {
    const { source, destination, type } = result;

    const startColumn = columns[source.droppableId];
    const endColumn = columns[destination.droppableId];
    console.log(endColumn);

    const getReorderType = () => {
      if (type === "column") return "COLUMNS";
      if (startColumn === endColumn) return "TASKS";
      return "BETWEEN";
    };

    if (shouldReorder(source, destination)) {
      switch (getReorderType()) {
        case "COLUMNS":
          const columnOrder = reorder(source, destination, columnIds);

          dispatch(
            columnReordered({
              boardId: currentBoard.id,
              columnOrder
            })
          );
          return;
        case "TASKS":
          const taskOrder = reorder(source, destination, startColumn.taskIds);

          dispatch(
            taskReordered({
              columnId: startColumn.id,
              taskOrder
            })
          );
          return;
        case "BETWEEN":
          const [startTaskOrder, endTaskOrder] = reorder(
            source,
            destination,
            startColumn.taskIds,
            endColumn.taskIds
          );

          dispatch(
            taskReorderedBetweenColumns({
              startColumnId: startColumn.id,
              endColumnId: endColumn.id,
              startTaskOrder,
              endTaskOrder
            })
          );

          return;
        default:
          return;
      }
    }
  };

  return onDragEnd;
};

export default useDrag;
