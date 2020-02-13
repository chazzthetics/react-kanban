import React, { forwardRef } from "react";
import { PseudoBox } from "@chakra-ui/core";

const ListButton = forwardRef(
  ({ onClick, children, label, isDisabled = false }, ref) => {
    return (
      <PseudoBox
        as="button"
        size="sm"
        h="100%"
        d="flex"
        minW="100%"
        maxW="100%"
        alignItems="center"
        justifyContent="flex-start"
        fontSize=".9rem"
        px={2}
        py={1}
        borderRadius={4}
        onClick={onClick}
        ref={ref}
        bg="white"
        disabled={isDisabled}
        aria-label={label}
        _focus={{ border: "2px solid #3182ce" }}
        _hover={{ backgroundColor: "gray.50" }}
        _disabled={{ opacity: 0.4, cursor: "default" }}
      >
        {children}
      </PseudoBox>
    );
  }
);

export default ListButton;
