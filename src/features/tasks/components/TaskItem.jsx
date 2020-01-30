import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectTaskContent } from "../../../app/redux/selectors";
import { RemoveTaskButton } from "./";
import { Text, Flex } from "@chakra-ui/core";
// import { LabelList, AddLabelPopover } from "../../labels/components";

const TaskItem = ({ taskId, columnId }) => {
  const taskContent = useSelector(state => selectTaskContent(state, taskId));

  return (
    <Flex
      py={1}
      px={2}
      mb={1}
      boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
      align="center"
      justify="space-between"
      bg="gray.100"
      borderRadius={4}
    >
      <Text fontSize=".9rem">{taskContent}</Text>
      <RemoveTaskButton taskId={taskId} columnId={columnId} />
    </Flex>
  );
};

TaskItem.propTypes = {
  taskId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired
};

export default TaskItem;

/* <LabelList taskId={taskId} /> */
/* <AddLabelPopover taskId={taskId} /> */
