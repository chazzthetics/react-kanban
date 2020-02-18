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
      size="sm"
      aria-label="Remove Task"
      variant="ghost"
      opacity={0.2}
      _hover={{ backgroundColor: "#ebecf0", opacity: 1 }}
      transition="background-color 100ms ease-in, opacity 100ms ease-in"
      icon="delete"
      onClick={handleRemove}
    />
  );
};

RemoveTaskButton.propTypes = {
  taskId: PropTypes.string,
  columnId: PropTypes.string
};

export default React.memo(RemoveTaskButton);

//TODO: refactor
