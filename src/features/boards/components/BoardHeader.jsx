import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentBoardIsEditing } from "../../../app/redux/selectors";
import { FiStar } from "react-icons/fi";
import { Flex, Box, IconButton } from "@chakra-ui/core";
import {
  EditBoardTitleForm,
  RemoveBoardButton,
  ClearBoardButton,
  BoardTitle
} from "./";

const BoardHeader = () => {
  const isEditing = useSelector(selectCurrentBoardIsEditing);

  return (
    <Flex
      align="center"
      justify="space-between"
      px={1}
      py={2}
      h="40px"
      bg="gray.400"
    >
      <Flex justify="flex-start" align="center">
        <Box maxW="15rem" w="100%">
          {!isEditing ? <BoardTitle /> : <EditBoardTitleForm />}
        </Box>
        <IconButton icon={FiStar} fontSize="1.3rem" size="sm" />
      </Flex>
      <Flex justify="flex-end" align="center" mx={2}>
        <ClearBoardButton />
        <RemoveBoardButton />
      </Flex>
    </Flex>
  );
};

export default BoardHeader;
