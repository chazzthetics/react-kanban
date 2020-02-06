import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearBoard,
  selectCurrentBoardId,
  selectCurrentBoardColumnIdsLength
} from "../slices";
import { IconButton } from "@chakra-ui/core";

const ClearBoardButton = () => {
  const boardId = useSelector(selectCurrentBoardId);
  const hasColumns = useSelector(selectCurrentBoardColumnIdsLength);

  const dispatch = useDispatch();

  const handleClearBoard = () => {
    if (hasColumns) {
      dispatch(clearBoard({ boardId }));
    }
  };

  return (
    <IconButton
      aria-label="Clear Board"
      size="sm"
      fontSize="1rem"
      icon="minus"
      mr={1}
      onClick={handleClearBoard}
    />
  );
};

export default ClearBoardButton;
