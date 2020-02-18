import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useToggle, useColumn, useBoard } from "../../../hooks";
import {
  reorderColumn,
  boardListChanged,
  moveColumn
} from "../../boards/slices";
import { reorder } from "../../../utils/reorder";
import { ListButton } from "../../../components";
import { FormLabel, Select, Flex } from "@chakra-ui/core";

//FIXME: refactor
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

  // FIXME: move logic out
  const handleMoveColumn = e => {
    //FIXME: clean up!!
    if (boardId !== showBoardId) {
      const endIndex = parseInt(e.target.value);
      const startOrder = columnIds.filter((_id, i) => i !== startIndex);
      const [removed] = [...columnIds].splice(startIndex, 1);
      const endOrder = [...showBoard.columnIds];
      endOrder.splice(endIndex, 0, removed);

      const startOrderToPersist = startOrder.map((id, index) => ({
        id: parseInt(id),
        position: index
      }));

      const endOrderToPersist = endOrder.map((id, index) => ({
        id: parseInt(id),
        position: index
      }));

      dispatch(
        moveColumn({
          startBoardId: boardId,
          endBoardId: showBoardId,
          startOrder,
          endOrder,
          startOrderToPersist,
          endOrderToPersist
        })
      );
    } else {
      const endIndex = parseInt(e.target.value);
      const columnOrder = reorder(startIndex, endIndex, columnIds);
      const orderToPersist = columnOrder.map((id, index) => ({
        id: parseInt(id),
        position: index
      }));
      dispatch(
        reorderColumn({ boardId: showBoardId, columnOrder, orderToPersist })
      );
    }
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
