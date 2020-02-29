import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "../../../hooks";
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
    dispatch(removePriority({ taskId }));
  }, [dispatch, taskId]);

  const { values, handleChange, handleSubmit } = useForm(
    { priority: taskPriority || "medium" },
    submit
  );

  const { priority } = values;

  function submit() {
    dispatch(changePriority({ taskId, priority }));
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
          color={getPriorityColor(priority)}
          _focus={{ border: "1px solid rgb(187, 186, 186)" }}
        >
          {priorityOptions.map(option => (
            <option
              key={option}
              value={option.toLowerCase()}
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

export default ChangePriorityModal;
