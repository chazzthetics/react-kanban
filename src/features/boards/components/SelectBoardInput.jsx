import React, { memo, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  changeBoard,
  selectCurrentBoardTitle,
  selectCurrentBoardColor,
  selectCurrentBoardId,
  selectAllBoardsDetails
} from "../slices";
import { Select } from "@chakra-ui/core";
import { slugify } from "../../../utils/slugify";

const SelectBoardInput = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const boardId = useSelector(selectCurrentBoardId);
  const boardTitle = useSelector(selectCurrentBoardTitle);
  const color = useSelector(selectCurrentBoardColor);
  const allBoards = useSelector(selectAllBoardsDetails);

  const sluggedTitle = slugify(boardTitle);

  const handleBoardChange = useCallback(
    e => {
      dispatch(changeBoard(e.target.value));
    },
    [dispatch]
  );

  useEffect(() => {
    if (boardTitle) {
      history.push(`/b/${boardId}/${sluggedTitle}`);
    }
  }, [boardTitle, boardId, history, sluggedTitle]);

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

export default memo(SelectBoardInput);
