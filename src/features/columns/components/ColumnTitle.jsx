import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { selectColumnTitle } from "../../../app/redux/selectors";
import { columnTitleEditing } from "../slices";

const ColumnTitle = ({ columnId }) => {
  const columnTitle = useSelector(state => selectColumnTitle(state, columnId));

  const dispatch = useDispatch();
  const handleEditColumnTitle = () => {
    dispatch(columnTitleEditing({ columnId }));
  };

  return (
    <div>
      <h4 style={{ cursor: "pointer" }} onClick={handleEditColumnTitle}>
        {columnTitle}
      </h4>
    </div>
  );
};

ColumnTitle.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default ColumnTitle;
