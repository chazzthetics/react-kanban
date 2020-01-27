import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createColumn } from "../slices";
import { makeColumn } from "../utils/makeColumn";
import {
  selectCurrentBoardId,
  selectCurrentBoardColumnIds
} from "../../../app/redux/selectors";
import { useToggle } from "../../../hooks";
import { CreateForm } from "../../../components";
import { Button, CloseButton, Flex } from "@chakra-ui/core";

const CreateNewColumnForm = () => {
  const { isOpen, close, open } = useToggle();

  const boardId = useSelector(selectCurrentBoardId);
  const hasColumn = useSelector(selectCurrentBoardColumnIds).length;

  const dispatch = useDispatch();
  function create(columnTitle) {
    const column = makeColumn({ title: columnTitle });
    dispatch(createColumn({ column, boardId }));
  }

  return isOpen ? (
    <CreateForm
      inputName="columnTitle"
      placeholder="Add new list"
      initialValues={{ columnTitle: "" }}
      create={create}
      isOpen={isOpen}
      onCancel={close}
    >
      <Flex align="center">
        <Button type="submit" icon="add" aria-label="Add a new list" size="sm">
          Add List
        </Button>
        <CloseButton
          type="button"
          aria-label="Cancel"
          onClick={close}
          color="white"
        />
      </Flex>
    </CreateForm>
  ) : (
    <Button onClick={open} leftIcon="add">
      {hasColumn ? "Add another list" : "Add a list"}
    </Button>
  );
};

export default CreateNewColumnForm;
