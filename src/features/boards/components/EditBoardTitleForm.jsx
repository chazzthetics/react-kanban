import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFocus, useForm } from "../../../hooks";
import { selectCurrentBoard } from "../../../app/redux/selectors";
import { boardTitleEditingCancelled, boardTitleUpdated } from "../slices";

const EditBoardTitleForm = () => {
  const inputRef = useFocus();
  const currentBoard = useSelector(selectCurrentBoard);

  const { values, handleChange, handleSubmit } = useForm(
    { boardTitle: currentBoard.title },
    submit
  );

  const { boardTitle } = values;

  const handleCancelEdit = () => {
    dispatch(boardTitleEditingCancelled({ boardId: currentBoard.id }));
  };

  const dispatch = useDispatch();
  function submit() {
    dispatch(
      boardTitleUpdated({ boardId: currentBoard.id, newTitle: boardTitle })
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        name="boardTitle"
        value={boardTitle}
        onChange={handleChange}
      />
      <button type="button" onClick={handleCancelEdit}>
        Cancel
      </button>
    </form>
  );
};

export default EditBoardTitleForm;
