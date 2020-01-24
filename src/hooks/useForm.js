import { useState } from "react";

const useForm = (initialValues, submit) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Check if empty values
    for (let key of Object.keys(values)) {
      if (!values[key]) return;
    }

    try {
      submit();
      resetForm();
    } catch (ex) {
      console.error(ex); // FIXME: error handling
    }
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return { values, handleChange, handleSubmit, resetForm };
};

export default useForm;
