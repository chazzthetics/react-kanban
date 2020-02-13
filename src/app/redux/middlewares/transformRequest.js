import { requestInitialDataSuccess } from "../../../features/shared";
import { arrayToObject } from "../../../utils/arrayToObject";

export const transformRequest = _store => next => action => {
  if (action.type === requestInitialDataSuccess) {
    const { boards, columns, tasks, labels } = action.payload;
    return next({
      type: action.type,
      payload: {
        ...action.payload,
        boards: arrayToObject(boards),
        columns: arrayToObject(columns),
        tasks: arrayToObject(tasks),
        labels: arrayToObject(labels)
      }
    });
  } else {
    return next(action);
  }
};
