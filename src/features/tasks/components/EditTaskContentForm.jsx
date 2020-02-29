import React, { memo, useEffect, useMemo, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  makeSelectTaskContent,
  makeSelectTaskIsEditing,
  makeSelectIsDueDateOpen,
  makeSelectIsPriorityOpen,
  taskEditingCancelled,
  updateTaskContent
} from "../slices";
import { AddLabelPopover, TaskLabelList } from "../../labels/components";
import { EditForm, AddButtonGroup } from "../../../components";
import {
  TaskMenuDropdown,
  ToggleTaskCheckbox,
  ChangeTaskDueDateModal,
  ChangePriorityModal
} from "./";
import { Flex, ButtonGroup } from "@chakra-ui/core";

const EditTaskContentForm = ({ taskId }) => {
  const taskContentSelector = useMemo(makeSelectTaskContent, []);
  const content = useSelector(state => taskContentSelector(state, taskId));

  const taskIsEditingSelector = useMemo(makeSelectTaskIsEditing, []);
  const isEditing = useSelector(state => taskIsEditingSelector(state, taskId));

  const dispatch = useDispatch();

  const handleCancelEdit = useCallback(() => {
    dispatch(taskEditingCancelled({ taskId }));
  }, [dispatch, taskId]);

  const dueDateIsOpenSelector = useMemo(makeSelectIsDueDateOpen, []);
  const isDueDateOpen = useSelector(state =>
    dueDateIsOpenSelector(state, taskId)
  );

  const priorityIsOpenSelector = useMemo(makeSelectIsPriorityOpen, []);
  const isPriorityOpen = useSelector(state =>
    priorityIsOpenSelector(state, taskId)
  );

  const update = useCallback(
    content => {
      if (isDueDateOpen || isPriorityOpen) return;
      dispatch(updateTaskContent({ taskId, content }));
    },
    [dispatch, taskId, isDueDateOpen, isPriorityOpen]
  );

  const scrollRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      if (scrollRef.current.offsetTop > 600) {
        scrollRef.current.scrollIntoView(true);
      } else {
        scrollRef.current.scrollIntoView(false);
      }
    }
  }, [isEditing, scrollRef]);

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
            <ToggleTaskCheckbox taskId={taskId} />
            <AddLabelPopover taskId={taskId} />
            <TaskMenuDropdown taskId={taskId} />
            <ChangeTaskDueDateModal taskId={taskId} />
            <ChangePriorityModal taskId={taskId} />
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
