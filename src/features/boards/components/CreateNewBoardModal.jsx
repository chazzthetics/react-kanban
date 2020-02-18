import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToggle, useForm } from "../../../hooks";
import { createBoard } from "../slices";
import { makeBoard } from "../utils/makeBoard";
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  Stack,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton
} from "@chakra-ui/core";

const CreateNewBoardModal = () => {
  const { isOpen, close, open } = useToggle();
  const { values, handleChange, handleSubmit } = useForm(
    { boardTitle: "" },
    () => create(values.boardTitle)
  );

  const history = useHistory();
  const fromRegister = history.location.state;

  const initialRef = useRef(null);

  const dispatch = useDispatch();
  function create(boardTitle) {
    const board = makeBoard({ title: boardTitle });
    dispatch(createBoard({ board }));
  }
  //FIXME:
  return (
    <>
      <Flex justify="center" mx={2} mt={16}>
        <Button
          onClick={open}
          size="sm"
          variantColor="purple"
          boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
        >
          {fromRegister ? "Create Your First Board" : "Create a New Board"}
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={close} initialFocusRef={initialRef}>
        <ModalOverlay backgroundColor="rgba(0,0,0,0.8)" />
        <ModalContent borderRadius={4} bg="#ebecf0" px={4} pt={2} pb={4}>
          <ModalHeader fontSize="1rem" textAlign="center" fontWeight="normal">
            Create New Board
          </ModalHeader>
          <ModalCloseButton opacity={0.6} />
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel htmlFor="boardTitle" fontSize=".9rem">
                  Board Title
                </FormLabel>
                <Input
                  name="boardTitle"
                  id="boardTitle"
                  size="sm"
                  borderRadius={4}
                  p={2}
                  value={values.boardTitle}
                  onChange={handleChange}
                  ref={initialRef}
                  placeholder="Enter board title..."
                  _focus={{ border: "1px solid #ddd", borderRadius: "4px" }}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="theme" fontSize=".9rem">
                  Choose Theme
                </FormLabel>
                <Input
                  name="theme"
                  id="theme"
                  size="sm"
                  value={values.boardTheme}
                  onChange={handleChange}
                  isDisabled
                />
              </FormControl>
              <Button
                type="submit"
                size="sm"
                variantColor="purple"
                boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
              >
                Create Board
              </Button>
            </Stack>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateNewBoardModal;

//FIXME: refactor, fix background height, should stretch all the way
