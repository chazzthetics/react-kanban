import { combineReducers } from "@reduxjs/toolkit";
import {
  allTasksReducer,
  taskCreated,
  taskRemoved,
  labelAdded,
  taskLabelRemoved
} from "./all";
import { taskIdsReducer } from "./ids";

/**
 * Tasks Reducer
 */
export default combineReducers({
  all: allTasksReducer,
  ids: taskIdsReducer
});

/**
 * Task Actions
 */
export { taskCreated, taskRemoved, labelAdded, taskLabelRemoved };
