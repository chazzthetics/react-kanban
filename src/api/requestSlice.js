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
} = requestSlice.actions;
const requestReducer = requestSlice.reducer;

export default requestReducer;

const getBoards = () => axios.get("/api/boards");
const getColumns = () => axios.get("/api/columns");
const getTasks = () => axios.get("/api/tasks");

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

// export const silentFetchData = boardId => async dispatch => {
//   let res;
//   try {
//     res = await axios.get("/api/all");
//   } catch (ex) {
//     dispatch(requestFailed(ex.toString()));
//   }
//   dispatch(
//     requestSuccess({
//       boardId,
//       boards: arrayToObject(res.data.boards),
//       columns: arrayToObject(res.data.columns),
//       tasks: arrayToObject(res.data.tasks)
//     })
//   );
// };
