import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useColumn } from "../../../hooks";
import { toggleLockColumn } from "../slices";
import { Flex, IconButton, ButtonGroup } from "@chakra-ui/core";
import { ColumnTitle, ColumnOptionsPopover, EditColumnTitleForm } from "./";

const ColumnHeader = ({ columnId }) => {
  const { isLocked, isEditing } = useColumn(columnId);

  const dispatch = useDispatch();

  const handleToggleLockColumn = () => {
    dispatch(toggleLockColumn({ columnId, isLocked: !isLocked }));
  };

  return (
    <Flex
      h="36px"
      align="center"
      justify="space-between"
      cursor={isEditing ? "default" : "pointer"}
      borderRadius={4}
      mb={1}
    >
      {!isEditing ? (
        <ColumnTitle columnId={columnId} />
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
