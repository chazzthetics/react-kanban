import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDrag, useBoard } from "../../../hooks";
import { ColumnList } from "../../columns/components";
import { BoardHeader } from "./";
import { Box } from "@chakra-ui/core";

const MainBoard = () => {
  const { boardId, boardColumns, columnIds } = useBoard();

  const handleDragEnd = useDrag(boardId, boardColumns, columnIds);

  return (
    <Box bg="#437397">
      <BoardHeader />
      <DragDropContext onDragEnd={handleDragEnd}>
        <ColumnList />
      </DragDropContext>
    </Box>
  );
};

export default MainBoard;
