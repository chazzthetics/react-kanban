import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    user: null,
    token: localStorage.getItem("access_token") || null,
    isAuthenticated: false
  },
  reducers: {
    loginStart(state, action) {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
    loginSuccess(state, action) {
      const { token } = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      state.token = token;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    userAuthStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    userAuthSuccess(state, action) {
      const { user } = action.payload;
      state.loading = false;
      state.user = user;
      state.isAuthenticated = true;
      state.error = null;
    },
    userAuthFailed(state, action) {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    }
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  userAuthStart,
  userAuthSuccess,
  userAuthFailed
} = auth.actions;
const authReducer = auth.reducer;
export default authReducer;

const baseUrl = "http://localhost:8000/api";

export const login = ({ email, password }) => dispatch => {
  dispatch(loginStart());
  axios
    .post(`${baseUrl}/auth/login`, { email, password })
    .then(res => {
      const token = res.data.access_token;
      localStorage.setItem("access_token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      dispatch(loginSuccess({ token }));
    })
    .catch(err => dispatch(loginFailed(err.toString())));
};

export const getUser = token => async dispatch => {
  console.log("FROM LS", localStorage.getItem("access_token"));
  localStorage.setItem("access_token", token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const { data } = await axios.get(`${baseUrl}/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch(
      userAuthSuccess({
        user: data
      })
    );
  } catch (ex) {
    dispatch(userAuthFailed(ex.message.toString()));
  }
};
