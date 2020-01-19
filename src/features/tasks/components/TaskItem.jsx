import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectTask } from "../../../app/redux/selectors";
import RemoveTaskButton from "./RemoveTaskButton";

const TaskItem = ({ taskId, columnId }) => {
  const task = useSelector(state => selectTask(state, taskId));

  return (
    <div>
      {task.content}
      <RemoveTaskButton taskId={taskId} columnId={columnId} />
    </div>
  );
};

TaskItem.propTypes = {
  taskId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired
};

//FIXME: check proptypes
export default TaskItem;
