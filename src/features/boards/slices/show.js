import { createSlice } from "@reduxjs/toolkit";
import {
  requestInitialDataSuccess,
  requestBoardsSuccess,
  columnOptionsClosed
} from "../../shared";

const show = createSlice({
  name: "boards",
  initialState: "",
  reducers: {
    boardChanged(_state, action) {
      const { boardId } = action.payload;
      return boardId;
    },
    boardListChanged(_state, action) {
      const { boardId } = action.payload;
      return boardId;
    },
    columnMoved(_state, action) {
      const { endBoardId } = action.payload;
      return endBoardId;
    }
  },
  extraReducers: {
    [requestInitialDataSuccess]: boardsLoaded,
    [requestBoardsSuccess]: boardsLoaded,
    [columnOptionsClosed]: (_state, action) => {
      const { boardId } = action.payload;
      return boardId;
    }
  }
});

function boardsLoaded(_state, action) {
  const { boards, boardId } = action.payload;
  if (boardId) {
    return boardId;
  }
  return Object.keys(boards)[0];
}

export const { boardListChanged } = show.actions;
export const showReducer = show.reducer;
