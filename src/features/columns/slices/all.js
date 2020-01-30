import { createSlice, createAction } from "@reduxjs/toolkit";
import { arrayToObject } from "../../../utils/arrayToObject";
import axios from "axios";
import uuid from "uuid/v4";
import { silentFetchData } from "../../../api/requestSlice";

const boardRemoved = createAction("boards/boardRemoved");
const boardCleared = createAction("boards/boardCleared");
const taskCreated = "tasks/taskCreated";
const taskRemoved = "tasks/taskRemoved";
const requestSuccess = "request/requestSuccess";

/**
 * All Columns Slice
 */
const allColumnsSlice = createSlice({
  name: "columns",
  initialState: {},
  reducers: {
    columnCreated(state, action) {
      const { column } = action.payload;
      state[column.id] = column;
    },
    columnRemoved(state, action) {
      const { columnId } = action.payload;
      delete state[columnId];
    },
    columnTitleEditing(state, action) {
      const { columnId } = action.payload;
      state[columnId].isEditing = true;
    },
    columnTitleEditingCancelled(state, action) {
      const { columnId } = action.payload;
      state[columnId].isEditing = false;
    },
    columnTitleUpdated(state, action) {
      const { columnId, newTitle } = action.payload;
      state[columnId].title = newTitle;
      state[columnId].isEditing = false;
    },
    columnOptionsOpened(state, action) {
      const { columnId } = action.payload;
      state[columnId].isOpen = true;
    },
    columnOptionsClosed(state, action) {
      const { columnId } = action.payload;
      state[columnId].isOpen = false;
    },
    taskReordered(state, action) {
      const { columnId, taskOrder } = action.payload;
      state[columnId].taskIds = taskOrder;
    },
    taskReorderedBetweenColumns(state, action) {
      const {
        startColumnId,
        endColumnId,
        startTaskOrder,
        endTaskOrder
      } = action.payload;
      state[startColumnId].taskIds = startTaskOrder;
      state[endColumnId].taskIds = endTaskOrder;
    }
  },
  extraReducers: {
    [requestSuccess]: (state, action) => {
      const { columns } = action.payload;
      return columns;
    },
    [boardRemoved]: removeColumnsFromBoard,
    [boardCleared]: removeColumnsFromBoard,
    [taskCreated]: (state, action) => {
      const { task, columnId } = action.payload;
      state[columnId].taskIds.push(task.id);
    },
    [taskRemoved]: (state, action) => {
      const { taskId, columnId } = action.payload;
      const taskIds = state[columnId].taskIds;
      const taskIdIndex = taskIds.indexOf(taskId);
      if (taskIdIndex >= 0) {
        taskIds.splice(taskIdIndex, 1);
      }
    }
  }
});

function removeColumnsFromBoard(state, action) {
  const { removed } = action.payload;
  const boardColumnIds = Object.keys(arrayToObject(removed));
  const columnIds = Object.keys(state);
  const newColumnIds = columnIds.filter(
    columnId => !boardColumnIds.includes(columnId)
  );

  const newColumns = {};
  for (const columnId of newColumnIds) {
    newColumns[columnId] = state[columnId];
  }
  return newColumns;
}

export const {
  columnCreated,
  columnRemoved,
  columnTitleEditing,
  columnTitleEditingCancelled,
  columnTitleUpdated,
  columnOptionsOpened,
  columnOptionsClosed,
  taskReordered,
  taskReorderedBetweenColumns
} = allColumnsSlice.actions;
export const allColumnsReducer = allColumnsSlice.reducer;

// TODO: cleanup
export const createColumn = ({ column, boardId }) => async dispatch => {
  const newColumn = { title: column.title, board_id: boardId };
  const client = { id: uuid(), title: column.title, taskIds: [] };
  try {
    dispatch(columnCreated({ column: client, boardId }));
    await axios.post("/api/columns", newColumn);

    dispatch(silentFetchData(boardId));
  } catch (ex) {
    console.error(ex);
  }
};

export const removeColumn = ({ columnId, boardId }) => async dispatch => {
  try {
    dispatch(columnRemoved({ columnId, boardId }));
    await axios.delete(`/api/columns/${columnId}`);
  } catch (ex) {
    console.error(ex);
  }
};
