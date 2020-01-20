import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDrag } from "../../../hooks";
import { ColumnList } from "../../columns/components";
import { arrayToObject } from "../../../utils/arrayToObject";
import {
  BoardTitle,
  RemoveBoardButton,
  SelectBoardInput,
  CreateNewBoardForm,
  EditBoardTitleForm
} from "./";
import {
  selectCurrentBoardId,
  selectCurrentBoardColumns,
  selectCurrentBoardColumnIds,
  selectCurrentBoardIsEditing
} from "../../../app/redux/selectors";

const MainBoard = () => {
  const isEditing = useSelector(selectCurrentBoardIsEditing);
  const currentBoardId = useSelector(selectCurrentBoardId);
  const columnIds = useSelector(selectCurrentBoardColumnIds);

  const currentBoardColumns = arrayToObject(
    useSelector(selectCurrentBoardColumns)
  );

  const handleDragEnd = useDrag(currentBoardId, currentBoardColumns, columnIds);

  return (
    <div>
      <CreateNewBoardForm />
      {currentBoardId ? (
        <div>
          <RemoveBoardButton />
          <p>Current Id: {currentBoardId}</p>
          {!isEditing ? <BoardTitle /> : <EditBoardTitleForm />}
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
