import { combineReducers } from "@reduxjs/toolkit";
import allTasksReducer from "./allTasks";
import taskIdsReducer from "./taskIds";
import { taskAdded, taskRemoved } from "./allTasks";

const tasksReducer = combineReducers({
  all: allTasksReducer,
  ids: taskIdsReducer
});

export const taskActions = {
  taskAdded,
  taskRemoved
};

export default tasksReducer;
