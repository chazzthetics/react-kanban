import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { makeSelectColumn } from "../../columns/slices";
import { removeTask } from "../slices";
import { IconButton } from "@chakra-ui/core";

const RemoveTaskButton = ({ taskId, columnId }) => {
  const columnSelector = useMemo(makeSelectColumn, []);
  const { isLocked } = useSelector(state => columnSelector(state, columnId));

  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeTask({ taskId, columnId }));
  };

  return (
    <IconButton
      onClick={handleRemove}
      size="sm"
      aria-label="Remove Task"
      icon="delete"
      disabled={isLocked}
    />
  );
};

RemoveTaskButton.propTypes = {
  taskId: PropTypes.string,
  columnId: PropTypes.string
};

export default React.memo(RemoveTaskButton);
