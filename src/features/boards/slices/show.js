import { createSlice } from "@reduxjs/toolkit";
import { requestInitialDataSuccess, requestBoardsSuccess } from "../../shared";
import {
  boardsLoaded,
  setCurrentBoard,
  setCurrentBoardAfterMove,
  getPreviousBoard
} from "./current";

/**
 * Show Board (for column options) Slice
 */
const show = createSlice({
  name: "boards",
  initialState: "",
  reducers: {
    boardChanged: setCurrentBoard,
    boardRemoved: getPreviousBoard,
    boardListChanged: setCurrentBoard,
    columnMoved: setCurrentBoardAfterMove
  },
  extraReducers: {
    [requestInitialDataSuccess]: boardsLoaded,
    [requestBoardsSuccess]: boardsLoaded
  }
});

export const { boardListChanged } = show.actions;
export const showReducer = show.reducer;
