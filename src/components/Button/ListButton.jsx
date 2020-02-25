import React, { memo, forwardRef } from "react";
import { useLightMode } from "../../hooks";
import { PseudoBox } from "@chakra-ui/core";

const ListButton = forwardRef(
  ({ onClick, children, label, isDisabled = false, ...props }, ref) => {
    const [isLightMode] = useLightMode();

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
        mb={1}
        borderRadius={4}
        onClick={onClick}
        ref={ref}
        bg="inherit"
        disabled={isDisabled}
        aria-label={label}
        _focus={{
          boxShadow: isLightMode ? "0 0 0 2px #efefef" : "0 0 0 2px lightgreen",
          backgroundColor: isLightMode ? "#efefef" : "inherit",
          outline: "none"
        }}
        _hover={{
          backgroundColor: isLightMode ? "#efefef" : "gray.600"
        }}
        _disabled={{ opacity: 0.4, cursor: "default" }}
        {...props}
      >
        {children}
      </PseudoBox>
    );
  }
);

export default memo(ListButton);
