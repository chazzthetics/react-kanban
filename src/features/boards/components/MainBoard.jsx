import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDrag } from "../../../hooks";
import RemoveBoardButton from "./RemoveBoardButton";
import SelectBoardInput from "./SelectBoardInput";
import AddNewBoardForm from "./AddNewBoardForm";
import { ColumnList } from "../../columns/components";
import { arrayToObject } from "../../../utils/arrayToObject";
import {
  selectCurrentBoardId,
  selectCurrentBoardColumns,
  selectCurrentBoardColumnIds
} from "../../../app/redux/selectors";

const MainBoard = () => {
  const columnIds = useSelector(selectCurrentBoardColumnIds);
  const currentBoard = useSelector(selectCurrentBoardId);
  const currentBoardColumns = arrayToObject(
    useSelector(selectCurrentBoardColumns)
  );

  const handleDragEnd = useDrag(currentBoard, currentBoardColumns, columnIds);

  return (
    <div>
      <AddNewBoardForm />
      <RemoveBoardButton />
      <h1>MainBoard</h1>

      <p>Current Id: {currentBoard}</p>
      <p>Current Board Title: {currentBoard.title} </p>
      <SelectBoardInput />
      <DragDropContext onDragEnd={handleDragEnd}>
        <ColumnList />
      </DragDropContext>
    </div>
  );
};

export default MainBoard;
