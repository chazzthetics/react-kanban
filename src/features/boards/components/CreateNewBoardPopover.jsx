import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createBoard } from "../slices";
import { makeBoard } from "../utils/makeBoard";
import { useToggle, useForm } from "../../../hooks";
import { AddButtonGroup } from "../../../components";
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
  RadioGroup,
  Radio
} from "@chakra-ui/core";

const CreateNewBoardForm = () => {
  const { isOpen, close, open } = useToggle();

  const firstFieldRef = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const { values, handleChange, handleSubmit } = useForm(
    { title: "", color: "" },
    () => create({ title: values.title, color: values.color })
  );

  function create({ title, color }) {
    const board = makeBoard({ title, color });
    dispatch(createBoard({ board }));
    close();

    history.push(`/b/${board.id}/${board.title}`);
  }

  const colors = [
    "gray",
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "cyan",
    "purple",
    "pink"
  ];

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
          bg="rgba(0,0,0,.3)"
          color="#fff"
          _hover={{ backgroundColor: "rgba(0,0,0,0.1)" }}
        />
      </PopoverTrigger>
      <PopoverContent
        p={4}
        borderRadius={4}
        right={100}
        zIndex={4}
        boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
        bg="#ebecf0"
      >
        <PopoverHeader
          textAlign="center"
          mb={4}
          borderColor="#ddd"
          opacity={0.8}
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
              <RadioGroup
                isInline
                name="color"
                value={values.color}
                onChange={handleChange}
              >
                {colors.map(color => (
                  <Radio key={color} value={color}>
                    {color}
                  </Radio>
                ))}
              </RadioGroup>
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
