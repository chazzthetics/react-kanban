import { createSlice } from "@reduxjs/toolkit";
import { columnActions } from "../../columns/slices";

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

const { columnAdded, columnRemoved } = columnActions;

const allBoardsSlice = createSlice({
  name: "boards",
  initialState: initialData,
  reducers: {},
  extraReducers: {
    [columnAdded]: (state, action) => {
      const { column, boardId } = action.payload;
      state[boardId].columnIds.push(column.id);
    },
    [columnRemoved]: (state, action) => {
      const { columnId, boardId } = action.payload;
      const columnIds = state[boardId].columnIds;
      const columnIndex = columnIds.indexOf(columnId);

      if (columnIndex >= 0) {
        columnIds.splice(columnIndex, 1);
      }
    }
  }
});

const allBoardsReducer = allBoardsSlice.reducer;
export default allBoardsReducer;
