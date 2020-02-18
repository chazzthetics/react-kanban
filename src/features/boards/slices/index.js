import { combineReducers } from "@reduxjs/toolkit";
import { boardIdsReducer } from "./ids";
import { currentBoardReducer, boardChanged } from "./current";
import { showReducer, boardListChanged } from "./show";
import {
  allBoardsReducer,
  boardTitleEditing,
  boardTitleEditingCancelled,
  updateBoardTitle,
  createBoard,
  removeBoard,
  clearBoard,
  reorderColumn,
  moveColumn
} from "./all";
import {
  selectAllBoards,
  selectAllBoardsWithTitle,
  selectBoardIds,
  selectCurrentBoardId,
  selectCurrentBoard,
  selectCurrentBoardTitle,
  selectCurrentBoardIsEditing,
  selectCurrentBoardColumnIds,
  selectCurrentBoardColumnIdsLength,
  selectShowBoardColumnPositions,
  selectShowId,
  selectShowBoard
} from "./selectors";

/**
 * Board Selectors
 */
export {
  selectAllBoards,
  selectAllBoardsWithTitle,
  selectBoardIds,
  selectCurrentBoardId,
  selectCurrentBoard,
  selectCurrentBoardTitle,
  selectCurrentBoardIsEditing,
  selectCurrentBoardColumnIds,
  selectCurrentBoardColumnIdsLength,
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
