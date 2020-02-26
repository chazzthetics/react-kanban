import React, { memo, forwardRef } from "react";
import { IconButton } from "@chakra-ui/core";

const ColorRadioButton = forwardRef(({ isChecked, value, ...props }, ref) => {
  return (
    <IconButton
      name="color"
      ref={ref}
      aria-checked={isChecked}
      icon={isChecked ? "check" : null}
      color="white"
      w={35}
      h={25}
      px={0}
      my={1}
      bg={`${value}.400`}
      borderRadius={4}
      _hover={{
        backgroundColor: `${value}.500`,
        boxShadow: "2px 4px 12px -5px rgba(0, 0, 0, 0.55)"
      }}
      _active={{ backgroundColor: `${value}.300` }}
      _focus={{
        border: `2px solid ${value}.800`,
        boxShadow: "2px 4px 12px -5px rgba(0, 0, 0, 0.55)"
      }}
      {...props}
    />
  );
});

export default memo(ColorRadioButton);
