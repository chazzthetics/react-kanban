import { useState } from "react";

const useForm = (initialValues, submit) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    submit();
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return { values, handleChange, handleSubmit, resetForm };
};

// TODO: validation

export default useForm;
