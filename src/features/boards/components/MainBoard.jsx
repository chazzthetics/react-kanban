import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDrag, useBoard } from "../../../hooks";
import { selectUser } from "../../auth/";
import { BoardHeader, CreateNewBoardModal } from "./";
import { ColumnList } from "../../columns/components";
import { FullPageSpinner } from "../../../components";
import { Box } from "@chakra-ui/core";

const MainBoard = () => {
  const { loading: dataLoading } = useSelector(state => state.request);
  const user = useSelector(selectUser);

  const { boardId, boardColumns, columnIds } = useBoard();
  const handleDragEnd = useDrag(boardId, boardColumns, columnIds);

  if (!user) return <FullPageSpinner />;

  return (
    <Box bg="#437397">
      {!dataLoading && boardId && <BoardHeader />}

      {!dataLoading && !boardId ? (
        <CreateNewBoardModal />
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <ColumnList />
        </DragDropContext>
      )}
    </Box>
  );
};

export default MainBoard;

//TODO: fix
