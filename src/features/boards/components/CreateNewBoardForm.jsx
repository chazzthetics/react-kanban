import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { createBoard } from "../slices";
import { makeBoard } from "../utils/makeBoard";
import { useToggle } from "../../../hooks";
import { CreateForm } from "../../../components";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  IconButton
} from "@chakra-ui/core";
import { AddButtonGroup } from "../../../components";

const CreateNewBoardForm = () => {
  const { isOpen, close, open } = useToggle();

  const firstFieldRef = useRef(null);

  const dispatch = useDispatch();
  function create(boardTitle) {
    const board = makeBoard({ title: boardTitle });
    dispatch(createBoard(board));
    close();
  }

  return (
    <Popover
      placement="bottom"
      isOpen={isOpen}
      onOpen={open}
      onClose={close}
      initialFocusRef={firstFieldRef}
    >
      <PopoverTrigger>
        <IconButton
          icon="add"
          aria-label="Add new board"
          size="sm"
          fontSize="1rem"
        />
      </PopoverTrigger>
      <PopoverContent
        p={4}
        borderRadius={4}
        position="absolute"
        right={0}
        zIndex={4}
        boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
      >
        <PopoverHeader textAlign="center" mb={4}>
          Create a New Board
        </PopoverHeader>
        <PopoverCloseButton />
        <CreateForm
          inputName="boardTitle"
          initialValues={{ boardTitle: "" }}
          placeholder="Enter board title..."
          create={create}
          firstFieldRef={firstFieldRef}
          popover={true}
          size="sm"
          p={2}
          mb={4}
        >
          <AddButtonGroup
            onClose={close}
            value="Create Board"
            iconColor="black"
          />
        </CreateForm>
      </PopoverContent>
    </Popover>
  );
};

export default CreateNewBoardForm;
