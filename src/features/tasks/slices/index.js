import { combineReducers } from "@reduxjs/toolkit";
import allTasksReducer from "./allTasks";
import taskIdsReducer from "./taskIds";

const tasksReducer = combineReducers({
  all: allTasksReducer,
  ids: taskIdsReducer
});

export default tasksReducer;
