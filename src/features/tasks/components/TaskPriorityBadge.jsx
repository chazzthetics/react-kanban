import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removePriority } from "../slices";
import { Badge } from "@chakra-ui/core";

const getBadgeColor = priority => {
  switch (priority) {
    case "lowest":
      return "green.200";
    case "low":
      return "green.400";
    case "medium":
      return "yellow.300";
    case "high":
      return "orange.300";
    case "highest":
      return "red.300";
    default:
      return "green.300";
  }
};

//TODO: text-color, hover, focus styles
const TaskPriorityBadge = ({ taskId, priority }) => {
  const dispatch = useDispatch();

  const handleRemovePriority = () => {
    dispatch(removePriority({ taskId }));
  };

  return (
    <Badge
      bg={`${getBadgeColor(priority)}`}
      color="black"
      variant="subtle"
      onClick={handleRemovePriority}
    >
      {priority}
    </Badge>
  );
};

TaskPriorityBadge.propTypes = {
  taskId: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired
};

export default TaskPriorityBadge;
