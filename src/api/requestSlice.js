import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { arrayToObject } from "../utils/arrayToObject";

// TODO: move into features folder
const request = createSlice({
  name: "request",
  initialState: {
    loading: false,
    error: null
  },
  reducers: {
    requestStart(state) {
      state.loading = true;
      state.error = null;
    },
    requestSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    requestFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    requestBoardsSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    requestBoardsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    requestColumnsSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    requestColumnsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    requestTasksSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    requestTasksFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
export const {
  requestStart,
  requestSuccess,
  requestFailed,
  requestBoardsSuccess,
  requestBoardsFailed,
  requestColumnsSuccess,
  requestColumnsFailed,
  requestTasksSuccess,
  requestTasksFailed
} = request.actions;
const requestReducer = request.reducer;

export default requestReducer;

const getBoards = () => axios.get("/api/boards");
const getColumns = () => axios.get("/api/columns");
const getTasks = () => axios.get("/api/tasks");
const getData = () => axios.get("/api/all");

export const fetchData = () => async dispatch => {
  dispatch(requestStart());
  try {
    const { data } = await getData();

    dispatch(
      requestSuccess({
        boards: arrayToObject(data.boards),
        columns: arrayToObject(data.columns),
        tasks: arrayToObject(data.tasks),
        labels: arrayToObject(data.labels)
      })
    );
  } catch (ex) {
    dispatch(requestFailed(ex.toString()));
  }
  //TODO: normalize in middleware?
};

export const fetchBoards = boardId => async dispatch => {
  try {
    const { data } = await getBoards();

    dispatch(
      requestBoardsSuccess({
        boardId,
        boards: arrayToObject(data)
      })
    );
  } catch (ex) {
    dispatch(requestBoardsFailed(ex.toString()));
    console.error(ex);
  }
};

export const fetchColumns = ({ boardId, columnId }) => async dispatch => {
  try {
    const { data } = await getColumns();

    dispatch(
      requestColumnsSuccess({
        boardId,
        columns: arrayToObject(data),
        columnId
      })
    );
  } catch (ex) {
    console.error(ex);
  }
};

export const fetchTasks = ({ columnId, taskId }) => async dispatch => {
  try {
    const { data } = await getTasks();

    dispatch(
      requestTasksSuccess({
        columnId,
        tasks: arrayToObject(data),
        taskId
      })
    );
  } catch (ex) {
    console.error(ex);
  }
};
