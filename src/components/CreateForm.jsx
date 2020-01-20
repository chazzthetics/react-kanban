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
        onChange={handleChange}
        value={values[inputName]}
        name={inputName}
        placeholder={placeholder}
      />
      <button type="submit" iconBefore="plus" appearance="primary">
        {submitValue}
      </button>
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
