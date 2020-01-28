import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Heading } from "@chakra-ui/core";
import { boardTitleEditing } from "../slices";
import {
  selectCurrentBoardId,
  selectCurrentBoardTitle
} from "../../../app/redux/selectors";

const BoardTitle = () => {
  const boardId = useSelector(selectCurrentBoardId);
  const boardTitle = useSelector(selectCurrentBoardTitle);

  const dispatch = useDispatch();

  const handleEditBoardTitle = () => {
    dispatch(boardTitleEditing({ boardId }));
  };

  return (
    <Heading
      as="h2"
      cursor="pointer"
      size="sm"
      onClick={handleEditBoardTitle}
      textTransform="uppercase"
      mx={2}
    >
      {boardTitle}
    </Heading>
  );
};

export default BoardTitle;
