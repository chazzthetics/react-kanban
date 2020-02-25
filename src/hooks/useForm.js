import { useState, useCallback } from "react";

const useForm = (initialValues, submit, resetOnSuccess = true) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = useCallback(
    e => {
      setValues({ ...values, [e.target.name]: e.target.value });
    },
    [values]
  );

  const handleRadioSelect = useCallback(
    value => {
      setValues({ ...values, color: value });
    },
    [values]
  );

  const handleSubmit = e => {
    e.preventDefault();
    // Check if empty values
    for (let key of Object.keys(values)) {
      if (!values[key]) return;
    }

    try {
      submit();
      if (resetOnSuccess) {
        resetForm();
      }
    } catch (ex) {
      console.error(ex); // FIXME: error handling
    }
  };

  const resetForm = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  return { values, handleChange, handleRadioSelect, handleSubmit, resetForm };
};

export default useForm;
