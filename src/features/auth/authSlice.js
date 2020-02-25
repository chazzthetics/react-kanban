import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../api";

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
    loginStart(state) {
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
    registerStart(state) {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
    registerSuccess(state, action) {
      const { token } = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      state.token = token;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    userAuthStart(state) {
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
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    }
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  userAuthStart,
  userAuthSuccess,
  userAuthFailed,
  logoutSuccess
} = auth.actions;
const authReducer = auth.reducer;
export default authReducer;

export const login = ({ email, password }) => async dispatch => {
  dispatch(loginStart());
  try {
    const { data } = await authApi.login({ email, password });
    const token = data.access_token;
    if (token) {
      localStorage.setItem("access_token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      dispatch(loginSuccess({ token }));
      dispatch(authenticateUser(token));
    }
  } catch (ex) {
    dispatch(loginFailed(ex.toString()));
    console.error(ex);
  }
};

export const register = ({ name, email, password }) => async dispatch => {
  dispatch(registerStart());
  try {
    const { data } = await authApi.register({ name, email, password });
    const token = data.access_token;
    if (token) {
      localStorage.setItem("access_token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      dispatch(registerSuccess({ token }));
      dispatch(authenticateUser(token));
    }
  } catch (ex) {
    dispatch(loginFailed(ex.toString()));
    console.error(ex);
  }
};

export const authenticateUser = token => async dispatch => {
  dispatch(userAuthStart());
  try {
    if (token) {
      localStorage.setItem("access_token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const { data } = await authApi.getUser(token);
    dispatch(
      userAuthSuccess({
        user: data
      })
    );
  } catch (ex) {
    dispatch(userAuthFailed(ex.message.toString()));
    console.error(ex);
  }
};

export const logout = () => async dispatch => {
  try {
    localStorage.removeItem("access_token");
    await authApi.logout();
    dispatch(logoutSuccess());
  } catch (ex) {
    console.error(ex);
  }
};
