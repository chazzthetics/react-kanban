import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { taskCreated } from "../slices";
import { makeTask } from "../utils/makeTasks";
import { CreateForm } from "../../../components";

const CreateNewTaskForm = ({ columnId }) => {
  const dispatch = useDispatch();
  function create(taskContent) {
    const task = makeTask({ content: taskContent });
    dispatch(taskCreated({ task, columnId }));
  }

  return (
    <CreateForm
      inputName="taskContent"
      placeholder="Add new task"
      initialValues={{ taskContent: "" }}
      create={create}
      submitValue="Add Task"
    />
  );
};

CreateNewTaskForm.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default CreateNewTaskForm;
