import { createSlice } from "@reduxjs/toolkit";
import { arrayToObject } from "../../../utils/arrayToObject";
import {
  boardRemoved,
  boardCleared,
  columnRemoved,
  columnCleared,
  requestInitialDataSuccess,
  requestTasksSuccess
} from "../../shared";

/**
 * Task Ids Slice
 */
const taskIds = createSlice({
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
    [requestInitialDataSuccess]: tasksLoaded,
    [requestTasksSuccess]: tasksLoaded,
    [boardRemoved]: cascadeFromBoard,
    [boardCleared]: cascadeFromBoard,
    [columnRemoved]: cascadeFromColumn,
    [columnCleared]: cascadeFromColumn
  }
});

function tasksLoaded(_state, action) {
  const { tasks } = action.payload;
  return Object.keys(tasks);
}

function cascadeFromBoard(state, action) {
  const { removed } = action.payload;
  const taskIds = removed.flatMap(column => column.taskIds);
  return state.filter(taskId => !taskIds.includes(taskId));
}

function cascadeFromColumn(state, action) {
  const { columnTasks } = action.payload;
  const taskIds = Object.keys(arrayToObject(columnTasks));
  return state.filter(taskId => !taskIds.includes(taskId));
}

export const taskIdsReducer = taskIds.reducer;
