import { createSlice, createAction, combineReducers } from "@reduxjs/toolkit";
import { taskCreated, taskRemoved } from "../../tasks/slices";
import { arrayToObject } from "../../../utils/arrayToObject";
export const boardRemoved = createAction("boards/boardRemoved");

/**
 * All Columns Slice
 */
const allColumnsSlice = createSlice({
  name: "columns",
  initialState: {
    column1: {
      id: "column1",
      title: "COLUMN 1",
      taskIds: ["task1", "task2"],
      isEditing: false
    },
    column2: {
      id: "column2",
      title: "COLUMN 2",
      taskIds: ["task3", "task4"],
      isEditing: false
    },
    column3: {
      id: "column3",
      title: "COLUMN 3",
      taskIds: [],
      isEditing: false
    },
    column4: {
      id: "column4",
      title: "COLUMN 4",
      taskIds: ["task5"],
      isEditing: false
    }
  },
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
    [boardRemoved]: (state, action) => {
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
      //TODO: refactor (see tasks slice columnRemoved)
    },
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

export const {
  columnCreated,
  columnRemoved,
  columnTitleEditing,
  columnTitleEditingCancelled,
  columnTitleUpdated,
  taskReordered,
  taskReorderedBetweenColumns
} = allColumnsSlice.actions;
const allColumnsReducer = allColumnsSlice.reducer;

/**
 * Column Ids Slice
 */
const columnIdsSlice = createSlice({
  name: "columns",
  initialState: ["column1", "column2", "column3", "column4"],
  reducers: {
    columnCreated(state, action) {
      const { column } = action.payload;
      state.push(column.id);
    },
    columnRemoved(state, action) {
      const { columnId } = action.payload;
      const columnIndex = state.indexOf(columnId);
      if (columnIndex >= 0) {
        state.splice(columnIndex, 1);
      }
    }
  },
  extraReducers: {
    [boardRemoved]: (state, action) => {
      const { removed } = action.payload;
      const boardColumnIds = Object.keys(arrayToObject(removed));
      return state.filter(columnId => !boardColumnIds.includes(columnId));
    }
  }
});

const columnIdsReducer = columnIdsSlice.reducer;

/**
 * Columns Reducer
 */
export default combineReducers({
  all: allColumnsReducer,
  ids: columnIdsReducer
});

// export const test = () => (dispatch, getState) => {};
