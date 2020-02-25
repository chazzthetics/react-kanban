import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { authenticateUser, getAuthState, selectUser } from "../features/auth";
import { fetchData } from "../features/requests";
import { selectCurrentBoardTitle } from "../features/boards/slices";

/**
 * Authenticate user then make request for initial data
 */
const useAuth = () => {
  const { token, loading } = useSelector(getAuthState);
  const user = useSelector(selectUser);
  const boardTitle = useSelector(selectCurrentBoardTitle);

  const dispatch = useDispatch();

  const { boardId } = useParams();

  useEffect(() => {
    if (token && !user) {
      dispatch(authenticateUser(token));
    }
  }, [dispatch, token, user]);

  useEffect(() => {
    if (user && !boardTitle) {
      dispatch(fetchData(token, boardId));
    }
  }, [dispatch, user, token, boardTitle, boardId]);

  return { user, loading, boardTitle };
};

// const useAuth = () => {
//   const { token, loading } = useSelector(getAuthState);
//   const user = useSelector(selectUser);

//   const { boardTitle } = useBoard();

//   const dispatch = useDispatch();

//   const { boardId } = useParams();

//   useEffect(() => {
//     if (token && !user) {
//       dispatch(authenticateUser(token));
//     }
//   }, [dispatch, token, user]);

//   useEffect(() => {
//     if (user && !boardTitle) {
//       dispatch(fetchData(token, boardId));
//     }
//   }, [dispatch, user, token, boardTitle, boardId]);

//   return { user, loading };
// };

export default useAuth;
