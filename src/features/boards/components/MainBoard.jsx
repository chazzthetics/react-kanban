import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDrag, useLightMode } from "../../../hooks";
import {
  selectCurrentBoardColor,
  selectCurrentBoardId,
  selectCurrentBoardColumnIds
} from "../slices";
import { selectCurrentBoardColumns } from "../../shared";
import { BoardHeader } from "./";
import { ColumnList } from "../../columns/components";
import { Box } from "@chakra-ui/core";

const MainBoard = () => {
  const color = useSelector(selectCurrentBoardColor);
  const boardId = useSelector(selectCurrentBoardId);

  const boardColumns = useSelector(selectCurrentBoardColumns);
  const columnIds = useSelector(selectCurrentBoardColumnIds);

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
