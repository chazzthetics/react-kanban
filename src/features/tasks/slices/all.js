import { createSlice } from "@reduxjs/toolkit";
import { arrayToObject } from "../../../utils/arrayToObject";
import { fetchTasks } from "../../requests";
import { tasksApi } from "../../../api";
import {
  boardRemoved,
  boardCleared,
  columnRemoved,
  columnCleared,
  requestInitialDataSuccess,
  requestTasksSuccess,
  requestTasksFailed
} from "../../shared";

/**
 * All Tasks Slice
 */
const allTasks = createSlice({
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
      const { taskId, content } = action.payload;
      if (state[taskId].content !== content) {
        state[taskId].content = content;
        state[taskId].isEditing = false;
      }
    },
    taskCompleteToggled(state, action) {
      const { taskId, completed } = action.payload;
      state[taskId].completed = !completed;
    },
    taskLabelAdded(state, action) {
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
    [requestInitialDataSuccess]: tasksLoaded,
    [requestTasksSuccess]: tasksLoaded,
    [requestTasksFailed]: (state, action) => {
      //TODO:
    },
    [boardRemoved]: cascadeFromBoard,
    [boardCleared]: cascadeFromBoard,
    [columnRemoved]: cascadeFromColumn,
    [columnCleared]: cascadeFromColumn
  }
});

function tasksLoaded(_state, action) {
  const { tasks } = action.payload;
  return tasks;
}

function cascadeFromBoard(state, action) {
  const { removed } = action.payload;
  const taskIds = removed.flatMap(column => column.taskIds);
  taskIds.forEach(taskId => {
    if (state[taskId]) {
      delete state[taskId];
    }
  });
}

function cascadeFromColumn(state, action) {
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
}

export const {
  taskCreated,
  taskRemoved,
  taskEditing,
  taskEditingCancelled,
  taskContentUpdated,
  taskCompleteToggled,
  taskLabelAdded,
  taskLabelRemoved
} = allTasks.actions;
export const allTasksReducer = allTasks.reducer;

//TODO: refactor

export const createTask = ({ task, columnId }) => async dispatch => {
  try {
    dispatch(taskCreated({ task, columnId }));
    const { data } = await tasksApi.create({ task, columnId });

    dispatch(fetchTasks({ columnId, taskId: data.data.id }));
  } catch (ex) {
    console.error(ex);
  }
};

export const removeTask = ({ taskId, columnId }) => async dispatch => {
  try {
    dispatch(taskRemoved({ taskId, columnId }));
    await tasksApi.remove({ taskId });
  } catch (ex) {
    console.error(ex);
  }
};

export const updateTaskContent = ({ taskId, content }) => async (
  dispatch,
  getState
) => {
  try {
    const oldTaskContent = getState().tasks.all[taskId].content;
    if (oldTaskContent !== content) {
      dispatch(taskContentUpdated({ taskId, content }));
      await tasksApi.updateContent({ taskId, content });
    } else {
      dispatch(taskEditingCancelled({ taskId }));
    }
  } catch (ex) {
    console.error(ex);
  }
};

export const toggleCompleteTask = ({ taskId, completed }) => async dispatch => {
  try {
    dispatch(taskCompleteToggled({ taskId, completed }));
    await tasksApi.toggleComplete({ taskId, completed });
  } catch (ex) {
    console.error(ex);
  }
};

export const addLabelToTask = ({ taskId, labelId }) => async dispatch => {
  try {
    dispatch(taskLabelAdded({ taskId, labelId }));
    await tasksApi.addLabel({ taskId, labelId });
  } catch (ex) {
    console.error(ex);
  }
};

export const removeLabelFromTask = ({ taskId, labelId }) => async dispatch => {
  try {
    dispatch(taskLabelRemoved({ taskId, labelId }));
    await tasksApi.removeLabel({ taskId, labelId });
  } catch (ex) {
    console.error(ex);
  }
};
