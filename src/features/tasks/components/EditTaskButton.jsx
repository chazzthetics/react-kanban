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
      onClick={handleOpenEdit}
    />
  );
};

EditTaskButton.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default EditTaskButton;
