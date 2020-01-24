import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentBoardId } from "../../../app/redux/selectors";
import { boardCleared } from "../slices";
import { IconButton } from "@chakra-ui/core";

const ClearBoardButton = () => {
  const dispatch = useDispatch();

  const boardId = useSelector(selectCurrentBoardId);

  const handleClearBoard = () => {
    dispatch(boardCleared({ boardId }));
  };

  return (
    <IconButton
      aria-label="Clear board"
      icon="at-sign"
      onClick={handleClearBoard}
    />
  );
};

export default ClearBoardButton;

//TODO: change icon, just temp for now
