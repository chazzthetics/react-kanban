import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { taskCreated } from "../slices";
import { makeTask } from "../utils/makeTasks";
import { useForm } from "../../../hooks";

const initialValues = { taskContent: "" };

const AddNewTaskForm = ({ column }) => {
  const { values, handleChange, handleSubmit, resetForm } = useForm(
    initialValues,
    submit
  );

  const { taskContent } = values;

  const dispatch = useDispatch();

  function submit() {
    const task = makeTask({ content: taskContent });
    dispatch(taskCreated({ task, columnId: column.id }));
    resetForm();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add new task..."
        name="taskContent"
        value={taskContent}
        onChange={handleChange}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

AddNewTaskForm.propTypes = {
  column: PropTypes.object
};

export default AddNewTaskForm;
