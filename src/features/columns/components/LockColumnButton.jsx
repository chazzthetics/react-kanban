import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { toggleLockColumn, makeSelectColumn } from "../slices";
import { Button } from "@chakra-ui/core";

const LockColumnButton = ({ columnId }) => {
  const columnSelector = useMemo(makeSelectColumn, []);

  const { isLocked } = useSelector(state => columnSelector(state, columnId));

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
