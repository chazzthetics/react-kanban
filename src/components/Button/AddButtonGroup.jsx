import React, { memo } from "react";
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
      />
    </ButtonGroup>
  );
};

AddButtonGroup.propTypes = {
  onClose: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  iconColor: PropTypes.string
};

export default memo(AddButtonGroup);

//FIXME: make own button from pseudobox? stupid fukin focus
