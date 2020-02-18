import React from "react";
import { Flex, Spinner } from "@chakra-ui/core";

const FullPageSpinner = () => {
  return (
    <Flex
      align="center"
      justify="center"
      h="calc(100% - 40px)"
      bg="#437397"
      overflow="hidden"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="purple.100"
        color="purple.600"
        size="xl"
      />
    </Flex>
  );
};

export default FullPageSpinner;
