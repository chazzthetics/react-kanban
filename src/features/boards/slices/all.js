import { createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import uuid from "uuid/v4";
import { fetchBoards } from "../../../api/requestSlice";

const columnCreated = createAction("columns/columnCreated");
const columnRemoved = createAction("columns/columnRemoved");
const requestSuccess = "request/requestSuccess";
const requestBoardsSuccess = "request/requestBoardsSuccess";

/**
 * All Boards Slice
 */

const allBoardsSlice = createSlice({
  name: "boards",
  initialState: {},
  reducers: {
    boardCreated(state, action) {
      const { board } = action.payload;
      state[board.id] = board;
    },
    boardRemoved(state, action) {
      const { boardId } = action.payload;
      delete state[boardId];
    },
    boardCleared(state, action) {
      const { boardId } = action.payload;
      state[boardId].columnIds = [];
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
    [requestSuccess]: (state, action) => {
      const { boards } = action.payload;
      return boards;
    },
    [requestBoardsSuccess]: (state, action) => {
      const { boards } = action.payload;
      return boards;
    },
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
  boardCleared,
  boardTitleEditing,
  boardTitleEditingCancelled,
  boardTitleUpdated,
  columnReordered
} = allBoardsSlice.actions;

export const allBoardsReducer = allBoardsSlice.reducer;

// TODO: cleanup
export const createBoard = board => async dispatch => {
  try {
    const client = { id: uuid(), title: board.title, columnIds: [] };
    dispatch(boardCreated({ board: client }));
    const { data } = await axios.post("/api/boards", board);

    dispatch(fetchBoards(data.id));
  } catch (ex) {
    console.error(ex);
  }
};

export const removeBoard = boardId => async dispatch => {
  try {
    dispatch(boardRemoved({ boardId }));
    await axios.delete(`/api/boards/${boardId}`);
  } catch (ex) {
    console.error(ex);
  }
};

export const clearBoard = boardId => async dispatch => {
  try {
    dispatch(boardCleared({ boardId }));
    await axios.delete(`/api/columns/${boardId}/clear`);
  } catch (ex) {
    console.error(ex);
  }
};
