import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectTaskContent } from "../../../app/redux/selectors";
import { RemoveTaskButton } from "./";
import { AddLabelButton } from "../../labels/components";

const TaskItem = ({ taskId, columnId }) => {
  const taskContent = useSelector(state => selectTaskContent(state, taskId));
  return (
    <div>
      {taskContent}
      <RemoveTaskButton taskId={taskId} columnId={columnId} />
      <AddLabelButton />
    </div>
  );
};

TaskItem.propTypes = {
  taskId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired
};

export default TaskItem;
