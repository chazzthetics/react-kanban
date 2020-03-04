import React, { memo, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useToggle } from "../../../hooks";
import { makeSelectTaskIsEditing, taskEditing } from "../slices";
import { TaskLabelList } from "../../labels/components";
import { Flex } from "@chakra-ui/core";
import {
  TaskItemContainer,
  TaskOptions,
  TaskContent,
  TaskFooter,
  EditTaskContentForm
} from "./";

const TaskItem = ({ taskId, columnId, isDragging }) => {
  const { isOpen: isHover, open: show, close: hide } = useToggle();

  const dispatch = useDispatch();

  const taskIsEditingSelector = useMemo(makeSelectTaskIsEditing, []);
  const isEditing = useSelector(state => taskIsEditingSelector(state, taskId));

  const handleOpenEdit = useCallback(() => {
    dispatch(taskEditing({ taskId }));
  }, [dispatch, taskId]);

  return (
    <TaskItemContainer
      isDragging={isDragging}
      onOpenEdit={handleOpenEdit}
      onShow={show}
      onHide={hide}
    >
      {!isEditing ? (
        <>
          <Flex direction="column" className="task-item">
            <TaskLabelList taskId={taskId} />
            <TaskContent taskId={taskId} />
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
