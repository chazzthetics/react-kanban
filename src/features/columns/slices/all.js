import { createSlice, createAction } from "@reduxjs/toolkit";
import { arrayToObject } from "../../../utils/arrayToObject";
import { taskCreated, taskRemoved } from "../../tasks/slices";
const boardRemoved = createAction("boards/boardRemoved");
const boardCleared = createAction("boards/boardCleared");

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
  taskReordered,
  taskReorderedBetweenColumns
} = allColumnsSlice.actions;
export const allColumnsReducer = allColumnsSlice.reducer;
