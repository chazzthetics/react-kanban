import React, { memo, useRef, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useLightMode } from "../../../hooks";
import { FiMoreHorizontal } from "react-icons/fi";
import { columnOptionsOpened, columnOptionsClosed } from "../slices";
import { selectCurrentBoardId } from "../../boards/slices";
import {
  makeSelectColumnIsOpen,
  makeSelectColumnHasTasks,
  makeSelectColumnSortIsOpen
} from "../../columns/slices";
import {
  Popover,
  ButtonGroup,
  IconButton,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  Box
} from "@chakra-ui/core";
import {
  RemoveColumnButton,
  LockColumnButton,
  ClearColumnButton,
  MoveColumnButton,
  SortColumnButton,
  SortOptionsButtonGroup
} from "./";
import BackToOptionsButton from "./BackToOptionsButton";

const ColumnOptionsPopover = ({ columnId }) => {
  const initialFocusRef = useRef(null);
  const [isLightMode] = useLightMode();

  const dispatch = useDispatch();

  const boardId = useSelector(selectCurrentBoardId);

  const hasTasksSelector = useMemo(makeSelectColumnHasTasks, []);
  const hasTasks = useSelector(state => hasTasksSelector(state, columnId));

  const isOptionsOpenSelector = useMemo(makeSelectColumnIsOpen, []);
  const isOptionsOpen = useSelector(state =>
    isOptionsOpenSelector(state, columnId)
  );

  const isSortOpenSelector = useMemo(makeSelectColumnSortIsOpen, []);
  const isSortOpen = useSelector(state => isSortOpenSelector(state, columnId));

  const handleOpen = useCallback(() => {
    dispatch(columnOptionsOpened({ boardId, columnId }));
  }, [boardId, columnId, dispatch]);

  const handleClose = useCallback(() => {
    dispatch(columnOptionsClosed({ boardId, columnId }));
  }, [boardId, columnId, dispatch]);

  return (
    <Popover
      placement="bottom-start"
      isOpen={isOptionsOpen}
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
          _hover={{ backgroundColor: isLightMode ? "#d4d4d4" : "gray.500" }}
          _active={{ backgroundColor: isLightMode ? "#d4d4d4" : "gray.500" }}
          _focus={{
            boxShadow: isLightMode
              ? "0 0 0 2px #d4d4d4"
              : "0 0 0 2px lightgreen"
          }}
        />
      </PopoverTrigger>

      <PopoverContent
        zIndex={4}
        boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
        p={2}
        borderRadius={4}
        bg={isLightMode ? "white" : "gray.700"}
        className="column-options-popover"
      >
        <PopoverHeader
          textAlign="center"
          fontSize=".9rem"
          mb={2}
          opacity={isLightMode ? 0.8 : 1}
          borderColor="#ddd"
        >
          {isSortOpen && <BackToOptionsButton columnId={columnId} />}
          <Box d="inline-block" textAlign="center">
            {!isSortOpen ? "List Actions" : "Sort By..."}
          </Box>
          <PopoverCloseButton opacity={0.6} />
        </PopoverHeader>
        <PopoverBody p={0}>
          <ButtonGroup d="flex" flexDirection="column" alignItems="flex-start">
            {!isSortOpen ? (
              <>
                <LockColumnButton columnId={columnId} ref={initialFocusRef} />
                <RemoveColumnButton columnId={columnId} />
                <ClearColumnButton columnId={columnId} />
                {hasTasks > 1 && <SortColumnButton columnId={columnId} />}
                <MoveColumnButton columnId={columnId} close={handleClose} />
              </>
            ) : (
              <SortOptionsButtonGroup columnId={columnId} />
            )}
          </ButtonGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

ColumnOptionsPopover.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default memo(ColumnOptionsPopover);
