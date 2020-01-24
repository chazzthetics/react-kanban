import React from "react";
import { MainBoard } from "../features/boards/components";
import { Box } from "@chakra-ui/core";
const App = () => {
  return (
    <Box className="App" p={2} bg="gray.700" h="100vh">
      <h1>React Kanban</h1>
      <MainBoard />
    </Box>
  );
};

export default App;
