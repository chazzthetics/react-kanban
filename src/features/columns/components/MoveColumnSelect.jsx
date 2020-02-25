import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useBoard, useLightMode } from "../../../hooks";
import { boardListChanged } from "../../boards/slices";
import { move } from "../utils/move";
import { FormLabel, Select, Stack, Box } from "@chakra-ui/core";

const MoveColumnSelect = ({ columnId, onClose }) => {
  const dispatch = useDispatch();

  const {
    boardId,
    allBoards,
    columnIds,
    columnPositions,
    showBoardId,
    showBoard
  } = useBoard();

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
  //FIXME: redux - shwo and current are different (doesn't work now)
  const isBoardDisabled = () => {
    return showBoardId === boardId && columnIds.length === 1;
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
          isDisabled={isBoardDisabled()}
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
                color: isPositionDisabled(position) ? "#e4e4e4" : "black"
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
