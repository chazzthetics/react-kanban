import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { removeLabelFromTask } from "../../tasks/slices";
import { darkenOnHover } from "../../../utils/darkenOnHover";
import { PseudoBox } from "@chakra-ui/core";

const LabelItem = ({ taskId, taskLabel }) => {
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
      minH="7.5px"
      mr={1}
      borderRadius={2}
      bg={`${taskLabel.color}`}
      _hover={{ bg: darkenOnHover(taskLabel.color) }}
      transition="background-color 150ms ease-in"
    />
  );
};

export default LabelItem;
