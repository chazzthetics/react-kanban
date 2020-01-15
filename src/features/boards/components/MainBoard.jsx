import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { boardChanged } from "../slices";
import {
  selectCurrentBoard,
  selectAllBoardsWithTitle
} from "../utils/boardSelectors";
import { ColumnList } from "../../columns/components";

const MainBoard = () => {
  const currentBoard = useSelector(selectCurrentBoard);
  const boards = useSelector(selectAllBoardsWithTitle);

  const dispatch = useDispatch();
  const handleBoardChange = e => {
    dispatch(boardChanged({ boardId: e.target.value }));
  };

  return (
    <div>
      <h1>MainBoard</h1>
      <h2>Current Id: {currentBoard.id}</h2>
      <h3>Current Board Title: {currentBoard.title} </h3>
      <select value={currentBoard.id} onChange={handleBoardChange}>
        {boards.map(board => (
          <option key={board.id} value={board.id}>
            {board.title}
          </option>
        ))}
      </select>
      <ColumnList />
    </div>
  );
};

export default MainBoard;
