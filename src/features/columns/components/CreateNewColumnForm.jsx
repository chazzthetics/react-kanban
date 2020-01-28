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
import {
  Button,
  CloseButton,
  Flex,
  PseudoBox,
  Icon,
  Box
} from "@chakra-ui/core";

const CreateNewColumnForm = () => {
  const { isOpen, close, open } = useToggle();

  const boardId = useSelector(selectCurrentBoardId);
  const hasColumn = useSelector(selectCurrentBoardColumnIds).length;

  const dispatch = useDispatch();
  function create(columnTitle) {
    const column = makeColumn({ title: columnTitle });
    dispatch(createColumn({ column, boardId }));
  }

  return !isOpen ? (
    <PseudoBox
      as="button"
      d="flex"
      alignItems="center"
      textAlign="start"
      onClick={open}
      fontWeight="normal"
      fontSize="14px"
      size="sm"
      w="17rem"
      h="40px"
      bg="gray.200"
      borderRadius={4}
      px={3}
      _hover={{ bg: "gray.100" }}
    >
      <Icon name="add" size="14px" mr={2} />
      {hasColumn ? "Add another list" : "Add a list"}
    </PseudoBox>
  ) : (
    <Box bg="gray.500" h="80px" p={1} borderRadius={4}>
      <CreateForm
        inputName="columnTitle"
        placeholder="Add new list"
        initialValues={{ columnTitle: "" }}
        create={create}
        isOpen={isOpen}
        onCancel={close}
      >
        <Flex align="center" mt={1}>
          <Button
            type="submit"
            icon="add"
            aria-label="Enter list title..."
            size="sm"
          >
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
    </Box>
  );
};

export default CreateNewColumnForm;

// TODO: extract button to separate component
