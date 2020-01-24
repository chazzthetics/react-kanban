import { createSlice } from "@reduxjs/toolkit";

/**
 * Board Ids Slice
 */
const boardIdsSlice = createSlice({
  name: "boards",
  initialState: ["board1", "board2", "board3"],
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
  }
});

export const boardIdsReducer = boardIdsSlice.reducer;
