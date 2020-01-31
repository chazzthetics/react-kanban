import { createSlice } from "@reduxjs/toolkit";
import { arrayToObject } from "../../../utils/arrayToObject";

const boardRemoved = "boards/boardRemoved";
const boardCleared = "boards/boardCleared";
const columnRemoved = "columns/columnRemoved";
const requestSuccess = "request/requestSuccess";

/**
 * Task Ids Slice
 */
const taskIdsSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    taskCreated(state, action) {
      const { task } = action.payload;
      state.push(task.id);
    },
    taskRemoved(state, action) {
      const { taskId } = action.payload;
      const taskIndex = state.indexOf(taskId);
      if (taskIndex >= 0) {
        state.splice(taskIndex, 1);
      }
    }
  },
  extraReducers: {
    [requestSuccess]: (state, action) => {
      const { tasks } = action.payload;
      return Object.keys(tasks);
    },
    [boardRemoved]: removeTasksFromColumn,
    [boardCleared]: removeTasksFromColumn,
    [columnRemoved]: (state, action) => {
      const { columnTasks } = action.payload;
      const taskIds = Object.keys(arrayToObject(columnTasks));
      return state.filter(taskId => !taskIds.includes(taskId));
    }
  }
});

function removeTasksFromColumn(state, action) {
  const { removed } = action.payload;
  const taskIds = removed.flatMap(column => column.taskIds);
  return state.filter(taskId => !taskIds.includes(taskId));
}

export const taskIdsReducer = taskIdsSlice.reducer;
