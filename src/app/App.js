import React, { useEffect } from "react";
import { AppBar } from "../components";
import { MainBoard } from "../features/boards/components";
import { Box } from "@chakra-ui/core";

import { useDispatch } from "react-redux";
import { fetchData } from "../api/requestSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <Box className="App" h="100vh">
      <AppBar />
      <MainBoard />
    </Box>
  );
};

export default App;
