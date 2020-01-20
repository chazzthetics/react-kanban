import React from "react";
import { Button } from "@chakra-ui/core";

const RemoveButton = ({ onRemove, value }) => {
  return (
    <Button onClick={onRemove} type="button">
      {value}
    </Button>
  );
};

export default RemoveButton;
