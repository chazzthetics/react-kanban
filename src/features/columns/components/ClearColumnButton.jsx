import React, { memo, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  makeSelectColumnIsLocked,
  makeSelectColumnHasTasks,
  clearColumn
} from "../slices";
import { ListButton } from "../../../components";

const ClearColumnButton = ({ columnId }) => {
  const dispatch = useDispatch();

  const isLockedSelector = useMemo(makeSelectColumnIsLocked, []);
  const isLocked = useSelector(state => isLockedSelector(state, columnId));

  const hasTasksSelector = useMemo(makeSelectColumnHasTasks, []);
  const hasTasks = useSelector(state => hasTasksSelector(state, columnId));

  const handleClearColumn = useCallback(() => {
    if (hasTasks > 0) {
      dispatch(clearColumn(columnId));
    } else {
      return;
    }
  }, [columnId, hasTasks, dispatch]);

  return (
    <ListButton
      onClick={handleClearColumn}
      isDisabled={isLocked || !hasTasks}
      label="Clear List"
    >
      Clear List
    </ListButton>
  );
};

ClearColumnButton.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default memo(ClearColumnButton);
