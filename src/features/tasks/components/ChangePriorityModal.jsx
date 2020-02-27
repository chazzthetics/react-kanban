import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "../../../hooks";
import { changePriority, makeSelectTaskPriority } from "../slices";
import {
  Select,
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

const ChangePriorityModal = ({ taskId, isOpen, onClose }) => {
  const prioritySelector = useMemo(makeSelectTaskPriority, []);
  const taskPriority = useSelector(state => prioritySelector(state, taskId));

  const { values, handleChange, handleSubmit } = useForm(
    { priority: taskPriority || "medium" },
    submit
  );
  const { priority } = values;

  const dispatch = useDispatch();
  function submit() {
    dispatch(changePriority({ taskId, priority }));
  }

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
          Change Priority
        </ModalHeader>
        <ModalCloseButton opacity={0.6} />
        <form onSubmit={handleSubmit}>
          <ModalBody className="date-picker">
            <Flex align="center" justify="center">
              <Select
                size="sm"
                name="priority"
                value={priority}
                onChange={handleChange}
              >
                <option value="highest">Highest</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
                <option value="lowest">Lowest</option>
              </Select>
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

ChangePriorityModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  taskId: PropTypes.string.isRequired
};

export default ChangePriorityModal;
