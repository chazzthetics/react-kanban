import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { makeSelectColumn } from "../../columns/slices";
import { makeSelectColumnTasks } from "../../shared";
import { TaskItem } from "./";

const TaskList = ({ columnId }) => {
  const columnTasksSelector = useMemo(makeSelectColumnTasks, []);
  const tasks = useSelector(state => columnTasksSelector(state, columnId));

  const columnSelector = useMemo(makeSelectColumn, []);
  const { isLocked } = useSelector(state => columnSelector(state, columnId));

  return tasks.map((task, index) => (
    <Draggable
      key={task.id}
      index={index}
      draggableId={task.id}
      isDragDisabled={task.isEditing || isLocked}
    >
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
