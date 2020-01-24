import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentBoardId } from "../../../app/redux/selectors";
import { boardCleared } from "../slices";
import { Button } from "@chakra-ui/core";

const ClearBoardButton = () => {
  const dispatch = useDispatch();

  const boardId = useSelector(selectCurrentBoardId);

  const handleClearBoard = () => {
    dispatch(boardCleared({ boardId }));
  };

  return (
    <Button
      aria-label="Clear Board"
      size="sm"
      leftIcon="warning"
      onClick={handleClearBoard}
    >
      Clear Board
    </Button>
  );
};

export default ClearBoardButton;

//TODO: change icon, just temp for now
