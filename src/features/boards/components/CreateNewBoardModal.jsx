import React, { useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLightMode, useToggle, useForm } from "../../../hooks";
import { createBoard } from "../slices";
import { boardColors } from "../utils/boardColors";
import { makeBoard } from "../utils/makeBoard";
import { ColorRadioButton } from "../../../components";
import {
  PseudoBox,
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
  ModalCloseButton,
  RadioButtonGroup
} from "@chakra-ui/core";

const CreateNewBoardModal = () => {
  const [isLightMode] = useLightMode();
  const { isOpen, close, open } = useToggle();

  const initialRef = useRef(null);
  const history = useHistory();
  const fromRegister = history.location.state;

  const { values, handleChange, handleRadioSelect, handleSubmit } = useForm(
    { title: "", color: "" },
    () => create({ title: values.title, color: values.color })
  );

  const dispatch = useDispatch();
  const create = useCallback(
    ({ title, color }) => {
      const board = makeBoard({ title, color });
      dispatch(createBoard({ board }));
      close();

      history.push(`/b/${board.id}/${board.title}`);
    },
    [dispatch, close, history]
  );

  //FIXME: refactor with popover
  return (
    <>
      <PseudoBox
        h={100}
        w="100%"
        d="inline-block"
        cursor="pointer"
        borderRadius={4}
        bg={isLightMode ? "gray.300" : "gray.600"}
        transition="transform 175ms ease-in, box-shadow 175ms ease-in"
        onClick={open}
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: isLightMode
            ? "2px 12px 14px -10px rgba(0, 0, 0, 0.75)"
            : "2px 10px 6px -8px rgba(255, 255, 255, 0.55)"
        }}
      >
        <Flex align="center" justify="center" h="100%" fontWeight="bold">
          Create new board
        </Flex>
      </PseudoBox>

      <Modal isOpen={isOpen} onClose={close} initialFocusRef={initialRef}>
        <ModalOverlay backgroundColor="rgba(0,0,0,0.8)" />
        <ModalContent
          borderRadius={4}
          bg={isLightMode ? "#ebecf0" : "gray.700"}
          px={4}
          pt={2}
          pb={4}
        >
          <ModalHeader fontSize="1rem" textAlign="center" fontWeight="normal">
            Create New Board
          </ModalHeader>
          <ModalCloseButton opacity={0.6} />
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel htmlFor="title" fontSize=".9rem">
                  Board Title
                </FormLabel>
                <Input
                  name="title"
                  id="title"
                  size="sm"
                  borderRadius={4}
                  p={2}
                  ref={initialRef}
                  value={values.title}
                  onChange={handleChange}
                  placeholder="Enter board title..."
                  _focus={{ border: "1px solid #ddd", borderRadius: "4px" }}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="color" fontSize=".9rem">
                  Choose Board Color
                </FormLabel>
                <RadioButtonGroup
                  id="color"
                  isInline
                  name="color"
                  onChange={handleRadioSelect}
                >
                  {boardColors.map(color => (
                    <ColorRadioButton key={color} value={color} />
                  ))}
                </RadioButtonGroup>
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
