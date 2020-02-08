import React from "react";
import { useDispatch } from "react-redux";
import { useBoard } from "../../../hooks";
import { Select } from "@chakra-ui/core";
import { boardChanged } from "../slices";

const SelectBoardInput = () => {
  const { boardId, allBoards } = useBoard();
  const dispatch = useDispatch();

  const handleBoardChange = e => {
    dispatch(boardChanged({ boardId: e.target.value }));
  };

  return (
    <Select
      value={boardId}
      onChange={handleBoardChange}
      size="sm"
      variant="outline"
      borderRadius={4}
    >
      {allBoards.map(board => (
        <option key={board.id} value={board.id}>
          {board.title}
        </option>
      ))}
    </Select>
  );
};

export default SelectBoardInput;
