import { combineReducers } from "@reduxjs/toolkit";
import {
  allBoardsReducer,
  boardCleared,
  boardTitleEditing,
  boardTitleEditingCancelled,
  boardTitleUpdated,
  columnReordered,
  createBoard,
  removeBoard
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
  boardCleared,
  boardTitleEditing,
  boardTitleEditingCancelled,
  boardTitleUpdated,
  columnReordered,
  boardChanged,
  createBoard,
  removeBoard
};
