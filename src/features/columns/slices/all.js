import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { arrayToObject } from "../../../utils/arrayToObject";
import { fetchColumns } from "../../../api/requestSlice";

const boardRemoved = "boards/boardRemoved";
const boardCleared = "boards/boardCleared";
const taskCreated = "tasks/taskCreated";
const taskRemoved = "tasks/taskRemoved";
const requestSuccess = "request/requestSuccess";
const requestColumnsSuccess = "request/requestColumnsSuccess";
const requestColumnsFailed = "request/requestColumnsFailed";
const requestTasksSuccess = "request/requestTasksSuccess";

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
    columnCleared(state, action) {
      const { columnId } = action.payload;
      state[columnId].taskIds = [];
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
      const { columnId, title } = action.payload;
      state[columnId].title = title;
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
    lockColumnToggled(state, action) {
      const { columnId, isLocked } = action.payload;
      state[columnId].isLocked = isLocked;
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
    [requestSuccess]: columnsLoaded,
    [requestColumnsSuccess]: columnsLoaded,
    [requestColumnsFailed]: (state, action) => {},
    [requestTasksSuccess]: (state, action) => {
      const { columnId, taskId } = action.payload;
      const taskIds = state[columnId].taskIds;
      taskIds.splice(-1, 1, taskId);
    },
    [boardRemoved]: cascadeFromBoard,
    [boardCleared]: cascadeFromBoard,
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

function columnsLoaded(_state, action) {
  const { columns } = action.payload;
  return columns;
}

function cascadeFromBoard(state, action) {
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
  columnCleared,
  columnTitleEditing,
  columnTitleEditingCancelled,
  columnTitleUpdated,
  columnOptionsOpened,
  columnOptionsClosed,
  lockColumnToggled,
  taskReordered,
  taskReorderedBetweenColumns
} = allColumnsSlice.actions;
export const allColumnsReducer = allColumnsSlice.reducer;

// TODO: cleanup
export const createColumn = ({ column, boardId }) => async dispatch => {
  try {
    dispatch(columnCreated({ column, boardId }));
    const { data } = await axios.post("/api/columns", {
      title: column.title,
      board_id: parseInt(boardId)
    });

    dispatch(fetchColumns({ boardId, columnId: data.id }));
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

export const clearColumn = ({ columnId }) => async dispatch => {
  try {
    dispatch(columnCleared({ columnId }));
    await axios.delete(`/api/columns/${columnId}/clear`);
  } catch (ex) {
    console.error(ex);
  }
};

export const toggleLockColumn = ({ columnId, isLocked }) => async dispatch => {
  try {
    dispatch(lockColumnToggled({ columnId, isLocked }));
    await axios.patch(`/api/columns/${columnId}`, { isLocked });
  } catch (ex) {
    console.error(ex);
  }
};

export const updateColumnTitle = ({ columnId, title }) => async dispatch => {
  try {
    dispatch(columnTitleUpdated({ columnId, title }));
    await axios.patch(`/api/columns/${columnId}`, { title });
  } catch (ex) {
    console.error(ex);
  }
};
