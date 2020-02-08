import { createSlice } from "@reduxjs/toolkit";
import { arrayToObject } from "../../../utils/arrayToObject";
import {
  boardRemoved,
  boardCleared,
  requestSuccess,
  requestColumnsSuccess
} from "../../shared";

/**
 * Column Ids Slice
 */
const columnIds = createSlice({
  name: "columns",
  initialState: [],
  reducers: {
    columnCreated(state, action) {
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
  },
  extraReducers: {
    [requestSuccess]: columnsLoaded,
    [requestColumnsSuccess]: columnsLoaded,
    [boardRemoved]: cascadeFromBoard,
    [boardCleared]: cascadeFromBoard
  }
});

function columnsLoaded(_state, action) {
  const { columns } = action.payload;
  return Object.keys(columns);
}

function cascadeFromBoard(state, action) {
  const { removed } = action.payload;
  const boardColumnIds = Object.keys(arrayToObject(removed));
  return state.filter(columnId => !boardColumnIds.includes(columnId));
}

export const columnIdsReducer = columnIds.reducer;
