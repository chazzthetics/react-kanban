import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentBoardId } from "../../../app/redux/selectors";
import { clearBoard } from "../slices";
import { IconButton } from "@chakra-ui/core";

const ClearBoardButton = () => {
  const dispatch = useDispatch();

  const boardId = useSelector(selectCurrentBoardId);

  const handleClearBoard = () => {
    dispatch(clearBoard(boardId));
  };

  return (
    <IconButton
      aria-label="Clear Board"
      size="sm"
      fontSize="1.1rem"
      icon="minus"
      mr={1}
      onClick={handleClearBoard}
    />
  );
};

export default ClearBoardButton;
