import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { removeLabelFromTask } from "../../tasks/slices";
import { PseudoBox } from "@chakra-ui/core";

const LabelItem = ({ taskId, taskLabel }) => {
  const dispatch = useDispatch();

  const handleRemoveLabelFromTask = useCallback(
    labelId => () => dispatch(removeLabelFromTask({ taskId, labelId })),
    [dispatch, taskId]
  );

  const getHoverColor = color => {
    const split = color.split(".");
    const hover = parseInt(split[1]) + 100;
    const newColor = `${split[0]}.${hover}`;
    return newColor;
  };

  return (
    <PseudoBox
      as="button"
      onClick={handleRemoveLabelFromTask(taskLabel.id)}
      cursor="pointer"
      w="30px"
      h="7px"
      mr={1}
      borderRadius={2}
      bg={`${taskLabel.color}`}
      _hover={{ bg: getHoverColor(taskLabel.color) }}
      transition="background-color 150ms ease-in"
    ></PseudoBox>
  );
};

export default LabelItem;
