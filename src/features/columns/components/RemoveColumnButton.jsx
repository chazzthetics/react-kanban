import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { columnRemoved } from "../slices";

const RemoveColumnButton = ({ columnId, boardId }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(columnRemoved({ columnId, boardId }));
  };

  return (
    <button type="button" onClick={handleRemove}>
      Delete
    </button>
  );
};

RemoveColumnButton.propTypes = {
  columnId: PropTypes.string,
  boardId: PropTypes.string
};

export default RemoveColumnButton;

//TODO: proptypes
