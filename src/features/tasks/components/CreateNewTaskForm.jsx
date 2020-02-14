import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { createTask } from "../slices";
import { useToggle } from "../../../hooks";
import { makeTask } from "../utils/makeTasks";
import { CreateForm, AddButtonGroup } from "../../../components";
import { CreateTaskButton } from "./";

const CreateNewTaskForm = ({ columnId }) => {
  const { isOpen, close, open } = useToggle();

  const dispatch = useDispatch();

  function create(taskContent) {
    const task = makeTask({ content: taskContent });
    if (task.content.trim() !== "") {
      dispatch(createTask({ task, columnId }));
    }
  }

  return !isOpen ? (
    <CreateTaskButton onOpen={open} columnId={columnId} />
  ) : (
    <CreateForm
      inputName="taskContent"
      placeholder="Enter a title for this task..."
      initialValues={{ taskContent: "" }}
      create={create}
      isOpen={isOpen}
      onCancel={close}
      textarea={true}
      w="17rem"
      h="36px"
      px={2}
      size="sm"
      mb={2}
      borderRadius={4}
    >
      <AddButtonGroup onClose={close} value="Add Task" />
    </CreateForm>
  );
};

CreateNewTaskForm.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default CreateNewTaskForm;
