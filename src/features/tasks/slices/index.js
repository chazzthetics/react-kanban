import { combineReducers } from "@reduxjs/toolkit";
import {
  allTasksReducer,
  createTask,
  removeTask,
  taskEditing,
  taskEditingCancelled,
  updateTaskContent,
  toggleCompleteTask,
  changeDueDate,
  removeDueDate,
  changePriority,
  removePriority,
  addLabelToTask,
  removeLabelFromTask
} from "./all";
import { taskIdsReducer } from "./ids";
import {
  selectAllTasks,
  makeSelectTask,
  makeSelectTaskLabelIds,
  makeSelectTaskContent,
  makeSelectTaskIsEditing,
  makeSelectTaskCompleted,
  makeSelectTaskDueDate,
  makeSelectBadgeDueDate,
  makeSelectTaskPriority
} from "./selectors";

/**
 * Task Selectors
 */
export {
  selectAllTasks,
  makeSelectTask,
  makeSelectTaskLabelIds,
  makeSelectTaskContent,
  makeSelectTaskIsEditing,
  makeSelectTaskCompleted,
  makeSelectTaskDueDate,
  makeSelectBadgeDueDate,
  makeSelectTaskPriority
};

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
  changeDueDate,
  removeDueDate,
  changePriority,
  removePriority,
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
