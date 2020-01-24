import { createSlice } from "@reduxjs/toolkit";
import { columnCreated, columnRemoved } from "../../columns/slices";

/**
 * All Boards Slice
 */
const allBoardsSlice = createSlice({
  name: "boards",
  initialState: {
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
    },
    board3: {
      id: "board3",
      title: "BOARD 3",
      columnIds: [],
      isEditing: false
    }
  },
  reducers: {
    boardCreated(state, action) {
      const { board } = action.payload;
      state[board.id] = board;
    },
    boardRemoved(state, action) {
      const { boardId } = action.payload;
      delete state[boardId];
    },
    boardTitleEditing(state, action) {
      const { boardId } = action.payload;
      state[boardId].isEditing = true;
    },
    boardTitleEditingCancelled(state, action) {
      const { boardId } = action.payload;
      state[boardId].isEditing = false;
    },
    boardTitleUpdated(state, action) {
      const { boardId, newTitle } = action.payload;
      state[boardId].title = newTitle;
      state[boardId].isEditing = false;
    },
    columnReordered(state, action) {
      const { boardId, columnOrder } = action.payload;
      state[boardId].columnIds = columnOrder;
    }
  },
  extraReducers: {
    [columnCreated]: (state, action) => {
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

export const {
  boardCreated,
  boardRemoved,
  boardTitleEditing,
  boardTitleEditingCancelled,
  boardTitleUpdated,
  columnReordered
} = allBoardsSlice.actions;

export const allBoardsReducer = allBoardsSlice.reducer;
