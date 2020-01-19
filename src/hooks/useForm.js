import { useState } from "react";

const useForm = (initialValues, submit) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
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
