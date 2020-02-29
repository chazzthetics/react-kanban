import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { taskPriorityOpened } from "../slices";
import { ChangePriorityModal } from "./";
import { getPriorityColor } from "../utils/getPriorityColor";
import { darkenOnHover } from "../../../utils/darkenOnHover";
import { PseudoBox } from "@chakra-ui/core";

const TaskPriorityBadge = ({ taskId, priority }) => {
  const dispatch = useDispatch();

  const handleOpenPriorityModal = useCallback(() => {
    dispatch(taskPriorityOpened({ taskId }));
  }, [dispatch, taskId]);

  return (
    <>
      <PseudoBox
        bg={`${getPriorityColor(priority)}`}
        color="black"
        onClick={handleOpenPriorityModal}
        borderRadius={4}
        fontWeight="bold"
        fontSize=".7rem"
        textTransform="uppercase"
        px="4px"
        _hover={{ backgroundColor: darkenOnHover(getPriorityColor(priority)) }}
        transition="background-color 150ms ease-in"
        mb={1}
      >
        {priority}
      </PseudoBox>
      <ChangePriorityModal taskId={taskId} />
    </>
  );
};

TaskPriorityBadge.propTypes = {
  taskId: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired
};

export default TaskPriorityBadge;
