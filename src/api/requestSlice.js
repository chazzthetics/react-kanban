import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { arrayToObject } from "../utils/arrayToObject";

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
    }
  }
});
export const {
  requestStart,
  requestSuccess,
  requestFailed
} = requestSlice.actions;
const requestReducer = requestSlice.reducer;

export default requestReducer;

const getBoards = () => axios.get("/api/boards");
const getColumns = () => axios.get("/api/columns");
const getTasks = () => axios.get("/api/tasks");

export const fetchData = () => dispatch => {
  dispatch(requestStart());
  axios
    .all([getBoards(), getColumns(), getTasks()])
    .then(
      axios.spread((boards, columns, tasks) => {
        dispatch(
          requestSuccess({
            boards: arrayToObject(boards.data),
            columns: arrayToObject(columns.data),
            tasks: arrayToObject(tasks.data)
          })
        );
      })
    )
    .catch(ex => dispatch(requestFailed(ex.toString())));
};
