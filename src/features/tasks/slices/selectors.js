import { createSelector } from "@reduxjs/toolkit";

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
  createSelector([makeSelectTask()], task => task.labelIds);
