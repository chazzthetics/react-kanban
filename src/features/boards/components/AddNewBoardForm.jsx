import React from "react";
import { useDispatch } from "react-redux";
import { boardAdded } from "../slices";
import { useForm } from "../../../hooks/useForm";
import { makeBoard } from "../utils/makeBoard";

const initialValues = { boardTitle: "" };

const AddNewBoardForm = () => {
  const { values, handleChange, handleSubmit, resetForm } = useForm(
    initialValues,
    submit
  );

  const { boardTitle } = values;

  const dispatch = useDispatch();

  function submit() {
    const board = makeBoard({ title: boardTitle });
    dispatch(boardAdded({ board }));
    resetForm();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="boardTitle"
        name="boardTitle"
        value={boardTitle}
        onChange={handleChange}
        placeholder="Add New Board"
      />
    </form>
  );
};

export default AddNewBoardForm;
