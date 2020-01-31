import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDrag } from "../../../hooks";
import { ColumnList } from "../../columns/components";
import { arrayToObject } from "../../../utils/arrayToObject";
import {
  selectCurrentBoardId,
  selectCurrentBoardColumns,
  selectCurrentBoardColumnIds
} from "../../../app/redux/selectors";
import { Box, Flex, Spinner } from "@chakra-ui/core";
import { BoardHeader } from "./";

const MainBoard = () => {
  const currentBoardId = useSelector(selectCurrentBoardId);
  const columnIds = useSelector(selectCurrentBoardColumnIds);

  const loading = useSelector(state => state.request.loading);

  const currentBoardColumns = arrayToObject(
    useSelector(selectCurrentBoardColumns)
  );

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
