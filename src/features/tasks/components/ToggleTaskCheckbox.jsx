import React, { memo, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { makeSelectTaskCompleted, toggleCompleteTask } from "../slices";
import { Checkbox } from "@chakra-ui/core";

const ToggleTaskCheckbox = ({ taskId }) => {
  const dispatch = useDispatch();

  const taskCompletedSelector = useMemo(makeSelectTaskCompleted, []);
  const completed = useSelector(state => taskCompletedSelector(state, taskId));

  const handleToggleComplete = useCallback(() => {
    dispatch(toggleCompleteTask({ taskId, completed }));
  }, [dispatch, taskId, completed]);

  return (
    <Checkbox onChange={handleToggleComplete} isChecked={completed} mr={4} />
  );
};

ToggleTaskCheckbox.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default memo(ToggleTaskCheckbox);
