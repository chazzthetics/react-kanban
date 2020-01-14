import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { taskActions } from "../slices";

const TaskItem = props => {
  const [taskValue, setTaskValue] = useState("");
  const handleChange = e => {
    setTaskValue(e.target.value);
  };

  const { taskAdded, taskRemoved } = taskActions;
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const newTask = {
      id: `taskNew${Math.floor(Math.random() * 20)}`, // temp
      content: taskValue,
      completed: false,
      isEditing: false
    };
    dispatch(taskAdded({ task: newTask, columnId: "column1" }));
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
          value={taskValue}
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
