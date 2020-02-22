import React from "react";
import PropTypes from "prop-types";
import { useLightMode } from "../../hooks";
import { Button, ButtonGroup, CloseButton } from "@chakra-ui/core";

const AddButtonGroup = ({
  onClose,
  value,
  color = "green",
  iconColor = "black",
  ...props
}) => {
  const [isLightMode] = useLightMode();

  return (
    <ButtonGroup d="flex" alignItems="center" {...props}>
      <Button
        type="submit"
        icon="add"
        aria-label={value}
        size="sm"
        mr={1}
        variantColor={color}
        boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
      >
        {value}
      </Button>
      <CloseButton
        type="button"
        aria-label="Cancel"
        onClick={onClose}
        color={isLightMode ? iconColor : "white"}
        _hover={{
          backgroundColor: isLightMode ? "rgba(0,0,0,0.06)" : "gray.500"
        }}
      />
    </ButtonGroup>
  );
};

AddButtonGroup.propTypes = {
  onClose: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  iconColor: PropTypes.string
};

export default AddButtonGroup;
