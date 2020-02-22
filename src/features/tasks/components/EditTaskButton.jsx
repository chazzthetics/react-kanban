import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { taskEditing } from "../slices";
import { TaskOptionButton } from "./";

const EditTaskButton = ({ taskId }) => {
  const dispatch = useDispatch();

  const handleOpenEdit = () => {
    dispatch(taskEditing({ taskId }));
  };

  return (
    <TaskOptionButton icon="edit" label="Edit Task" onClick={handleOpenEdit} />
  );
};

EditTaskButton.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default React.memo(EditTaskButton);
