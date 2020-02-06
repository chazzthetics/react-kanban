import React, { useMemo, forwardRef } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  clearColumn,
  makeSelectColumn,
  makeSelectColumnTaskIdsLength
} from "../slices";
import { Button } from "@chakra-ui/core";

const ClearColumnButton = forwardRef(({ columnId }, ref) => {
  const dispatch = useDispatch();

  const hasTasksSelector = useMemo(makeSelectColumnTaskIdsLength, []);
  const hasTasks = useSelector(state => hasTasksSelector(state, columnId));

  const columnSelector = useMemo(makeSelectColumn, []);
  const { isLocked } = useSelector(state => columnSelector(state, columnId));

  const handleClearColumn = () => {
    if (hasTasks) {
      dispatch(clearColumn({ columnId }));
    }
  };

  return (
    <Button
      onClick={handleClearColumn}
      size="sm"
      fontWeight="normal"
      variant="ghost"
      mb={1}
      ref={ref}
      disabled={isLocked}
    >
      Clear List
    </Button>
  );
});

ClearColumnButton.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default ClearColumnButton;
