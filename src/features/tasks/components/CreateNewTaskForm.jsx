import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { taskCreated } from "../slices";
import { selectColumnTaskIds } from "../../../app/redux/selectors";
import { makeTask } from "../utils/makeTasks";
import { CreateForm } from "../../../components";
import { Button, CloseButton, IconButton, Flex } from "@chakra-ui/core";

const CreateNewTaskForm = ({ columnId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleForm = () => {
    setIsOpen(state => !state);
  };

  const hasTask = useSelector(state => selectColumnTaskIds(state, columnId))
    .length;

  const dispatch = useDispatch();
  function create(taskContent) {
    const task = makeTask({ content: taskContent });
    dispatch(taskCreated({ task, columnId }));
    handleToggleForm();
  }

  return isOpen ? (
    <CreateForm
      inputName="taskContent"
      placeholder="Add new task"
      initialValues={{ taskContent: "" }}
      create={create}
      isOpen={isOpen}
      onCancel={handleToggleForm}
      textarea={true}
    >
      <Flex align="center">
        <IconButton type="submit" icon="add" aria-label="Add a new task" />
        <CloseButton
          type="button"
          aria-label="Cancel"
          onClick={handleToggleForm}
        />
      </Flex>
    </CreateForm>
  ) : (
    <Button onClick={handleToggleForm}>
      {hasTask ? "Add another task" : "Add a task"}
    </Button>
  );
};

CreateNewTaskForm.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default CreateNewTaskForm;
