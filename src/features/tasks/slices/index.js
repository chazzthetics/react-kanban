import { combineReducers } from "@reduxjs/toolkit";
import {
  allTasksReducer,
  createTask,
  removeTask,
  taskEditing,
  taskEditingCancelled,
  updateTaskContent,
  toggleCompleteTask,
  taskLabelAdded,
  taskLabelRemoved
} from "./all";
import { taskIdsReducer } from "./ids";
import {
  selectAllTasks,
  makeSelectTask,
  makeSelectTaskLabelIds
} from "./selectors";

/**
 * Task Selectors
 */
export { selectAllTasks, makeSelectTask, makeSelectTaskLabelIds };

/**
 * Task Actions
 */
export {
  createTask,
  removeTask,
  taskLabelAdded,
  taskLabelRemoved,
  updateTaskContent,
  toggleCompleteTask,
  taskEditing,
  taskEditingCancelled
};

/**
 * Tasks Reducer
 */
export default combineReducers({
  all: allTasksReducer,
  ids: taskIdsReducer
});
