import { createSelector } from "@reduxjs/toolkit";

const getColumnState = createSelector(
  [state => state.columns],
  columns => columns
);

export const selectAllColumns = createSelector(
  [getColumnState],
  columns => columns.all
);

export const makeSelectColumn = () =>
  createSelector(
    [selectAllColumns, (_, columnId) => columnId],
    (columns, columnId) => columns[columnId]
  );

export const selectColumnTaskIds = createSelector(
  [selectAllColumns, (_, columnId) => columnId],
  (columns, columnId) => (columns ? columns[columnId].taskIds : [])
);

export const makeSelectColumnTaskIdsLength = () =>
  createSelector([selectColumnTaskIds], columnTaskIds => columnTaskIds.length);

export const selectColumnTitle = createSelector(
  [selectAllColumns, (_, columnId) => columnId],
  (columns, columnId) => (columns ? columns[columnId].title : "")
);

export const makeSelectColumnTitle = () =>
  createSelector([selectColumnTitle], title => title);

export const selectColumnIsLocked = createSelector(
  [selectAllColumns, (_, columnId) => columnId],
  (columns, columnId) => (columns ? columns[columnId].isLocked : false)
);

export const makeSelectColumnIsLocked = () =>
  createSelector([selectColumnIsLocked], isLocked => isLocked);

export const selectColumnIsEditing = createSelector(
  [selectAllColumns, (_, columnId) => columnId],
  (columns, columnId) => (columns ? columns[columnId].isEditing : false)
);

export const makeSelectColumnIsEditing = () =>
  createSelector([selectColumnIsEditing], isEditing => isEditing);

export const selectColumnIsOpen = createSelector(
  [selectAllColumns, (_, columnId) => columnId],
  (columns, columnId) => (columns ? columns[columnId].isOpen : false)
);

export const makeSelectColumnIsOpen = () =>
  createSelector([selectColumnIsOpen], isOpen => isOpen);
