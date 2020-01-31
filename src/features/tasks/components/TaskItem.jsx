import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { taskEditing } from "../slices";
import {
  selectTaskContent,
  selectTaskIsEditing
} from "../../../app/redux/selectors";
import { ButtonGroup, Text, Flex } from "@chakra-ui/core";
import { EditTaskButton, EditTaskContentForm, RemoveTaskButton } from "./";
import { LabelList } from "../../labels/components";

const TaskItem = ({ taskId, columnId }) => {
  const [isHover, setIsHover] = useState(false);

  const taskContent = useSelector(state => selectTaskContent(state, taskId));

  const isEditing = useSelector(state => selectTaskIsEditing(state, taskId));
  const dispatch = useDispatch();

  const handleOpenEdit = () => {
    if (!isEditing) {
      dispatch(taskEditing({ taskId }));
    }
  };

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
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onDoubleClick={handleOpenEdit}
      cursor="pointer"
    >
      {!isEditing ? (
        <>
          <Flex flexDir="column">
            <Flex>
              <LabelList taskId={taskId} />
            </Flex>
            <Text fontSize=".9rem" maxW="180px" overflowWrap="break-word">
              {taskContent}
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

export default TaskItem;
