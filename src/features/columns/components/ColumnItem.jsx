import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TaskList, CreateNewTaskForm } from "../../tasks/components";
import {
  selectColumnTitle,
  selectColumnIsEditing
} from "../../../app/redux/selectors";
import { columnTitleEditing } from "../slices";
import RemoveColumnButtom from "./RemoveColumnButton";
import EditColumnTitleForm from "./EditColumnTitleForm";

const ColumnItem = ({ index, columnId }) => {
  const columnTitle = useSelector(state => selectColumnTitle(state, columnId));

  const isEditing = useSelector(state =>
    selectColumnIsEditing(state, columnId)
  );

  const dispatch = useDispatch();
  const handleEditColumnTitle = () => {
    dispatch(columnTitleEditing({ columnId }));
  };

  return (
    <Draggable draggableId={columnId} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {!isEditing ? (
            <h4 style={{ cursor: "pointer" }} onClick={handleEditColumnTitle}>
              {columnTitle}
            </h4>
          ) : (
            <EditColumnTitleForm columnId={columnId} />
          )}
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
