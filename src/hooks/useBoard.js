import { useSelector } from "react-redux";
import {
  selectBoardIds,
  selectCurrentBoardIsEditing,
  selectCurrentBoardId,
  selectCurrentBoardTitle,
  selectCurrentBoardColumnIds,
  selectCurrentBoardColumnIdsLength,
  selectShowBoardColumnPositions,
  selectAllBoardsWithTitle,
  selectShowId,
  selectShowBoard
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
  const columnPositions = useSelector(selectShowBoardColumnPositions);
  const allBoards = useSelector(selectAllBoardsWithTitle);
  const showBoardId = useSelector(selectShowId);
  const showBoard = useSelector(selectShowBoard);

  return {
    boardIds,
    isEditing,
    boardId,
    boardTitle,
    hasColumns,
    boardColumns,
    boardColumnsList,
    columnIds,
    columnPositions,
    allBoards,
    showBoardId,
    showBoard
  };
};

export default useBoard;
