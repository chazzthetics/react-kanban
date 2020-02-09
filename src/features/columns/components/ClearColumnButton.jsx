import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useColumn } from "../../../hooks";
import { clearColumn } from "../slices";
import { ListButton } from "../../../components";

const ClearColumnButton = ({ columnId }) => {
  const dispatch = useDispatch();

  const { isLocked, hasTasks } = useColumn(columnId);

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
