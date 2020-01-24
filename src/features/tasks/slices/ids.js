import { createSlice, createAction } from "@reduxjs/toolkit";
import { arrayToObject } from "../../../utils/arrayToObject";
const boardRemoved = createAction("boards/boardRemoved");
const boardCleared = createAction("boards/boardCleared");
const columnRemoved = createAction("columns/columnRemoved");

/**
 * Task Ids Slice
 */
const taskIdsSlice = createSlice({
  name: "tasks",
  initialState: ["task1", "task2", "task3", "task4", "task5"],
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
