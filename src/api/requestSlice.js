import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { arrayToObject } from "../utils/arrayToObject";

// TODO: move into features folder
const requestSlice = createSlice({
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
    }
  }
});
export const {
  requestStart,
  requestSuccess,
  requestFailed,
  requestBoardsSuccess,
  requestColumnsSuccess
} = requestSlice.actions;
const requestReducer = requestSlice.reducer;

export default requestReducer;

const getBoards = () => axios.get("/api/boards");
// const getColumns = () => axios.get("/api/columns");
// const getTasks = () => axios.get("/api/tasks");

export const fetchData = () => async dispatch => {
  let res;
  dispatch(requestStart());
  try {
    res = await axios.get("/api/all");
  } catch (ex) {
    dispatch(requestFailed(ex.toString()));
  }
  dispatch(
    requestSuccess({
      boards: arrayToObject(res.data.boards),
      columns: arrayToObject(res.data.columns),
      tasks: arrayToObject(res.data.tasks)
    })
  );
};

// TODO: split into separate fetches

export const silentFetchData = boardId => async dispatch => {
  let res;
  try {
    res = await axios.get("/api/all");
  } catch (ex) {
    dispatch(requestFailed(ex.toString()));
  }
  dispatch(
    requestSuccess({
      boardId,
      boards: arrayToObject(res.data.boards),
      columns: arrayToObject(res.data.columns),
      tasks: arrayToObject(res.data.tasks)
    })
  );
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
    console.error(ex);
    dispatch(requestFailed(ex.toString()));
  }
};
