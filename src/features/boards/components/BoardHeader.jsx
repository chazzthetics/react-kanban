import React, { memo } from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentBoardId,
  selectCurrentBoardColor,
  selectCurrentBoardIsEditing,
  selectBoardIsStarred
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
  const [isLightMode] = useLightMode();

  const color = useSelector(selectCurrentBoardColor);
  const boardId = useSelector(selectCurrentBoardId);
  const isEditing = useSelector(selectCurrentBoardIsEditing);
  const isStarred = useSelector(selectBoardIsStarred);

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
        <StarBoardButton boardId={boardId} isStarred={isStarred} />
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

export default memo(BoardHeader);
