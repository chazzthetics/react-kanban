import { combineReducers } from "@reduxjs/toolkit";
import { boardIdsReducer } from "./ids";
import { currentBoardReducer, boardChanged } from "./current";
import {
  allBoardsReducer,
  boardTitleEditing,
  boardTitleEditingCancelled,
  updateBoardTitle,
  reorderColumn,
  createBoard,
  removeBoard,
  clearBoard
} from "./all";
import {
  selectAllBoards,
  selectAllBoardsWithTitle,
  selectCurrentBoardId,
  selectCurrentBoard,
  selectCurrentBoardTitle,
  selectCurrentBoardIsEditing,
  selectCurrentBoardColumnIds,
  selectCurrentBoardColumnIdsLength
} from "./selectors";

/**
 * Board Selectors
 */
export {
  selectAllBoards,
  selectAllBoardsWithTitle,
  selectCurrentBoardId,
  selectCurrentBoard,
  selectCurrentBoardTitle,
  selectCurrentBoardIsEditing,
  selectCurrentBoardColumnIds,
  selectCurrentBoardColumnIdsLength
};

/**
 * Board Actions/Thunks
 */
export {
  boardTitleEditing,
  boardTitleEditingCancelled,
  updateBoardTitle,
  boardChanged,
  createBoard,
  removeBoard,
  clearBoard,
  reorderColumn
};

/**
 * Boards Reducer
 */
export default combineReducers({
  all: allBoardsReducer,
  ids: boardIdsReducer,
  current: currentBoardReducer
});
