const BOARD_REMOVED = "boards/boardRemoved";
const COLUMN_REMOVED = "columns/columnRemoved";
const BOARD_CLEARED = "boards/boardCleared";

export const cascadeOnDelete = store => next => action => {
  const state = store.getState();

  switch (action.type) {
    case BOARD_REMOVED:
    case BOARD_CLEARED:
      const { boardId } = action.payload;
      const boardIds = state.boards.ids;
      const boardColumnIds = state.boards.all[boardId]
        ? state.boards.all[boardId].columnIds
        : [];

      const columns = state.columns.all;
      const removedColumns = boardColumnIds.map(columnId => columns[columnId]);

      return next({
        type: action.type,
        payload: {
          ...action.payload,
          boardIds,
          removed: removedColumns
        }
      });
    case COLUMN_REMOVED:
      const { columnId } = action.payload;
      const columnIds = state.columns.ids;
      const columnTaskIds = state.columns.all[columnId].taskIds;
      const tasks = state.tasks.all;
      const columnTasks = columnTaskIds.map(taskId => tasks[taskId]);

      return next({
        type: action.type,
        payload: { ...action.payload, columnIds, columnTasks }
      });
    default:
      return next(action);
  }
};

// TODO: REFACTOR! make into thunk instead? use selectors? move into separate reducer? something...
// TODO: need to remove tasks when board is deleted
