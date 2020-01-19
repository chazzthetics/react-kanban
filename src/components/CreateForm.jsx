import React from "react";
import { useForm } from "../hooks";

const CreateForm = ({ inputName, placeholder, initialValues, create }) => {
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
      <button type="submit">Add Board</button>
    </form>
  );
};

export default CreateForm;

// FIXME: only works for single inputs
// TODO: proptypes
