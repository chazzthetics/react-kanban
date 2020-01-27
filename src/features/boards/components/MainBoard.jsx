import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDrag } from "../../../hooks";
import { ColumnList } from "../../columns/components";
import { arrayToObject } from "../../../utils/arrayToObject";
import {
  selectCurrentBoardId,
  selectCurrentBoardColumns,
  selectCurrentBoardColumnIds,
  selectCurrentBoardIsEditing
} from "../../../app/redux/selectors";
import {
  BoardHeader,
  RemoveBoardButton,
  ClearBoardButton,
  EditBoardTitleForm
} from "./";

const MainBoard = () => {
  const isEditing = useSelector(selectCurrentBoardIsEditing);
  const currentBoardId = useSelector(selectCurrentBoardId);
  const columnIds = useSelector(selectCurrentBoardColumnIds);

  const loading = useSelector(state => state.request.loading);

  const currentBoardColumns = arrayToObject(
    useSelector(selectCurrentBoardColumns)
  );

  const handleDragEnd = useDrag(currentBoardId, currentBoardColumns, columnIds);

  if (loading) return <h3 style={{ color: "white" }}>Loading...</h3>;
  if (!loading && !currentBoardId)
    return <h3 style={{ color: "white" }}>No Boards</h3>;

  return (
    <div>
      <ClearBoardButton />
      <RemoveBoardButton />
      {!isEditing ? <BoardHeader /> : <EditBoardTitleForm />}
      <DragDropContext onDragEnd={handleDragEnd}>
        <ColumnList />
      </DragDropContext>
    </div>
  );
};

export default MainBoard;
