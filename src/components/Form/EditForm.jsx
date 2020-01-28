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
    <form onSubmit={handleSubmit} ref={cancelRef}>
      <Input
        type="text"
        ref={focusRef}
        name={inputName}
        value={values[inputName]}
        onChange={handleChange}
        w="7rem"
        px={2}
        mr={2}
        size="sm"
        fontSize="1rem"
        fontWeight="bold"
        textTransform="uppercase"
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
