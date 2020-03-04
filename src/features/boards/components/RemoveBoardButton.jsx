import React, { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectCurrentBoardId, selectBoardIds, removeBoard } from "../slices";
import { selectUser } from "../../auth";
import { AppBarIconButton } from "../../../components";

const RemoveBoardButton = () => {
  const boardId = useSelector(selectCurrentBoardId);
  const boardIds = useSelector(selectBoardIds);

  const user = useSelector(selectUser);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleRemoveBoard = useCallback(() => {
    dispatch(removeBoard(boardId));

    if (boardIds.length === 1) {
      history.replace(`/${user.id}/boards`);
    }
  }, [dispatch, boardId, boardIds.length, user.id, history]);

  return (
    <AppBarIconButton
      icon="delete"
      label="Remove Board"
      onClick={handleRemoveBoard}
    />
  );
};

export default memo(RemoveBoardButton);
