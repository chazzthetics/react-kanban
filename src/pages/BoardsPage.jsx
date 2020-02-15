import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { authenticateUser, getAuthState, selectUser } from "../features/auth";
import { selectCurrentBoardTitle } from "../features/boards/slices";
import { fetchData } from "../features/requests";
import { AppBar } from "../components";
import { MainBoard } from "../features/boards/components";
import { Box } from "@chakra-ui/core";

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
    <>
      <Helmet>
        <title>{boardTitle && `${boardTitle} |`} React Kanban</title>
      </Helmet>
      <Box className="App" h="100vh" bg="#437397">
        <AppBar />
        <MainBoard />
      </Box>
    </>
  );
};

export default BoardsPage;

//FIXME: on load
