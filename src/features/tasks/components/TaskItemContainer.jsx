import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useLightMode } from "../../../hooks";
import { Flex } from "@chakra-ui/core";

const TaskItemContainer = ({
  isDragging,
  onOpenEdit,
  onShow,
  onHide,
  children
}) => {
  const [isLightMode] = useLightMode();
  const handleShowOptions = useCallback(() => onShow(), [onShow]);
  const handleHideOptions = useCallback(() => onHide(), [onHide]);

  return (
    <Flex
      py={1}
      px={2}
      mb={2}
      minH="40px"
      minW="272px"
      boxShadow={
        isDragging
          ? "2px 8px 12px -1px rgba(0,0,0,0.29)"
          : "2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
      }
      align="center"
      justify="space-between"
      bg={isLightMode ? "white" : "gray.700"}
      transform={isDragging ? "rotate(-2deg)" : "none"}
      borderRadius={4}
      cursor="pointer"
      onMouseOver={handleShowOptions}
      onMouseLeave={handleHideOptions}
      onDoubleClick={onOpenEdit}
    >
      {children}
    </Flex>
  );
};

TaskItemContainer.propTypes = {
  isDragging: PropTypes.bool.isRequired,
  onOpenEdit: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default TaskItemContainer;
