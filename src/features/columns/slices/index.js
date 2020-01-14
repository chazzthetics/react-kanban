import { createSlice, createAction, combineReducers } from "@reduxjs/toolkit";
import { taskAdded, taskRemoved } from "../../tasks/slices";

export const boardRemoved = createAction("boards/boardRemoved");

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
    columnAdded(state, action) {
      const { column } = action.payload;
      state[column.id] = column;
    },
    columnRemoved(state, action) {
      const { columnId } = action.payload;
      delete state[columnId];
    }
  },
  extraReducers: {
    [boardRemoved]: (state, action) => {
      console.log("from all column");
    },
    [taskAdded]: (state, action) => {
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

export const { columnAdded, columnRemoved } = allColumnsSlice.actions;
const allColumnsReducer = allColumnsSlice.reducer;

const columnIdsSlice = createSlice({
  name: "columns",
  initialState: ["column1", "column2", "column3", "column4", "column5"],
  reducers: {
    columnAdded(state, action) {
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
      console.log("from column Ids");
    }
  }
});

const columnIdsReducer = columnIdsSlice.reducer;

export default combineReducers({
  all: allColumnsReducer,
  ids: columnIdsReducer
});
