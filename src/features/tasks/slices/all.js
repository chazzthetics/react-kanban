import axios from "axios";
import uuid from "uuid/v4";
import { createSlice } from "@reduxjs/toolkit";
import { arrayToObject } from "../../../utils/arrayToObject";
import { silentFetchData } from "../../../api/requestSlice";

const boardRemoved = "boards/boardRemoved";
const boardCleared = "boards/boardCleared";
const columnRemoved = "columns/columnRemoved";
const requestSuccess = "request/requestSuccess";

/**
 * All Tasks Slice
 */
const allTasksSlice = createSlice({
  name: "tasks",
  initialState: {},
  reducers: {
    taskCreated(state, action) {
      const { task } = action.payload;
      state[task.id] = task;
    },
    taskRemoved(state, action) {
      const { taskId } = action.payload;
      delete state[taskId];
    },
    taskEditing(state, action) {
      const { taskId } = action.payload;
      state[taskId].isEditing = true;
    },
    taskEditingCancelled(state, action) {
      const { taskId } = action.payload;
      state[taskId].isEditing = false;
    },
    taskContentUpdated(state, action) {
      const { taskId, taskContent } = action.payload;
      state[taskId].content = taskContent;
      state[taskId].isEditing = false;
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
    [requestSuccess]: (state, action) => {
      const { tasks } = action.payload;
      return tasks;
    },
    [boardRemoved]: (state, action) => {
      const { removed } = action.payload;
      const taskIds = removed.flatMap(column => column.taskIds);
      taskIds.forEach(taskId => {
        if (state[taskId]) {
          delete state[taskId];
        }
      }); // TODO: refactor duplicate logic below
    },
    [boardCleared]: (state, action) => {
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
  taskEditing,
  taskEditingCancelled,
  taskContentUpdated,
  labelAdded,
  taskLabelRemoved
} = allTasksSlice.actions;
export const allTasksReducer = allTasksSlice.reducer;

export const createTask = ({ task, columnId, boardId }) => async dispatch => {
  const newTask = {
    content: task.content,
    column_id: columnId,
    completed: task.completed
  };
  const client = {
    id: uuid(),
    content: task.content,
    completed: task.completed
  };

  try {
    dispatch(taskCreated({ task: client, columnId }));
    await axios.post("/api/tasks", newTask);
    dispatch(silentFetchData(boardId));
  } catch (ex) {
    console.error(ex);
  }
};

export const removeTask = ({ taskId, columnId }) => async dispatch => {
  try {
    dispatch(taskRemoved({ taskId, columnId }));
    await axios.delete(`/api/tasks/${taskId}`);
  } catch (ex) {
    console.error(ex);
  }
};
