import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { taskEditing, makeSelectTask } from "../slices";
import { ButtonGroup, Text, Flex } from "@chakra-ui/core";
import { LabelList } from "../../labels/components";
import { EditTaskButton, EditTaskContentForm, RemoveTaskButton } from "./";

const TaskItem = ({ taskId, columnId, isDragging }) => {
  const taskSelector = useMemo(makeSelectTask, []);
  const { content, isEditing } = useSelector(state =>
    taskSelector(state, taskId)
  );

  const dispatch = useDispatch();
  const handleOpenEdit = () => {
    if (!isEditing) {
      dispatch(taskEditing({ taskId }));
    }
  };

  const [isHover, setIsHover] = useState(false);
  const handleShowOptions = useCallback(() => setIsHover(true), []);
  const handleHideOptions = useCallback(() => setIsHover(false), []);

  return (
    <Flex
      py={1}
      px={2}
      mb={1}
      minH="40px"
      boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
      align="center"
      justify="space-between"
      bg="gray.100"
      borderRadius={4}
      cursor="pointer"
      onMouseEnter={handleShowOptions}
      onMouseLeave={handleHideOptions}
      onDoubleClick={handleOpenEdit}
      transform={isDragging ? "rotate(6deg)" : "rotate(0)"}
    >
      {!isEditing ? (
        <>
          <Flex flexDir="column">
            <Flex>
              <LabelList taskId={taskId} />
            </Flex>
            <Text fontSize=".9rem" maxW="180px" overflowWrap="break-word">
              {content}
            </Text>
          </Flex>
          {isHover && (
            <ButtonGroup d="flex" alignItems="center">
              <EditTaskButton taskId={taskId} />
              <RemoveTaskButton taskId={taskId} columnId={columnId} />
            </ButtonGroup>
          )}
        </>
      ) : (
        <EditTaskContentForm taskId={taskId} />
      )}
    </Flex>
  );
};

TaskItem.propTypes = {
  taskId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default React.memo(TaskItem);
