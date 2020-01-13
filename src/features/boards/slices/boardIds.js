import { createSlice } from "@reduxjs/toolkit";

const initialData = ["board1", "board2"];

const boardIdsSlice = createSlice({
  name: "boards",
  initialState: initialData,
  reducers: {}
});

const boardIdsReducer = boardIdsSlice.reducer;
export default boardIdsReducer;
