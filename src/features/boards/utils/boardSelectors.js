import { createSelector } from "@reduxjs/toolkit";

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

const selectCurrentBoardColumnIds = createSelector(
  [selectAllBoards, selectCurrentBoardId],
  (all, id) => all[id].columnIds
);

export {
  selectCurrentBoardId,
  selectCurrentBoard,
  selectCurrentBoardColumnIds,
  selectAllBoardsWithTitle
};

// -------------- Columns TODO: move --------------------- //
const selectColumns = createSelector(
  [state => state.columns],
  columns => columns
);

const selectColumnIds = createSelector(selectColumns, columns => columns.ids);
const selectAllColumns = createSelector(selectColumns, columns => columns.all);

const selectCurrentBoardColumns = createSelector(
  [selectCurrentBoardColumnIds, selectAllColumns],
  (columnIds, all) => columnIds.map(columnId => all[columnId])
);

export { selectCurrentBoardColumns, selectColumnIds, selectAllColumns };

// -------------- Tasks TODO: move -----------------------/
const selectTasks = createSelector([state => state.tasks], tasks => tasks);
const selectTaskIds = createSelector([selectTasks], tasks => tasks.ids);
const selectAllTasks = createSelector([selectTasks], tasks => tasks.all);

const selectColumnTaskIds = createSelector(
  [selectAllColumns, (_, column) => column],
  (all, column) => all[column.id].taskIds
);

// Need to pass in {column} prop
const selectColumnTasks = createSelector(
  [selectColumnTaskIds, selectAllTasks],
  (columnTaskIds, all) => columnTaskIds.map(taskId => all[taskId])
);

export { selectColumnTasks };
