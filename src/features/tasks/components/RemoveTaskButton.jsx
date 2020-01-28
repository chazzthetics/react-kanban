import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeTask } from "../slices";
import { RemoveButton } from "../../../components";

const RemoveTaskButton = ({ taskId, columnId }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeTask({ taskId, columnId }));
  };

  return <RemoveButton onRemove={handleRemove} value="&times;" />;
};

RemoveTaskButton.propTypes = {
  taskId: PropTypes.string,
  columnId: PropTypes.string
};

export default RemoveTaskButton;
