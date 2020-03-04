import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { columnSortClosed } from "../slices";
import { FiChevronLeft } from "react-icons/fi";
import { IconButton } from "@chakra-ui/core";

const BackToOptionsButton = ({ columnId }) => {
  const dispatch = useDispatch();
  const handleCloseSortOptions = useCallback(() => {
    dispatch(columnSortClosed({ columnId }));
  }, [columnId, dispatch]);

  return (
    <IconButton
      aria-label="Go Back to List Actions"
      icon={FiChevronLeft}
      size="xs"
      variant="ghost"
      onClick={handleCloseSortOptions}
      position="absolute"
      fontSize="1rem"
      top="0.3rem"
      left="0.5rem"
      opacity={0.6}
    />
  );
};

BackToOptionsButton.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default memo(BackToOptionsButton);
