import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { taskEditingCancelled, taskContentUpdated } from "../slices";
import { EditForm } from "../../../components";
import {
  selectTaskContent,
  selectTaskIsEditing
} from "../../../app/redux/selectors";
import { Flex, Button, ButtonGroup, CloseButton } from "@chakra-ui/core";
import { AddLabelPopover } from "../../labels/components";

const EditTaskContentForm = ({ taskId }) => {
  const taskContent = useSelector(state => selectTaskContent(state, taskId));
  const isEditing = useSelector(state => selectTaskIsEditing(state, taskId));

  const dispatch = useDispatch();
  const handleCancelEdit = () => {
    dispatch(taskEditingCancelled({ taskId }));
  };

  function update(content) {
    dispatch(taskContentUpdated({ taskId, taskContent: content }));
  }

  return (
    <EditForm
      inputName="taskContent"
      textarea={true}
      initialValues={{ taskContent }}
      isEditing={isEditing}
      onCancel={handleCancelEdit}
      update={update}
      px={1}
      mt={1}
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
            aria-label="Edit Task"
            mr={1}
            boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
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
          <AddLabelPopover taskId={taskId} />
        </Flex>
      </ButtonGroup>
    </EditForm>
  );
};

EditTaskContentForm.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default EditTaskContentForm;

//FIXME: fix styles
