import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { createTask } from "../slices";
import { selectCurrentBoardId } from "../../../app/redux/selectors";
import { useToggle } from "../../../hooks";
import { makeTask } from "../utils/makeTasks";
import { CreateForm, AddButtonGroup } from "../../../components";
import { CreateTaskButton } from "./";

const CreateNewTaskForm = ({ columnId }) => {
  const { isOpen, close, open } = useToggle();

  const currentBoard = useSelector(selectCurrentBoardId);

  const dispatch = useDispatch();
  function create(taskContent) {
    const task = makeTask({ content: taskContent });
    dispatch(createTask({ task, columnId, boardId: currentBoard }));
  }

  return !isOpen ? (
    <CreateTaskButton onOpen={open} columnId={columnId} />
  ) : (
    <CreateForm
      inputName="taskContent"
      placeholder="Add new task..."
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
      <AddButtonGroup onClose={close} value="Add Task" iconColor="white" />
    </CreateForm>
  );
};

CreateNewTaskForm.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default CreateNewTaskForm;
