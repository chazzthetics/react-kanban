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
  starBoard,
  reorderColumn,
  moveColumn
} from "./all";
import {
  selectAllBoards,
  selectAllBoardsDetails,
  selectStarredBoards,
  selectBoardIds,
  selectCurrentBoardId,
  selectCurrentBoard,
  selectCurrentBoardTitle,
  selectCurrentBoardIsEditing,
  selectBoardIsStarred,
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
  selectAllBoardsDetails,
  selectStarredBoards,
  selectBoardIds,
  selectCurrentBoardId,
  selectCurrentBoard,
  selectCurrentBoardTitle,
  selectCurrentBoardIsEditing,
  selectBoardIsStarred,
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
  changeBoard,
  createBoard,
  removeBoard,
  clearBoard,
  starBoard,
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
