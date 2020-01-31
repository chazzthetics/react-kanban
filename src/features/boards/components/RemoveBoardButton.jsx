import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeBoard } from "../slices";
import { selectCurrentBoardId } from "../../../app/redux/selectors";
import { IconButton } from "@chakra-ui/core";

const RemoveBoardButton = () => {
  const boardId = useSelector(selectCurrentBoardId);

  const dispatch = useDispatch();

  const handleRemoveBoard = () => {
    dispatch(removeBoard(boardId));
  };

  return (
    <IconButton
      aria-label="Remove Board"
      icon="delete"
      size="sm"
      fontSize="1.1rem"
      onClick={handleRemoveBoard}
    />
  );
};

export default RemoveBoardButton;
