import React from "react";
import PropTypes from "prop-types";
import { Button, ButtonGroup, CloseButton } from "@chakra-ui/core";

const AddButtonGroup = ({ onClose, value, iconColor, ...props }) => {
  return (
    <ButtonGroup d="flex" alignItems="center" {...props}>
      <Button
        type="submit"
        icon="add"
        aria-label={value}
        size="sm"
        mr={1}
        boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
      >
        {value}
      </Button>
      <CloseButton
        type="button"
        aria-label="Cancel"
        onClick={onClose}
        color={iconColor}
      />
    </ButtonGroup>
  );
};

AddButtonGroup.propTypes = {
  onClose: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired
};

export default AddButtonGroup;