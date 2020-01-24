import React from "react";
import PropTypes from "prop-types";
import { useForm, useFocus, useCancel } from "../../hooks";
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
  const focusRef = useFocus();

  return (
    <form onSubmit={handleSubmit} ref={cancelRef}>
      {!textarea ? (
        <Input
          type="text"
          onChange={handleChange}
          value={values[inputName]}
          name={inputName}
          placeholder={placeholder}
          ref={focusRef}
        />
      ) : (
        <Textarea
          onChange={handleChange}
          value={values[inputName]}
          name={inputName}
          placeholder={placeholder}
          resize="none"
          ref={focusRef}
        />
      )}
      {children}
    </form>
  );
};

CreateForm.propTypes = {
  inputName: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  create: PropTypes.func.isRequired,
  textarea: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired
};

export default CreateForm;
