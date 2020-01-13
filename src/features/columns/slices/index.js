import { combineReducers } from "@reduxjs/toolkit";
import allColumnsReducer from "./allColumns";
import columnIdsReducer from "./columnIds";

const columnsReducer = combineReducers({
  all: allColumnsReducer,
  ids: columnIdsReducer
});

export default columnsReducer;
