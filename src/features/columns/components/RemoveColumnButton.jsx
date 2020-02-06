import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { removeColumn, makeSelectColumn } from "../slices";
import { selectCurrentBoardId } from "../../boards/slices";
import { Button } from "@chakra-ui/core";

const RemoveColumnButton = ({ columnId }) => {
  const boardId = useSelector(selectCurrentBoardId);

  const columnSelector = useMemo(makeSelectColumn, []);
  const { isLocked } = useSelector(state => columnSelector(state, columnId));

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
