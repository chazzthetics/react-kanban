import React, { memo, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { makeSelectColumnIsOpen, makeSelectColumnIsLocked } from "../slices";
import { makeSelectColumnIsDisabled } from "../../shared";
import { useLightMode } from "../../../hooks";
import { ColumnHeader } from "./";
import { TaskList, CreateNewTaskForm } from "../../tasks/components";
import { Box, Flex } from "@chakra-ui/core";

const ColumnItem = ({ index, columnId }) => {
  const columnIsOpenSelector = useMemo(makeSelectColumnIsOpen, []);
  const isOpen = useSelector(state => columnIsOpenSelector(state, columnId));

  const columnIsLockedSelector = useMemo(makeSelectColumnIsLocked, []);
  const isLocked = useSelector(state =>
    columnIsLockedSelector(state, columnId)
  );

  const columnIsDisabledSelector = useMemo(makeSelectColumnIsDisabled, []);
  const isDisabled = useSelector(state =>
    columnIsDisabledSelector(state, columnId)
  );

  const [isLightMode] = useLightMode();

  const bottomRef = useRef(null);

  return (
    <Draggable
      draggableId={`column-${columnId}`}
      index={index}
      isDragDisabled={isOpen || isLocked || isDisabled}
    >
      {provided => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="column-item"
          overflowY="auto"
          overflowX="hidden"
          bg={isLightMode ? "#ebecf0" : "gray.600"}
          mr={2}
          h="100%"
          minW="288px"
          maxH="88vh"
          p={2}
          borderRadius={4}
          w="18rem"
          boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
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
                bg={snapshot.isDraggingOver && isLightMode ? "#d9dadd" : "none"}
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
          <CreateNewTaskForm columnId={columnId} ref={bottomRef} />
        </Box>
      )}
    </Draggable>
  );
};

ColumnItem.propTypes = {
  index: PropTypes.number.isRequired,
  columnId: PropTypes.string.isRequired
};

export default memo(ColumnItem);
