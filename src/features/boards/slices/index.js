import { combineReducers } from "@reduxjs/toolkit";
import { boardIdsReducer } from "./ids";
import { currentBoardReducer, boardChanged, changeBoard } from "./current";
import { showReducer, boardListChanged } from "./show";
import {
  allBoardsReducer,
  boardTitleEditing,
  boardTitleEditingCancelled,
  updateBoardTitle,
  createBoard,
  removeBoard,
  clearBoard,
  boardColorChanged,
  reorderColumn,
  moveColumn
} from "./all";
import {
  selectAllBoards,
  selectAllBoardsWithTitleAndColor,
  selectBoardIds,
  selectCurrentBoardId,
  selectCurrentBoard,
  selectCurrentBoardTitle,
  selectCurrentBoardIsEditing,
  selectCurrentBoardColumnIds,
  selectCurrentBoardColumnIdsLength,
  selectCurrentBoardColor,
  selectShowBoardColumnPositions,
  selectShowId,
  selectShowBoard
} from "./selectors";

/**
 * Board Selectors
 */
export {
  selectAllBoards,
  selectAllBoardsWithTitleAndColor,
  selectBoardIds,
  selectCurrentBoardId,
  selectCurrentBoard,
  selectCurrentBoardTitle,
  selectCurrentBoardIsEditing,
  selectCurrentBoardColumnIds,
  selectCurrentBoardColumnIdsLength,
  selectCurrentBoardColor,
  selectShowBoardColumnPositions,
  selectShowId,
  selectShowBoard
};

/**
 * Board Actions/Thunks
 */
export {
  boardTitleEditing,
  boardTitleEditingCancelled,
  updateBoardTitle,
  boardListChanged,
  boardChanged,
  boardColorChanged,
  changeBoard,
  createBoard,
  removeBoard,
  clearBoard,
  reorderColumn,
  moveColumn
};

/**
 * Boards Reducer
 */
export default combineReducers({
  all: allBoardsReducer,
  ids: boardIdsReducer,
  current: currentBoardReducer,
  show: showReducer
});
