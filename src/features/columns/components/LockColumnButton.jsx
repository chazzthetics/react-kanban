import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useColumn } from "../../../hooks";
import { toggleLockColumn } from "../slices";
import { Button } from "@chakra-ui/core";

const LockColumnButton = ({ columnId }) => {
  const { isLocked } = useColumn(columnId);

  const dispatch = useDispatch();
  const handleLockToggle = () => {
    dispatch(toggleLockColumn({ columnId, isLocked: !isLocked }));
  };

  return (
    <Button
      size="sm"
      fontWeight="normal"
      variant="ghost"
      onClick={handleLockToggle}
    >
      {!isLocked ? "Lock List" : "Unlock List"}
    </Button>
  );
};

LockColumnButton.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default LockColumnButton;

// FIXME: fix padding on hover..
