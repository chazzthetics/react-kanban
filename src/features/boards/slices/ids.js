import { createSlice } from "@reduxjs/toolkit";
const requestSuccess = "request/requestSuccess";
const requestBoardsSuccess = "request/requestBoardsSuccess";

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
    [requestSuccess]: (state, action) => {
      const { boards } = action.payload;
      return Object.keys(boards);
    },
    [requestBoardsSuccess]: (state, action) => {
      const { boards } = action.payload;
      return Object.keys(boards);
    }
  }
});

export const boardIdsReducer = boardIdsSlice.reducer;