import React, { memo, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { makeSelectColumnTaskIdsLength } from "../../columns/slices";
import { useLightMode } from "../../../hooks";
import { PseudoBox, Icon } from "@chakra-ui/core";

const CreateTaskButton = ({ onOpen, columnId }) => {
  const [isLightMode] = useLightMode();

  const hasTasksSelector = useMemo(makeSelectColumnTaskIdsLength, []);
  const hasTasks = useSelector(state => hasTasksSelector(state, columnId));

  const handleClick = useCallback(() => {
    onOpen();
  }, [onOpen]);

  return (
    <PseudoBox
      as="button"
      d="flex"
      alignItems="center"
      textAlign="start"
      onClick={handleClick}
      fontWeight="normal"
      fontSize="14px"
      size="sm"
      w="17rem"
      h="36px"
      color={isLightMode ? "gray.800" : "gray.200"}
      bg={isLightMode ? "#ebecf0" : "gray.700"}
      borderRadius={4}
      px={3}
      transition="all 150ms ease-out"
      boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
      _hover={{
        backgroundColor: isLightMode ? "#ddd" : "gray.500",
        color: isLightMode ? "black" : "white",
        textDecoration: "underline"
      }}
      _focus={{
        outline: "none",
        boxShadow: "2px 4px 6px -4px rgba(0, 0, 0, 1)"
      }}
    >
      <Icon name="add" size="12px" mr={2} />
      {hasTasks ? "Add another task" : "Add a task"}
    </PseudoBox>
  );
};

CreateTaskButton.propTypes = {
  onOpen: PropTypes.func.isRequired,
  columnId: PropTypes.string.isRequired
};

export default memo(CreateTaskButton);

// FIXME: refactor button
