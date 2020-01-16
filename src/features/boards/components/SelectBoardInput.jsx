import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { boardChanged } from "../slices";
import {
  selectCurrentBoard,
  selectAllBoardsWithTitle
} from "../../../app/redux/selectors";

const SelectBoardInput = () => {
  const currentBoard = useSelector(selectCurrentBoard);
  const boards = useSelector(selectAllBoardsWithTitle);
  const dispatch = useDispatch();
  const handleBoardChange = e => {
    dispatch(boardChanged({ boardId: e.target.value }));
  };
  return (
    <div>
      <select value={currentBoard.id} onChange={handleBoardChange}>
        {boards.map(board => (
          <option key={board.id} value={board.id}>
            {board.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBoardInput;

//TODO: pull data from redux, or pass through props from parent?
