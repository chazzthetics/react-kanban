import React from "react";
import PropTypes from "prop-types";
import { Flex, Spinner } from "@chakra-ui/core";

const FullPageSpinner = ({ height = "90vh" }) => {
  return (
    <Flex align="center" justify="center" h={height} overflow="hidden">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.100"
        color="gray.400"
        size="xl"
      />
    </Flex>
  );
};

FullPageSpinner.propTypes = {
  height: PropTypes.string
};

export default FullPageSpinner;
