import React, { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { removeLabelFromTask } from "../../tasks/slices";
import { darkenOnHover } from "../../../utils/darkenOnHover";
import { PseudoBox } from "@chakra-ui/core";

const TaskLabelItem = ({ taskId, taskLabel }) => {
  const dispatch = useDispatch();

  const handleRemoveLabelFromTask = useCallback(
    labelId => () => dispatch(removeLabelFromTask({ taskId, labelId })),
    [dispatch, taskId]
  );

  return (
    <PseudoBox
      as="button"
      onClick={handleRemoveLabelFromTask(taskLabel.id)}
      cursor="pointer"
      w="30px"
      minH="8px"
      mt={1}
      mr={1}
      borderRadius={2}
      bg={`${taskLabel.color}`}
      _hover={{ backgroundColor: darkenOnHover(taskLabel.color) }}
      _focus={{
        outline: `none`,
        borderColor: `${darkenOnHover(taskLabel.color)}`
      }}
      transition="background-color 150ms ease-in"
    />
  );
};

export default memo(TaskLabelItem);
