import { arrayToObject } from "../../../utils/arrayToObject";

const BOARD_REMOVED = "boards/boardRemoved";
const COLUMN_REMOVED = "columns/columnRemoved";

export const cascadeOnDelete = store => next => action => {
  const state = store.getState();
  const { boardId, columnId } = action.payload;

  switch (action.type) {
    case BOARD_REMOVED:
      const boardIds = state.boards.ids;
      const boardColumnIds = state.boards.all[boardId].columnIds;
      const columns = state.columns.all;
      const boardColumnsArray = boardColumnIds.map(
        columnId => columns[columnId]
      );
      const removedBoardColumns = arrayToObject(boardColumnsArray);
      console.log(removedBoardColumns);

      return next({
        type: action.type,
        payload: {
          ...action.payload,
          boardIds,
          boardColumns: removedBoardColumns
        }
      });
    case COLUMN_REMOVED:
      const columnIds = state.columns.ids;
      const columnTaskIds = state.columns.all[columnId].taskIds;
      const tasks = state.tasks.all;
      const columnTasksArray = columnTaskIds.map(taskId => tasks[taskId]);
      const columnTasks = arrayToObject(columnTasksArray);
      return next({
        type: action.type,
        payload: { ...action.payload, columnIds, columnTasks }
      });
    default:
      return next(action);
  }
};

// TODO: REFACTOR! make into thunk instead? use selectors? move into separate reducer? something...
