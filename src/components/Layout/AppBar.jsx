import React from "react";
import { Flex, Heading } from "@chakra-ui/core";
import { SelectBoardInput } from "../../features/boards/components";

const AppBar = () => {
  return (
    <Flex>
      <Heading color="white">React Kanban</Heading>
      <SelectBoardInput />
    </Flex>
  );
};

export default AppBar;
