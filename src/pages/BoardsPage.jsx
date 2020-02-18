import React from "react";
import { Helmet } from "react-helmet";
import { useAuth, useBoard } from "../hooks";
import { AppBar } from "../components";
import { MainBoard } from "../features/boards/components";
import { Box } from "@chakra-ui/core";

const BoardsPage = () => {
  const { boardTitle } = useBoard();
  useAuth();

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
