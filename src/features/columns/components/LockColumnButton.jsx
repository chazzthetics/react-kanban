import React, { forwardRef, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useColumn } from "../../../hooks";
import { toggleLockColumn } from "../slices";
import { ListButton } from "../../../components";

const LockColumnButton = forwardRef(({ columnId }, ref) => {
  const { isLocked } = useColumn(columnId);

  const dispatch = useDispatch();
  const handleLockToggle = useCallback(() => {
    dispatch(toggleLockColumn({ columnId, isLocked: !isLocked }));
  }, [columnId, isLocked, dispatch]);

  return (
    <ListButton
      onClick={handleLockToggle}
      ref={ref}
      label={!isLocked ? "Lock List" : "Unlock List"}
    >
      {!isLocked ? "Lock List" : "Unlock List"}
    </ListButton>
  );
});

LockColumnButton.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default LockColumnButton;
