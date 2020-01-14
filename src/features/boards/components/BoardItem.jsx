import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { boardAdded, boardRemoved } from "../slices";

const BoardItem = props => {
  const dispatch = useDispatch();

  const [boardTitle, setBoardTitle] = useState("");
  const handleChange = e => {
    setBoardTitle(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const board = {
      id: `boardNew${Math.floor(Math.random() * 20)}`,
      title: boardTitle,
      columnIds: [],
      isEditing: false
    };
    dispatch(boardAdded({ board }));
  };

  const handleRemove = () => {
    dispatch(boardRemoved({ boardId: "board1" }));
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
