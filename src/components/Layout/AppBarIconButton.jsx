import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "@chakra-ui/core";

const AppBarIconButton = ({
  icon,
  label,
  onClick,
  color = "#fff",
  ...props
}) => {
  return (
    <IconButton
      icon={icon}
      size="sm"
      bg="rgba(0,0,0,0.3)"
      color={color}
      onClick={onClick}
      _hover={{ backgroundColor: "rgba(0,0,0,0.1)" }}
      {...props}
    />
  );
};

AppBarIconButton.propTypes = {
  icon: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func
};

export default AppBarIconButton;
