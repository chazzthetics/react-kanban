import React, { forwardRef } from "react";
import { useBoard, useLightMode } from "../../hooks";
import { PseudoBox } from "@chakra-ui/core";

const ListButton = forwardRef(
  ({ onClick, children, label, isDisabled = false }, ref) => {
    const { color } = useBoard();
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
        borderRadius={4}
        onClick={onClick}
        ref={ref}
        bg="inherit"
        disabled={isDisabled}
        aria-label={label}
        _focus={{
          borderStyle: "solid",
          borderWidth: isLightMode ? "2px" : "2px",
          borderColor: isLightMode ? "#cdcace" : `${color}.300`,
          outline: "none"
        }}
        _hover={{
          backgroundColor: isLightMode ? "#efefef" : "gray.600"
        }}
        _disabled={{ opacity: 0.4, cursor: "default" }}
      >
        {children}
      </PseudoBox>
    );
  }
);

export default ListButton;
