import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentBoardId } from "../../boards/slices";
import { removeColumn, makeSelectColumnIsLocked } from "../slices";
import { ListButton } from "../../../components/";

const RemoveColumnButton = ({ columnId }) => {
  const boardId = useSelector(selectCurrentBoardId);

  const isLockedSelector = useMemo(makeSelectColumnIsLocked);
  const isLocked = useSelector(state => isLockedSelector(state, columnId));

  const dispatch = useDispatch();
  const handleRemoveColumn = useCallback(() => {
    dispatch(removeColumn({ columnId, boardId }));
  }, [columnId, boardId, dispatch]);

  return (
    <ListButton
      onClick={handleRemoveColumn}
      isDisabled={isLocked}
      label="Remove List"
    >
      Remove List
    </ListButton>
  );
};

RemoveColumnButton.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default RemoveColumnButton;
