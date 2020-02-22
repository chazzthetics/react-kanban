import React from "react";
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
      transition="background-color 100ms ease-in, opacity 100ms ease-in"
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

export default TaskOptionButton;
