import { createSlice, createAction } from "@reduxjs/toolkit";
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
      isEditing: false,
      labelIds: ["label1"]
    },
    task2: {
      id: "task2",
      content: "Milk the cows",
      completed: false,
      isEditing: false,
      labelIds: []
    },
    task3: {
      id: "task3",
      content: "Learn more about Redux",
      completed: false,
      isEditing: false,
      labelIds: []
    },
    task4: {
      id: "task4",
      content: "Go fishing next weekend",
      completed: false,
      isEditing: false,
      labelIds: []
    },
    task5: {
      id: "task5",
      content: "Learn more about Laravel",
      completed: false,
      isEditing: false,
      labelIds: []
    }
  },
  reducers: {
    taskCreated(state, action) {
      const { task } = action.payload;
      state[task.id] = task;
    },
    taskRemoved(state, action) {
      const { taskId } = action.payload;
      delete state[taskId];
    },
    labelAdded(state, action) {
      const { taskId, labelId } = action.payload;
      const labelIds = state[taskId].labelIds;
      if (!labelIds.includes(labelId)) {
        labelIds.push(labelId);
      }
    },
    taskLabelRemoved(state, action) {
      const { taskId, labelId } = action.payload;
      const labelIds = state[taskId].labelIds;
      const labelIndex = labelIds.indexOf(labelId);
      if (labelIds.includes(labelId)) {
        labelIds.splice(labelIndex, 1);
      }
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

export const {
  taskCreated,
  taskRemoved,
  labelAdded,
  taskLabelRemoved
} = allTasksSlice.actions;
export const allTasksReducer = allTasksSlice.reducer;
