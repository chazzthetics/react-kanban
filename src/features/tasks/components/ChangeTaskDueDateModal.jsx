import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { makeSelectTaskDueDate, changeDueDate } from "../slices";
import { FORMAT, parseDate, formatDate } from "../../../utils/dates";
import isDate from "date-fns/isDate";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import {
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/core";

//TODO: validation
const ChangeTaskDueDate = ({ taskId, isOpen, onClose }) => {
  const taskDueDateSelector = useMemo(makeSelectTaskDueDate, []);
  const taskDueDate = useSelector(state => taskDueDateSelector(state, taskId));

  const [dueDate, setDueDate] = useState(
    parseDate(taskDueDate, "yyyy-MM-dd") || ""
  );

  const handleDayChange = date => {
    setDueDate(date);
  };

  const dispatch = useDispatch();
  const handleSubmit = () => {
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
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay backgroundColor="rgba(0,0,0,0.8)" />
      <ModalContent
        className="date-picker"
        borderRadius={4}
        bg={"#ebecf0"}
        p={2}
      >
        <ModalHeader fontSize="1rem" textAlign="center" fontWeight="normal">
          Change Due Date
        </ModalHeader>
        <ModalCloseButton opacity={0.6} />
        <form onSubmit={handleSubmit}>
          <ModalBody className="date-picker">
            <Flex align="center" justify="center">
              <DayPickerInput
                value={dueDate}
                onDayChange={handleDayChange}
                parseDate={parseDate}
                formatDate={formatDate}
                format={FORMAT}
                placeholder="mm/dd/yyyy"
              />
              {/* Need to add time ?? */}
            </Flex>
          </ModalBody>
          <ModalFooter pb={1}>
            <Button
              size="sm"
              type="submit"
              variantColor="green"
              boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
            >
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

ChangeTaskDueDate.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  taskId: PropTypes.string.isRequired
};

export default ChangeTaskDueDate;
