import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuthState } from "../features/auth";
import { fetchData } from "../features/requests";
import { selectCurrentBoardTitle } from "../features/boards/slices";

const useInitialFetch = boardId => {
  const { user, token } = useSelector(getAuthState);
  const boardTitle = useSelector(selectCurrentBoardTitle);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && !boardTitle) {
      dispatch(fetchData(token, boardId));
    }
  }, [dispatch, user, token, boardTitle, boardId]);
};

export default useInitialFetch;
