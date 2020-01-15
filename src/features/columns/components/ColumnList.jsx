import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentBoardColumns } from "../../boards/utils/boardSelectors";
import ColumnItem from "./ColumnItem";

const ColumnList = () => {
  const boardColumns = useSelector(selectCurrentBoardColumns);

  return (
    <div>
      <h3>Column List</h3>
      <div>
        {boardColumns.map(column => (
          <ColumnItem key={column.id} column={column} />
        ))}
      </div>
    </div>
  );
};

export default ColumnList;
