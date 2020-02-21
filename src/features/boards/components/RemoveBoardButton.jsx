import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useBoard } from "../../../hooks";
import { removeBoard } from "../slices";
import { IconButton } from "@chakra-ui/core";
import { selectUser } from "../../auth";

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
    <IconButton
      aria-label="Remove Board"
      icon="delete"
      size="sm"
      fontSize="1rem"
      bg="rgba(255,255,255,0.1)"
      color="#fff"
      onClick={handleRemoveBoard}
      _hover={{ color: "red.500", backgroundColor: "rgba(255,255,255,0.2)" }}
    />
  );
};

export default RemoveBoardButton;
