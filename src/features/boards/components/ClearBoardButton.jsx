import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearBoard, selectCurrentBoardId } from "../slices";
import { IconButton } from "@chakra-ui/core";

const ClearBoardButton = () => {
  const boardId = useSelector(selectCurrentBoardId);

  const dispatch = useDispatch();

  const handleClearBoard = () => {
    dispatch(clearBoard(boardId));
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
