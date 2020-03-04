import React, { memo } from "react";
import PropTypes from "prop-types";
import { useForm, useFocus, useCancel, useLightMode } from "../../hooks";
import { Input, Textarea } from "@chakra-ui/core";

const CreateForm = ({
  inputName,
  initialValues,
  create,
  children,
  isOpen,
  onCancel,
  firstFieldRef = null,
  popover = false,
  placeholder = "",
  textarea = false,
  ...props
}) => {
  const {
    values,
    handleChange,
    handleSubmit,
    resetForm
  } = useForm(initialValues, () => create(values[inputName]));

  const cancelRef = useCancel(isOpen, () => {
    if (values[inputName]) {
      create(values[inputName]);
      resetForm();
      onCancel();
    } else {
      onCancel();
    }
  });

  const focusRef = useFocus();
  const [isLightMode] = useLightMode();

  return (
    <form onSubmit={handleSubmit} ref={cancelRef} style={{ width: "100%" }}>
      {!textarea ? (
        <Input
          type="text"
          onChange={handleChange}
          value={values[inputName]}
          name={inputName}
          borderRadius={4}
          placeholder={placeholder}
          ref={popover ? firstFieldRef : focusRef}
          boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
          bg={isLightMode ? "white" : "gray.700"}
          _focus={{
            border: "1px solid",
            borderRadius: "4px",
            borderColor: isLightMode ? "#ddd" : "gray.200"
          }}
          _placeholder={{
            color: isLightMode ? "gray.400" : "gray.200"
          }}
          {...props}
        />
      ) : (
        <Textarea
          className={`textarea ${isLightMode ? "light" : "dark"}`}
          onChange={handleChange}
          value={values[inputName]}
          name={inputName}
          placeholder={placeholder}
          ref={popover ? firstFieldRef : focusRef}
          boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
          bg={isLightMode ? "white" : "gray.700"}
          minH="120px"
          _focus={{
            border: "1px solid",
            borderRadius: "4px",
            borderColor: isLightMode ? "#ddd" : "gray.200"
          }}
          _placeholder={{
            color: isLightMode ? "gray.400" : "gray.200"
          }}
          {...props}
        />
      )}
      {children}
    </form>
  );
};

CreateForm.propTypes = {
  inputName: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  create: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  textarea: PropTypes.bool,
  popover: PropTypes.bool,
  isOpen: PropTypes.bool,
  firstFieldRef: PropTypes.shape({ current: PropTypes.any }),
  onCancel: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default memo(CreateForm);
