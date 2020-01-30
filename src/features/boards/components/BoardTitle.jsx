import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Heading, PseudoBox } from "@chakra-ui/core";
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
    <PseudoBox
      h="32px"
      d="flex"
      alignItems="center"
      mr={1}
      borderRadius={4}
      _hover={{ backgroundColor: "gray.400" }}
    >
      <Heading
        as="h2"
        cursor="pointer"
        size="sm"
        mx={3}
        onClick={handleEditBoardTitle}
      >
        {boardTitle}
      </Heading>
    </PseudoBox>
  );
};

export default BoardTitle;

// TODO: change to Editiable chakra component
