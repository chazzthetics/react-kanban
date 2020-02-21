import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useTask } from "../../../hooks";
import {
  taskEditingCancelled,
  updateTaskContent,
  toggleCompleteTask
} from "../slices";
import { AddLabelPopover, TaskLabelList } from "../../labels/components";
import { EditForm } from "../../../components";
import {
  Flex,
  Button,
  ButtonGroup,
  CloseButton,
  Checkbox
} from "@chakra-ui/core";

const EditTaskContentForm = ({ taskId }) => {
  const { content, isEditing, completed } = useTask(taskId);

  const dispatch = useDispatch();

  const handleCancelEdit = () => {
    dispatch(taskEditingCancelled({ taskId }));
  };

  const handleToggleComplete = () => {
    dispatch(toggleCompleteTask({ taskId, completed }));
  };

  function update(content) {
    dispatch(updateTaskContent({ taskId, content }));
  }

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
        onCancel={handleCancelEdit}
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
          <Flex align="center" justify="flex-start">
            <Button
              size="sm"
              type="submit"
              aria-label="Update Task"
              mr={1}
              boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
              variantColor="purple"
            >
              Save
            </Button>
            <CloseButton
              type="button"
              onClick={handleCancelEdit}
              aria-label="Cancel"
            />
          </Flex>
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

export default EditTaskContentForm;

//FIXME: fix styles
