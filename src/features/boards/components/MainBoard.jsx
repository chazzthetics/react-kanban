import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDrag, useBoard } from "../../../hooks";
import { BoardHeader, CreateNewBoardModal } from "./";
import { ColumnList } from "../../columns/components";
import { FullPageSpinner } from "../../../components";
import { Box } from "@chakra-ui/core";

const MainBoard = () => {
  const { color, boardId, boardColumns, columnIds } = useBoard();
  const handleDragEnd = useDrag(boardId, boardColumns, columnIds);

  return (
    <Box bg={`${color}.700`}>
      <BoardHeader />
      <DragDropContext onDragEnd={handleDragEnd}>
        <ColumnList />
      </DragDropContext>
    </Box>
  );
};

export default MainBoard;

//TODO: fix
