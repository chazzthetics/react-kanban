import { createSlice } from "@reduxjs/toolkit";
import { arrayToObject } from "../../utils/arrayToObject";
import { getData, boardsApi, columnsApi, tasksApi } from "../../api";

const request = createSlice({
  name: "request",
  initialState: {
    loading: true,
    error: null
  },
  reducers: {
    requestInitialDataStart: start,
    requestInitialDataSuccess: success,
    requestInitialDataFailed: error,
    requestBoardsSuccess: success,
    requestBoardsFailed: error,
    requestColumnsSuccess: success,
    requestColumnsFailed: error,
    requestTasksSuccess: success,
    requestTasksFailed: error
  }
});

export const {
  requestInitialDataStart,
  requestInitialDataSuccess,
  requestInitialDataFailed,
  requestBoardsSuccess,
  requestBoardsFailed,
  requestColumnsSuccess,
  requestColumnsFailed,
  requestTasksSuccess,
  requestTasksFailed
} = request.actions;

const requestReducer = request.reducer;
export default requestReducer;

function start(state) {
  state.loading = true;
  state.error = null;
}

function success(state) {
  state.loading = false;
  state.error = null;
}
function error(state, action) {
  state.loading = false;
  state.error = action.payload;
}

//TODO: move to own slice/service

export const fetchData = token => async dispatch => {
  dispatch(requestInitialDataStart());
  try {
    const { data } = await getData(token);

    dispatch(
      requestInitialDataSuccess({
        boards: data.boards.data,
        columns: data.columns.data,
        tasks: data.tasks.data,
        labels: data.labels.data
      })
    );
  } catch (ex) {
    dispatch(requestInitialDataFailed(ex.toString()));
  }
};

export const fetchBoards = boardId => async dispatch => {
  try {
    const { data } = await boardsApi.get();

    dispatch(
      requestBoardsSuccess({
        boardId,
        boards: arrayToObject(data.data)
      })
    );
  } catch (ex) {
    dispatch(requestBoardsFailed(ex.toString()));
    console.error(ex);
  }
};

export const fetchColumns = ({ boardId, columnId }) => async dispatch => {
  try {
    const { data } = await columnsApi.get();
    dispatch(
      requestColumnsSuccess({
        boardId,
        columns: arrayToObject(data.data),
        columnId
      })
    );
  } catch (ex) {
    dispatch(requestColumnsFailed(ex.toString()));
    console.error(ex);
  }
};

export const fetchTasks = ({ columnId, taskId }) => async dispatch => {
  try {
    const { data } = await tasksApi.get();

    dispatch(
      requestTasksSuccess({
        columnId,
        tasks: arrayToObject(data.data),
        taskId
      })
    );
  } catch (ex) {
    dispatch(requestTasksFailed(ex.toString()));
    console.error(ex);
  }
};
