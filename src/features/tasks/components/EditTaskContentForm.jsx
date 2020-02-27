import React, { memo, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useToggle } from "../../../hooks";
import {
  makeSelectTaskContent,
  makeSelectTaskIsEditing,
  makeSelectTaskCompleted,
  taskEditingCancelled,
  updateTaskContent,
  toggleCompleteTask
} from "../slices";

import { AddLabelPopover, TaskLabelList } from "../../labels/components";
import { EditForm, AddButtonGroup } from "../../../components";
import { ChangeTaskDueDateModal, ChangePriorityModal } from "./";
import { Flex, ButtonGroup, Checkbox } from "@chakra-ui/core";

import { FiMoreHorizontal } from "react-icons/fi";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  // Button,
  // MenuGroup,
  // MenuDivider,
  // MenuOptionGroup,
  // MenuItemOption,
  Modal,
  ModalOverlay,
  ModalContent
} from "@chakra-ui/core";

const EditTaskContentForm = ({ taskId }) => {
  const taskContentSelector = useMemo(makeSelectTaskContent, []);
  const content = useSelector(state => taskContentSelector(state, taskId));

  const taskIsEditingSelector = useMemo(makeSelectTaskIsEditing, []);
  const isEditing = useSelector(state => taskIsEditingSelector(state, taskId));

  const taskCompletedSelector = useMemo(makeSelectTaskCompleted, []);
  const completed = useSelector(state => taskCompletedSelector(state, taskId));

  const dispatch = useDispatch();

  const handleCancelEdit = useCallback(() => {
    dispatch(taskEditingCancelled({ taskId }));
  }, [dispatch, taskId]);

  const handleToggleComplete = useCallback(() => {
    dispatch(toggleCompleteTask({ taskId, completed }));
  }, [dispatch, taskId, completed]);

  const update = useCallback(
    content => {
      dispatch(updateTaskContent({ taskId, content }));
    },
    [dispatch, taskId]
  );

  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    if (isEditing) {
      if (scrollRef.current.offsetTop > 600) {
        scrollRef.current.scrollIntoView(true);
      } else {
        scrollRef.current.scrollIntoView(false);
      }
    }
  }, [isEditing, scrollRef]);

  const { isOpen: isDateOpen, open: openDate, close: closeDate } = useToggle();

  const {
    isOpen: isPriorityOpen,
    open: openPriority,
    close: closePriority
  } = useToggle();

  const handleOpenDateModal = () => {
    openDate();
  };

  const handleOpenPriorityModal = () => {
    openPriority();
  };

  return (
    <Flex flexDir="column" flexBasis="100%" ref={scrollRef}>
      <Flex>
        <TaskLabelList taskId={taskId} />
      </Flex>

      <EditForm
        inputName="taskContent"
        textarea={true}
        initialValues={{ taskContent: content }}
        isEditing={isEditing}
        update={update}
        px={1}
        mt={2}
        w="100%"
      >
        <ButtonGroup
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={2}
        >
          <AddButtonGroup
            value="Save"
            onClose={handleCancelEdit}
            justifyContent="flex-start"
          />
          <Flex align="center" justify="space-between">
            <Checkbox
              onChange={handleToggleComplete}
              isChecked={completed}
              mr={4}
            />
            <AddLabelPopover taskId={taskId} />
            <Menu>
              <MenuButton as={IconButton} size="sm" icon={FiMoreHorizontal} />
              <MenuList>
                <MenuItem fontSize="0.9rem" onClick={handleOpenDateModal}>
                  Change Due Date
                </MenuItem>
                <MenuItem fontSize="0.9rem" onClick={handleOpenPriorityModal}>
                  Change Priority
                </MenuItem>
              </MenuList>
            </Menu>
            <ChangeTaskDueDateModal
              isOpen={isDateOpen}
              onClose={closeDate}
              taskId={taskId}
            />
            <ChangePriorityModal
              isOpen={isPriorityOpen}
              onClose={closePriority}
              taskId={taskId}
            />
          </Flex>
        </ButtonGroup>
      </EditForm>
    </Flex>
  );
};

EditTaskContentForm.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default memo(EditTaskContentForm);

//FIXME: fix styles
