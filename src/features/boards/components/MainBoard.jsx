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
  selectCurrentBoard,
  selectCurrentBoardColumns,
  selectCurrentBoardColumnIds
} from "../../../app/redux/selectors";

const MainBoard = () => {
  const columnIds = useSelector(selectCurrentBoardColumnIds);
  const currentBoard = useSelector(selectCurrentBoard);
  const currentBoardColumns = arrayToObject(
    useSelector(selectCurrentBoardColumns)
  );

  const handleDragEnd = useDrag(
    currentBoard.id,
    currentBoardColumns,
    columnIds
  );

  return (
    <div>
      <AddNewBoardForm />
      {currentBoard.id ? (
        <div>
          <RemoveBoardButton />
          <h1>MainBoard</h1>
          <p>Current Id: {currentBoard.id}</p>
          <h3>Current Board Title: {currentBoard.title}</h3>
          <SelectBoardInput />
          <DragDropContext onDragEnd={handleDragEnd}>
            <ColumnList />
          </DragDropContext>
        </div>
      ) : (
        <h2>NO BOARDS</h2>
      )}
    </div>
  );
};

export default MainBoard;
