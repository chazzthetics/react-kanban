import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDrag, useBoard, useLightMode } from "../../../hooks";
import { BoardHeader } from "./";
import { ColumnList } from "../../columns/components";
import { Box } from "@chakra-ui/core";

const MainBoard = () => {
  const { color, boardId, boardColumns, columnIds } = useBoard();
  const handleDragEnd = useDrag(boardId, boardColumns, columnIds);

  const [isLightMode] = useLightMode();

  return (
    <Box bg={isLightMode ? `${color}.700` : "gray.700"}>
      <BoardHeader />
      <DragDropContext onDragEnd={handleDragEnd}>
        <ColumnList />
      </DragDropContext>
    </Box>
  );
};

export default MainBoard;

//TODO: fix
