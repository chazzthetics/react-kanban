import React, { memo, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  makeSelectColumnIsLocked,
  makeSelectColumnIsEditing,
  toggleLockColumn
} from "../slices";
import {
  ColumnTitle,
  ColumnOptionsPopover,
  EditColumnTitleForm,
  LockIconButton
} from "./";
import { Flex, ButtonGroup } from "@chakra-ui/core";

const ColumnHeader = ({ columnId }) => {
  const columnIsLockedSelector = useMemo(makeSelectColumnIsLocked, []);
  const isLocked = useSelector(state =>
    columnIsLockedSelector(state, columnId)
  );

  const columnIsEditingSelector = useMemo(makeSelectColumnIsEditing, []);
  const isEditing = useSelector(state =>
    columnIsEditingSelector(state, columnId)
  );

  const dispatch = useDispatch();

  const handleToggleLockColumn = useCallback(() => {
    dispatch(toggleLockColumn({ columnId, isLocked: !isLocked }));
  }, [dispatch, columnId, isLocked]);

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
          <LockIconButton
            isLocked={isLocked}
            icon="lock"
            onClick={handleToggleLockColumn}
          />
        ) : (
          <LockIconButton
            isLocked={isLocked}
            icon="unlock"
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

export default memo(ColumnHeader);
