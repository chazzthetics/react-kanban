import { useDispatch } from "react-redux";
import { shouldReorder, reorder } from "../utils/reorder";
import { columnReordered } from "../features/boards/slices";
import {
  taskReordered,
  taskReorderedBetweenColumns
} from "../features/columns/slices";

const useDrag = (currentBoard, columns, columnIds) => {
  const dispatch = useDispatch();

  return result => {
    const { source, destination, type } = result;

    if (shouldReorder(source, destination)) {
      const startColumn = columns[source.droppableId];
      const endColumn = columns[destination.droppableId];

      // Reorder column
      if (type === "column") {
        const columnOrder = reorder(source.index, destination.index, columnIds);

        dispatch(
          columnReordered({
            boardId: currentBoard,
            columnOrder
          })
        );
        return;
      }

      // Reorder task inside column
      if (startColumn.id === endColumn.id) {
        const taskOrder = reorder(
          source.index,
          destination.index,
          startColumn.taskIds
        );

        dispatch(
          taskReordered({
            columnId: startColumn.id,
            taskOrder
          })
        );
        return;
      }

      // Reorder task between columns
      const [startTaskOrder, endTaskOrder] = reorder(
        source.index,
        destination.index,
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
    }
  };
};

export default useDrag;