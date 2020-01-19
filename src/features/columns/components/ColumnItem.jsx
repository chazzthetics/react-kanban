import React from "react";
import PropTypes from "prop-types";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { selectCurrentBoardId } from "../../../app/redux/selectors";
import { TaskList, CreateNewTaskForm } from "../../tasks/components";
import RemoveColumnButtom from "./RemoveColumnButton";

const ColumnItem = ({ index, column }) => {
  const boardId = useSelector(selectCurrentBoardId);

  return (
    <Draggable draggableId={column.id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h4>{column.title}</h4>
          <RemoveColumnButtom columnId={column.id} boardId={boardId} />
          <Droppable droppableId={column.id} type="task">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <TaskList column={column} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <CreateNewTaskForm column={column} />
        </div>
      )}
    </Draggable>
  );
};

ColumnItem.propTypes = {
  column: PropTypes.object
};

export default ColumnItem;

//TODO: proptypes
