import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Draggable, Droppable } from "react-beautiful-dnd";
import {
  selectColumnIsLocked,
  selectColumnIsEditing,
  selectColumnOptionsOpened
} from "../../../app/redux/selectors";
import { ColumnHeader, EditColumnTitleForm } from "./";
import { TaskList, CreateNewTaskForm } from "../../tasks/components";
import { Box, Flex } from "@chakra-ui/core";

const ColumnItem = ({ index, columnId }) => {
  const isEditing = useSelector(state =>
    selectColumnIsEditing(state, columnId)
  );

  const isOpened = useSelector(state =>
    selectColumnOptionsOpened(state, columnId)
  );

  const isLocked = useSelector(state => selectColumnIsLocked(state, columnId));

  return (
    <Draggable
      draggableId={`column-${columnId}`}
      index={index}
      isDragDisabled={isOpened || isLocked}
    >
      {provided => (
        <Box
          bg="gray.300"
          mr={2}
          h="100%"
          px={2}
          py={2}
          borderRadius={4}
          w="18rem"
          boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
          cursor="pointer"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {!isEditing ? (
            <ColumnHeader columnId={columnId} />
          ) : (
            <EditColumnTitleForm columnId={columnId} />
          )}
          <Droppable droppableId={columnId} type="task">
            {provided => (
              <Flex
                direction="column"
                align="stretch"
                justify="center"
                mb={2}
                cursor="pointer"
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

//TODO: unlocked column can't be moved into locked column's position
