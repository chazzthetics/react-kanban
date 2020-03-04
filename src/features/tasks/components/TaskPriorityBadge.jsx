import React, { memo, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { makeSelectTaskCompleted, taskPriorityOpened } from "../slices";
import { ChangePriorityModal } from "./";
import { getPriorityColor } from "../utils/getPriorityColor";
import { getPriorityName } from "../utils/priorityOptions";
import { darkenOnHover } from "../../../utils/darkenOnHover";
import { PseudoBox } from "@chakra-ui/core";

const TaskPriorityBadge = ({ taskId, priority }) => {
  const dispatch = useDispatch();

  const handleOpenPriorityModal = useCallback(() => {
    dispatch(taskPriorityOpened({ taskId }));
  }, [dispatch, taskId]);

  const taskCompletedSelector = useMemo(makeSelectTaskCompleted, []);
  const completed = useSelector(state => taskCompletedSelector(state, taskId));

  return (
    <>
      <PseudoBox
        bg={`${getPriorityColor(priority)}`}
        opacity={completed ? 0.6 : 1}
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
        {getPriorityName(priority)}
      </PseudoBox>
      <ChangePriorityModal taskId={taskId} />
    </>
  );
};

TaskPriorityBadge.propTypes = {
  taskId: PropTypes.string.isRequired,
  priority: PropTypes.number.isRequired
};

export default memo(TaskPriorityBadge);
