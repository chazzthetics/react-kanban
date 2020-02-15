import authReducer, {
  login,
  logout,
  register,
  authenticateUser
} from "./authSlice";
import { getAuthState, selectUser } from "./selectors";

export {
  authReducer as default,
  login,
  logout,
  register,
  authenticateUser,
  getAuthState,
  selectUser
};
