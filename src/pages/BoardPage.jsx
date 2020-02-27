import React from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth, useInitialFetch } from "../hooks";
import { MainBoard } from "../features/boards/components";
import { AppBar, FullPageSpinner } from "../components";
import { Box } from "@chakra-ui/core";
import { selectCurrentBoardTitle } from "../features/boards/slices";

const BoardPage = () => {
  const { boardId } = useParams();
  useAuth();
  useInitialFetch(boardId);

  const boardTitle = useSelector(selectCurrentBoardTitle);

  const { loading } = useSelector(state => state.request);

  return (
    <>
      <Helmet>
        <title>{boardTitle && `${boardTitle} |`} React Kanban</title>
      </Helmet>
      <Box className="App" h="100%" overflowY="auto">
        <AppBar dashboard={false} />
        {!loading ? <MainBoard /> : <FullPageSpinner />}
      </Box>
    </>
  );
};

export default BoardPage;
