import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { useColumn } from "../../../hooks";
import { TaskItem } from "./";
import { Flex } from "@chakra-ui/core";

const TaskList = ({ columnId }) => {
  const { columnTasks: tasks } = useColumn(columnId);

  return tasks.map((task, index) => (
    <Draggable
      key={task.id}
      index={index}
      draggableId={task.id}
      isDragDisabled={task.isEditing}
    >
      {(provided, snapshot) => (
        <Flex
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          direction="column"
          justify="center"
          align="stretch"
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

export default TaskList;
