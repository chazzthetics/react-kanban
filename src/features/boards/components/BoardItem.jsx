import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { boardAdded, boardRemoved } from "../slices";
import { makeBoard } from "../utils/makeBoard";

const BoardItem = props => {
  const dispatch = useDispatch();

  const [boardTitle, setBoardTitle] = useState("");
  const handleChange = e => {
    setBoardTitle(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const board = makeBoard({ title: boardTitle });
    dispatch(boardAdded({ board }));
  };

  const handleRemove = () => {
    dispatch(boardRemoved({ boardId: "board2" }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="boardTitle"
          placeholder="Add new board"
          value={boardTitle}
          onChange={handleChange}
        />
        <button type="submit">Add Board</button>
      </form>
      <button type="button" onClick={handleRemove}>
        Delete Board
      </button>
    </div>
  );
};

export default BoardItem;
