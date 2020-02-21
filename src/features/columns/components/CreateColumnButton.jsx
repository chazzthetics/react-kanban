import React from "react";
import PropTypes from "prop-types";
import { useBoard } from "../../../hooks";
import { PseudoBox, Icon } from "@chakra-ui/core";

const CreateColumnButtom = ({ onOpen }) => {
  const { color, hasColumns } = useBoard();

  return (
    <PseudoBox
      as="button"
      d="flex"
      alignItems="center"
      textAlign="start"
      onClick={onOpen}
      fontWeight="normal"
      fontSize="14px"
      size="sm"
      minW="160px"
      w="17rem"
      h="40px"
      bg="rgba(0,0,0,0.3)"
      opacity={0.9}
      color="#fff"
      borderRadius={4}
      px={3}
      _hover={{
        opacity: 1,
        backgroundColor: `${color}.600`,
        textDecoration: "underline"
      }}
      transition="all 100ms ease-out"
      boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
    >
      <Icon name="add" size="14px" mr={2} />
      {hasColumns ? "Add another list" : "Add a list"}
    </PseudoBox>
  );
};

CreateColumnButtom.propTypes = {
  onOpen: PropTypes.func.isRequired
};

export default CreateColumnButtom;

// FIXME: refactor button
