import React, { memo, forwardRef, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { makeSelectColumnIsLocked, toggleLockColumn } from "../slices";
import { ListButton } from "../../../components";

const LockColumnButton = forwardRef(({ columnId }, ref) => {
  const isLockedSelector = useMemo(makeSelectColumnIsLocked, []);
  const isLocked = useSelector(state => isLockedSelector(state, columnId));

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

export default memo(LockColumnButton);
