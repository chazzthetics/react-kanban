import React from "react";
import PropTypes from "prop-types";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useColumn } from "../../../hooks";
import { ColumnHeader } from "./";
import { TaskList, CreateNewTaskForm } from "../../tasks/components";
import { Box, Flex } from "@chakra-ui/core";

const ColumnItem = ({ index, columnId }) => {
  const { isOpen, isLocked, isDisabled } = useColumn(columnId);

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
          <Droppable droppableId={columnId} type="task">
            {(provided, snapshot) => (
              <Flex
                direction="column"
                align="stretch"
                justify="center"
                mb={2}
                cursor="pointer"
                bg={snapshot.isDraggingOver ? "yellow.300" : "gray.300"}
                borderRadius={4}
                transition="background-color 120ms ease-out"
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

export default React.memo(ColumnItem);
