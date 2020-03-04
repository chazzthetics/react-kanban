import React, { memo } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { selectCurrentBoardColumnsList } from "../../shared";
import { ColumnItem, CreateNewColumnForm } from "./";
import { Flex } from "@chakra-ui/core";

const ColumnList = () => {
  const boardColumnsList = useSelector(selectCurrentBoardColumnsList);

  return (
    <Droppable droppableId="all-columns" direction="horizontal" type="column">
      {provided => (
        <Flex
          wrap="nowrap"
          justify="flex-start"
          align="flex-start"
          h="100%"
          minH="calc(100vh - 88px)"
          overflowX="auto"
          cursor="pointer"
          px={3}
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

export default memo(ColumnList);
