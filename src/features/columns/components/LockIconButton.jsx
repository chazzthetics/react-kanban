import React, { memo } from "react";
import PropTypes from "prop-types";
import { useLightMode } from "../../../hooks";
import { IconButton } from "@chakra-ui/core";

const LockIconButton = ({ icon, isLocked, onClick }) => {
  const [isLightMode] = useLightMode();

  return (
    <IconButton
      size="sm"
      icon={icon}
      variant="ghost"
      opacity={isLocked ? 1 : 0}
      _hover={{
        backgroundColor: isLightMode ? "#d4d4d4" : "gray.500",
        opacity: 1
      }}
      _active={{ backgroundColor: isLightMode ? "#d4d4d4" : "gray.500" }}
      _focus={{
        boxShadow: isLightMode ? "0 0 0 2px #d4d4d4" : "0 0 0 2px lightgreen"
      }}
      onClick={onClick}
    />
  );
};

LockIconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  isLocked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default memo(LockIconButton);
