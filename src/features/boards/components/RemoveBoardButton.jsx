import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useBoard } from "../../../hooks";
import { removeBoard } from "../slices";
import { selectUser } from "../../auth";
import { AppBarIconButton } from "../../../components";

const RemoveBoardButton = () => {
  const { boardId, boardIds } = useBoard();
  const user = useSelector(selectUser);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleRemoveBoard = () => {
    dispatch(removeBoard({ boardId }));

    if (boardIds.length === 1) {
      history.replace(`/${user.id}/boards`);
    }
  };

  return (
    <AppBarIconButton
      icon="delete"
      label="Remove Board"
      onClick={handleRemoveBoard}
      _hover={{ backgroundColor: "rgba(0,0,0,0.5)", color: "red.400" }}
    />
  );
};

export default RemoveBoardButton;
