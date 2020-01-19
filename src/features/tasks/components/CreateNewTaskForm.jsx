import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { taskCreated } from "../slices";
import { makeTask } from "../utils/makeTasks";
import { CreateForm } from "../../../components";

const CreateNewTaskForm = ({ column }) => {
  const dispatch = useDispatch();
  function create(taskContent) {
    const task = makeTask({ content: taskContent });
    dispatch(taskCreated({ task, columnId: column.id }));
  }

  return (
    <CreateForm
      inputName="taskContent"
      placeholder="Add new task"
      initialValues={{ taskContent: "" }}
      create={create}
    />
  );
};

CreateNewTaskForm.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    taskIds: PropTypes.arrayOf(PropTypes.string),
    isEditing: PropTypes.bool
  }).isRequired
};

export default CreateNewTaskForm;
