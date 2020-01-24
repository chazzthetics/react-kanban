import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { columnCreated } from "../slices";
import { makeColumn } from "../utils/makeColumn";
import {
  selectCurrentBoardId,
  selectCurrentBoardColumnIds
} from "../../../app/redux/selectors";
import { CreateForm } from "../../../components";
import { Button, CloseButton, IconButton, Flex } from "@chakra-ui/core";

const CreateNewColumnForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleForm = () => {
    setIsOpen(state => !state);
  };

  const boardId = useSelector(selectCurrentBoardId);
  const hasColumn = useSelector(selectCurrentBoardColumnIds).length;

  const dispatch = useDispatch();
  function create(columnTitle) {
    const column = makeColumn({ title: columnTitle });
    dispatch(columnCreated({ column, boardId }));
    handleToggleForm();
  }

  return isOpen ? (
    <CreateForm
      inputName="columnTitle"
      placeholder="Add new list"
      initialValues={{ columnTitle: "" }}
      create={create}
      isOpen={isOpen}
      onCancel={handleToggleForm}
    >
      <Flex align="center">
        <IconButton type="submit" icon="add" aria-label="Add a new list" />
        <CloseButton
          type="button"
          aria-label="Cancel"
          onClick={handleToggleForm}
          color="white"
        />
      </Flex>
    </CreateForm>
  ) : (
    <Button onClick={handleToggleForm}>
      {hasColumn ? "Add another list" : "Add a list"}
    </Button>
  );
};

export default CreateNewColumnForm;
