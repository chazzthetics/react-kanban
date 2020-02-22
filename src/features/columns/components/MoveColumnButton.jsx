import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useToggle, useColumn, useBoard } from "../../../hooks";
import { boardListChanged } from "../../boards/slices";
import { move } from "../utils/move";
import { ListButton } from "../../../components";
import { FormLabel, Select, Flex } from "@chakra-ui/core";

const MoveColumnButton = ({ columnId, close }) => {
  const { isOpen, toggle } = useToggle();
  const { isLocked } = useColumn(columnId);

  const {
    boardId,
    allBoards,
    columnIds,
    columnPositions,
    showBoardId,
    showBoard
  } = useBoard();

  const startIndex = columnIds.indexOf(columnId);
  const dispatch = useDispatch();

  const handleBoardChange = e => {
    dispatch(boardListChanged({ boardId: e.target.value }));
  };

  const handleMoveColumn = e => {
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
    close();
  };

  return (
    <>
      <ListButton onClick={toggle} isDisabled={isLocked} label="Move List">
        Move List
      </ListButton>
      {isOpen && (
        <Flex flexDir="column">
          <FormLabel htmlFor="board" fontSize=".9rem" fontWeight="normal">
            Board
          </FormLabel>
          <Select
            id="board"
            size="sm"
            focusBorderColor="#ddd"
            defaultValue={boardId}
            onChange={handleBoardChange}
          >
            {allBoards.map(board => (
              <option key={board.id} value={board.id}>
                {board.title}
              </option>
            ))}
          </Select>
          <Select
            id="column"
            size="sm"
            focusBorderColor="#ddd"
            isDisabled={showBoardId === boardId && columnIds.length === 1}
            onChange={handleMoveColumn}
            placeholder="List Position"
            _disabled={{ opacity: 0.4, cursor: "default" }}
          >
            {columnPositions.map(position => (
              <option key={position} value={position}>
                Position {position + 1}
              </option>
            ))}
            {boardId !== showBoardId && (
              <option key={"end"} value={showBoard.columnIds.length}>
                Position {showBoard.columnIds.length + 1}
              </option>
            )}
          </Select>
        </Flex>
      )}
    </>
  );
};

MoveColumnButton.propTypes = {
  columnId: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired
};

export default MoveColumnButton;
