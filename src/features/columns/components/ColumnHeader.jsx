import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { selectColumnTitle } from "../../../app/redux/selectors";
import { columnTitleEditing } from "../slices";
import { Flex, Heading } from "@chakra-ui/core";
import { ColumnOptionsPopover } from "./";

const ColumnHeader = ({ columnId }) => {
  const columnTitle = useSelector(state => selectColumnTitle(state, columnId));

  const dispatch = useDispatch();
  const handleEditColumnTitle = () => {
    dispatch(columnTitleEditing({ columnId }));
  };

  return (
    <Flex
      h="36px"
      align="center"
      justify="space-between"
      borderRadius={4}
      mb={2}
    >
      <Heading
        as="h3"
        cursor="pointer"
        size="sm"
        fontSize=".9rem"
        fontWeight="semibold"
        ml={1}
        onClick={handleEditColumnTitle}
      >
        {columnTitle}
      </Heading>
      <ColumnOptionsPopover columnId={columnId} />
    </Flex>
  );
};

ColumnHeader.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default ColumnHeader;
