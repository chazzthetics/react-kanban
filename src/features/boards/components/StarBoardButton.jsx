import React, { useState } from "react";
import { IconButton } from "@chakra-ui/core";
import { FiStar } from "react-icons/fi";

const StarBoardButton = () => {
  const [isStarred, setIsStarred] = useState(false);

  const handleClick = () => {
    setIsStarred(isStarred => !isStarred);
  };

  return (
    <IconButton
      icon={FiStar}
      fontSize="1.1rem"
      size="sm"
      onClick={handleClick}
      bg="rgba(0,0,0,.2)"
      color={isStarred ? "yellow.400" : "#fff"}
      _hover={{ color: "yellow.400" }}
    />
  );
};

export default StarBoardButton;
//FIXME: redux, and fix colors
