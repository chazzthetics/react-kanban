import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TaskList, CreateNewTaskForm } from "../../tasks/components";
import { selectColumnTitle } from "../../../app/redux/selectors";
import RemoveColumnButtom from "./RemoveColumnButton";

const ColumnItem = ({ index, columnId }) => {
  const columnTitle = useSelector(state => selectColumnTitle(state, columnId));

  return (
    <Draggable draggableId={columnId} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h4>{columnTitle}</h4>
          <RemoveColumnButtom columnId={columnId} />
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
