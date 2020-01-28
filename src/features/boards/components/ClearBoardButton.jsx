import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentBoardId } from "../../../app/redux/selectors";
import { clearBoard } from "../slices";
import { Button } from "@chakra-ui/core";

const ClearBoardButton = () => {
  const dispatch = useDispatch();

  const boardId = useSelector(selectCurrentBoardId);

  const handleClearBoard = () => {
    dispatch(clearBoard(boardId));
  };

  return (
    <Button
      aria-label="Clear Board"
      size="sm"
      leftIcon="warning"
      mr={1}
      onClick={handleClearBoard}
    >
      Clear Board
    </Button>
  );
};

export default ClearBoardButton;
