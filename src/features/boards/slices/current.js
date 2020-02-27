import { createSlice } from "@reduxjs/toolkit";
import { requestInitialDataSuccess, requestBoardsSuccess } from "../../shared";
import { boardsApi } from "../../../api";

/**
 * Current Board Slice
 */
const currentBoard = createSlice({
  name: "boards",
  initialState: "",
  reducers: {
    boardCreated(_state, action) {
      const { board } = action.payload;
      return board.id;
    },
    boardRemoved: getPreviousBoard,
    boardChanged: setCurrentBoard,
    columnMoved: setCurrentBoardAfterMove
  },
  extraReducers: {
    [requestInitialDataSuccess]: boardsLoaded,
    [requestBoardsSuccess]: boardsLoaded
  }
});

export function boardsLoaded(_state, action) {
  const { boards, boardId } = action.payload;
  if (boardId) {
    return boardId;
  }
  return Object.keys(boards)[0];
}

export function setCurrentBoard(_state, action) {
  const { boardId } = action.payload;
  return boardId;
}

export function setCurrentBoardAfterMove(_state, action) {
  const { endBoardId } = action.payload;
  return endBoardId;
}

export function getPreviousBoard(_state, action) {
  const { boardId, boardIds } = action.payload;
  const updatedBoardIds = boardIds.filter(id => id !== boardId);

  let previousBoard;
  if (updatedBoardIds.length >= 2) {
    previousBoard = updatedBoardIds[updatedBoardIds.length - 1];
  } else if (updatedBoardIds.length === 1) {
    previousBoard = updatedBoardIds[0];
  } else {
    previousBoard = "";
  }
  return previousBoard;
}

export const { boardChanged } = currentBoard.actions;
export const currentBoardReducer = currentBoard.reducer;

export const changeBoard = ({ boardId }) => async dispatch => {
  try {
    dispatch(boardChanged({ boardId }));
    await boardsApi.setCurrent({ boardId });
  } catch (ex) {
    console.error(ex);
  }
};

//TODO: refactor
