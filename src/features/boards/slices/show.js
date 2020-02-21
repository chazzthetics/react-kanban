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
    boardRemoved(state, action) {
      //TODO: refactor
      const { boardId, boardIds } = action.payload;
      const updatedBoardIds = boardIds.filter(id => id !== boardId);
      //FIXME:
      let previousBoard;
      if (updatedBoardIds.length > 2) {
        previousBoard = updatedBoardIds[updatedBoardIds.length - 2];
      } else if (updatedBoardIds.length === 2) {
        previousBoard = updatedBoardIds[updatedBoardIds.length - 1];
      } else if (updatedBoardIds.length === 1) {
        previousBoard = updatedBoardIds[0];
      } else {
        previousBoard = "";
      }
      return previousBoard;
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
