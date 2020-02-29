import { combineReducers } from "@reduxjs/toolkit";
import {
  allTasksReducer,
  createTask,
  removeTask,
  taskEditing,
  taskEditingCancelled,
  updateTaskContent,
  toggleCompleteTask,
  taskDueDateOpened,
  taskDueDateClosed,
  changeDueDate,
  removeDueDate,
  taskPriorityOpened,
  taskPriorityClosed,
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
  makeSelectTaskPriority,
  makeSelectIsDueDateOpen,
  makeSelectIsPriorityOpen
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
  makeSelectTaskPriority,
  makeSelectIsDueDateOpen,
  makeSelectIsPriorityOpen
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
  taskDueDateOpened,
  taskDueDateClosed,
  taskPriorityOpened,
  taskPriorityClosed,
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
