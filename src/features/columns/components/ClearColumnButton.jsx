import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  makeSelectColumnIsLocked,
  makeSelectColumnTaskIdsLength,
  clearColumn
} from "../slices";
import { ListButton } from "../../../components";

const ClearColumnButton = ({ columnId }) => {
  const dispatch = useDispatch();

  const isLockedSelector = useMemo(makeSelectColumnIsLocked, []);
  const isLocked = useSelector(state => isLockedSelector(state, columnId));

  const hasTasksSelector = useMemo(makeSelectColumnTaskIdsLength, []);
  const hasTasks = useSelector(state => hasTasksSelector(state, columnId));

  const handleClearColumn = useCallback(() => {
    if (hasTasks) {
      dispatch(clearColumn({ columnId }));
    } else {
      return;
    }
  }, [columnId, hasTasks, dispatch]);

  return (
    <ListButton
      onClick={handleClearColumn}
      isDisabled={isLocked || hasTasks === 0}
      label="Clear List"
    >
      Clear List
    </ListButton>
  );
};

ClearColumnButton.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default ClearColumnButton;
