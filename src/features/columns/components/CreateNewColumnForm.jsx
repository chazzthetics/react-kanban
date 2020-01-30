import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createColumn } from "../slices";
import { makeColumn } from "../utils/makeColumn";
import { selectCurrentBoardId } from "../../../app/redux/selectors";
import { useToggle } from "../../../hooks";
import { CreateForm, AddButtonGroup } from "../../../components";
import { CreateColumnButton } from "./";
import { Box } from "@chakra-ui/core";

const CreateNewColumnForm = () => {
  const { isOpen, close, open } = useToggle();

  const boardId = useSelector(selectCurrentBoardId);

  const dispatch = useDispatch();

  function create(columnTitle) {
    const column = makeColumn({ title: columnTitle });
    dispatch(createColumn({ column, boardId }));
  }

  return !isOpen ? (
    <CreateColumnButton onOpen={open} />
  ) : (
    <Box bg="gray.300" h="96px" p="8px" borderRadius={4} width="17rem">
      <CreateForm
        inputName="columnTitle"
        placeholder="Enter list title..."
        initialValues={{ columnTitle: "" }}
        create={create}
        isOpen={isOpen}
        onCancel={close}
        mb={3}
        mt={0}
        size="sm"
        w="100%"
        h={36}
        px={2}
        borderRadius={4}
      >
        <AddButtonGroup
          onClose={close}
          value="Add List"
          iconColor="white"
          mt={0}
        />
      </CreateForm>
    </Box>
  );
};

export default CreateNewColumnForm;

// TODO: extract button to separate component
// FIXME: fix styling
