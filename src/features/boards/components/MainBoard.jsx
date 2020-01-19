import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { useDrag } from "../../../hooks";
import RemoveBoardButton from "./RemoveBoardButton";
import SelectBoardInput from "./SelectBoardInput";
import CreateNewBoardForm from "./CreateNewBoardForm";
import EditBoardTitleForm from "./EditBoardTitleForm";
import { ColumnList } from "../../columns/components";
import { arrayToObject } from "../../../utils/arrayToObject";
import {
  selectCurrentBoard,
  selectCurrentBoardColumns,
  selectCurrentBoardColumnIds
} from "../../../app/redux/selectors";
import { boardTitleEditing } from "../slices";

const MainBoard = () => {
  const columnIds = useSelector(selectCurrentBoardColumnIds);
  const currentBoard = useSelector(selectCurrentBoard);

  const currentBoardColumns = arrayToObject(
    useSelector(selectCurrentBoardColumns)
  );

  const handleDragEnd = useDrag(currentBoard, currentBoardColumns, columnIds);

  // **enable edit board title
  const dispatch = useDispatch();
  const handleEditBoardTitle = () => {
    dispatch(boardTitleEditing({ boardId: currentBoard.id }));
  };

  return (
    <div>
      <CreateNewBoardForm />
      {currentBoard && currentBoard.id ? (
        <div>
          <RemoveBoardButton />
          <p>Current Id: {currentBoard.id}</p>
          {!currentBoard.isEditing ? (
            <h3 style={{ cursor: "pointer" }} onClick={handleEditBoardTitle}>
              Current Board Title: {currentBoard.title}
            </h3>
          ) : (
            <EditBoardTitleForm />
          )}
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
