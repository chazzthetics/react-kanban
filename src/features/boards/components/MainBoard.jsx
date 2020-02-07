import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDrag } from "../../../hooks";
import { ColumnList } from "../../columns/components";
import { selectCurrentBoardColumns } from "../../shared";
import { selectCurrentBoardId, selectCurrentBoardColumnIds } from "../slices";
import { Box, Flex, Spinner } from "@chakra-ui/core";
import { BoardHeader } from "./";

const MainBoard = () => {
  const currentBoardId = useSelector(selectCurrentBoardId);
  const currentBoardColumns = useSelector(selectCurrentBoardColumns);
  const columnIds = useSelector(selectCurrentBoardColumnIds);

  //FIXME: move to selector later
  const loading = useSelector(state => state.request.loading);

  const handleDragEnd = useDrag(currentBoardId, currentBoardColumns, columnIds);

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

  if (!loading && !currentBoardId) return <h3>No Boards</h3>;

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
