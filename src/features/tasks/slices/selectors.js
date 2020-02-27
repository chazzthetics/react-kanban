import { createSelector } from "@reduxjs/toolkit";
import { formatTagDate } from "../../../utils/dates";

const getTaskState = createSelector([state => state.tasks], tasks => tasks);

export const selectAllTasks = createSelector(
  [getTaskState],
  tasks => tasks.all
);

export const makeSelectTask = () =>
  createSelector(
    [selectAllTasks, (_, taskId) => taskId],
    (tasks, taskId) => tasks[taskId]
  );

export const makeSelectTaskLabelIds = () =>
  createSelector([makeSelectTask()], task => task && task.labelIds);

export const makeSelectTaskContent = () =>
  createSelector([makeSelectTask()], task => task && task.content);

export const makeSelectTaskIsEditing = () =>
  createSelector([makeSelectTask()], task => task && task.isEditing);

export const makeSelectTaskCompleted = () =>
  createSelector([makeSelectTask()], task => task && task.completed);

export const makeSelectTaskDueDate = () =>
  createSelector([makeSelectTask()], task => task && task.dueDate);

export const makeSelectBadgeDueDate = () =>
  createSelector(
    [makeSelectTask()],
    task => task && formatTagDate(task.dueDate)
  );

export const makeSelectTaskPriority = () =>
  createSelector([makeSelectTask()], task => task && task.priority);
