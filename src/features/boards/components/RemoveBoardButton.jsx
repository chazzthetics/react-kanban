import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { boardRemoved } from "../slices";
import { selectCurrentBoardId } from "../../../app/redux/selectors";

const RemoveBoardButton = () => {
  const boardId = useSelector(selectCurrentBoardId);

  const dispatch = useDispatch();
  const handleRemoveBoard = () => {
    dispatch(boardRemoved({ boardId }));
  };

  return <button onClick={handleRemoveBoard}>Delete Board</button>;
};

export default RemoveBoardButton;
