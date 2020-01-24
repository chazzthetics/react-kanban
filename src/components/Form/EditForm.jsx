import React from "react";
import PropTypes from "prop-types";
import { useCancel, useFocus, useForm } from "../../hooks";
import { Input } from "@chakra-ui/core";

const EditForm = ({
  inputName,
  initialValues,
  isEditing,
  update,
  onCancel
}) => {
  const { values, handleChange, handleSubmit } = useForm(initialValues, () =>
    update(values[inputName])
  );

  const focusRef = useFocus();
  const cancelRef = useCancel(isEditing, onCancel);

  return (
    <form onSubmit={handleSubmit} ref={cancelRef} style={{ width: "40px" }}>
      <Input
        type="text"
        ref={focusRef}
        name={inputName}
        value={values[inputName]}
        onChange={handleChange}
        width={40}
      />
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
