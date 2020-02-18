import React from "react";
import { useBoard } from "../../../hooks";
import { Flex, Box, ButtonGroup } from "@chakra-ui/core";
import {
  BoardTitle,
  EditBoardTitleForm,
  StarBoardButton,
  RemoveBoardButton,
  ClearBoardButton
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
      background="linear-gradient(90deg, rgba(2,0,36,0.8) 0%, rgba(57,114,159,0.8) 25%, rgba(57,114,159,0.8) 75%, rgba(2,0,36,0.8) 100%)"
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
