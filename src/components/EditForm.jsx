import React from "react";
import PropTypes from "prop-types";
import { useCancel, useFocus, useForm } from "../hooks";

const EditForm = ({
  inputName,
  initialValues,
  isEditing,
  update,
  onCancel
}) => {
  const focusRef = useFocus();

  const { values, handleChange, handleSubmit } = useForm(initialValues, () =>
    update(values[inputName])
  );

  const handleCancelEdit = () => {
    onCancel();
  };

  const cancelRef = useCancel(isEditing, onCancel);

  return (
    <form onSubmit={handleSubmit} ref={cancelRef}>
      <input
        ref={focusRef}
        type="text"
        name={inputName}
        value={values[inputName]}
        onChange={handleChange}
      />
      <button type="button" onClick={handleCancelEdit}>
        Cancel
      </button>
    </form>
  );
};

EditForm.propTypes = {
  inputName: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  isEditing: PropTypes.bool.isRequired,
  update: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default EditForm;
