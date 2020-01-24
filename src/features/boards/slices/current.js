import { createSlice } from "@reduxjs/toolkit";

/**
 * Current Board Slice
 */
const currentBoardSlice = createSlice({
  name: "boards",
  initialState: "board1",
  reducers: {
    boardCreated(state, action) {
      const { board } = action.payload;
      return board.id;
    },
    boardRemoved(state, action) {
      const { boardId, boardIds } = action.payload;
      const updatedBoardIds = boardIds.filter(id => id !== boardId);
      const previousBoard = updatedBoardIds[0];
      return previousBoard ? previousBoard : "";
    },
    boardChanged(state, action) {
      const { boardId } = action.payload;
      return boardId;
    }
  }
});

export const { boardChanged } = currentBoardSlice.actions;
export const currentBoardReducer = currentBoardSlice.reducer;
