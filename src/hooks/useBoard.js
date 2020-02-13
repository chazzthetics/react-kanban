import { useSelector } from "react-redux";
import {
  selectBoardIds,
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
  const boardIds = useSelector(selectBoardIds);
  const isEditing = useSelector(selectCurrentBoardIsEditing);
  const boardId = useSelector(selectCurrentBoardId);
  const boardTitle = useSelector(selectCurrentBoardTitle);
  const boardColumns = useSelector(selectCurrentBoardColumns);
  const boardColumnsList = useSelector(selectCurrentBoardColumnsList);
  const hasColumns = useSelector(selectCurrentBoardColumnIdsLength);
  const columnIds = useSelector(selectCurrentBoardColumnIds);
  const allBoards = useSelector(selectAllBoardsWithTitle);

  return {
    boardIds,
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
