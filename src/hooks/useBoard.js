import { useSelector } from "react-redux";
import {
  selectCurrentBoardIsEditing,
  selectCurrentBoardId,
  selectCurrentBoardTitle,
  selectCurrentBoardColumnIds,
  selectCurrentBoardColumnIdsLength,
  selectAllBoardsWithTitle
} from "../features/boards/slices";
import {
  selectCurrentBoardColumns,
  selectCurrentBoardColumnsList
} from "../features/shared";

const useBoard = () => {
  const isEditing = useSelector(selectCurrentBoardIsEditing);
  const boardId = useSelector(selectCurrentBoardId);
  const boardTitle = useSelector(selectCurrentBoardTitle);
  const boardColumns = useSelector(selectCurrentBoardColumns);
  const boardColumnsList = useSelector(selectCurrentBoardColumnsList);
  const hasColumns = useSelector(selectCurrentBoardColumnIdsLength);
  const columnIds = useSelector(selectCurrentBoardColumnIds);
  const allBoards = useSelector(selectAllBoardsWithTitle);

  return {
    isEditing,
    boardId,
    boardTitle,
    hasColumns,
    boardColumns,
    boardColumnsList,
    columnIds,
    allBoards
  };
};

export default useBoard;
