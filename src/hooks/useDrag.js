import { useDispatch, useSelector } from "react-redux";
import { shouldReorder, reorder } from "../utils/reorder";
import { mapOrderForPersistence } from "../utils/mapOrderForPersistence";
import {
  selectCurrentBoardId,
  selectCurrentBoardColumnIds,
  reorderColumn
} from "../features/boards/slices";
import { selectCurrentBoardColumns } from "../features/shared";
import {
  reorderTask,
  reorderTaskBetweenColumns
} from "../features/columns/slices";

const useDrag = () => {
  const dispatch = useDispatch();
  const currentBoardId = useSelector(selectCurrentBoardId);

  const columns = useSelector(selectCurrentBoardColumns);
  const columnIds = useSelector(selectCurrentBoardColumnIds);

  return result => {
    const { source, destination, type } = result;

    if (shouldReorder(source, destination) && currentBoardId) {
      const startColumn = columns[source.droppableId];
      const endColumn = columns[destination.droppableId];

      // Reorder column
      if (type === "column") {
        const columnOrder = reorder(source.index, destination.index, columnIds);
        const orderToPersist = mapOrderForPersistence(columnOrder);

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

        const orderToPersist = mapOrderForPersistence(taskOrder);

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

      const startOrderToPersist = mapOrderForPersistence(startTaskOrder, {
        column_id: parseInt(startColumn.id)
      });

      const endOrderToPersist = mapOrderForPersistence(endTaskOrder, {
        column_id: parseInt(endColumn.id)
      });

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
