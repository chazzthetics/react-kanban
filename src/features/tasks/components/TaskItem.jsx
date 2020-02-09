import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useTask } from "../../../hooks";
import { taskEditing } from "../slices";
import { ButtonGroup, Text, Flex } from "@chakra-ui/core";
import { LabelList } from "../../labels/components";
import { EditTaskButton, EditTaskContentForm, RemoveTaskButton } from "./";

const TaskItem = ({ taskId, columnId, isDragging }) => {
  const { content, isEditing } = useTask(taskId);

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
      boxShadow={
        isDragging
          ? "2px 8px 12px -1px rgba(0,0,0,0.29)"
          : "2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
      }
      align="center"
      justify="space-between"
      bg={isDragging ? "purple.200" : "gray.100"}
      borderRadius={4}
      cursor="pointer"
      onMouseEnter={handleShowOptions}
      onMouseLeave={handleHideOptions}
      onDoubleClick={handleOpenEdit}
    >
      {!isEditing ? (
        <>
          <Flex direction="column">
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
  columnId: PropTypes.string.isRequired
};

export default React.memo(TaskItem);
