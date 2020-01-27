import { combineReducers } from "@reduxjs/toolkit";
import boardsReducer from "../../features/boards/slices";
import columnsReducer from "../../features/columns/slices";
import tasksReducer from "../../features/tasks/slices";
import labelsReducer from "../../features/labels/slices";
import requestReducer from "../../api/requestSlice";

const rootReducer = combineReducers({
  request: requestReducer,
  boards: boardsReducer,
  columns: columnsReducer,
  tasks: tasksReducer,
  labels: labelsReducer
});

export default rootReducer;
