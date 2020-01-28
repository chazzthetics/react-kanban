import React from "react";
import PropTypes from "prop-types";
import { useForm, useFocus, useCancel } from "../../hooks";
import { Input, Textarea } from "@chakra-ui/core";

const CreateForm = ({
  inputName,
  initialValues,
  create,
  children,
  isOpen,
  onCancel,
  firstFieldRef = null,
  popover = false,
  placeholder = "",
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
          ref={popover ? firstFieldRef : focusRef}
          size="sm"
          w="17rem"
          h="36px"
        />
      ) : (
        <Textarea
          onChange={handleChange}
          value={values[inputName]}
          name={inputName}
          placeholder={placeholder}
          resize="none"
          ref={popover ? firstFieldRef : focusRef}
        />
      )}
      {children}
    </form>
  );
};

CreateForm.propTypes = {
  inputName: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  create: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  textarea: PropTypes.bool,
  popover: PropTypes.bool,
  isOpen: PropTypes.bool,
  firstFieldRef: PropTypes.shape({ current: PropTypes.any }),
  onCancel: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default CreateForm;

//TODO: fix proptypes
