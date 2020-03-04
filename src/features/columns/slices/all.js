import { createSlice } from "@reduxjs/toolkit";
import { arrayToObject } from "../../../utils/arrayToObject";
import { mapOrderForPersistence } from "../../../utils/mapOrderForPersistence";
import { fetchColumns } from "../../requests";
import { columnsApi } from "../../../api";
import {
  boardRemoved,
  boardCleared,
  taskCreated,
  taskRemoved,
  requestInitialDataSuccess,
  requestColumnsSuccess,
  requestColumnsFailed,
  requestTasksSuccess
} from "../../shared";

/**
 * All Columns Slice
 */
const allColumns = createSlice({
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
      state[columnId].isSorting = false;
    },
    columnSortOpened(state, action) {
      const { columnId } = action.payload;
      state[columnId].isSorting = true;
    },
    columnSortClosed(state, action) {
      const { columnId } = action.payload;
      state[columnId].isSorting = false;
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
    },
    tasksSortedBy(state, action) {
      const { columnId, tasks } = action.payload;
      state[columnId].taskIds = tasks;
    }
  },
  extraReducers: {
    [requestInitialDataSuccess]: columnsLoaded,
    [requestColumnsSuccess]: columnsLoaded,
    [requestColumnsFailed]: (state, action) => {
      console.log(action.payload);
    },
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
  columnSortOpened,
  columnSortClosed,
  lockColumnToggled,
  taskReordered,
  taskReorderedBetweenColumns,
  tasksSortedBy
} = allColumns.actions;
export const allColumnsReducer = allColumns.reducer;

export const createColumn = ({ column, boardId }) => async dispatch => {
  try {
    dispatch(columnCreated({ column, boardId }));
    const { data } = await columnsApi.create({ column, boardId });

    dispatch(fetchColumns({ boardId, columnId: data.data.id }));
  } catch (ex) {
    console.error(ex);
  }
};

export const removeColumn = ({ columnId, boardId }) => async dispatch => {
  try {
    dispatch(columnRemoved({ columnId, boardId }));
    await columnsApi.remove(columnId);
  } catch (ex) {
    console.error(ex);
  }
};

export const clearColumn = columnId => async dispatch => {
  try {
    dispatch(columnCleared({ columnId }));
    await columnsApi.clear(columnId);
  } catch (ex) {
    console.error(ex);
  }
};

export const toggleLockColumn = ({ columnId, isLocked }) => async dispatch => {
  try {
    dispatch(lockColumnToggled({ columnId, isLocked }));
    await columnsApi.toggleLock({ columnId, isLocked });
  } catch (ex) {
    console.error(ex);
  }
};

export const updateColumnTitle = ({ columnId, title }) => async (
  dispatch,
  getState
) => {
  try {
    const oldColumnTitle = getState().columns.all[columnId].title;
    if (oldColumnTitle !== title) {
      dispatch(columnTitleUpdated({ columnId, title }));
      await columnsApi.updateTitle({ columnId, title });
    } else {
      dispatch(columnTitleEditingCancelled({ columnId }));
    }
  } catch (ex) {
    console.error(ex);
  }
};

export const reorderTask = ({
  columnId,
  taskOrder,
  orderToPersist
}) => async dispatch => {
  try {
    dispatch(taskReordered({ columnId, taskOrder }));
    await columnsApi.reorder({ columnId, orderToPersist });
  } catch (ex) {
    console.error(ex);
  }
};

export const reorderTaskBetweenColumns = ({
  startColumnId,
  endColumnId,
  startTaskOrder,
  endTaskOrder,
  startOrderToPersist,
  endOrderToPersist
}) => async dispatch => {
  try {
    dispatch(
      taskReorderedBetweenColumns({
        startColumnId,
        endColumnId,
        startTaskOrder,
        endTaskOrder
      })
    );

    await columnsApi.reorderBetween({
      startColumnId,
      endColumnId,
      startOrderToPersist,
      endOrderToPersist
    });
  } catch (ex) {
    console.error(ex);
  }
};

export const sortTasksBy = (sortBy, { columnId, tasks }) => async (
  dispatch,
  getState
) => {
  try {
    if (
      JSON.stringify(tasks) !==
      JSON.stringify(getState().columns.all[columnId].taskIds)
    ) {
      dispatch(tasksSortedBy({ sortBy, columnId, tasks }));
      const orderToPersist = mapOrderForPersistence(tasks);
      await columnsApi.reorder({ columnId, orderToPersist });
    }
  } catch (ex) {
    console.error(ex);
  }
};
