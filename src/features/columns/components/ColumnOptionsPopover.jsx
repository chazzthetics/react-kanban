import React, { useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { columnOptionsOpened, columnOptionsClosed } from "../slices";
import { useToggle, useLightMode } from "../../../hooks";
import { FiMoreHorizontal } from "react-icons/fi";
import { Fade } from "../../../components";
import {
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
  const initialFocusRef = useRef(null);
  const [isLightMode] = useLightMode();

  const { isOpen, close, open } = useToggle();

  const dispatch = useDispatch();

  const handleOpen = useCallback(() => {
    open();
    dispatch(columnOptionsOpened({ columnId }));
  }, [columnId, open, dispatch]);

  const handleClose = useCallback(() => {
    close();
    dispatch(columnOptionsClosed({ columnId }));
  }, [columnId, close, dispatch]);

  return (
    <Popover
      placement="bottom-start"
      isOpen={isOpen}
      onClose={handleClose}
      onOpen={handleOpen}
      initialFocusRef={initialFocusRef}
      usePortal
    >
      <PopoverTrigger>
        <IconButton
          icon={FiMoreHorizontal}
          size="sm"
          variant="ghost"
          _hover={{
            backgroundColor: isLightMode ? "#d4d4d4" : "gray.500"
          }}
          _active={{
            backgroundColor: isLightMode ? "#d4d4d4" : "gray.500"
          }}
          _focus={{
            boxShadow: isLightMode
              ? "0 0 0 2px #d4d4d4"
              : "0 0 0 2px lightgreen"
          }}
        />
      </PopoverTrigger>
      <Fade in={isOpen}>
        <PopoverContent
          zIndex={4}
          boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
          p={2}
          borderRadius={4}
          bg={isLightMode ? "white" : "gray.700"}
        >
          <PopoverHeader
            textAlign="center"
            fontSize=".9rem"
            mb={2}
            opacity={isLightMode ? 0.8 : 1}
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
      </Fade>
    </Popover>
  );
};

ColumnOptionsPopover.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default ColumnOptionsPopover;

//TODO: need to implement last tab on X button
