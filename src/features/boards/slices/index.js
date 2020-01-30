import { combineReducers } from "@reduxjs/toolkit";
import {
  allBoardsReducer,
  boardTitleEditing,
  boardTitleEditingCancelled,
  boardTitleUpdated,
  reorderColumn,
  createBoard,
  removeBoard,
  clearBoard
} from "./all";
import { boardIdsReducer } from "./ids";
import { currentBoardReducer, boardChanged } from "./current";

/**
 * Boards Reducer
 */
export default combineReducers({
  all: allBoardsReducer,
  ids: boardIdsReducer,
  current: currentBoardReducer
});

/**
 * Board Actions
 */
export {
  boardTitleEditing,
  boardTitleEditingCancelled,
  boardTitleUpdated,
  boardChanged,
  createBoard,
  removeBoard,
  clearBoard,
  reorderColumn
};
