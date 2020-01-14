import { createSlice } from "@reduxjs/toolkit";

const initialData = ["task1", "task2", "task3", "task4", "task5"];

const taskIdsSlice = createSlice({
  name: "tasks",
  initialState: initialData,
  reducers: {
    taskAdded(state, action) {
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
  }
});

const taskIdsReducer = taskIdsSlice.reducer;
export default taskIdsReducer;
