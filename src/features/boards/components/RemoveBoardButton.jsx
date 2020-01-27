import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeBoard } from "../slices";
import { selectCurrentBoardId } from "../../../app/redux/selectors";
import { RemoveButton } from "../../../components";

const RemoveBoardButton = () => {
  const boardId = useSelector(selectCurrentBoardId);

  const dispatch = useDispatch();

  const handleRemoveBoard = () => {
    dispatch(removeBoard(boardId));
  };

  return (
    <RemoveButton
      onRemove={handleRemoveBoard}
      value="Remove Board"
      leftIcon="delete"
    />
  );
};

export default RemoveBoardButton;
