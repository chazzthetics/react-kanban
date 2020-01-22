import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentBoardTitle,
  selectCurrentBoardId
} from "../../../app/redux/selectors";
import { boardTitleEditing } from "../slices";
import { Heading } from "@chakra-ui/core";

const BoardHeader = () => {
  const boardTitle = useSelector(selectCurrentBoardTitle);
  const boardId = useSelector(selectCurrentBoardId);

  const dispatch = useDispatch();

  const handleEditBoardTitle = () => {
    dispatch(boardTitleEditing({ boardId }));
  };

  return (
    <Heading
      as="h2"
      style={{ cursor: "pointer" }}
      size="md"
      onClick={handleEditBoardTitle}
    >
      {boardTitle}
    </Heading>
  );
};

export default BoardHeader;
