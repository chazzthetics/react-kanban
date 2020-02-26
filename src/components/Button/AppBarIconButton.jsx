import React, { memo } from "react";
import PropTypes from "prop-types";
import { IconButton } from "@chakra-ui/core";
import { useLightMode } from "../../hooks";

const AppBarIconButton = ({
  icon,
  label,
  onClick,
  color = "#fff",
  ...props
}) => {
  const [isLightMode] = useLightMode();

  return (
    <IconButton
      icon={icon}
      size="sm"
      bg="rgba(0,0,0,0.3)"
      color={color}
      onClick={onClick}
      _hover={{ backgroundColor: "rgba(255,255,255,0.4)" }}
      _active={{ backgroundColor: "rgba(255,255,255,0.2)" }}
      _focus={{
        boxShadow: isLightMode ? "0 0 0 2px white" : "0 0 0 2px lightgreen"
      }}
      {...props}
    />
  );
};

AppBarIconButton.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string
};

export default memo(AppBarIconButton);
