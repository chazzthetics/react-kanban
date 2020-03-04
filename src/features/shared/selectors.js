import { createSelector } from "@reduxjs/toolkit";
import { arrayToObject } from "../../utils/arrayToObject";
import { selectCurrentBoardColumnIds } from "../boards/slices";
import { selectAllColumns, makeSelectColumnTaskIds } from "../columns/slices";
import { selectAllTasks, makeSelectTask } from "../tasks/slices";
import { selectAllLabels } from "../labels/slices";

export const selectCurrentBoardColumnsList = createSelector(
  [selectAllColumns, selectCurrentBoardColumnIds],
  (columns, ids) => (ids ? ids.map(id => columns[id]) : [])
);

export const selectCurrentBoardColumns = createSelector(
  [selectAllColumns, selectCurrentBoardColumnIds],
  (columns, ids) => (ids ? arrayToObject(ids.map(id => columns[id])) : [])
);

export const makeSelectColumnTasks = () =>
  createSelector(
    [makeSelectColumnTaskIds(), selectAllTasks],
    (columnTaskIds, tasks) =>
      columnTaskIds && columnTaskIds.map(taskId => tasks[taskId])
  );

export const makeSelectColumnIsDisabled = () =>
  createSelector([makeSelectColumnTasks()], columnTasks =>
    columnTasks.some(task => (task ? task.isEditing : false))
  );

export const makeSelectTaskLabels = () =>
  createSelector(
    [makeSelectTask(), selectAllLabels],
    (task, labels) =>
      task.labelIds && task.labelIds.map(labelId => labels[labelId])
  );
