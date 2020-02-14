import React from "react";
import { useDispatch } from "react-redux";
import { useBoard } from "../../../hooks";
import { Heading, PseudoBox } from "@chakra-ui/core";
import { boardTitleEditing } from "../slices";

const BoardTitle = () => {
  const { boardId, boardTitle } = useBoard();

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
      borderRadius={4}
      _hover={{ backgroundColor: "#5F9AC4" }}
      transition="background-color 150ms ease-in"
    >
      <Heading
        as="h2"
        cursor="pointer"
        size="sm"
        color="#F1F4FF"
        mx={3}
        onClick={handleEditBoardTitle}
      >
        {boardTitle}
      </Heading>
    </PseudoBox>
  );
};

export default BoardTitle;
