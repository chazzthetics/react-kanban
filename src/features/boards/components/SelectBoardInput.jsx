import React from "react";
import { useDispatch } from "react-redux";
import { useBoard } from "../../../hooks";
import { boardChanged } from "../slices";
import { Select } from "@chakra-ui/core";

const SelectBoardInput = () => {
  const { boardId, allBoards } = useBoard();
  const dispatch = useDispatch();

  const handleBoardChange = e => {
    dispatch(boardChanged({ boardId: e.target.value }));
  };

  return boardId ? (
    <Select
      value={boardId}
      onChange={handleBoardChange}
      size="sm"
      borderRadius={4}
      bg="#31546e"
      border="none"
      color="#fff"
      fontWeight="700"
    >
      {allBoards.map(board => (
        <option
          key={board.id}
          value={board.id}
          style={{ fontWeight: "inherit" }}
        >
          {board.title}
        </option>
      ))}
    </Select>
  ) : null;
};

export default SelectBoardInput;
