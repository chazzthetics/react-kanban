import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const labelsSlice = createSlice({
  name: "labels",
  initialState: {},
  reducers: {}
});

const labelsReducer = labelsSlice.reducer;
export default labelsReducer;
