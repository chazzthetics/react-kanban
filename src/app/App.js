import React from "react";
import { AppBar } from "../components";
import { MainBoard } from "../features/boards/components";
import { Box } from "@chakra-ui/core";

import { useDispatch } from "react-redux";
import { fetchData } from "../api/requestSlice";

const App = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <Box className="App" bg="gray.700" h="100vh">
      <AppBar />
      <MainBoard />
    </Box>
  );
};

export default App;
