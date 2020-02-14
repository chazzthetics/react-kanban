import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDrag, useBoard } from "../../../hooks";
import { ColumnList } from "../../columns/components";
import { Box } from "@chakra-ui/core";
import { BoardHeader } from "./";

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
