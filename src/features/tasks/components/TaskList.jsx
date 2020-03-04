import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { makeSelectColumnTasks } from "../../shared";
import { TaskItem } from "./";
import { Flex } from "@chakra-ui/core";

const TaskList = ({ columnId }) => {
  const columnTasksSelector = useMemo(makeSelectColumnTasks, []);
  const tasks = useSelector(state => columnTasksSelector(state, columnId));

  //FIXME: styles
  return tasks.map((task, index) => (
    <Draggable
      key={task.id}
      index={index}
      draggableId={task.id}
      isDragDisabled={task.isEditing}
    >
      {(provided, snapshot) => (
        <Flex
          className="task-item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TaskItem
            taskId={task.id}
            columnId={columnId}
            isDragging={snapshot.isDragging}
          />
        </Flex>
      )}
    </Draggable>
  ));
};

TaskList.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default memo(TaskList);
