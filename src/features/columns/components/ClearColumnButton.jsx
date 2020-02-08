import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useColumn } from "../../../hooks";
import { clearColumn } from "../slices";
import { Button } from "@chakra-ui/core";

const ClearColumnButton = forwardRef(({ columnId }, ref) => {
  const dispatch = useDispatch();

  const { isLocked, hasTasks } = useColumn(columnId);

  const handleClearColumn = () => {
    if (hasTasks) {
      dispatch(clearColumn({ columnId }));
    } else {
      return;
    }
  };

  return (
    <Button
      onClick={handleClearColumn}
      size="sm"
      fontWeight="normal"
      variant="ghost"
      mb={1}
      ref={ref}
      disabled={isLocked || !hasTasks}
    >
      Clear List
    </Button>
  );
});

ClearColumnButton.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default ClearColumnButton;
