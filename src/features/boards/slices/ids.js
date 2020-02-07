import { createSlice } from "@reduxjs/toolkit";
import { requestSuccess, requestBoardsSuccess } from "../../shared";

/**
 * Board Ids Slice
 */
const boardIdsSlice = createSlice({
  name: "boards",
  initialState: [],
  reducers: {
    boardCreated(state, action) {
      const { board } = action.payload;
      state.push(board.id);
    },
    boardRemoved(state, action) {
      const { boardId } = action.payload;
      const boardIndex = state.indexOf(boardId);

      if (boardIndex >= 0) {
        state.splice(boardIndex, 1);
      }
    }
  },
  extraReducers: {
    [requestSuccess]: boardsLoaded,
    [requestBoardsSuccess]: boardsLoaded
  }
});

function boardsLoaded(_state, action) {
  const { boards } = action.payload;
  return Object.keys(boards);
}

export const boardIdsReducer = boardIdsSlice.reducer;

//TODO: refactor
