import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { columnRemoved } from "../slices";
import { selectCurrentBoardId } from "../../../app/redux/selectors";

const RemoveColumnButton = ({ columnId }) => {
  const dispatch = useDispatch();
  const boardId = useSelector(selectCurrentBoardId);

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
