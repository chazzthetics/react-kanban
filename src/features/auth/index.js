import authReducer, { login, getUser } from "./authSlice";
import { getAuthState, selectUser } from "./selectors";

export { authReducer as default, login, getUser, getAuthState, selectUser };
