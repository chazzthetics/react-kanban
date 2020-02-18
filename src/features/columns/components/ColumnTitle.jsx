import React from "react";
import { useDispatch } from "react-redux";
import { useColumn } from "../../../hooks";
import { columnTitleEditing } from "../slices";
import { PseudoBox, Heading } from "@chakra-ui/core";

const ColumnTitle = ({ columnId }) => {
  const { title } = useColumn(columnId);
  const dispatch = useDispatch();

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
        backgroundColor: "#d4d4d4",
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
        color="#000"
        onClick={handleEditColumnTitle}
      >
        {title}
      </Heading>
    </PseudoBox>
  );
};

export default ColumnTitle;
