import React from "react";
import { useDispatch } from "react-redux";
import { useBoard } from "../../../hooks";
import { boardTitleEditingCancelled, updateBoardTitle } from "../slices";
import { EditForm } from "../../../components";

const EditBoardTitleForm = () => {
  const { boardId, boardTitle, isEditing } = useBoard();

  const dispatch = useDispatch();

  const onCancel = () => {
    dispatch(boardTitleEditingCancelled({ boardId }));
  };

  function update(boardTitle) {
    dispatch(updateBoardTitle({ boardId, title: boardTitle }));
  }

  return (
    <EditForm
      inputName="boardTitle"
      initialValues={{ boardTitle }}
      isEditing={isEditing}
      onCancel={onCancel}
      update={update}
      maxW="160px"
      pl="10px"
    />
  );
};

export default EditBoardTitleForm;
