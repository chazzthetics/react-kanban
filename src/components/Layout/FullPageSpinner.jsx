import React from "react";
import { useBoard } from "../../hooks";
import { Flex, Spinner } from "@chakra-ui/core";

const FullPageSpinner = () => {
  const { color } = useBoard();

  return (
    <Flex
      align="center"
      justify="center"
      h="calc(100% - 40px)"
      bg={`${color}.300`}
      overflow="hidden"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor={`${color}.100`}
        color={`${color}.400`}
        size="xl"
      />
    </Flex>
  );
};

export default FullPageSpinner;
