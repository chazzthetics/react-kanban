import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { selectColumnTitle } from "../../../app/redux/selectors";
import { columnTitleEditing } from "../slices";
import { Heading } from "@chakra-ui/core";

const ColumnTitle = ({ columnId }) => {
  const columnTitle = useSelector(state => selectColumnTitle(state, columnId));

  const dispatch = useDispatch();
  const handleEditColumnTitle = () => {
    dispatch(columnTitleEditing({ columnId }));
  };

  return (
    <Heading
      as="h3"
      size="md"
      style={{ cursor: "pointer" }}
      onClick={handleEditColumnTitle}
    >
      {columnTitle}
    </Heading>
  );
};

ColumnTitle.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default ColumnTitle;
