import React from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks";
import { MainBoard } from "../features/boards/components";
import { AppBar, FullPageSpinner } from "../components";
import { Box } from "@chakra-ui/core";

const BoardPage = () => {
  const { boardTitle } = useAuth();

  const { loading } = useSelector(state => state.request);

  return (
    <>
      <Helmet>
        <title>{boardTitle && `${boardTitle} |`} React Kanban</title>
      </Helmet>
      <Box className="App" h="100vh" overflowY="hidden">
        <AppBar dashboard={false} />
        {!loading ? <MainBoard /> : <FullPageSpinner />}
      </Box>
    </>
  );
};

export default BoardPage;
