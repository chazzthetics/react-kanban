import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { selectColumnIsEditing } from "../../../app/redux/selectors";
import { ColumnTitle, RemoveColumnButton, EditColumnTitleForm } from "./";
import { TaskList, CreateNewTaskForm } from "../../tasks/components";

const ColumnItem = ({ index, columnId }) => {
  const isEditing = useSelector(state =>
    selectColumnIsEditing(state, columnId)
  );

  return (
    <Draggable draggableId={columnId} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {!isEditing ? (
            <ColumnTitle columnId={columnId} />
          ) : (
            <EditColumnTitleForm columnId={columnId} />
          )}
          <RemoveColumnButton columnId={columnId} />
          <Droppable droppableId={columnId} type="task">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <TaskList columnId={columnId} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <CreateNewTaskForm columnId={columnId} />
        </div>
      )}
    </Draggable>
  );
};

ColumnItem.propTypes = {
  index: PropTypes.number.isRequired,
  columnId: PropTypes.string.isRequired
};

export default ColumnItem;
