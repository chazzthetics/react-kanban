import { createSlice, combineReducers } from "@reduxjs/toolkit";

const allTasksSlice = createSlice({
  name: "tasks",
  initialState: {
    task1: {
      id: "task1",
      content: "Walk the dog",
      completed: false,
      isEditing: false
    },
    task2: {
      id: "task2",
      content: "Milk the cows",
      completed: false,
      isEditing: false
    },
    task3: {
      id: "task3",
      content: "Learn more about Redux",
      completed: false,
      isEditing: false
    },
    task4: {
      id: "task4",
      content: "Go fishing next weekend",
      completed: false,
      isEditing: false
    },
    task5: {
      id: "task5",
      content: "Learn more about Laravel",
      completed: false,
      isEditing: false
    }
  },
  reducers: {
    taskAdded(state, action) {
      const { task } = action.payload;
      state[task.id] = task;
    },
    taskRemoved(state, action) {
      const { taskId } = action.payload;
      delete state[taskId];
    }
  },
  extraReducers: {}
});

export const { taskAdded, taskRemoved } = allTasksSlice.actions;
const allTasksReducer = allTasksSlice.reducer;

const taskIdsSlice = createSlice({
  name: "tasks",
  initialState: ["task1", "task2", "task3", "task4", "task5"],
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
  },
  extraReducers: {}
});

const taskIdsReducer = taskIdsSlice.reducer;

export default combineReducers({
  all: allTasksReducer,
  ids: taskIdsReducer
});
