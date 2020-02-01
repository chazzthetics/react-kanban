import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { makeSelectColumnTasks } from "../../shared/selectors";
import { TaskItem } from "./";

const TaskList = ({ columnId }) => {
  const columnTasksSelector = useMemo(makeSelectColumnTasks, []);
  const tasks = useSelector(state => columnTasksSelector(state, columnId));

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
