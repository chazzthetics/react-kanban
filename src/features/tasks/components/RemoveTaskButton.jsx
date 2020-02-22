import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeTask } from "../slices";
import { TaskOptionButton } from "./";

const RemoveTaskButton = ({ taskId, columnId }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeTask({ taskId, columnId }));
  };

  return (
    <TaskOptionButton
      icon="delete"
      label="Remove Task"
      onClick={handleRemove}
    />
  );
};

RemoveTaskButton.propTypes = {
  taskId: PropTypes.string,
  columnId: PropTypes.string
};

export default React.memo(RemoveTaskButton);
