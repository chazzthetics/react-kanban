import React from "react";
import { useDispatch } from "react-redux";
import { useBoard } from "../../../hooks";
import { clearBoard } from "../slices";
import { AppBarIconButton } from "../../../components";

const ClearBoardButton = () => {
  const { boardId, hasColumns } = useBoard();
  const dispatch = useDispatch();

  const handleClearBoard = () => {
    if (hasColumns) {
      dispatch(clearBoard({ boardId }));
    }
  };

  return (
    <AppBarIconButton
      icon="minus"
      label="Clear Board"
      onClick={handleClearBoard}
      mr={1}
    />
  );
};

export default ClearBoardButton;
