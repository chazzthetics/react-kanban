import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  columnTitleEditing,
  toggleLockColumn,
  makeSelectColumn
} from "../slices";
import { Flex, Heading, IconButton, ButtonGroup } from "@chakra-ui/core";
import { ColumnOptionsPopover } from "./";

const ColumnHeader = ({ columnId }) => {
  const columnSelector = useMemo(makeSelectColumn, []);

  const { title, isLocked } = useSelector(state =>
    columnSelector(state, columnId)
  );

  const dispatch = useDispatch();

  const handleEditColumnTitle = () => {
    dispatch(columnTitleEditing({ columnId }));
  };

  const handleToggleLockColumn = () => {
    dispatch(toggleLockColumn({ columnId, isLocked: !isLocked }));
  };

  return (
    <Flex
      h="36px"
      align="center"
      justify="space-between"
      cursor="pointer"
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
        {title}
      </Heading>
      <ButtonGroup d="flex" spacing={0}>
        {isLocked ? (
          <IconButton
            size="sm"
            icon="lock"
            variant="ghost"
            onClick={handleToggleLockColumn}
          />
        ) : (
          <IconButton
            size="sm"
            icon="unlock"
            variant="ghost"
            opacity={0}
            _hover={{ opacity: 1 }}
            onClick={handleToggleLockColumn}
          />
        )}
        <ColumnOptionsPopover columnId={columnId} />
      </ButtonGroup>
    </Flex>
  );
};

ColumnHeader.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default ColumnHeader;
