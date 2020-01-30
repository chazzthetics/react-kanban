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
  Button,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton
} from "@chakra-ui/core";
import { RemoveColumnButton } from "./";

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

  const cancelRef = useCancel(isOpen, handleClose);
  const initialFocusRef = useRef(null);

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
        <PopoverContent zIndex={4}>
          <PopoverCloseButton />
          <PopoverHeader textAlign="center" fontSize=".9rem">
            List Actions
          </PopoverHeader>
          <PopoverBody>
            <ButtonGroup>
              <RemoveColumnButton columnId={columnId} ref={initialFocusRef} />
              <Button
                size="sm"
                fontWeight="normal"
                variant="ghost"
                pr="calc(100% - 67px)"
              >
                Lock List
              </Button>
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

//TODO: need to implement LOCK LIST
