import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { columnCreated } from "../slices";
import { useForm } from "../../../hooks";
import { makeColumn } from "../utils/makeColumn";
import { selectCurrentBoardId } from "../../../app/redux/selectors";

const initialValues = { columnTitle: "" };

const AddNewColumnForm = () => {
  const { values, handleChange, handleSubmit, resetForm } = useForm(
    initialValues,
    submit
  );

  const { columnTitle } = values;

  const dispatch = useDispatch();

  const boardId = useSelector(selectCurrentBoardId);

  function submit() {
    const column = makeColumn({ title: columnTitle });
    dispatch(columnCreated({ column, boardId }));
    resetForm();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add new column"
          name="columnTitle"
          value={columnTitle}
          onChange={handleChange}
        />
        <button type="submit">Add Column</button>
      </form>
    </div>
  );
};

AddNewColumnForm.propTypes = {};

export default AddNewColumnForm;
