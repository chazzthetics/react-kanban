import React, { memo, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useToggle } from "../../../hooks";
import {
  makeSelectTaskContent,
  makeSelectTaskIsEditing,
  makeSelectTaskCompleted,
  makeSelectIsPriorityOpen,
  makeSelectIsDueDateOpen,
  taskEditing
} from "../slices";
import { TaskLabelList } from "../../labels/components";
import {
  TaskItemContainer,
  TaskOptions,
  EditTaskContentForm,
  TaskFooter
} from "./";
import { Text, Flex } from "@chakra-ui/core";

const TaskItem = ({ taskId, columnId, isDragging }) => {
  const { isOpen: isHover, open: show, close: hide } = useToggle();

  const dispatch = useDispatch();

  const taskContentSelector = useMemo(makeSelectTaskContent, []);
  const content = useSelector(state => taskContentSelector(state, taskId));

  const taskIsEditingSelector = useMemo(makeSelectTaskIsEditing, []);
  const isEditing = useSelector(state => taskIsEditingSelector(state, taskId));

  const taskCompletedSelector = useMemo(makeSelectTaskCompleted, []);
  const completed = useSelector(state => taskCompletedSelector(state, taskId));

  const priorityIsOpenSelector = useMemo(makeSelectIsPriorityOpen, []);
  const isPriorityOpen = useSelector(state =>
    priorityIsOpenSelector(state, taskId)
  );

  const dueDateIsOpenSelector = useMemo(makeSelectIsDueDateOpen, []);
  const isDueDateOpen = useSelector(state =>
    dueDateIsOpenSelector(state, taskId)
  );

  const handleOpenEdit = useCallback(() => {
    if (!isPriorityOpen && !isDueDateOpen) {
      dispatch(taskEditing({ taskId }));
    }
  }, [dispatch, taskId, isPriorityOpen, isDueDateOpen]);

  return (
    <TaskItemContainer
      isDragging={isDragging}
      onOpenEdit={handleOpenEdit}
      onShow={show}
      onHide={hide}
    >
      {!isEditing ? (
        <>
          <Flex
            direction="column"
            justify="center"
            className="task-item"
            flexBasis="100%"
          >
            <TaskLabelList taskId={taskId} />
            <Text
              fontSize=".9rem"
              w="100%"
              overflowWrap="break-word"
              whiteSpace="pre-wrap"
              textDecor={completed ? "line-through" : "none"}
            >
              {content}
            </Text>
            <TaskFooter taskId={taskId} />
          </Flex>
          {isHover && <TaskOptions taskId={taskId} columnId={columnId} />}
        </>
      ) : (
        <EditTaskContentForm taskId={taskId} />
      )}
    </TaskItemContainer>
  );
};

TaskItem.propTypes = {
  taskId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default memo(TaskItem);
