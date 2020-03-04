import React, { memo } from "react";
import PropTypes from "prop-types";
import { useLightMode } from "../../../hooks";
import { PseudoBox } from "@chakra-ui/core";

const BoardBox = ({ backgroundColor, onClick, children, ...props }) => {
  const [isLightMode] = useLightMode();

  return (
    <PseudoBox
      h={100}
      w="100%"
      d="inline-block"
      borderRadius={4}
      cursor="pointer"
      bg={backgroundColor}
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: isLightMode
          ? "2px 12px 14px -10px rgba(0, 0, 0, 0.75)"
          : "2px 10px 6px -8px rgba(255, 255, 255, 0.55)"
      }}
      transition="transform 150ms ease-in, box-shadow 150ms ease-in"
      onClick={onClick}
      {...props}
    >
      {children}
    </PseudoBox>
  );
};

BoardBox.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

export default memo(BoardBox);
