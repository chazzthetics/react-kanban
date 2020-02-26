import { createSlice } from "@reduxjs/toolkit";
import {
  requestInitialDataSuccess,
  requestBoardsSuccess,
  columnOptionsOpened,
  columnOptionsClosed
} from "../../shared";
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
    [requestBoardsSuccess]: boardsLoaded,
    [columnOptionsOpened]: (_state, action) => {
      const { boardId } = action.payload;
      return boardId;
    },
    [columnOptionsClosed]: (_state, action) => {
      const { boardId } = action.payload;
      return boardId;
    }
  }
});

export const { boardListChanged } = show.actions;
export const showReducer = show.reducer;
