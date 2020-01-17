import { createSlice, combineReducers } from "@reduxjs/toolkit";
import { columnAdded, columnRemoved } from "../../columns/slices";

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
    boardAdded(state, action) {
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

export const {
  boardAdded,
  boardRemoved,
  boardTitleEditing,
  boardTitleEditingCancelled,
  boardTitleUpdated,
  columnReordered
} = allBoardsSlice.actions;
const allBoardsReducer = allBoardsSlice.reducer;

/**
 * Board Ids Slice
 */
const boardIdsSlice = createSlice({
  name: "boards",
  initialState: ["board1", "board2", "board3"],
  reducers: {
    boardAdded(state, action) {
      const { board } = action.payload;
      state.push(board.id);
    },
    boardRemoved(state, action) {
      const { boardId } = action.payload;
      const boardIndex = state.indexOf(boardId);

      if (boardIndex >= 0) {
        state.splice(boardIndex, 1);
      }
    }
  },
  extraReducers: {}
});

const boardIdsReducer = boardIdsSlice.reducer;

/**
 * Current Board Slice
 */
const currentBoardSlice = createSlice({
  name: "boards",
  initialState: "board1",
  reducers: {
    boardAdded(state, action) {
      const { board } = action.payload;
      return board.id;
    },
    boardRemoved(state, action) {
      const { boardId, boardIds } = action.payload;
      const updatedBoardIds = boardIds.filter(id => id !== boardId);
      const previousBoard = updatedBoardIds[0];
      return previousBoard ? previousBoard : "";
    },
    boardChanged(state, action) {
      const { boardId } = action.payload;
      return boardId;
    }
  },
  extraReducers: {}
});

export const { boardChanged } = currentBoardSlice.actions;
const currentBoardReducer = currentBoardSlice.reducer;

/**
 * Boards Reducer
 */
export default combineReducers({
  all: allBoardsReducer,
  ids: boardIdsReducer,
  current: currentBoardReducer
});
