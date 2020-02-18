import { createSlice } from "@reduxjs/toolkit";
import { requestInitialDataSuccess, requestBoardsSuccess } from "../../shared";

/**
 * Current Board Slice
 */
const currentBoard = createSlice({
  name: "boards",
  initialState: "",
  reducers: {
    boardCreated(_state, action) {
      const { board } = action.payload;
      return board.id;
    },
    boardRemoved(_state, action) {
      const { boardId, boardIds } = action.payload;
      const updatedBoardIds = boardIds.filter(id => id !== boardId);
      const previousBoard = updatedBoardIds[updatedBoardIds.length - 1];

      return previousBoard ? previousBoard : "";
    },
    boardChanged(_state, action) {
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
    [requestBoardsSuccess]: boardsLoaded
  }
});

function boardsLoaded(_state, action) {
  const { boards, boardId } = action.payload;
  if (boardId) {
    return boardId;
  }
  return Object.keys(boards)[0];
}

export const { boardChanged } = currentBoard.actions;
export const currentBoardReducer = currentBoard.reducer;

//TODO: refactor
