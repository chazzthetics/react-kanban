import { combineReducers } from "@reduxjs/toolkit";
import {
  allTasksReducer,
  createTask,
  removeTask,
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
export { createTask, removeTask, labelAdded, taskLabelRemoved };
