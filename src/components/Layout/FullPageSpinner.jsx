import React from "react";
import { Flex, Spinner } from "@chakra-ui/core";

const FullPageSpinner = () => {
  return (
    <Flex align="center" justify="center" h="100vh" bg="#437397">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="purple.200"
        color="purple.500"
        size="xl"
      />
    </Flex>
  );
};

export default FullPageSpinner;
