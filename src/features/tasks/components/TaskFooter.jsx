import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { makeSelectBadgeDueDate, makeSelectTaskPriority } from "../slices";
import { TaskDueDate, TaskPriorityBadge } from "./";
import { Box, Flex } from "@chakra-ui/core";

const TaskFooter = ({ taskId }) => {
  const taskDueDateSelector = useMemo(makeSelectBadgeDueDate, []);
  const dueDate = useSelector(state => taskDueDateSelector(state, taskId));

  const taskPrioritySelector = useMemo(makeSelectTaskPriority, []);
  const priority = useSelector(state => taskPrioritySelector(state, taskId));

  return (
    <Flex pt={dueDate || priority ? 2 : 0} align="baseline" flexBasis="100%">
      <Box>{dueDate && <TaskDueDate taskId={taskId} dueDate={dueDate} />}</Box>
      <Box>
        {priority && <TaskPriorityBadge taskId={taskId} priority={priority} />}
      </Box>
    </Flex>
  );
};

TaskFooter.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default TaskFooter;
