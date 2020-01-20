import React from "react";
import PropTypes from "prop-types";
import { useCancel, useFocus, useForm } from "../../hooks";
import { Input, Button } from "@chakra-ui/core";

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
      <Input
        type="text"
        ref={focusRef}
        name={inputName}
        value={values[inputName]}
        onChange={handleChange}
      />
      <Button type="button" onClick={handleCancelEdit}>
        Cancel
      </Button>
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
