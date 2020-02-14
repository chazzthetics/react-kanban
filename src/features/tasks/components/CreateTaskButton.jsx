import React from "react";
import PropTypes from "prop-types";
import { useColumn } from "../../../hooks";
import { PseudoBox, Icon } from "@chakra-ui/core";

const CreateTaskButton = ({ onOpen, columnId }) => {
  const { hasTasks } = useColumn(columnId);

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
      bg="#FFF"
      borderRadius={4}
      px={3}
      opacity={0.8}
      _hover={{
        opacity: 1,
        backgroundColor: "#f2f2f2",
        textDecoration: "underline"
      }}
      transition="all 150ms ease-out"
      boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
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

export default CreateTaskButton;

// FIXME: refactor button
