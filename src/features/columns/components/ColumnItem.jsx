import React from "react";
import PropTypes from "prop-types";

const ColumnItem = ({ column }) => {
  return <div>{column.title}</div>;
};

ColumnItem.propTypes = {};

export default ColumnItem;
