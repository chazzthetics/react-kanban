import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentBoard,
  selectCurrentBoardColumnIds,
  selectCurrentBoardColumns
} from "../utils/boardSelectors";
import SelectBoardInput from "./SelectBoardInput";
import AddNewBoardForm from "./AddNewBoardForm";
import { ColumnList } from "../../columns/components";
import { arrayToObject } from "../../../utils/arrayToObject";
import { columnReordered } from "../slices";
import {
  taskReordered,
  taskReorderedBetweenColumns
} from "../../columns/slices";

const MainBoard = () => {
  const dispatch = useDispatch();

  const currentBoard = useSelector(selectCurrentBoard);

  const columnIds = useSelector(selectCurrentBoardColumnIds);

  const currentBoardColumns = arrayToObject(
    useSelector(selectCurrentBoardColumns)
  );

  const handleDragEnd = result => {
    const { source, destination, type } = result;

    // Bailout
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // Reorder columns
    if (type === "column") {
      const newColumnOrder = [...columnIds];
      const [removed] = newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, removed);

      dispatch(
        columnReordered({
          boardId: currentBoard.id,
          columnOrder: newColumnOrder
        })
      );
      return;
    }

    const startColumn = currentBoardColumns[source.droppableId];
    const finishColumn = currentBoardColumns[destination.droppableId];

    // Reorder task inside column
    if (startColumn === finishColumn) {
      const newTaskIds = [...startColumn.taskIds];
      const [removed] = newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, removed);

      dispatch(
        taskReordered({
          columnId: startColumn.id,
          taskOrder: newTaskIds
        })
      );
      return;
    }

    // Reorder task to different column
    const startTaskOrder = [...startColumn.taskIds];
    const [removed] = startTaskOrder.splice(source.index, 1);
    const finishTaskOrder = [...finishColumn.taskIds];
    finishTaskOrder.splice(destination.index, 0, removed);

    dispatch(
      taskReorderedBetweenColumns({
        startColumnId: startColumn.id,
        finishColumnId: finishColumn.id,
        startTaskOrder,
        finishTaskOrder
      })
    );
    return;
  };

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
