import React from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentBoardColor,
  selectCurrentBoardIsEditing
} from "../slices";
import { useLightMode } from "../../../hooks";
import { Flex, Box, ButtonGroup } from "@chakra-ui/core";
import {
  BoardTitle,
  EditBoardTitleForm,
  StarBoardButton,
  RemoveBoardButton,
  ClearBoardButton
} from "./";

const BoardHeader = () => {
  const color = useSelector(selectCurrentBoardColor);
  const isEditing = useSelector(selectCurrentBoardIsEditing);

  const [isLightMode] = useLightMode();

  return (
    <Flex
      align="center"
      justify="space-between"
      px={1}
      py={2}
      h="40px"
      bg={isLightMode ? `${color}.500` : "gray.800"}
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
