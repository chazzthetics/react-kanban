import React, { memo } from "react";
import PropTypes from "prop-types";
import { useCancel, useFocus, useForm, useLightMode } from "../../hooks";
import { Input, Textarea } from "@chakra-ui/core";

const EditForm = ({
  inputName,
  initialValues,
  isEditing,
  update,
  children,
  textarea = false,
  ...props
}) => {
  const [isLightMode] = useLightMode();

  const { values, handleChange, handleSubmit } = useForm(initialValues, () =>
    update(values[inputName])
  );

  const focusRef = useFocus(true);

  const cancelRef = useCancel(isEditing, () => {
    if (values[inputName]) {
      update(values[inputName]);
    }
  });

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
          fontWeight="700"
          bg={isLightMode ? "white" : "gray.700"}
          _focus={{
            border: "1px solid",
            borderRadius: "4px",
            borderColor: isLightMode ? "#ddd" : "gray.200"
          }}
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
            boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
            _focus={{
              border: "1px solid",
              borderRadius: "4px",
              borderColor: isLightMode ? "#ddd" : "gray.200"
            }}
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
  update: PropTypes.func.isRequired
};

export default EditForm;

//TODO: checkout style props
