import { combineReducers } from "@reduxjs/toolkit";
import allColumnsReducer from "./allColumns";
import columnIdsReducer from "./columnIds";
import { columnAdded, columnRemoved } from "./allColumns";

const columnsReducer = combineReducers({
  all: allColumnsReducer,
  ids: columnIdsReducer
});

export const columnActions = { columnAdded, columnRemoved };

export default columnsReducer;
