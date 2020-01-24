import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { taskCreated } from "../slices";
import { selectColumnTaskIds } from "../../../app/redux/selectors";
import { useToggle } from "../../../hooks";
import { makeTask } from "../utils/makeTasks";
import { CreateForm } from "../../../components";
import { Button, CloseButton, Flex } from "@chakra-ui/core";

const CreateNewTaskForm = ({ columnId }) => {
  const { isOpen, close, open } = useToggle();

  const hasTask = useSelector(state => selectColumnTaskIds(state, columnId))
    .length;

  const dispatch = useDispatch();
  function create(taskContent) {
    const task = makeTask({ content: taskContent });
    dispatch(taskCreated({ task, columnId }));
  }

  return isOpen ? (
    <CreateForm
      inputName="taskContent"
      placeholder="Add new task"
      initialValues={{ taskContent: "" }}
      create={create}
      isOpen={isOpen}
      onCancel={close}
      textarea={true}
    >
      <Flex align="center">
        <Button type="submit" aria-label="Add a new task">
          Add Task
        </Button>
        <CloseButton type="button" aria-label="Cancel" onClick={close} />
      </Flex>
    </CreateForm>
  ) : (
    <Button onClick={open} leftIcon="add">
      {hasTask ? "Add another task" : "Add a task"}
    </Button>
  );
};

CreateNewTaskForm.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default CreateNewTaskForm;
