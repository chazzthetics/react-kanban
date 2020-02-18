import { createSlice } from "@reduxjs/toolkit";
import { requestInitialDataSuccess, fetchBoards } from "../../requests/";
import { boardsApi } from "../../../api";
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
    },

    columnMoved(state, action) {
      const { startBoardId, endBoardId, startOrder, endOrder } = action.payload;
      state[startBoardId].columnIds = startOrder;
      state[endBoardId].columnIds = endOrder;
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
  columnReordered,
  columnMoved
} = allBoards.actions;

export const allBoardsReducer = allBoards.reducer;

// TODO: cleanup & error handling

export const createBoard = ({ board }) => async dispatch => {
  try {
    dispatch(boardCreated({ board }));
    const { data } = await boardsApi.create({ board });

    dispatch(fetchBoards(data.data.id));
  } catch (ex) {
    console.error(ex);
  }
};

export const removeBoard = ({ boardId }) => async dispatch => {
  try {
    dispatch(boardRemoved({ boardId }));
    await boardsApi.remove({ boardId });
  } catch (ex) {
    console.error(ex);
  }
};

export const clearBoard = ({ boardId }) => async dispatch => {
  try {
    dispatch(boardCleared({ boardId }));
    await boardsApi.clear({ boardId });
  } catch (ex) {
    console.error(ex);
  }
};

export const updateBoardTitle = ({ boardId, title }) => async (
  dispatch,
  getState
) => {
  try {
    const oldBoardTitle = getState().boards.all[boardId].title;
    if (oldBoardTitle !== title) {
      dispatch(boardTitleUpdated({ boardId, title }));
      await boardsApi.updateTitle({ boardId, title });
    } else {
      dispatch(boardTitleEditingCancelled({ boardId }));
    }
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
    await boardsApi.reorder({ boardId, orderToPersist });
  } catch (ex) {
    console.error(ex);
  }
};

export const moveColumn = ({
  startBoardId,
  endBoardId,
  startOrder,
  endOrder,
  startOrderToPersist,
  endOrderToPersist
}) => async dispatch => {
  try {
    //TODO: persist to database
    dispatch(columnMoved({ startBoardId, endBoardId, startOrder, endOrder }));
    await boardsApi.move({
      startBoardId,
      endBoardId,
      startOrderToPersist,
      endOrderToPersist
    });
  } catch (ex) {
    console.error(ex);
  }
};

//FIXME: check thunks, esp error handling, urls etc
