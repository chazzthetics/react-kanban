import React from "react";
import PropTypes from "prop-types";
import { useForm, useCancel } from "../../hooks";
import { Input, Textarea } from "@chakra-ui/core";

const CreateForm = ({
  inputName,
  placeholder,
  initialValues,
  create,
  children,
  isOpen,
  onCancel,
  textarea = false
}) => {
  const { values, handleChange, handleSubmit } = useForm(initialValues, () =>
    create(values[inputName])
  );

  const cancelRef = useCancel(isOpen, onCancel);
  return (
    <form onSubmit={handleSubmit} ref={cancelRef}>
      {!textarea ? (
        <Input
          type="text"
          onChange={handleChange}
          value={values[inputName]}
          name={inputName}
          placeholder={placeholder}
        />
      ) : (
        <Textarea
          onChange={handleChange}
          value={values[inputName]}
          name={inputName}
          placeholder={placeholder}
        />
      )}
      {children}
    </form>
  );
};

export default CreateForm;

CreateForm.propTypes = {
  inputName: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  create: PropTypes.func.isRequired,
  textarea: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired
};

//TODO: children proptypes
