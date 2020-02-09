import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useBoard } from "../../../hooks";
import { ColumnItem, CreateNewColumnForm } from "./";
import { Flex } from "@chakra-ui/core";

const ColumnList = () => {
  const { boardColumnsList } = useBoard();

  return (
    <Droppable droppableId="all-columns" direction="horizontal" type="column">
      {provided => (
        <Flex
          wrap="nowrap"
          justify="flex-start"
          align="flex-start"
          overflowX="auto"
          h="100%"
          minH="calc(100vh - 88px)"
          cursor="pointer"
          mx={3}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {boardColumnsList.map((column, index) => (
            <ColumnItem key={column.id} index={index} columnId={column.id} />
          ))}
          {provided.placeholder}
          <CreateNewColumnForm />
        </Flex>
      )}
    </Droppable>
  );
};

export default ColumnList;
