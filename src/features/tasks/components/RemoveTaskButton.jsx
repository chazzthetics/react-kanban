import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { taskRemoved } from "../slices";

const RemoveTaskButton = ({ taskId, columnId }) => {
  const dispatch = useDispatch();

  const handleRemove = e => {
    dispatch(taskRemoved({ taskId, columnId }));
  };

  return (
    <button type="button" onClick={handleRemove}>
      &times;
    </button>
  );
};

RemoveTaskButton.propTypes = {
  taskId: PropTypes.string,
  columnId: PropTypes.string
};

export default RemoveTaskButton;

//TODO: proptypes
