import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  boardTitleEditingCancelled,
  updateBoardTitle,
  selectCurrentBoardId,
  selectCurrentBoardTitle,
  selectCurrentBoardIsEditing
} from "../slices";
import { EditForm } from "../../../components";

const EditBoardTitleForm = () => {
  const boardId = useSelector(selectCurrentBoardId);
  const currentBoardTitle = useSelector(selectCurrentBoardTitle);
  const isEditing = useSelector(selectCurrentBoardIsEditing);

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
      initialValues={{ boardTitle: currentBoardTitle }}
      isEditing={isEditing}
      onCancel={onCancel}
      update={update}
      maxW="180px"
      pl="10px"
    />
  );
};

export default EditBoardTitleForm;
