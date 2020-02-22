import React from "react";
import PropTypes from "prop-types";
import { ButtonGroup } from "@chakra-ui/core";
import { EditTaskButton, RemoveTaskButton } from "./";

const TaskOptions = ({ taskId, columnId }) => {
  return (
    <ButtonGroup d="flex" alignItems="center">
      <EditTaskButton taskId={taskId} />
      <RemoveTaskButton taskId={taskId} columnId={columnId} />
    </ButtonGroup>
  );
};

TaskOptions.propTypes = {
  taskId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired
};

export default TaskOptions;
