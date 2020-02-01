// import { createSelector } from "@reduxjs/toolkit";

// /* Board Selectors */
// const selectBoards = createSelector([state => state.boards], boards => boards);
// const selectBoardIds = createSelector([selectBoards], boards => boards.ids);
// const selectAllBoards = createSelector([selectBoards], boards => boards.all);
// const selectCurrentBoardId = createSelector(
//   [selectBoards],
//   boards => boards.current
// );

// const selectAllBoardsWithTitle = createSelector(
//   [selectBoardIds, selectAllBoards],
//   (ids, all) => (ids ? ids.map(id => ({ id, title: all[id].title })) : [])
// );

// const selectCurrentBoardTitle = createSelector(
//   [selectCurrentBoardId, selectAllBoards],
//   (id, all) => (all[id] ? all[id].title : "")
// );

// const selectCurrentBoard = createSelector(
//   [selectCurrentBoardId, selectAllBoards],
//   (id, all) => all[id]
// );

// const selectCurrentBoardIsEditing = createSelector(
//   [selectCurrentBoard],
//   board => (board ? board.isEditing : null)
// );

// /* Column Selectors */
// const selectColumns = createSelector(
//   [state => state.columns],
//   columns => columns
// );

// const selectColumnIds = createSelector(selectColumns, columns => columns.ids);
// const selectAllColumns = createSelector(selectColumns, columns => columns.all);
// const selectColumn = createSelector(
//   [selectAllColumns, (_, columnId) => columnId],
//   (all, columnId) => all[columnId]
// );

// const selectColumnTitle = createSelector(
//   [selectColumn],
//   column => column.title
// );

// const selectColumnIsEditing = createSelector(
//   [selectColumn],
//   column => column.isEditing
// );

// const selectColumnIsLocked = createSelector(
//   [selectColumn],
//   column => column.isLocked
// );

// const selectColumnOptionsOpened = createSelector(
//   [selectColumn],
//   column => column.isOpen
// );

// /* Task Selectors */
// const selectTasks = createSelector([state => state.tasks], tasks => tasks);
// const selectTaskIds = createSelector([selectTasks], tasks => tasks.ids);
// const selectAllTasks = createSelector([selectTasks], tasks => tasks.all);

// const selectTask = createSelector(
//   [selectAllTasks, (_, taskId) => taskId],
//   (all, taskId) => all[taskId]
// );

// const selectTaskIsEditing = createSelector(
//   [selectTask],
//   task => task.isEditing
// );

// const selectTaskLabelIds = createSelector([selectTask], task => task.labelIds);
// const selectTaskContent = createSelector([selectTask], task => task.content);

// /* Label Selectors */
// const selectLabels = createSelector([state => state.labels], labels => labels);
// const selectLabelIds = createSelector([selectLabels], labels => labels.ids);
// const selectAllLabels = createSelector([selectLabels], labels => labels.all);

// /* Combined Selectors */
// const selectCurrentBoardColumnIds = createSelector(
//   [selectAllBoards, selectCurrentBoardId],
//   (all, id) => (all[id] ? all[id].columnIds : [])
// );

// const selectCurrentBoardColumns = createSelector(
//   [selectCurrentBoardColumnIds, selectAllColumns],
//   (columnIds, all) => columnIds.map(columnId => all[columnId])
// );

// const selectColumnTaskIds = createSelector(
//   [selectAllColumns, (_, columnId) => columnId],
//   (all, columnId) => all[columnId].taskIds
// );

// const selectColumnTasks = createSelector(
//   [selectColumnTaskIds, selectAllTasks],
//   (columnTaskIds, all) => columnTaskIds.map(taskId => all[taskId])
// );

// const selectTaskLabels = createSelector(
//   [selectTaskLabelIds, selectAllLabels],
//   (labelIds, all) => labelIds && labelIds.map(labelId => all[labelId])
// );

// export {
//   selectBoards,
//   selectBoardIds,
//   selectAllBoards,
//   selectCurrentBoard,
//   selectCurrentBoardId,
//   selectCurrentBoardTitle,
//   selectCurrentBoardIsEditing,
//   selectAllBoardsWithTitle,
//   selectColumns,
//   selectColumnIds,
//   selectAllColumns,
//   selectCurrentBoardColumns,
//   selectCurrentBoardColumnIds,
//   selectColumnTitle,
//   selectColumnTasks,
//   selectColumnTaskIds,
//   selectColumnIsEditing,
//   selectColumnIsLocked,
//   selectColumnOptionsOpened,
//   selectTasks,
//   selectTaskIds,
//   selectAllTasks,
//   selectTask,
//   selectTaskContent,
//   selectTaskIsEditing,
//   selectTaskLabelIds,
//   selectLabelIds,
//   selectAllLabels,
//   selectTaskLabels
// };

// //FIXME: clean up
