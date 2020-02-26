import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useLightMode } from "../../../hooks";
import {
  boardListChanged,
  selectCurrentBoardId,
  selectCurrentBoardColumnIds,
  selectShowBoardColumnPositions,
  selectAllBoardsWithTitleAndColor,
  selectShowId,
  selectShowBoard
} from "../../boards/slices";
import { move } from "../utils/move";
import { FormLabel, Select, Stack, Box } from "@chakra-ui/core";

const MoveColumnSelect = ({ columnId, onClose }) => {
  const dispatch = useDispatch();

  const boardId = useSelector(selectCurrentBoardId);
  const columnIds = useSelector(selectCurrentBoardColumnIds);
  const allBoards = useSelector(selectAllBoardsWithTitleAndColor);
  const columnPositions = useSelector(selectShowBoardColumnPositions);
  const showBoardId = useSelector(selectShowId);
  const showBoard = useSelector(selectShowBoard);

  const [isLightMode] = useLightMode();

  const handleBoardChange = e => {
    dispatch(boardListChanged({ boardId: e.target.value }));
  };

  const handleMoveColumn = e => {
    const startIndex = columnIds.indexOf(columnId);
    const endIndex = parseInt(e.target.value);

    move(
      startIndex,
      endIndex,
      boardId,
      columnIds,
      showBoardId,
      showBoard,
      dispatch
    );
    onClose();
  };

  const isPositionDisabled = position => {
    return position === columnIds.indexOf(columnId) && boardId === showBoardId;
  };

  return (
    <Stack isInline spacing={4} px={2}>
      <Box>
        <FormLabel
          htmlFor="board"
          fontSize=".9rem"
          fontWeight="normal"
          textAlign="center"
        >
          Board
        </FormLabel>
        <Select
          id="board"
          size="sm"
          focusBorderColor="#ddd"
          defaultValue={boardId}
          bg={isLightMode ? "white" : "gray.600"}
          borderRadius={4}
          onChange={handleBoardChange}
        >
          {allBoards.map(board => (
            <option
              key={board.id}
              value={board.id}
              style={{ backgroundColor: isLightMode ? "white" : "#2D3748" }}
            >
              {board.title}
            </option>
          ))}
        </Select>
      </Box>
      <Box>
        <FormLabel
          htmlFor="column"
          fontSize=".9rem"
          fontWeight="normal"
          textAlign="center"
        >
          List
        </FormLabel>
        <Select
          id="column"
          size="sm"
          focusBorderColor="#ddd"
          onChange={handleMoveColumn}
          placeholder="Position"
          bg={isLightMode ? "white" : "gray.600"}
          _disabled={{ opacity: 0.4, cursor: "default" }}
          borderRadius={4}
        >
          {columnPositions.map(position => (
            <option
              key={position}
              value={position}
              style={{
                backgroundColor: isLightMode ? "white" : "#2D3748",
                // color: isLightMode ? "#86838c" : "#e4e4e4",
                color:
                  isPositionDisabled(position) && isLightMode
                    ? "lightgray"
                    : isPositionDisabled(position) && !isLightMode
                    ? "#888589"
                    : !isPositionDisabled(position) && isLightMode
                    ? "black"
                    : "lightgray"
              }}
              disabled={isPositionDisabled(position)}
            >
              {position + 1}
            </option>
          ))}
          {boardId !== showBoardId && (
            <option key="end" value={showBoard.columnIds.length}>
              {showBoard.columnIds.length + 1}
            </option>
          )}
        </Select>
      </Box>
    </Stack>
  );
};

MoveColumnSelect.propTypes = {
  columnId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default MoveColumnSelect;
