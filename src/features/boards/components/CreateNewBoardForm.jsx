import React from "react";
import { useDispatch } from "react-redux";
import { boardCreated } from "../slices";
import { makeBoard } from "../utils/makeBoard";
import { CreateForm } from "../../../components";

const CreateNewBoardForm = () => {
  const dispatch = useDispatch();
  function create(boardTitle) {
    const board = makeBoard({ title: boardTitle });
    dispatch(boardCreated({ board }));
  }

  return (
    <CreateForm
      inputName="boardTitle"
      placeholder="Add new board...test"
      initialValues={{ boardTitle: "" }}
      create={create}
    />
  );
};

export default CreateNewBoardForm;
