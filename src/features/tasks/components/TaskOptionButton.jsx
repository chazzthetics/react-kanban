import React, { memo } from "react";
import PropTypes from "prop-types";
import { useLightMode } from "../../../hooks";
import { IconButton } from "@chakra-ui/core";

const TaskOptionButton = ({ icon, label, onClick }) => {
  const [isLightMode] = useLightMode();

  return (
    <IconButton
      size="sm"
      aria-label={label}
      variant="ghost"
      opacity={0.2}
      _hover={{
        backgroundColor: isLightMode ? "#ebecf0" : "gray.600",
        opacity: 1
      }}
      _active={{ backgroundColor: isLightMode ? "#d4d4d4" : "gray.500" }}
      _focus={{ boxShadow: "0 0 0 2px #d4d4d4" }}
      transition="background-color 120ms ease-in, opacity 120ms ease-in, boxShadow 120ms ease-in"
      icon={icon}
      onClick={onClick}
    />
  );
};

TaskOptionButton.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default memo(TaskOptionButton);
