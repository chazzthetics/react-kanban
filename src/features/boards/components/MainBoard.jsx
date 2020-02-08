import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDrag, useBoard } from "../../../hooks";
import { ColumnList } from "../../columns/components";
import { Box, Flex, Spinner } from "@chakra-ui/core";
import { BoardHeader } from "./";

const MainBoard = () => {
  const { boardId, boardColumns, columnIds } = useBoard();

  //FIXME: move to selector later
  const loading = useSelector(state => state.request.loading);

  const handleDragEnd = useDrag(boardId, boardColumns, columnIds);

  if (loading)
    return (
      <Flex align="center" justify="center" h="80%">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );

  //FIXME: no "no boards" during init load
  if (!loading && !boardId) return <h3>No Boards</h3>;

  return (
    <Box>
      <BoardHeader />
      <DragDropContext onDragEnd={handleDragEnd}>
        <ColumnList />
      </DragDropContext>
    </Box>
  );
};

export default MainBoard;
