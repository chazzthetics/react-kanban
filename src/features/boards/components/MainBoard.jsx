import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDrag, useLightMode } from "../../../hooks";
import { selectCurrentBoardColor } from "../slices";
import { BoardHeader } from "./";
import { ColumnList } from "../../columns/components";
import { Box } from "@chakra-ui/core";

const MainBoard = () => {
  const [isLightMode] = useLightMode();
  const color = useSelector(selectCurrentBoardColor);

  const handleDragEnd = useDrag();

  return (
    <Box bg={isLightMode ? `${color}.400` : "gray.700"}>
      <BoardHeader />
      <DragDropContext onDragEnd={handleDragEnd}>
        <ColumnList />
      </DragDropContext>
    </Box>
  );
};

export default MainBoard;
