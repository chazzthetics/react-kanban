import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { boardCreated } from "../slices";
import { makeBoard } from "../utils/makeBoard";
import { useToggle } from "../../../hooks";
import { CreateForm } from "../../../components";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  IconButton,
  Button
} from "@chakra-ui/core";

const CreateNewBoardForm = () => {
  const { isOpen, close, open } = useToggle();

  const firstFieldRef = useRef(null);

  const dispatch = useDispatch();
  function create(boardTitle) {
    const board = makeBoard({ title: boardTitle });
    dispatch(boardCreated({ board }));
    close();
  }

  return (
    <Popover
      placement="bottom"
      isOpen={isOpen}
      onOpen={open}
      onClose={close}
      initialFocusRef={firstFieldRef}
      usePortal
    >
      <PopoverTrigger>
        <IconButton
          icon="add"
          aria-label="Add new board"
          size="sm"
          fontSize="1rem"
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>Create a New Board</PopoverHeader>
        <PopoverCloseButton />
        <CreateForm
          inputName="boardTitle"
          initialValues={{ boardTitle: "" }}
          create={create}
          firstFieldRef={firstFieldRef}
          popover={true}
        >
          <Button type="submit">Create</Button>
          <IconButton
            icon="close"
            aria-label="Close form"
            size="sm"
            fontSize="1rem"
            onClick={close}
          />
        </CreateForm>
      </PopoverContent>
    </Popover>
  );
};

export default CreateNewBoardForm;
