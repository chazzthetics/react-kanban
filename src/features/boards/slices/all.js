import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { arrayToObject } from "../../../utils/arrayToObject";
import { requestInitialDataSuccess, fetchBoards } from "../../requests/";
import {
  columnCreated,
  columnRemoved,
  requestBoardsSuccess,
  requestBoardsFailed,
  requestColumnsSuccess
} from "../../shared";

/**
 * All Boards Slice
 */
const allBoards = createSlice({
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
      const { boardId, title } = action.payload;
      state[boardId].title = title;
      state[boardId].isEditing = false;
    },
    columnReordered(state, action) {
      const { boardId, columnOrder } = action.payload;
      state[boardId].columnIds = columnOrder;
    }
  },
  extraReducers: {
    [requestInitialDataSuccess]: boardsLoaded,
    [requestBoardsSuccess]: boardsLoaded,
    [requestBoardsFailed]: (state, action) => {
      //FIXME: revert back to old state on error
    },
    [requestColumnsSuccess]: (state, action) => {
      const { boardId, columnId } = action.payload;
      const columnIds = state[boardId].columnIds;
      columnIds.splice(-1, 1, columnId);
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

function boardsLoaded(_state, action) {
  const { boards } = action.payload;
  return boards;
}

export const {
  boardCreated,
  boardRemoved,
  boardCleared,
  boardTitleEditing,
  boardTitleEditingCancelled,
  boardTitleUpdated,
  columnReordered
} = allBoards.actions;

export const allBoardsReducer = allBoards.reducer;

// TODO: cleanup & error handling
const baseUrl = "http://localhost:8000/api";

export const createBoard = ({ board }) => async dispatch => {
  try {
    dispatch(boardCreated({ board }));
    const { data } = await axios.post(`${baseUrl}/boards`, {
      title: board.title
    });

    dispatch(fetchBoards(data.data.id));
  } catch (ex) {
    console.error(ex);
  }
};

export const removeBoard = ({ boardId }) => async dispatch => {
  try {
    dispatch(boardRemoved({ boardId }));
    await axios.delete(`${baseUrl}/boards/${boardId}`);
  } catch (ex) {
    console.error(ex);
  }
};

export const clearBoard = ({ boardId }) => async dispatch => {
  try {
    dispatch(boardCleared({ boardId }));
    await axios.delete(`${baseUrl}/boards/${boardId}/clear`);
  } catch (ex) {
    console.error(ex);
  }
};

export const updateBoardTitle = ({ boardId, title }) => async dispatch => {
  try {
    dispatch(boardTitleUpdated({ boardId, title }));
    await axios.patch(`${baseUrl}/boards/${boardId}`, { title });
  } catch (ex) {
    console.error(ex);
  }
};

export const reorderColumn = ({
  boardId,
  columnOrder,
  orderToPersist
}) => async dispatch => {
  try {
    dispatch(columnReordered({ boardId, columnOrder }));
    await axios.put(`${baseUrl}/boards/${boardId}/reorder`, {
      id: parseInt(boardId),
      columnIds: arrayToObject(orderToPersist)
    });
  } catch (ex) {
    console.error(ex);
  }
};

//FIXME: check thunks, esp error handling, urls etc
