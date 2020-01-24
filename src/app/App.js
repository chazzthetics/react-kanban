import React from "react";
import { AppBar } from "../components";
import { MainBoard } from "../features/boards/components";
import { Box } from "@chakra-ui/core";

const App = () => {
  return (
    <Box className="App" bg="gray.700" h="100vh">
      <AppBar />
      <MainBoard />
    </Box>
  );
};

export default App;
