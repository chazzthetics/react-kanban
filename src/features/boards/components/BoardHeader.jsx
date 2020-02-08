import React from "react";
import { useBoard } from "../../../hooks";
import { Flex, Box, ButtonGroup } from "@chakra-ui/core";
import {
  EditBoardTitleForm,
  StarBoardButton,
  RemoveBoardButton,
  ClearBoardButton,
  BoardTitle
} from "./";

const BoardHeader = () => {
  const { isEditing } = useBoard();

  return (
    <Flex
      align="center"
      justify="space-between"
      px={1}
      py={2}
      h="40px"
      bg="gray.300"
      mb={2}
    >
      <Flex justify="flex-start" align="center" mx={2}>
        <Box w="100%">
          {!isEditing ? <BoardTitle /> : <EditBoardTitleForm />}
        </Box>
        <StarBoardButton />
      </Flex>
      <ButtonGroup
        d="flex"
        justifyContent="flex-end"
        alignItems="center"
        mx={2}
      >
        <ClearBoardButton />
        <RemoveBoardButton />
      </ButtonGroup>
    </Flex>
  );
};

export default BoardHeader;
