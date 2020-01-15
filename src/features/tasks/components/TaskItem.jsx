import React from "react";
import RemoveTaskButton from "./RemoveTaskButton";

const TaskItem = ({ task, columnId }) => {
  return (
    <div>
      {task.content}
      <RemoveTaskButton taskId={task.id} columnId={columnId} />
    </div>
  );
};

export default TaskItem;
