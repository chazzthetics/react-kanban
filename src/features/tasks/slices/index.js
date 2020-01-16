import { createSlice, createAction, combineReducers } from "@reduxjs/toolkit";
import { arrayToObject } from "../../../utils/arrayToObject";
const boardRemoved = createAction("boards/boardRemoved");
const columnRemoved = createAction("columns/columnRemoved");

/**
 * All Tasks Slice
 */
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
  extraReducers: {
    [boardRemoved]: (state, action) => {
      const { removed } = action.payload;
      const taskIds = removed.flatMap(column => column.taskIds);
      taskIds.forEach(taskId => {
        if (state[taskId]) {
          delete state[taskId];
        }
      });
    },
    [columnRemoved]: (state, action) => {
      const { columnTasks } = action.payload;
      const columnTaskIds = Object.keys(arrayToObject(columnTasks));
      const taskIds = Object.keys(state);
      const newTaskIds = taskIds.filter(
        columnId => !columnTaskIds.includes(columnId)
      );
      const newTasks = {};
      for (const taskId of newTaskIds) {
        newTasks[taskId] = state[taskId];
      }
      return newTasks;
      //TODO: refactor (see column slice boardRemoved)
    }
  }
});

export const { taskAdded, taskRemoved } = allTasksSlice.actions;
const allTasksReducer = allTasksSlice.reducer;

/**
 * Task Ids Slice
 */
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
  extraReducers: {
    [boardRemoved]: (state, action) => {
      const { removed } = action.payload;
      const taskIds = removed.flatMap(column => column.taskIds);
      return state.filter(taskId => !taskIds.includes(taskId));
    },
    [columnRemoved]: (state, action) => {
      const { columnTasks } = action.payload;
      const taskIds = Object.keys(arrayToObject(columnTasks));
      return state.filter(taskId => !taskIds.includes(taskId));
    }
  }
});

const taskIdsReducer = taskIdsSlice.reducer;

/**
 * Tasks Reducer
 */
export default combineReducers({
  all: allTasksReducer,
  ids: taskIdsReducer
});
