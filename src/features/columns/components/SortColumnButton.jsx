import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { columnSortOpened } from "../slices";
import { ListButton } from "../../../components";

const SortColumnButton = ({ columnId }) => {
  const dispatch = useDispatch();

  const handleOpenSort = useCallback(() => {
    dispatch(columnSortOpened({ columnId }));
  }, [dispatch, columnId]);

  return (
    <ListButton label="Sort List By" onClick={handleOpenSort}>
      Sort By...
    </ListButton>
  );
};

SortColumnButton.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default memo(SortColumnButton);
