import { createSlice } from "@reduxjs/toolkit";

const initialData = {
  board1: {
    id: "board1",
    title: "BOARD 1",
    columnIds: ["column1", "column2", "column3"],
    isEditing: false
  },
  board2: {
    id: "board2",
    title: "BOARD 2",
    columnIds: ["column4"],
    isEditing: false
  }
};

const allBoardsSlice = createSlice({
  name: "boards",
  initialState: initialData,
  reducers: {}
});

const allBoardsReducer = allBoardsSlice.reducer;
export default allBoardsReducer;
