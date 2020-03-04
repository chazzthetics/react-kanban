import React, { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useToggle, useLightMode } from "../../../hooks";
import { createColumn } from "../slices";
import { selectCurrentBoardId } from "../../boards/slices";
import { makeColumn } from "../utils/makeColumn";
import { CreateForm, AddButtonGroup } from "../../../components";
import { CreateColumnButton } from "./";
import { Flex } from "@chakra-ui/core";

const CreateNewColumnForm = () => {
  const [isLightMode] = useLightMode();
  const { isOpen, close, open } = useToggle();
  const handleOpen = useCallback(() => open(), [open]);

  const boardId = useSelector(selectCurrentBoardId);

  const dispatch = useDispatch();

  const create = useCallback(
    columnTitle => {
      const column = makeColumn({ title: columnTitle });
      dispatch(createColumn({ column, boardId }));
    },
    [dispatch, boardId]
  );

  return !isOpen ? (
    <CreateColumnButton onOpen={handleOpen} />
  ) : (
    <Flex
      bg={isLightMode ? "#ebecf0" : "gray.600"}
      h="96px"
      p="8px"
      borderRadius={4}
      width="17rem"
      boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
      flexDir="column"
      justify="space-around"
    >
      <CreateForm
        inputName="columnTitle"
        placeholder="Enter list title..."
        initialValues={{ columnTitle: "" }}
        create={create}
        isOpen={isOpen}
        onCancel={close}
        mb={2}
        mt={0}
        size="sm"
        w="100%"
        h={36}
        px={2}
        borderRadius={4}
      >
        <Flex alignItems="flex-end">
          <AddButtonGroup onClose={close} value="Add List" mt={0} />
        </Flex>
      </CreateForm>
    </Flex>
  );
};

export default memo(CreateNewColumnForm);
