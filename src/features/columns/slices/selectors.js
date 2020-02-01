import { createSelector } from "@reduxjs/toolkit";

const getColumnState = createSelector(
  [state => state.columns],
  columns => columns
);

export const selectAllColumns = createSelector(
  [getColumnState],
  columns => columns.all
);

export const selectColumnTaskIds = createSelector(
  [selectAllColumns, (_, columnId) => columnId],
  (columns, columnId) => (columns ? columns[columnId].taskIds : [])
);

export const makeSelectColumnTaskIdsLength = () =>
  createSelector([selectColumnTaskIds], columnTaskIds => columnTaskIds.length);

export const makeSelectColumn = () =>
  createSelector(
    [selectAllColumns, (_, columnId) => columnId],
    (columns, columnId) => columns[columnId]
  );
