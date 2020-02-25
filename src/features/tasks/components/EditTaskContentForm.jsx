import React, { memo, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
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
import { Flex, ButtonGroup, Checkbox } from "@chakra-ui/core";

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

  return (
    <Flex flexDir="column" flexBasis="100%">
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
          <Flex align="center" justify="flex-end">
            <Checkbox
              onChange={handleToggleComplete}
              isChecked={completed}
              mr={4}
            />
            <AddLabelPopover taskId={taskId} />
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
