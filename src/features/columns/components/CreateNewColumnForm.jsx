import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { columnCreated } from "../slices";
import { makeColumn } from "../utils/makeColumn";
import {
  selectCurrentBoardId,
  selectCurrentBoardColumnIds
} from "../../../app/redux/selectors";
import { CreateForm } from "../../../components";

const CreateNewColumnForm = () => {
  const boardId = useSelector(selectCurrentBoardId);
  const hasColumn = useSelector(selectCurrentBoardColumnIds).length;

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
      submitValue={hasColumn ? "Add another list" : "Add a list"}
    />
  );
};

CreateNewColumnForm.propTypes = {};

export default CreateNewColumnForm;
