import React from "react";
import { useDispatch } from "react-redux";
import { useBoard } from "../../../hooks";
import { clearBoard } from "../slices";
import { IconButton, Tooltip } from "@chakra-ui/core";

const ClearBoardButton = () => {
  const { boardId, hasColumns } = useBoard();
  const dispatch = useDispatch();

  const handleClearBoard = () => {
    if (hasColumns) {
      dispatch(clearBoard({ boardId }));
    } else {
      return;
    }
  };

  return (
    <Tooltip label="Clear Board" placement="bottom">
      <IconButton
        aria-label="Clear Board"
        size="sm"
        fontSize="1rem"
        icon="minus"
        bg="rgba(255,255,255,0.1)"
        color="#fff"
        mr={1}
        onClick={handleClearBoard}
        _hover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
      />
    </Tooltip>
  );
};

export default ClearBoardButton;
