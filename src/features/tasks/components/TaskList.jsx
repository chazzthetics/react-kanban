import React from "react";
import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";

const TaskList = props => {
  const { all, ids } = useSelector(state => state.tasks);

  return (
    <div>
      {ids.map(id => (
        <li key={id}>{all[id].content}</li>
      ))}
    </div>
  );
};

export default TaskList;
