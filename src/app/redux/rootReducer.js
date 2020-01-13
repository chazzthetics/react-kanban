import { combineReducers } from "@reduxjs/toolkit";
import boardsReducer from "../../features/boards/slices";
import columnsReducer from "../../features/columns/slices";
import tasksReducer from "../../features/tasks/slices";

const rootReducer = combineReducers({
  boards: boardsReducer,
  columns: columnsReducer,
  tasks: tasksReducer
});

export default rootReducer;
