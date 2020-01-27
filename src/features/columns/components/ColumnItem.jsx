import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { selectColumnIsEditing } from "../../../app/redux/selectors";
import { ColumnTitle, RemoveColumnButton, EditColumnTitleForm } from "./";
import { TaskList, CreateNewTaskForm } from "../../tasks/components";
import { Box, Flex } from "@chakra-ui/core";

const ColumnItem = ({ index, columnId }) => {
  const isEditing = useSelector(state =>
    selectColumnIsEditing(state, columnId)
  );

  return (
    <Draggable draggableId={`column-${columnId}`} index={index}>
      {provided => (
        <Box
          bg="gray.300"
          mr={3}
          py={2}
          px={4}
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
              <Flex
                direction="column"
                align="stretch"
                justify="center"
                mb={2}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <TaskList columnId={columnId} />
                {provided.placeholder}
              </Flex>
            )}
          </Droppable>
          <CreateNewTaskForm columnId={columnId} />
        </Box>
      )}
    </Draggable>
  );
};

ColumnItem.propTypes = {
  index: PropTypes.number.isRequired,
  columnId: PropTypes.string.isRequired
};

export default ColumnItem;
