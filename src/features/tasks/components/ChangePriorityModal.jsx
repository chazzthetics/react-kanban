import React, { memo, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useLightMode, useForm } from "../../../hooks";
import { priorityOptions } from "../utils/priorityOptions";
import { getPriorityColor } from "../utils/getPriorityColor";
import {
  makeSelectTaskPriority,
  makeSelectIsPriorityOpen,
  taskPriorityClosed,
  changePriority,
  removePriority
} from "../slices";
import { TaskModal } from "./";
import { Flex, Select } from "@chakra-ui/core";

const ChangePriorityModal = ({ taskId }) => {
  const [isLightMode] = useLightMode();

  const dispatch = useDispatch();

  const priorityIsOpenSelector = useMemo(makeSelectIsPriorityOpen, []);
  const isPriorityOpen = useSelector(state =>
    priorityIsOpenSelector(state, taskId)
  );

  const prioritySelector = useMemo(makeSelectTaskPriority, []);
  const taskPriority = useSelector(state => prioritySelector(state, taskId));

  const handleClose = useCallback(() => {
    dispatch(taskPriorityClosed({ taskId }));
  }, [dispatch, taskId]);

  const handleRemovePriority = useCallback(() => {
    dispatch(removePriority(taskId));
  }, [dispatch, taskId]);

  const { values, handleChange, handleSubmit } = useForm(
    { priority: taskPriority || 3 },
    submit
  );

  const { priority } = values;

  function submit() {
    dispatch(changePriority({ taskId, priority: parseInt(priority) }));
  }

  return (
    <TaskModal
      title="Change Priority"
      isOpen={isPriorityOpen}
      onClose={handleClose}
      onRemove={handleRemovePriority}
      onSubmit={handleSubmit}
      isDisabled={taskPriority ? false : true}
    >
      <Flex align="center" justify="center">
        <Select
          size="sm"
          name="priority"
          value={priority}
          onChange={handleChange}
          borderRadius={4}
          fontWeight={600}
          backgroundColor={isLightMode ? "white" : "gray.700"}
          color={getPriorityColor(parseInt(priority))}
          focusBorderColor={getPriorityColor(parseInt(priority))}
        >
          {priorityOptions.map((option, index) => (
            <option
              key={option}
              value={index + 1}
              className={`priority priority-${option.toLowerCase()}`}
            >
              {option}
            </option>
          ))}
        </Select>
      </Flex>
    </TaskModal>
  );
};

ChangePriorityModal.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default memo(ChangePriorityModal);
