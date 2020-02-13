import React, { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../../requests";
import { getUser } from "../../auth";
import { useDrag, useBoard } from "../../../hooks";
import { ColumnList } from "../../columns/components";
import { Box, Flex, Spinner } from "@chakra-ui/core";
import { BoardHeader } from "./";

//FIXME: login...
const MainBoard = () => {
  const { loading, error } = useSelector(state => state.request);

  const { boardId, boardColumns, columnIds } = useBoard();
  const { token, error: authError, user } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!authError && token) {
      dispatch(getUser(token));
    }
  }, [dispatch, authError, token]);

  useEffect(() => {
    if (token && user) {
      dispatch(fetchData(token));
    }
  }, [dispatch, token, user]);

  const handleDragEnd = useDrag(boardId, boardColumns, columnIds);

  if (error) {
    return <h2>Something went wrong...</h2>;
  }

  if (loading) {
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
  } else if (!boardId && !loading) {
    //FIXME: no "no boards" during init load
    return <h3>No Boards</h3>;
  }

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
