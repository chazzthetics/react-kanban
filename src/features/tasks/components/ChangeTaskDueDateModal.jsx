import React, { memo, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useLightMode } from "../../../hooks";
import isDate from "date-fns/isDate";
import {
  makeSelectIsDueDateOpen,
  makeSelectTaskDueDate,
  taskDueDateClosed,
  changeDueDate,
  removeDueDate
} from "../slices";
import { FORMAT, parseDate, formatDate } from "../../../utils/dates";
import { TaskModal } from "./";
import { Flex } from "@chakra-ui/core";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

//TODO: validation
const ChangeTaskDueDate = ({ taskId }) => {
  const [isLightMode] = useLightMode();

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
    dispatch(removeDueDate(taskId));
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
      <Flex
        align="center"
        justify="flex-start"
        py={1}
        className={isLightMode ? "light-day" : "dark-day"}
      >
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

export default memo(ChangeTaskDueDate);
