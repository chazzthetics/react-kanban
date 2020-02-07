import { createSlice } from "@reduxjs/toolkit";
import { requestSuccess, requestBoardsSuccess } from "../../shared";

/**
 * Current Board Slice
 */
const currentBoardSlice = createSlice({
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
    }
  },
  extraReducers: {
    [requestSuccess]: boardsLoaded,
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

export const { boardChanged } = currentBoardSlice.actions;
export const currentBoardReducer = currentBoardSlice.reducer;

//TODO: refactor
