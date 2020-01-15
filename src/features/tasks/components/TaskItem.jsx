import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { taskAdded, taskRemoved } from "../slices";
import { makeTask } from "../utils/makeTasks";

const TaskItem = props => {
  const [taskContent, setTaskContent] = useState("");
  const handleChange = e => {
    setTaskContent(e.target.value);
  };

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const task = makeTask({ content: taskContent });
    dispatch(taskAdded({ task, columnId: "column1" }));
  };

  const handleRemove = e => {
    dispatch(taskRemoved({ taskId: "task3", columnId: "column2" }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add new task..."
          name="taskValue"
          onChange={handleChange}
          value={taskContent}
        />
        <button type="submit">Add Task</button>
      </form>
      <button type="button" onClick={handleRemove}>
        Delete Task
      </button>
    </div>
  );
};

TaskItem.propTypes = {};

export default TaskItem;
