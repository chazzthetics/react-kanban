import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticateUser, getAuthState, selectUser } from "../features/auth";
import { fetchData } from "../features/requests";

/**
 * Authenticate user then make request for initial data
 */
const useAuth = () => {
  const { token, isAuthenticated, error: authError } = useSelector(
    getAuthState
  );

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!authError && token) {
      dispatch(authenticateUser(token));
    }
  }, [dispatch, authError, token]);

  useEffect(() => {
    if (token && user) {
      dispatch(fetchData(token));
    }
  }, [dispatch, token, user]);

  return { token, isAuthenticated, authError, user };
};

export default useAuth;

//FIXME: prevent effect from running after returning from dashboard board page
// TODO: No need to fire off getalldata on register, just get labels
