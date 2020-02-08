import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useColumn } from "../../../hooks";
import { removeColumn } from "../slices";
import { selectCurrentBoardId } from "../../boards/slices";
import { Button } from "@chakra-ui/core";

const RemoveColumnButton = ({ columnId }) => {
  const boardId = useSelector(selectCurrentBoardId);
  const { isLocked } = useColumn(columnId);

  const dispatch = useDispatch();
  const handleRemoveColumn = () => {
    dispatch(removeColumn({ columnId, boardId }));
  };

  return (
    <Button
      onClick={handleRemoveColumn}
      size="sm"
      fontWeight="normal"
      variant="ghost"
      disabled={isLocked}
    >
      Remove List
    </Button>
  );
};

RemoveColumnButton.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default RemoveColumnButton;
