import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { selectCurrentBoardColumns } from "../../../app/redux/selectors";
import ColumnItem from "./ColumnItem";
import AddNewColumnForm from "./AddNewColumnForm";

const ColumnList = () => {
  const boardColumns = useSelector(selectCurrentBoardColumns);

  return (
    <Droppable droppableId="all-columns" direction="horizontal" type="column">
      {provided => (
        <div
          style={{ display: "flex", border: "1px solid green" }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {boardColumns.map((column, index) => (
            <ColumnItem key={column.id} index={index} column={column} />
          ))}
          {provided.placeholder}
          <AddNewColumnForm />
        </div>
      )}
    </Droppable>
  );
};

export default ColumnList;
