import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Select } from "@chakra-ui/core";
import {
  boardChanged,
  selectCurrentBoardId,
  selectAllBoardsWithTitle
} from "../slices";

const SelectBoardInput = () => {
  const currentBoardId = useSelector(selectCurrentBoardId);
  const boards = useSelector(selectAllBoardsWithTitle);

  const dispatch = useDispatch();

  const handleBoardChange = e => {
    dispatch(boardChanged({ boardId: e.target.value }));
  };

  return (
    <Select
      value={currentBoardId}
      onChange={handleBoardChange}
      size="sm"
      borderRadius={4}
    >
      {boards.map(board => (
        <option key={board.id} value={board.id}>
          {board.title}
        </option>
      ))}
    </Select>
  );
};

export default SelectBoardInput;
