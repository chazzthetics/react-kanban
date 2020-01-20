import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { taskCreated } from "../slices";
import { selectColumnTaskIds } from "../../../app/redux/selectors";
import { makeTask } from "../utils/makeTasks";
import { CreateForm } from "../../../components";

const CreateNewTaskForm = ({ columnId }) => {
  const dispatch = useDispatch();
  const hasTask = useSelector(state => selectColumnTaskIds(state, columnId))
    .length;

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
      submitValue={hasTask ? "Add another task" : "Add a task"}
      textarea={true}
    />
  );
};

CreateNewTaskForm.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default CreateNewTaskForm;
