import { createSelector } from "@reduxjs/toolkit";

// Board Selectors
const selectBoards = createSelector([state => state.boards], boards => boards);

const selectBoardIds = createSelector([selectBoards], boards => boards.ids);

const selectAllBoards = createSelector([selectBoards], boards => boards.all);

const selectCurrentBoardId = createSelector(
  [selectBoards],
  boards => boards.current.id
);

const selectAllBoardsWithTitle = createSelector(
  [selectBoardIds, selectAllBoards],
  (ids, all) => ids.map(id => ({ id, title: all[id].title }))
);

const selectCurrentBoardTitle = createSelector(
  [selectCurrentBoardId, selectAllBoards],
  (id, all) => all[id].title
);

const selectCurrentBoard = createSelector(
  [selectCurrentBoardId, selectCurrentBoardTitle],
  (id, title) => ({ id, title })
);

// Column Selectors
const selectColumns = createSelector(
  [state => state.columns],
  columns => columns
);

const selectColumnIds = createSelector(selectColumns, columns => columns.ids);

const selectAllColumns = createSelector(selectColumns, columns => columns.all);

const selectColumnTaskIds = createSelector(
  [selectAllColumns, (_, column) => column],
  (all, column) => all[column.id].taskIds
);

const selectCurrentBoardColumnIds = createSelector(
  [selectAllBoards, selectCurrentBoardId],
  (all, id) => all[id].columnIds
);

const selectCurrentBoardColumns = createSelector(
  [selectCurrentBoardColumnIds, selectAllColumns],
  (columnIds, all) => columnIds.map(columnId => all[columnId])
);

// Task Selectors
const selectTasks = createSelector([state => state.tasks], tasks => tasks);

const selectTaskIds = createSelector([selectTasks], tasks => tasks.ids);

const selectAllTasks = createSelector([selectTasks], tasks => tasks.all);

// Need to pass in {column} prop
const selectColumnTasks = createSelector(
  [selectColumnTaskIds, selectAllTasks],
  (columnTaskIds, all) => columnTaskIds.map(taskId => all[taskId])
);

export {
  selectAllBoards,
  selectCurrentBoardId,
  selectCurrentBoard,
  selectAllBoardsWithTitle,
  selectColumnIds,
  selectCurrentBoardColumns,
  selectCurrentBoardColumnIds,
  selectColumnTasks,
  selectTaskIds
};
