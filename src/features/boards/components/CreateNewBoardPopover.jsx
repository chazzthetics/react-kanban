import React, { useRef } from "react";
import { useToggle, useLightMode } from "../../../hooks";
import { AddButtonGroup, Fade } from "../../../components";
import { CreateNewBoardForm } from "./";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  IconButton
} from "@chakra-ui/core";
//TODO: tabs
const CreateNewBoardPopover = () => {
  const [isLightMode] = useLightMode();
  const { isOpen, close, open } = useToggle();

  const firstFieldRef = useRef(null);

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
            boxShadow: isLightMode ? `0 0 0 2px white` : "0 0 0 2px lightgreen"
          }}
        />
      </PopoverTrigger>
      <Fade in={isOpen}>
        <PopoverContent
          p={4}
          borderRadius={4}
          right={100}
          zIndex={4}
          boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
          bg={isLightMode ? "white" : "gray.700"}
          _focus={{ outline: "none" }}
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
          <CreateNewBoardForm
            onClose={close}
            ref={firstFieldRef}
            button={<AddButtonGroup onClose={close} value="Create Board" />}
          />
        </PopoverContent>
      </Fade>
    </Popover>
  );
};

export default CreateNewBoardPopover;

//TODO: refactor
// #ebecf0
