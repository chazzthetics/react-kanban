import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentBoardTitle,
  selectCurrentBoardId
} from "../../../app/redux/selectors";
import { boardTitleEditing } from "../slices";

const BoardHeader = () => {
  const boardTitle = useSelector(selectCurrentBoardTitle);
  const boardId = useSelector(selectCurrentBoardId);

  const dispatch = useDispatch();

  const handleEditBoardTitle = () => {
    dispatch(boardTitleEditing({ boardId }));
  };

  return (
    <h3 style={{ cursor: "pointer" }} onClick={handleEditBoardTitle}>
      {boardTitle}
    </h3>
  );
};

export default BoardHeader;
