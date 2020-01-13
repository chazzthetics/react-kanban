import { createSlice } from "@reduxjs/toolkit";

const initialData = "board1";

const currentBoard = createSlice({
  name: "boards",
  initialState: initialData,
  reducers: {}
});

const currentBoardReducer = currentBoard.reducer;
export default currentBoardReducer;
