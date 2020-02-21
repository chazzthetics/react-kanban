import React from "react";
import { useDispatch } from "react-redux";
import { useBoard } from "../../../hooks";
import { Heading, PseudoBox } from "@chakra-ui/core";
import { boardTitleEditing } from "../slices";

const BoardTitle = () => {
  const { color, boardId, boardTitle } = useBoard();
  const dispatch = useDispatch();

  const handleEditBoardTitle = () => {
    dispatch(boardTitleEditing({ boardId }));
  };

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
