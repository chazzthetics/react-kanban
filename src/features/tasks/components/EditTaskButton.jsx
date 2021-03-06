import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { taskEditing } from "../slices";
import { TaskOptionButton } from "./";

const EditTaskButton = ({ taskId }) => {
  const dispatch = useDispatch();

  const handleOpenEdit = useCallback(() => {
    dispatch(taskEditing({ taskId }));
  }, [dispatch, taskId]);

  return (
    <TaskOptionButton icon="edit" label="Edit Task" onClick={handleOpenEdit} />
  );
};

EditTaskButton.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default memo(EditTaskButton);
