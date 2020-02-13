import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useColumn } from "../../../hooks";
import { columnTitleEditing, toggleLockColumn } from "../slices";
import { Flex, Heading, IconButton, ButtonGroup } from "@chakra-ui/core";
import { ColumnOptionsPopover, EditColumnTitleForm } from "./";

const ColumnHeader = ({ columnId }) => {
  const { title, isLocked, isEditing } = useColumn(columnId);

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
      mb={1}
    >
      {!isEditing ? (
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
      ) : (
        <EditColumnTitleForm columnId={columnId} />
      )}

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

export default React.memo(ColumnHeader);
