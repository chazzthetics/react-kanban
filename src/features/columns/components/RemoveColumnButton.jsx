import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { removeColumn } from "../slices";
import { selectCurrentBoardId } from "../../../app/redux/selectors";
import { Button } from "@chakra-ui/core";

const RemoveColumnButton = forwardRef(({ columnId }, ref) => {
  const boardId = useSelector(selectCurrentBoardId);

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
      pr="205px"
      mb={1}
      ref={ref}
    >
      Remove List
    </Button>
  );
});

RemoveColumnButton.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default RemoveColumnButton;
