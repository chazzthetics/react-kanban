import React, { useEffect, Suspense, lazy } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { authenticateUser, getAuthState, selectUser } from "../features/auth";
import { selectCurrentBoardTitle } from "../features/boards/slices";
import { fetchData } from "../features/requests";
import { FullPageSpinner } from "../components";
import { Box } from "@chakra-ui/core";

const AppBar = lazy(() => import("../components/Layout/AppBar"));
const MainBoard = lazy(() => import("../features/boards/components/MainBoard"));

const BoardsPage = () => {
  const { token, error: authError } = useSelector(getAuthState);
  const user = useSelector(selectUser);
  const boardTitle = useSelector(selectCurrentBoardTitle);
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

  return (
    <Box className="App" h="100vh">
      <Helmet>
        <title>{boardTitle && `${boardTitle} |`} React Kanban</title>
      </Helmet>
      <Suspense fallback={<FullPageSpinner />}>
        <AppBar />
        <MainBoard />
      </Suspense>
    </Box>
  );
};

export default BoardsPage;
