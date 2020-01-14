import { createSlice } from "@reduxjs/toolkit";
import { taskActions } from "../../tasks/slices";

const initialData = {
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
};

const { taskAdded, taskRemoved } = taskActions;

const allColumnsSlice = createSlice({
  name: "columns",
  initialState: initialData,
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
export default allColumnsReducer;
