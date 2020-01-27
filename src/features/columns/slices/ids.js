import { createSlice, createAction } from "@reduxjs/toolkit";
import { arrayToObject } from "../../../utils/arrayToObject";
const boardRemoved = createAction("boards/boardRemoved");
const boardCleared = createAction("boards/boardCleared");
const requestSuccess = "request/requestSuccess";

const columnIdsSlice = createSlice({
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
    [requestSuccess]: (state, action) => {
      const { columns } = action.payload;
      return Object.keys(columns);
    },
    [boardRemoved]: removeColumnIdsFromBoard,
    [boardCleared]: removeColumnIdsFromBoard
  }
});

function removeColumnIdsFromBoard(state, action) {
  const { removed } = action.payload;
  const boardColumnIds = Object.keys(arrayToObject(removed));
  return state.filter(columnId => !boardColumnIds.includes(columnId));
}

export const columnIdsReducer = columnIdsSlice.reducer;
