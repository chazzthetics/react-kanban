import React from "react";
import { useDispatch } from "react-redux";
import { boardCreated } from "../slices";
import { makeBoard } from "../utils/makeBoard";
import { useToggle } from "../../../hooks";
import { CreateForm } from "../../../components";
import { IconButton } from "@chakra-ui/core";

const CreateNewBoardForm = () => {
  const { isOpen, close, open } = useToggle();

  const dispatch = useDispatch();

  function create(boardTitle) {
    const board = makeBoard({ title: boardTitle });
    dispatch(boardCreated({ board }));
    close();
  }

  return isOpen ? (
    <CreateForm
      inputName="boardTitle"
      placeholder="Add new board..."
      initialValues={{ boardTitle: "" }}
      create={create}
      isOpen={isOpen}
      onCancel={close}
    >
      <h2 style={{ color: "white" }}>Create Board</h2>
    </CreateForm>
  ) : (
    <IconButton icon="add" onClick={open} aria-label="Add new board" />
  );
};

export default CreateNewBoardForm;
