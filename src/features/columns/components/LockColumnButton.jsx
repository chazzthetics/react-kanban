import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { selectColumnIsLocked } from "../../../app/redux/selectors";
import { columnLocked, columnUnlocked } from "../slices";
import { Button } from "@chakra-ui/core";

const LockColumnButton = ({ columnId }) => {
  const isLocked = useSelector(state => selectColumnIsLocked(state, columnId));

  const dispatch = useDispatch();

  const handleLockToggle = () => {
    if (isLocked) {
      dispatch(columnUnlocked({ columnId }));
    } else {
      dispatch(columnLocked({ columnId }));
    }
  };

  return (
    <Button
      size="sm"
      fontWeight="normal"
      variant="ghost"
      pr="calc(100% - 67px)"
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
