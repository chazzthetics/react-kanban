import { combineReducers } from "@reduxjs/toolkit";
import {
  allTasksReducer,
  createTask,
  removeTask,
  taskEditing,
  taskEditingCancelled,
  updateTaskContent,
  toggleCompleteTask,
  addLabelToTask,
  removeLabelFromTask
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
  addLabelToTask,
  removeLabelFromTask,
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
