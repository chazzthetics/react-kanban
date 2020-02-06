import { combineReducers } from "@reduxjs/toolkit";
import { columnIdsReducer } from "./ids";
import {
  selectAllColumns,
  selectColumnTaskIds,
  makeSelectColumn,
  makeSelectColumnTaskIdsLength
} from "./selectors";
import {
  allColumnsReducer,
  createColumn,
  removeColumn,
  clearColumn,
  updateColumnTitle,
  toggleLockColumn,
  columnTitleEditing,
  columnTitleEditingCancelled,
  columnOptionsOpened,
  columnOptionsClosed,
  taskReordered,
  taskReorderedBetweenColumns
} from "./all";

/**
 * Column Selectors
 */
export {
  selectAllColumns,
  selectColumnTaskIds,
  makeSelectColumn,
  makeSelectColumnTaskIdsLength
};

/**
 * Column Actions/Thunks
 */
export {
  createColumn,
  removeColumn,
  clearColumn,
  updateColumnTitle,
  toggleLockColumn,
  columnTitleEditing,
  columnTitleEditingCancelled,
  columnOptionsOpened,
  columnOptionsClosed,
  taskReordered,
  taskReorderedBetweenColumns
};

/**
 * Columns Reducer
 */
export default combineReducers({
  all: allColumnsReducer,
  ids: columnIdsReducer
});
