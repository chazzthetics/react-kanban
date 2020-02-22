import { reorder } from "../../../utils/reorder";
import { moveColumn, reorderColumn } from "../../boards/slices";

export const move = (
  startIndex,
  endIndex,
  boardId,
  columnIds,
  showBoardId,
  showBoard,
  dispatch
) => {
  if (boardId !== showBoardId) {
    // Move column to different board
    const startOrder = columnIds.filter((_id, i) => i !== startIndex);
    const [removed] = [...columnIds].splice(startIndex, 1);
    const endOrder = [...showBoard.columnIds];
    endOrder.splice(endIndex, 0, removed);

    const startOrderToPersist = startOrder.map((id, index) => ({
      id: parseInt(id),
      position: index
    }));

    const endOrderToPersist = endOrder.map((id, index) => ({
      id: parseInt(id),
      position: index
    }));

    dispatch(
      moveColumn({
        startBoardId: boardId,
        endBoardId: showBoardId,
        startOrder,
        endOrder,
        startOrderToPersist,
        endOrderToPersist
      })
    );
  } else {
    // Reorder column
    const columnOrder = reorder(startIndex, endIndex, columnIds);
    const orderToPersist = columnOrder.map((id, index) => ({
      id: parseInt(id),
      position: index
    }));
    dispatch(
      reorderColumn({ boardId: showBoardId, columnOrder, orderToPersist })
    );
  }
};
