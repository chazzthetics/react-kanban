import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { selectCurrentBoardColumns } from "../../../app/redux/selectors";
import ColumnItem from "./ColumnItem";
import CreateNewColumnForm from "./CreateNewColumnForm";
import { Box } from "@chakra-ui/core";

const ColumnList = () => {
  const boardColumns = useSelector(selectCurrentBoardColumns);

  return (
    <Droppable droppableId="all-columns" direction="horizontal" type="column">
      {provided => (
        <Box
          className="column-list"
          display="flex"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {boardColumns.map((column, index) => (
            <ColumnItem key={column.id} index={index} columnId={column.id} />
          ))}
          {provided.placeholder}
          <CreateNewColumnForm />
        </Box>
      )}
    </Droppable>
  );
};

export default ColumnList;
