import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { taskEditing } from "../slices";
import { IconButton } from "@chakra-ui/core";

const EditTaskButton = ({ taskId }) => {
  const dispatch = useDispatch();

  const handleOpenEdit = () => {
    dispatch(taskEditing({ taskId }));
  };

  return (
    <IconButton
      size="sm"
      aria-label="Edit Task"
      icon="edit"
      variant="ghost"
      opacity={0.2}
      _hover={{ backgroundColor: "#ebecf0", opacity: 1 }}
      transition="background-color 100ms ease-in, opacity 100ms ease-in"
      onClick={handleOpenEdit}
    />
  );
};

EditTaskButton.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default React.memo(EditTaskButton);

//TODO: refactor
