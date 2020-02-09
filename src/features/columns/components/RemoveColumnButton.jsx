import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useBoard, useColumn } from "../../../hooks";
import { removeColumn } from "../slices";
import { ListButton } from "../../../components/";

const RemoveColumnButton = ({ columnId }) => {
  const { boardId } = useBoard();
  const { isLocked } = useColumn(columnId);

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
