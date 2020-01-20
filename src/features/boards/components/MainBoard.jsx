import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDrag } from "../../../hooks";
import {
  BoardHeader,
  RemoveBoardButton,
  SelectBoardInput,
  CreateNewBoardForm,
  EditBoardTitleForm
} from "./";
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

  const handleDragEnd = useDrag(currentBoard, currentBoardColumns, columnIds);

  return (
    <div>
      <CreateNewBoardForm />
      {currentBoard ? (
        <div>
          <RemoveBoardButton />
          <p>Current Id: {currentBoard.id}</p>
          {!currentBoard.isEditing ? <BoardHeader /> : <EditBoardTitleForm />}
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
