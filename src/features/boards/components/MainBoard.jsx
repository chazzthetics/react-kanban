import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import {
  selectCurrentBoard,
  selectCurrentBoardColumnIds,
  selectCurrentBoardColumns
} from "../utils/boardSelectors";
import SelectBoardInput from "./SelectBoardInput";
import AddNewBoardForm from "./AddNewBoardForm";
import { ColumnList } from "../../columns/components";
import { arrayToObject } from "../../../utils/arrayToObject";
import { useDrag } from "../../../hooks";

const MainBoard = () => {
  const currentBoard = useSelector(selectCurrentBoard);
  const currentBoardColumns = arrayToObject(
    useSelector(selectCurrentBoardColumns)
  );
  const columnIds = useSelector(selectCurrentBoardColumnIds);

  const handleDragEnd = useDrag(currentBoard, currentBoardColumns, columnIds);

  return (
    <div>
      <AddNewBoardForm />
      <h1>MainBoard</h1>
      <p>Current Id: {currentBoard.id}</p>
      <p>Current Board Title: {currentBoard.title} </p>
      <SelectBoardInput />
      <DragDropContext onDragEnd={handleDragEnd}>
        <ColumnList />
      </DragDropContext>
    </div>
  );
};

export default MainBoard;
