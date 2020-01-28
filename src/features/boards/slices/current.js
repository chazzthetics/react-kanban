import { createSlice } from "@reduxjs/toolkit";

const requestSuccess = "request/requestSuccess";
const requestBoardsSuccess = "request/requestBoardsSuccess";
/**
 * Current Board Slice
 */
const currentBoardSlice = createSlice({
  name: "boards",
  initialState: "",
  reducers: {
    boardCreated(state, action) {
      const { board } = action.payload;
      return board.id;
    },
    boardRemoved(state, action) {
      const { boardId, boardIds } = action.payload;
      const updatedBoardIds = boardIds.filter(id => id !== boardId);
      const previousBoard = updatedBoardIds[updatedBoardIds.length - 1];

      return previousBoard ? previousBoard : "";
    },
    boardChanged(state, action) {
      const { boardId } = action.payload;
      return boardId;
    }
  },
  extraReducers: {
    [requestSuccess]: (state, action) => {
      const { boards, boardId } = action.payload;
      if (boardId) {
        return boardId;
      }
      return Object.keys(boards)[0];
    },
    [requestBoardsSuccess]: (state, action) => {
      const { boards, boardId } = action.payload;
      if (boardId) {
        return boardId;
      }
      return Object.keys(boards)[0];
    }
  }
});

export const { boardChanged } = currentBoardSlice.actions;
export const currentBoardReducer = currentBoardSlice.reducer;
