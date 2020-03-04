import React, { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentBoardId,
  selectCurrentBoardColumnIdsLength,
  clearBoard
} from "../slices";
import { AppBarIconButton } from "../../../components";

const ClearBoardButton = () => {
  const boardId = useSelector(selectCurrentBoardId);
  const hasColumns = useSelector(selectCurrentBoardColumnIdsLength);
  const dispatch = useDispatch();

  const handleClearBoard = useCallback(() => {
    if (hasColumns) {
      dispatch(clearBoard(boardId));
    }
  }, [dispatch, hasColumns, boardId]);

  return (
    <AppBarIconButton
      icon="minus"
      label="Clear Board"
      onClick={handleClearBoard}
      mr={1}
    />
  );
};

export default memo(ClearBoardButton);
