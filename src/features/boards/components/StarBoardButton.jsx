import React, { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { starBoard } from "../slices";
import { IconButton } from "@chakra-ui/core";
import { FiStar } from "react-icons/fi";

const StarBoardButton = ({ boardId, isStarred, ...props }) => {
  const dispatch = useDispatch();

  const handleToggleStar = useCallback(
    e => {
      e.stopPropagation();
      e.preventDefault();
      dispatch(starBoard({ boardId, isStarred: !isStarred }));
    },
    [dispatch, boardId, isStarred]
  );

  return (
    <IconButton
      icon={FiStar}
      fontSize="1rem"
      size="sm"
      onClick={handleToggleStar}
      bg="rgba(0,0,0,0.3)"
      color={isStarred ? "yellow.400" : "#fff"}
      _hover={{ color: "yellow.400" }}
      _active={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      _focus={{ boxShadow: "none" }}
      transition="all 100ms ease-in"
      {...props}
    />
  );
};

export default memo(StarBoardButton);
