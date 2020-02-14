import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { columnOptionsOpened, columnOptionsClosed } from "../slices";
import { useCancel, useToggle } from "../../../hooks";
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
import { RemoveColumnButton, LockColumnButton, ClearColumnButton } from "./";

const ColumnOptionsPopover = ({ columnId }) => {
  const { isOpen, close, open } = useToggle();

  const dispatch = useDispatch();

  const handleOpen = () => {
    open();
    dispatch(columnOptionsOpened({ columnId }));
  };

  const handleClose = () => {
    close();
    dispatch(columnOptionsClosed({ columnId }));
  };

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
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton icon={FiMoreHorizontal} size="sm" variant="ghost" />
        </PopoverTrigger>
        <PopoverContent
          zIndex={4}
          boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
          px={4}
          py={2}
          borderRadius={4}
          bg="#fff"
        >
          <PopoverCloseButton opacity={0.6} />
          <PopoverHeader
            textAlign="center"
            fontSize=".9rem"
            mb={2}
            opacity={0.8}
            borderColor="#ddd"
          >
            List Actions
          </PopoverHeader>
          <PopoverBody p={0}>
            <ButtonGroup
              d="flex"
              flexDirection="column"
              alignItems="flex-start"
            >
              <LockColumnButton columnId={columnId} ref={initialFocusRef} />
              <RemoveColumnButton columnId={columnId} />
              <ClearColumnButton columnId={columnId} />
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
