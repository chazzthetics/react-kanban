import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { PseudoBox, Icon } from "@chakra-ui/core";
import { makeSelectColumnTaskIdsLength } from "../../columns/slices";

const CreateTaskButton = ({ onOpen, columnId }) => {
  const columnTaskIdsLengthSelector = useMemo(
    makeSelectColumnTaskIdsLength,
    []
  );

  const hasTask = useSelector(state =>
    columnTaskIdsLengthSelector(state, columnId)
  );

  return (
    <PseudoBox
      as="button"
      d="flex"
      alignItems="center"
      textAlign="start"
      onClick={onOpen}
      fontWeight="normal"
      fontSize="14px"
      minW="160px"
      size="sm"
      w="17rem"
      h="36px"
      bg="gray.300"
      borderRadius={4}
      px={3}
      _hover={{ bg: "gray.200" }}
      boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
    >
      <Icon name="add" size="12px" mr={2} />
      {hasTask ? "Add another task" : "Add a task"}
    </PseudoBox>
  );
};

CreateTaskButton.propTypes = {
  onOpen: PropTypes.func.isRequired,
  columnId: PropTypes.string.isRequired
};

export default CreateTaskButton;

// FIXME: refactor button
