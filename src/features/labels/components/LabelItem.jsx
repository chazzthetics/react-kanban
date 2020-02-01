import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { taskLabelRemoved } from "../../tasks/slices";
import { Box } from "@chakra-ui/core";

const LabelItem = ({ taskId, taskLabel }) => {
  const dispatch = useDispatch();

  const handleRemoveLabelFromTask = useCallback(
    labelId => () => dispatch(taskLabelRemoved({ taskId, labelId })),
    [dispatch, taskId]
  );

  return (
    <Box
      onClick={handleRemoveLabelFromTask(taskLabel.id)}
      cursor="pointer"
      w="30px"
      h="5px"
      mr={1}
      borderRadius={2}
      bg={`${taskLabel.color}`}
    ></Box>
  );
};

export default LabelItem;
