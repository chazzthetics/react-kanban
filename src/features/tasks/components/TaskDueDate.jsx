import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeDueDate } from "../slices";
import { Tag, TagLabel, Icon } from "@chakra-ui/core";

const TaskDueDate = ({ taskId, dueDate }) => {
  const dispatch = useDispatch();

  const handleClearDate = useCallback(() => {
    dispatch(removeDueDate({ taskId }));
  }, [dispatch, taskId]);

  return (
    <Tag
      size="sm"
      variantColor="blue"
      mr={5}
      onClick={handleClearDate}
      _hover={{ boxShadow: "0 0 0 2px darkblue" }}
      transition="box-shadow 150ms ease-in"
    >
      <Icon size="1rem" name="time" mr={2} />
      <TagLabel>{dueDate}</TagLabel>
    </Tag>
  );
};

TaskDueDate.propTypes = {
  taskId: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired
};

export default TaskDueDate;
