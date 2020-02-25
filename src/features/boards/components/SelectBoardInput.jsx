import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  changeBoard,
  selectCurrentBoardTitle,
  selectCurrentBoardColor,
  selectCurrentBoardId,
  selectAllBoardsWithTitleAndColor
} from "../slices";
import { Select } from "@chakra-ui/core";
import { slugify } from "../../../utils/slugify";

const SelectBoardInput = () => {
  const dispatch = useDispatch();

  const boardId = useSelector(selectCurrentBoardId);
  const boardTitle = useSelector(selectCurrentBoardTitle);
  const color = useSelector(selectCurrentBoardColor);
  const allBoards = useSelector(selectAllBoardsWithTitleAndColor);
  const history = useHistory();

  const handleBoardChange = useCallback(
    e => {
      dispatch(changeBoard({ boardId: e.target.value }));
    },
    [dispatch]
  );

  useEffect(() => {
    if (boardTitle) {
      history.push(`/b/${boardId}/${slugify(boardTitle)}`);
    }
  }, [boardTitle, boardId, history]);

  return boardId ? (
    <Select
      size="sm"
      borderRadius={4}
      bg="rgba(0,0,0,0.3)"
      border="none"
      color="#fff"
      fontWeight="700"
      value={boardId}
      cursor="pointer"
      onChange={handleBoardChange}
      focusBorderColor={`${color}.300`}
    >
      {allBoards.map(board => (
        <option
          key={board.id}
          value={board.id}
          style={{
            fontWeight: "inherit",
            backgroundColor: "#2D3748"
          }}
        >
          {board.title}
        </option>
      ))}
    </Select>
  ) : null;
};

export default SelectBoardInput;
