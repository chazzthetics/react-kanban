import { createSlice } from "@reduxjs/toolkit";
import { arrayToObject } from "../../../utils/arrayToObject";
import { formatDate } from "../../../utils/dates";
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
      state[taskId].content = content;
    },
    taskDueDateOpened(state, action) {
      const { taskId } = action.payload;
      state[taskId].isDueDate = true;
    },
    taskDueDateClosed(state, action) {
      const { taskId } = action.payload;
      state[taskId].isDueDate = false;
      state[taskId].isEditing = false;
    },
    taskDueDateChanged(state, action) {
      const { taskId, dueDate } = action.payload;
      state[taskId].dueDate = dueDate;
    },
    taskDueDateRemoved(state, action) {
      const { taskId } = action.payload;
      state[taskId].dueDate = "";
      state[taskId].isDueDate = false;
    },
    taskPriorityOpened(state, action) {
      const { taskId } = action.payload;
      state[taskId].isPriority = true;
    },
    taskPriorityClosed(state, action) {
      const { taskId } = action.payload;
      state[taskId].isPriority = false;
    },
    taskPriorityChanged(state, action) {
      const { taskId, priority } = action.payload;
      state[taskId].priority = priority;
      state[taskId].isEditing = false;
    },
    taskPriorityRemoved(state, action) {
      const { taskId } = action.payload;
      state[taskId].priority = "";
      state[taskId].isPriority = false;
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
  taskDueDateOpened,
  taskDueDateClosed,
  taskDueDateChanged,
  taskDueDateRemoved,
  taskPriorityOpened,
  taskPriorityClosed,
  taskPriorityChanged,
  taskPriorityRemoved,
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
    await tasksApi.remove(taskId);
  } catch (ex) {
    console.error(ex);
  }
};

export const updateTaskContent = ({ taskId, content }) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(taskEditingCancelled({ taskId }));
    const oldTaskContent = getState().tasks.all[taskId].content;
    if (oldTaskContent !== content) {
      dispatch(taskContentUpdated({ taskId, content }));
      await tasksApi.updateContent({ taskId, content });
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

export const changeDueDate = ({ taskId, dueDate }) => async (
  dispatch,
  getState
) => {
  const format = "yyyy-MM-dd";
  try {
    dispatch(taskDueDateClosed({ taskId }));

    const oldDueDate = getState().tasks.all[taskId].dueDate;
    const formatted = formatDate(dueDate, format);

    if (oldDueDate !== formatted.toString()) {
      dispatch(taskDueDateChanged({ taskId, dueDate: formatted }));
      await tasksApi.addDueDate({ taskId, dueDate: formatted });
    }
  } catch (ex) {
    console.error(ex);
  }
};

export const removeDueDate = taskId => async dispatch => {
  try {
    dispatch(taskDueDateRemoved({ taskId }));
    await tasksApi.removeDueDate(taskId);
  } catch (ex) {
    console.error(ex);
  }
};

export const changePriority = ({ taskId, priority }) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(taskPriorityClosed({ taskId }));

    const oldPriority = getState().tasks.all[taskId].priority;
    if (priority !== oldPriority) {
      dispatch(taskPriorityChanged({ taskId, priority }));
      await tasksApi.addPriority({ taskId, priority });
    }
  } catch (ex) {
    console.error(ex);
  }
};

export const removePriority = taskId => async dispatch => {
  try {
    dispatch(taskPriorityRemoved({ taskId }));
    await tasksApi.removePriority(taskId);
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
