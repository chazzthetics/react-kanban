import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { selectColumnTasks } from "../../../app/redux/selectors";
import TaskItem from "./TaskItem";

const TaskList = ({ columnId }) => {
  const tasks = useSelector(state => selectColumnTasks(state, columnId));

  return tasks.map((task, index) => (
    <Draggable key={task.id} index={index} draggableId={task.id}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TaskItem taskId={task.id} columnId={columnId} />
        </div>
      )}
    </Draggable>
  ));
};

TaskList.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default TaskList;
