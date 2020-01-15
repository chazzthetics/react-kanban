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
  [selectAllBoards, selectCurrentBoardId],
  (all, id) => all[id].title
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
  selectBoards,
  selectBoardIds,
  selectAllBoards,
  selectAllBoardsWithTitle,
  selectCurrentBoard,
  selectCurrentBoardId,
  selectCurrentBoardTitle,
  selectCurrentBoardColumnIds
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

export {
  selectColumns,
  selectColumnIds,
  selectAllColumns,
  selectCurrentBoardColumns
};
