import React from "react";
import PropTypes from "prop-types";
import { useForm } from "../hooks";

const CreateForm = ({
  inputName,
  placeholder,
  initialValues,
  create,
  submitValue
}) => {
  const { values, handleChange, handleSubmit } = useForm(initialValues, () =>
    create(values[inputName])
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={placeholder}
        name={inputName}
        value={values[inputName]}
        onChange={handleChange}
      />
      <button type="submit">{submitValue}</button>
    </form>
  );
};

export default CreateForm;

CreateForm.propTypes = {
  inputName: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  create: PropTypes.func.isRequired,
  submitValue: PropTypes.string.isRequired
};
