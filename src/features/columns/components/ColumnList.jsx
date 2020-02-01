import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { selectCurrentBoardColumnsList } from "../../shared/selectors";
import { ColumnItem, CreateNewColumnForm } from "./";
import { Flex } from "@chakra-ui/core";

const ColumnList = () => {
  const boardColumns = useSelector(selectCurrentBoardColumnsList);

  return (
    <Droppable droppableId="all-columns" direction="horizontal" type="column">
      {provided => (
        <Flex
          className="column-list"
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
          {boardColumns.map((column, index) => (
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
