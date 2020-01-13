import { combineReducers } from "@reduxjs/toolkit";
import allBoardsReducer from "./allBoards";
import boardIdsReducer from "./boardIds";
import currentBoardReducer from "./currentBoard";

const boardsReducer = combineReducers({
  all: allBoardsReducer,
  ids: boardIdsReducer,
  current: currentBoardReducer
});

export default boardsReducer;
