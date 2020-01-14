import { createSlice, combineReducers } from "@reduxjs/toolkit";
import { columnAdded, columnRemoved } from "../../columns/slices";

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
    }
  },
  reducers: {
    boardAdded(state, action) {
      const { board } = action.payload;
      state[board.id] = board;
    },
    boardRemoved: (state, action) => {
      console.log("from all boards");
      const { boardId } = action.payload;
      delete state[boardId];
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

export const { boardAdded, boardRemoved } = allBoardsSlice.actions;
const allBoardsReducer = allBoardsSlice.reducer;

const boardIdsSlice = createSlice({
  name: "boards",
  initialState: ["board1", "board2"],
  reducers: {
    boardAdded(state, action) {
      const { board } = action.payload;
      state.push(board.id);
    },
    boardRemoved(state, action) {
      console.log("From board Ids");
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

const currentBoardSlice = createSlice({
  name: "boards",
  initialState: { id: "board1" },
  reducers: {
    boardAdded(state, action) {
      const { board } = action.payload;
      state.id = board.id;
    },
    boardRemoved(state, action) {
      console.log("from current board, remove board");
    }
  },
  extraReducers: {}
});

const currentBoardReducer = currentBoardSlice.reducer;

export default combineReducers({
  all: allBoardsReducer,
  ids: boardIdsReducer,
  current: currentBoardReducer
});
