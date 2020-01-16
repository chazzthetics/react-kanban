import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { selectColumnTasks } from "../../../app/redux/selectors";
import TaskItem from "./TaskItem";

const TaskList = ({ column }) => {
  const tasks = useSelector(state => selectColumnTasks(state, column));

  return tasks.map((task, index) => (
    <Draggable key={task.id} index={index} draggableId={task.id}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TaskItem task={task} columnId={column.id} />
        </div>
      )}
    </Draggable>
  ));
};

TaskList.propTypes = {
  column: PropTypes.object
};

export default TaskList;

//TODO: proptypes
