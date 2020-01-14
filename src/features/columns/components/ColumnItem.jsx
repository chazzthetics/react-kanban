import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { columnAdded, columnRemoved } from "../slices";

const ColumnItem = props => {
  const dispatch = useDispatch();

  const [columnTitle, setColumnTitle] = useState("");

  const handleChange = e => {
    setColumnTitle(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const column = {
      id: `columnNew${Math.floor(Math.random() * 20)}`,
      title: columnTitle,
      taskIds: [],
      isEditing: false
    };

    dispatch(columnAdded({ column, boardId: "board1" }));
  };

  const handleRemove = () => {
    dispatch(columnRemoved({ columnId: "column1", boardId: "board1" }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add new column"
          name="columnTitle"
          value={columnTitle}
          onChange={handleChange}
        />
        <button type="submit">Add Column</button>
      </form>
      <button type="button" onClick={handleRemove}>
        Delete Column
      </button>
    </div>
  );
};

ColumnItem.propTypes = {};

export default ColumnItem;
