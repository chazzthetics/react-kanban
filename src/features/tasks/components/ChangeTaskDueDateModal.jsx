import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  makeSelectIsDueDateOpen,
  makeSelectTaskDueDate,
  taskDueDateClosed,
  changeDueDate,
  removeDueDate
} from "../slices";
import { FORMAT, parseDate, formatDate } from "../../../utils/dates";
import isDate from "date-fns/isDate";
import { TaskModal } from "./";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { Flex } from "@chakra-ui/core";

//TODO: validation
const ChangeTaskDueDate = ({ taskId }) => {
  const dueDateIsOpenSelector = useMemo(makeSelectIsDueDateOpen, []);
  const isDueDateOpen = useSelector(state =>
    dueDateIsOpenSelector(state, taskId)
  );

  const taskDueDateSelector = useMemo(makeSelectTaskDueDate, []);
  const taskDueDate = useSelector(state => taskDueDateSelector(state, taskId));

  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(taskDueDateClosed({ taskId }));
  }, [dispatch, taskId]);

  const handleRemoveDate = useCallback(() => {
    dispatch(removeDueDate({ taskId }));
  }, [dispatch, taskId]);

  const [dueDate, setDueDate] = useState(
    parseDate(taskDueDate, "yyyy-MM-dd") || ""
  );

  const handleDayChange = date => {
    setDueDate(date);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (isDate(dueDate)) {
      dispatch(
        changeDueDate({
          taskId,
          dueDate
        })
      );
    }
  };

  return (
    <TaskModal
      title=" Change Due Date"
      isOpen={isDueDateOpen}
      onClose={handleClose}
      onRemove={handleRemoveDate}
      onSubmit={handleSubmit}
      isDisabled={taskDueDate ? false : true}
    >
      <Flex align="center" justify="flex-start" py={1}>
        <DayPickerInput
          value={dueDate}
          onDayChange={handleDayChange}
          parseDate={parseDate}
          formatDate={formatDate}
          format={FORMAT}
          placeholder="MM/DD/YYYY"
        />
      </Flex>
    </TaskModal>
  );
};

ChangeTaskDueDate.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default ChangeTaskDueDate;
