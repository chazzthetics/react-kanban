import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { columnCreated } from "../slices";
import { makeColumn } from "../utils/makeColumn";
import { selectCurrentBoardId } from "../../../app/redux/selectors";
import { CreateForm } from "../../../components";

const CreateNewColumnForm = () => {
  const boardId = useSelector(selectCurrentBoardId);

  const dispatch = useDispatch();
  function create(columnTitle) {
    const column = makeColumn({ title: columnTitle });
    dispatch(columnCreated({ column, boardId }));
  }

  return (
    <CreateForm
      inputName="columnTitle"
      placeholder="Add new list"
      initialValues={{ columnTitle: "" }}
      create={create}
    />
  );
};

CreateNewColumnForm.propTypes = {};

export default CreateNewColumnForm;
