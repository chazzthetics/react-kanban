import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { boardRemoved } from "../slices";
import { selectCurrentBoardId } from "../../../app/redux/selectors";
import { RemoveButton } from "../../../components";

const RemoveBoardButton = () => {
  const boardId = useSelector(selectCurrentBoardId);

  const dispatch = useDispatch();

  const handleRemoveBoard = () => {
    dispatch(boardRemoved({ boardId }));
  };

  return <RemoveButton onRemove={handleRemoveBoard} value="Remove Board" />;
};

export default RemoveBoardButton;
