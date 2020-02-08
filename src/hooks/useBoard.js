import { useSelector } from "react-redux";
import {
  selectCurrentBoardIsEditing,
  selectCurrentBoardId,
  selectCurrentBoardTitle,
  selectCurrentBoardColumnIds,
  selectCurrentBoardColumnIdsLength,
  selectAllBoardsWithTitle
} from "../features/boards/slices";
import { selectCurrentBoardColumns } from "../features/shared";

const useBoard = () => {
  const isEditing = useSelector(selectCurrentBoardIsEditing);
  const boardId = useSelector(selectCurrentBoardId);
  const boardTitle = useSelector(selectCurrentBoardTitle);
  const boardColumns = useSelector(selectCurrentBoardColumns);
  const hasColumns = useSelector(selectCurrentBoardColumnIdsLength);
  const columnIds = useSelector(selectCurrentBoardColumnIds);
  const allBoards = useSelector(selectAllBoardsWithTitle);

  return {
    isEditing,
    boardId,
    boardTitle,
    hasColumns,
    boardColumns,
    columnIds,
    allBoards
  };
};

export default useBoard;