import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { makeSelectColumn } from "../slices";
import { Box, Flex } from "@chakra-ui/core";
import { TaskList, CreateNewTaskForm } from "../../tasks/components";
import { ColumnHeader } from "./";
import { makeSelectColumnTasks } from "../../shared";

const ColumnItem = ({ index, columnId }) => {
  const columnSelector = useMemo(makeSelectColumn, []);
  const { isOpen, isLocked } = useSelector(state =>
    columnSelector(state, columnId)
  );

  const columnTasksSelector = useMemo(makeSelectColumnTasks, []);
  const columnTasks = useSelector(state =>
    columnTasksSelector(state, columnId)
  );

  const isDisabled = columnTasks.some(task => task.isEditing);

  return (
    <Draggable
      draggableId={`column-${columnId}`}
      index={index}
      isDragDisabled={isOpen || isLocked || isDisabled}
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
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ColumnHeader columnId={columnId} />
          <Droppable
            droppableId={columnId}
            isDropDisabled={isLocked}
            type="task"
          >
            {(provided, snapshot) => (
              <Flex
                direction="column"
                align="stretch"
                justify="center"
                mb={2}
                h="100%"
                cursor="pointer"
                ref={provided.innerRef}
                {...provided.droppableProps}
                bg={snapshot.isDraggingOver ? "yellow.200" : "gray.300"}
                borderRadius={4}
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

export default React.memo(ColumnItem);

//TODO: unlocked column can't be moved into locked column's position
