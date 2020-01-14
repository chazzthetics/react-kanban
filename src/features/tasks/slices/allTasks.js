import { createSlice } from "@reduxjs/toolkit";

const initialData = {
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
};

const allTasksSlice = createSlice({
  name: "tasks",
  initialState: initialData,
  reducers: {
    taskAdded(state, action) {
      const { task } = action.payload;
      state[task.id] = task;
    },
    taskRemoved(state, action) {
      const { taskId } = action.payload;
      delete state[taskId];
    }
  }
});

export const { taskAdded, taskRemoved } = allTasksSlice.actions;

const allTasksReducer = allTasksSlice.reducer;
export default allTasksReducer;
