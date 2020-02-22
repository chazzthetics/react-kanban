import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createBoard } from "../slices";
import { makeBoard } from "../utils/makeBoard";
import { boardColors } from "../utils/boardColors";
import { useToggle, useForm, useLightMode } from "../../../hooks";
import { AddButtonGroup, ColorRadioButton } from "../../../components";
import {
  FormControl,
  FormLabel,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  IconButton,
  Input,
  Stack,
  RadioButtonGroup
} from "@chakra-ui/core";

const CreateNewBoardForm = () => {
  const { isOpen, close, open } = useToggle();

  const firstFieldRef = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const { values, handleChange, handleRadioSelect, handleSubmit } = useForm(
    { title: "", color: "" },
    () => create({ title: values.title, color: values.color })
  );

  function create({ title, color }) {
    const board = makeBoard({ title, color });
    dispatch(createBoard({ board }));
    close();

    history.push(`/b/${board.id}/${board.title}`);
  }

  const [isLightMode] = useLightMode();

  return (
    <Popover
      isOpen={isOpen}
      onOpen={open}
      onClose={close}
      initialFocusRef={firstFieldRef}
      placement="bottom"
    >
      <PopoverTrigger>
        <IconButton
          icon="add"
          aria-label="Add new board"
          size="sm"
          fontSize="1rem"
          bg="rgba(0,0,0,0.3)"
          color="#fff"
          _active={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          _hover={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          _focus={{
            boxShadow: isLightMode
              ? `0 0 0 2px lightgray`
              : "0 0 0 2px lightgreen"
          }}
        />
      </PopoverTrigger>
      <PopoverContent
        p={4}
        borderRadius={4}
        right={100}
        zIndex={4}
        boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
        bg={isLightMode ? "#ebecf0" : "gray.700"}
      >
        <PopoverHeader
          textAlign="center"
          mb={4}
          borderColor="#ddd"
          opacity={isLightMode ? 0.8 : 1}
        >
          Create New Board
        </PopoverHeader>
        <PopoverCloseButton opacity={0.6} />
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
                ref={firstFieldRef}
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
            <AddButtonGroup onClose={close} value="Create Board" />
          </Stack>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default CreateNewBoardForm;

//TODO: refactor
