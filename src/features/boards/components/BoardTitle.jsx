import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Heading, PseudoBox } from "@chakra-ui/core";
import {
  boardTitleEditing,
  selectCurrentBoardTitle,
  selectCurrentBoardColor,
  selectCurrentBoardId
} from "../slices";

const BoardTitle = () => {
  const boardId = useSelector(selectCurrentBoardId);
  const boardTitle = useSelector(selectCurrentBoardTitle);
  const color = useSelector(selectCurrentBoardColor);

  const dispatch = useDispatch();

  const handleEditBoardTitle = useCallback(() => {
    dispatch(boardTitleEditing({ boardId }));
  }, [dispatch, boardId]);

  return (
    <PseudoBox
      h="32px"
      d="flex"
      alignItems="center"
      mr={1}
      cursor="pointer"
      borderRadius={4}
      _hover={{ backgroundColor: `${color}.500` }}
      transition="background-color 150ms ease-in"
      onClick={handleEditBoardTitle}
    >
      <Heading as="h2" size="sm" color="#F1F4FF" mx={3}>
        {boardTitle}
      </Heading>
    </PseudoBox>
  );
};

export default BoardTitle;
