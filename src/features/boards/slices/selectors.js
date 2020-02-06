import { createSelector } from "@reduxjs/toolkit";

const getBoardState = createSelector([state => state.boards], boards => boards);

export const selectBoardIds = createSelector(
  [getBoardState],
  boards => boards.ids
);

export const selectAllBoards = createSelector(
  [getBoardState],
  boards => boards.all
);

export const selectAllBoardsWithTitle = createSelector(
  [selectAllBoards, selectBoardIds],
  (all, ids) => (ids ? ids.map(id => ({ id, title: all[id].title })) : [])
);

export const selectCurrentBoardId = createSelector(
  [getBoardState],
  boards => boards.current
);

export const selectCurrentBoard = createSelector(
  [selectAllBoards, selectCurrentBoardId],
  (all, id) => all[id]
);

export const selectCurrentBoardTitle = createSelector(
  [selectCurrentBoard],
  board => (board ? board.title : "")
);

export const selectCurrentBoardIsEditing = createSelector(
  [selectCurrentBoard],
  board => (board ? board.isEditing : false)
);

export const selectCurrentBoardColumnIds = createSelector(
  [selectCurrentBoard],
  board => (board ? board.columnIds : [])
);

export const selectCurrentBoardColumnIdsLength = createSelector(
  [selectCurrentBoardColumnIds],
  columnIds => columnIds.length
);