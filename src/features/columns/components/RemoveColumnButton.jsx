import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { removeColumn } from "../slices";
import { selectCurrentBoardId } from "../../../app/redux/selectors";
import { RemoveButton } from "../../../components";

const RemoveColumnButton = ({ columnId }) => {
  const boardId = useSelector(selectCurrentBoardId);

  const dispatch = useDispatch();

  const handleRemoveColumn = () => {
    dispatch(removeColumn({ columnId, boardId }));
  };

  return <RemoveButton onRemove={handleRemoveColumn} value="Remove Column" />;
};

RemoveColumnButton.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default RemoveColumnButton;
