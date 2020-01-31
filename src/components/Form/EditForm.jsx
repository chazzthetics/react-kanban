import React from "react";
import PropTypes from "prop-types";
import { useCancel, useFocus, useForm } from "../../hooks";
import { Input, Textarea } from "@chakra-ui/core";

const EditForm = ({
  inputName,
  initialValues,
  isEditing,
  update,
  onCancel,
  children,
  textarea = false,
  ...props
}) => {
  const { values, handleChange, handleSubmit } = useForm(initialValues, () =>
    update(values[inputName])
  );

  const focusRef = useFocus();
  const cancelRef = useCancel(isEditing, onCancel);

  return (
    <form onSubmit={handleSubmit} ref={cancelRef} style={{ width: "100%" }}>
      {!textarea ? (
        <Input
          type="text"
          ref={focusRef}
          name={inputName}
          value={values[inputName]}
          onChange={handleChange}
          pl={1}
          pr={2}
          mr={1}
          minW="1rem"
          borderRadius={4}
          size="sm"
          fontSize="1rem"
          fontWeight="bold"
          {...props}
        />
      ) : (
        <>
          <Textarea
            ref={focusRef}
            name={inputName}
            value={values[inputName]}
            onChange={handleChange}
            fontSize=".9rem"
            mb={2}
            {...props}
          />
          {children}
        </>
      )}
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

//TODO: checkout style props
// TODO: make stretch
