import React from "react";
import { Flex, Spinner } from "@chakra-ui/core";

const FullPageSpinner = () => {
  return (
    <Flex align="center" justify="center" h="100vh">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
};

export default FullPageSpinner;
