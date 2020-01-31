import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeTask } from "../slices";
import { IconButton } from "@chakra-ui/core";

const RemoveTaskButton = ({ taskId, columnId }) => {
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
    />
  );
};

RemoveTaskButton.propTypes = {
  taskId: PropTypes.string,
  columnId: PropTypes.string
};

export default RemoveTaskButton;
