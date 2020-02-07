import { useDispatch } from "react-redux";
import { shouldReorder, reorder } from "../utils/reorder";
import { reorderColumn } from "../features/boards/slices";
import {
  reorderTask,
  reorderTaskBetweenColumns
} from "../features/columns/slices";

const useDrag = (currentBoardId, columns, columnIds) => {
  const dispatch = useDispatch();

  return result => {
    const { source, destination, type } = result;

    if (shouldReorder(source, destination) && currentBoardId) {
      const startColumn = columns[source.droppableId];
      const endColumn = columns[destination.droppableId];

      // Reorder column
      if (type === "column") {
        const columnOrder = reorder(source.index, destination.index, columnIds);
        const orderToPersist = columnOrder.map((id, index) => ({
          id: parseInt(id),
          position: index
        }));

        dispatch(
          reorderColumn({
            boardId: currentBoardId,
            columnOrder,
            orderToPersist
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
        const orderToPersist = taskOrder.map((id, index) => ({
          id: parseInt(id),
          position: index
        }));

        dispatch(
          reorderTask({
            columnId: startColumn.id,
            taskOrder,
            orderToPersist
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

      const startOrderToPersist = startTaskOrder.map((id, index) => ({
        id: parseInt(id),
        position: index,
        column_id: parseInt(startColumn.id)
      }));

      const endOrderToPersist = endTaskOrder.map((id, index) => ({
        id: parseInt(id),
        position: index,
        column_id: parseInt(endColumn.id)
      }));

      dispatch(
        reorderTaskBetweenColumns({
          startColumnId: startColumn.id,
          endColumnId: endColumn.id,
          startTaskOrder,
          endTaskOrder,
          startOrderToPersist,
          endOrderToPersist
        })
      );

      return;
    }
  };
};

export default useDrag;
