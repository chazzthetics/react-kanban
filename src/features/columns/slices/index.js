import { combineReducers } from "@reduxjs/toolkit";
import { columnIdsReducer } from "./ids";
import {
  selectAllColumns,
  makeSelectColumnTaskIds,
  makeSelectColumn,
  makeSelectColumnHasTasks,
  makeSelectColumnTitle,
  makeSelectColumnIsLocked,
  makeSelectColumnIsEditing,
  makeSelectColumnIsOpen,
  makeSelectColumnSortIsOpen
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
  columnSortOpened,
  columnSortClosed,
  reorderTask,
  reorderTaskBetweenColumns,
  sortTasksBy
} from "./all";

/**
 * Column Selectors
 */
export {
  selectAllColumns,
  makeSelectColumnTaskIds,
  makeSelectColumn,
  makeSelectColumnHasTasks,
  makeSelectColumnTitle,
  makeSelectColumnIsLocked,
  makeSelectColumnIsEditing,
  makeSelectColumnIsOpen,
  makeSelectColumnSortIsOpen
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
  columnSortOpened,
  columnSortClosed,
  reorderTask,
  reorderTaskBetweenColumns,
  sortTasksBy
};

/**
 * Columns Reducer
 */
export default combineReducers({
  all: allColumnsReducer,
  ids: columnIdsReducer
});
