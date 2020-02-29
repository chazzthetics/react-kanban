import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { taskDueDateOpened } from "../slices";
import { Tag, TagLabel, Icon } from "@chakra-ui/core";
import { ChangeTaskDueDateModal } from "./";

const TaskDueDate = ({ taskId, dueDate }) => {
  const dispatch = useDispatch();

  const handleOpenDateModal = () => {
    dispatch(taskDueDateOpened({ taskId }));
  };

  return (
    <>
      <Tag
        size="sm"
        variantColor="blue"
        onClick={handleOpenDateModal}
        _hover={{ boxShadow: "0 0 0 2px darkblue" }}
        transition="box-shadow 150ms ease-in"
        mr={4}
      >
        <Icon size="1rem" name="time" mr={2} />
        <TagLabel>{dueDate}</TagLabel>
      </Tag>
      <ChangeTaskDueDateModal taskId={taskId} />
    </>
  );
};

TaskDueDate.propTypes = {
  taskId: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired
};

export default TaskDueDate;
