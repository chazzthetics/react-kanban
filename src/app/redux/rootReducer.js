import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../../features/auth";
import requestReducer from "../../features/requests";
import boardsReducer from "../../features/boards/slices";
import columnsReducer from "../../features/columns/slices";
import tasksReducer from "../../features/tasks/slices";
import labelsReducer from "../../features/labels/slices";

const rootReducer = combineReducers({
  request: requestReducer,
  auth: authReducer,
  boards: boardsReducer,
  columns: columnsReducer,
  tasks: tasksReducer,
  labels: labelsReducer
});

export default rootReducer;
