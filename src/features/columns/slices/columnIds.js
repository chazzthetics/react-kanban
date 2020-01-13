import { createSlice } from "@reduxjs/toolkit";

const initialData = ["column1", "column2", "column3", "column4", "column5"];

const columnIdsSlice = createSlice({
  name: "columns",
  initialState: initialData,
  reducers: {}
});

const columnIdsReducer = columnIdsSlice.reducer;
export default columnIdsReducer;
