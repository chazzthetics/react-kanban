import React from "react";
import { Button } from "@chakra-ui/core";

const RemoveButton = ({ onRemove, value, leftIcon }) => {
  return (
    <Button onClick={onRemove} type="button" size="sm" leftIcon={leftIcon}>
      {value}
    </Button>
  );
};

export default RemoveButton;

//TODO: proptypes
