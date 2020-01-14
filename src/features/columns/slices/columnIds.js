import { createSlice } from "@reduxjs/toolkit";

const initialData = ["column1", "column2", "column3", "column4", "column5"];

const columnIdsSlice = createSlice({
  name: "columns",
  initialState: initialData,
  reducers: {
    columnAdded(state, action) {
      const { column } = action.payload;
      state.push(column.id);
    },
    columnRemoved(state, action) {
      const { columnId } = action.payload;
      const columnIndex = state.indexOf(columnId);
      if (columnIndex >= 0) {
        state.splice(columnIndex, 1);
      }
    }
  }
});

const columnIdsReducer = columnIdsSlice.reducer;
export default columnIdsReducer;
