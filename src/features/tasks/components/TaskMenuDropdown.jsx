import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useLightMode } from "../../../hooks";
import { FiMoreHorizontal } from "react-icons/fi";
import { taskDueDateOpened, taskPriorityOpened } from "../slices";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from "@chakra-ui/core";

const TaskMenuDropdown = ({ taskId }) => {
  const [isLightMode] = useLightMode();

  const dispatch = useDispatch();

  const handleOpenDateModal = useCallback(() => {
    dispatch(taskDueDateOpened({ taskId }));
  }, [dispatch, taskId]);

  const handleOpenPriorityModal = useCallback(() => {
    dispatch(taskPriorityOpened({ taskId }));
  }, [dispatch, taskId]);

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={FiMoreHorizontal}
        size="sm"
        background="none"
        _hover={{
          backgroundColor: isLightMode ? "#ebecf0" : "gray.600"
        }}
        _active={{
          backgroundColor: isLightMode ? "#d4d4d4" : "gray.500"
        }}
        _focus={{ boxShadow: "0 0 0 2px #d4d4d4" }}
        transition="background-color 120ms ease-in, opacity 120ms ease-in, boxShadow 120ms ease-in"
      />
      <MenuList>
        <MenuItem fontSize="0.9rem" onClick={handleOpenDateModal}>
          Change Due Date
        </MenuItem>
        <MenuItem fontSize="0.9rem" onClick={handleOpenPriorityModal}>
          Change Priority
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

TaskMenuDropdown.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default TaskMenuDropdown;
