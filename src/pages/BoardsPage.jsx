import React, { useEffect, Suspense, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, getAuthState, selectUser } from "../features/auth";
import { fetchData } from "../features/requests";
import { FullPageSpinner } from "../components";
import { Box } from "@chakra-ui/core";

const AppBar = lazy(() => import("../components/Layout/AppBar"));
const MainBoard = lazy(() => import("../features/boards/components/MainBoard"));

const BoardsPage = () => {
  const { token, error: authError } = useSelector(getAuthState);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!authError && token) {
      dispatch(getUser(token));
    }
  }, [dispatch, authError, token]);

  useEffect(() => {
    if (token && user) {
      dispatch(fetchData(token));
    }
  }, [dispatch, token, user]);

  return (
    <Box className="App" h="100vh">
      <Suspense fallback={<FullPageSpinner />}>
        <AppBar />
        <Suspense fallback={<FullPageSpinner />}>
          <MainBoard />
        </Suspense>
      </Suspense>
    </Box>
  );
};

export default BoardsPage;
