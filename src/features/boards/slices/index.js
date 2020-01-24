import { combineReducers } from "@reduxjs/toolkit";
import {
  allBoardsReducer,
  boardCreated,
  boardRemoved,
  boardCleared,
  boardTitleEditing,
  boardTitleEditingCancelled,
  boardTitleUpdated,
  columnReordered
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
  boardCreated,
  boardRemoved,
  boardCleared,
  boardTitleEditing,
  boardTitleEditingCancelled,
  boardTitleUpdated,
  columnReordered,
  boardChanged
};
