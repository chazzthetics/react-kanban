import React from "react";
import { AppBar } from "../components";
import { MainBoard } from "../features/boards/components";
import { Box } from "@chakra-ui/core";

const BoardsPage = () => {
  return (
    <Box className="App" h="100vh">
      <AppBar />
      <MainBoard />
    </Box>
  );
};

export default BoardsPage;
