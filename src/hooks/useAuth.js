import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticateUser, getAuthState } from "../features/auth";

/**
 * Authenticate user
 */
const useAuth = () => {
  const { user, token, loading } = useSelector(getAuthState);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token && !user) {
      dispatch(authenticateUser(token));
    }
  }, [dispatch, token, user]);

  return { user, loading };
};

export default useAuth;
