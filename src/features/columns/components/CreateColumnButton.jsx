import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useLightMode } from "../../../hooks";
import {
  selectCurrentBoardColor,
  selectCurrentBoardColumnIdsLength
} from "../../boards/slices";
import { PseudoBox, Icon } from "@chakra-ui/core";

const CreateColumnButtom = ({ onOpen }) => {
  const [isLightMode] = useLightMode();

  const color = useSelector(selectCurrentBoardColor);
  const hasColumns = useSelector(selectCurrentBoardColumnIdsLength);

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
      minW="17rem"
      w="17rem"
      h="40px"
      bg="rgba(0, 0, 0, 0.3)"
      opacity={0.9}
      color="#fff"
      borderRadius={4}
      px={3}
      transition="all 150ms ease-out"
      boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
      _hover={{
        opacity: 1,
        backgroundColor: isLightMode ? `${color}.600` : `${color}.300`,
        color: isLightMode ? "white" : "black",
        textDecoration: "underline"
      }}
      _focus={{
        outline: "none",
        boxShadow: "2px 4px 6px -4px rgba(0, 0, 0, 1)"
      }}
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
