import { combineReducers } from "@reduxjs/toolkit";
import {
  allColumnsReducer,
  columnCreated,
  columnRemoved,
  columnTitleEditing,
  columnTitleEditingCancelled,
  columnTitleUpdated,
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
  columnCreated,
  columnRemoved,
  columnTitleEditing,
  columnTitleEditingCancelled,
  columnTitleUpdated,
  taskReordered,
  taskReorderedBetweenColumns
};
