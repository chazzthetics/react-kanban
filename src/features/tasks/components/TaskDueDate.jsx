import React, { memo, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { makeSelectTaskCompleted, taskDueDateOpened } from "../slices";
import { getDueDateColor } from "../utils/getDueDateColor";
import { Tag, TagLabel, Icon } from "@chakra-ui/core";
import { ChangeTaskDueDateModal } from "./";

const TaskDueDate = ({ taskId, dueDate }) => {
  const taskCompletedSelector = useMemo(makeSelectTaskCompleted, []);
  const completed = useSelector(state => taskCompletedSelector(state, taskId));

  const dispatch = useDispatch();

  const handleOpenDateModal = useCallback(() => {
    dispatch(taskDueDateOpened({ taskId }));
  }, [dispatch, taskId]);

  return (
    <>
      <Tag
        size="sm"
        opacity={completed ? 0.6 : 1}
        variantColor={getDueDateColor(dueDate)}
        onClick={handleOpenDateModal}
        _hover={{ opacity: 0.8 }}
        transition="opacity 150ms ease-in"
        mr={4}
      >
        <Icon size="1rem" name="time" mr={2} />
        <TagLabel fontSize="0.8rem">{dueDate}</TagLabel>
      </Tag>
      <ChangeTaskDueDateModal taskId={taskId} />
    </>
  );
};

TaskDueDate.propTypes = {
  taskId: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired
};

export default memo(TaskDueDate);
