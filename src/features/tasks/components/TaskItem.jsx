import React, { memo, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useLightMode, useToggle } from "../../../hooks";
import {
  makeSelectTaskContent,
  makeSelectTaskIsEditing,
  makeSelectTaskCompleted,
  taskEditing
} from "../slices";
import { Text, Flex } from "@chakra-ui/core";
import { TaskLabelList } from "../../labels/components";
import { EditTaskContentForm, TaskOptions } from "./";

const TaskItem = ({ taskId, columnId, isDragging }) => {
  const [isLightMode] = useLightMode();

  const { isOpen: isHover, open, close } = useToggle();

  const handleShowOptions = useCallback(() => open(), [open]);
  const handleHideOptions = useCallback(() => close(), [close]);

  const taskContentSelector = useMemo(makeSelectTaskContent, []);
  const content = useSelector(state => taskContentSelector(state, taskId));

  const taskIsEditingSelector = useMemo(makeSelectTaskIsEditing, []);
  const isEditing = useSelector(state => taskIsEditingSelector(state, taskId));

  const taskCompletedSelector = useMemo(makeSelectTaskCompleted, []);
  const completed = useSelector(state => taskCompletedSelector(state, taskId));

  const dispatch = useDispatch();

  const handleOpenEdit = useCallback(() => {
    if (!isEditing) {
      dispatch(taskEditing({ taskId }));
    }
  }, [dispatch, isEditing, taskId]);

  return (
    <Flex
      py={1}
      px={2}
      mb={1}
      minH="40px"
      minW="272px"
      boxShadow={
        isDragging
          ? "2px 8px 12px -1px rgba(0,0,0,0.29)"
          : "2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
      }
      align="center"
      justify="space-between"
      bg={
        isDragging && isLightMode
          ? "white"
          : !isLightMode
          ? "gray.700"
          : "white"
      }
      transform={isDragging ? "rotate(-2deg)" : "none"}
      borderRadius={4}
      cursor="pointer"
      onMouseOver={handleShowOptions}
      onMouseLeave={handleHideOptions}
      onDoubleClick={handleOpenEdit}
    >
      {!isEditing ? (
        <>
          <Flex direction="column">
            <Flex align="center">
              <TaskLabelList taskId={taskId} />
            </Flex>
            <Text
              fontSize=".9rem"
              maxW="180px"
              overflowWrap="break-word"
              whiteSpace="pre-wrap"
              textDecor={completed ? "line-through" : "none"}
            >
              {content}
            </Text>
          </Flex>
          {isHover && <TaskOptions taskId={taskId} columnId={columnId} />}
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

export default memo(TaskItem);
