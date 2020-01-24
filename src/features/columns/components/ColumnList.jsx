import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { selectCurrentBoardColumns } from "../../../app/redux/selectors";
import ColumnItem from "./ColumnItem";
import CreateNewColumnForm from "./CreateNewColumnForm";
import { Flex } from "@chakra-ui/core";

const ColumnList = () => {
  const boardColumns = useSelector(selectCurrentBoardColumns);

  return (
    <Droppable droppableId="all-columns" direction="horizontal" type="column">
      {provided => (
        <Flex
          className="column-list"
          wrap="nowrap"
          justify="flex-start"
          align="flex-start"
          border="1px solid lightgray"
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
