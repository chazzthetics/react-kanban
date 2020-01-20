import React from "react";
import PropTypes from "prop-types";
import { useForm } from "../../hooks";
import { Input, Button, Textarea } from "@chakra-ui/core";

const CreateForm = ({
  inputName,
  placeholder,
  initialValues,
  create,
  submitValue,
  textarea = false
}) => {
  const { values, handleChange, handleSubmit } = useForm(initialValues, () =>
    create(values[inputName])
  );

  return (
    <form onSubmit={handleSubmit}>
      {!textarea ? (
        <Input
          type="text"
          onChange={handleChange}
          value={values[inputName]}
          name={inputName}
          placeholder={placeholder}
        />
      ) : (
        <Textarea />
      )}
      <Button type="submit">{submitValue}</Button>
    </form>
  );
};

export default CreateForm;

CreateForm.propTypes = {
  inputName: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  create: PropTypes.func.isRequired,
  submitValue: PropTypes.string.isRequired,
  textarea: PropTypes.bool
};
