import React, { useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { columnOptionsOpened, columnOptionsClosed } from "../slices";
import { useCancel, useToggle, useBoard } from "../../../hooks";
import { FiMoreHorizontal } from "react-icons/fi";
import {
  Box,
  Popover,
  ButtonGroup,
  IconButton,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton
} from "@chakra-ui/core";
import {
  RemoveColumnButton,
  LockColumnButton,
  ClearColumnButton,
  MoveColumnButton
} from "./";

const ColumnOptionsPopover = ({ columnId }) => {
  const { isOpen, close, open } = useToggle();
  const { boardId } = useBoard();
  const dispatch = useDispatch();

  const handleOpen = useCallback(() => {
    open();
    dispatch(columnOptionsOpened({ columnId }));
  }, [columnId, open, dispatch]);

  const handleClose = useCallback(() => {
    close();
    dispatch(columnOptionsClosed({ boardId, columnId }));
  }, [boardId, columnId, close, dispatch]);

  const initialFocusRef = useRef(null);
  const cancelRef = useCancel(isOpen, handleClose);

  return (
    <Box ref={cancelRef} cursor="default">
      <Popover
        placement="bottom-start"
        isOpen={isOpen}
        onClose={handleClose}
        onOpen={handleOpen}
        initialFocusRef={initialFocusRef}
      >
        <PopoverTrigger>
          <IconButton
            icon={FiMoreHorizontal}
            size="sm"
            variant="ghost"
            _hover={{ backgroundColor: "#d4d4d4" }}
            _active={{ backgroundColor: "#d4d4d4" }}
          />
        </PopoverTrigger>
        <PopoverContent
          zIndex={4}
          boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
          p={2}
          borderRadius={4}
          bg="#fff"
        >
          <PopoverHeader
            textAlign="center"
            fontSize=".9rem"
            mb={2}
            opacity={0.8}
            borderColor="#ddd"
          >
            <span>List Actions</span>
          </PopoverHeader>
          <PopoverCloseButton opacity={0.6} />
          <PopoverBody p={0}>
            <ButtonGroup
              d="flex"
              flexDirection="column"
              alignItems="flex-start"
            >
              <LockColumnButton columnId={columnId} ref={initialFocusRef} />
              <RemoveColumnButton columnId={columnId} />
              <ClearColumnButton columnId={columnId} />
              <MoveColumnButton columnId={columnId} close={handleClose} />
            </ButtonGroup>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

ColumnOptionsPopover.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default ColumnOptionsPopover;

//TODO: need to implement last tab on X button
