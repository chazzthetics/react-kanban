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
      variantColor={isStarred ? "teal" : "blue"}
    />
  );
};

export default StarBoardButton;
//FIXME: redux, and fix colors
