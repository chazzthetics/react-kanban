import React from "react";
import { useDispatch } from "react-redux";
import { useBoard } from "../../../hooks";
import { removeBoard } from "../slices";
import { IconButton, Tooltip } from "@chakra-ui/core";

const RemoveBoardButton = () => {
  const { boardId } = useBoard();

  const dispatch = useDispatch();

  const handleRemoveBoard = () => {
    dispatch(removeBoard({ boardId }));
  };

  return (
    <Tooltip label="Remove Board" placement="bottom">
      <IconButton
        aria-label="Remove Board"
        icon="delete"
        size="sm"
        fontSize="1rem"
        bg="rgba(0,0,0,.3)"
        color="#fff"
        onClick={handleRemoveBoard}
        _hover={{ backgroundColor: "rgba(0,0,0,.1)" }}
      />
    </Tooltip>
  );
};

export default RemoveBoardButton;
