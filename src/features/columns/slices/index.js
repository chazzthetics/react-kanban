import { combineReducers } from "@reduxjs/toolkit";
import {
  allColumnsReducer,
  createColumn,
  removeColumn,
  columnTitleEditing,
  columnTitleEditingCancelled,
  columnTitleUpdated,
  columnOptionsOpened,
  columnOptionsClosed,
  taskReordered,
  taskReorderedBetweenColumns
} from "./all";
import { columnIdsReducer } from "./ids";

/**
 * Columns Reducer
 */
export default combineReducers({
  all: allColumnsReducer,
  ids: columnIdsReducer
});

/**
 * Column Actions
 */
export {
  createColumn,
  removeColumn,
  columnTitleEditing,
  columnTitleEditingCancelled,
  columnTitleUpdated,
  columnOptionsOpened,
  columnOptionsClosed,
  taskReordered,
  taskReorderedBetweenColumns
};
