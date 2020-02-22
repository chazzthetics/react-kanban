import React from "react";
import { useDispatch } from "react-redux";
import { useColumn, useLightMode } from "../../../hooks";
import { columnTitleEditing } from "../slices";
import { PseudoBox, Heading } from "@chakra-ui/core";

const ColumnTitle = ({ columnId }) => {
  const { title } = useColumn(columnId);
  const dispatch = useDispatch();
  const [isLightMode] = useLightMode();

  const handleEditColumnTitle = () => {
    dispatch(columnTitleEditing({ columnId }));
  };

  return (
    <PseudoBox
      d="flex"
      alignItems="center"
      justifyContent="center"
      py={2}
      pr={1}
      _hover={{
        backgroundColor: isLightMode ? "#d4d4d4" : "gray.500",
        borderRadius: 4
      }}
      transition="background-color 100ms ease-in"
    >
      <Heading
        as="h3"
        cursor="pointer"
        size="sm"
        fontSize=".9rem"
        fontWeight="semibold"
        ml={1}
        color={isLightMode ? "black" : "white"}
        onClick={handleEditColumnTitle}
      >
        {title}
      </Heading>
    </PseudoBox>
  );
};

export default ColumnTitle;
