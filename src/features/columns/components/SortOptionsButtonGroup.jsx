import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { makeSelectColumnTasks } from "../../shared";
import { sortTasksBy } from "../slices";
import {
  getSortedListOrder,
  sortByNewest,
  sortByOldest,
  sortByPriority,
  sortByDueDate,
  sortByName
} from "../utils/sort";
import { ListButton } from "../../../components";

const SortOptionsButtonGroup = ({ columnId }) => {
  const columnTasksSelector = useMemo(makeSelectColumnTasks, []);
  const columnTasks = useSelector(state =>
    columnTasksSelector(state, columnId)
  );

  const dispatch = useDispatch();

  const handleSortByNewest = () => {
    const sortedTasks = getSortedListOrder(columnTasks, sortByNewest);
    dispatch(sortTasksBy("newest", { columnId, tasks: sortedTasks }));
  };

  const handleSortByOldest = () => {
    const sortedTasks = getSortedListOrder(columnTasks, sortByOldest);
    dispatch(sortTasksBy("newest", { columnId, tasks: sortedTasks }));
  };

  const handleSortByPriority = () => {
    const sortedTasks = getSortedListOrder(columnTasks, sortByPriority);
    dispatch(sortTasksBy("priority", { columnId, tasks: sortedTasks }));
  };

  const handleSortByDueDate = () => {
    const sortedTasks = getSortedListOrder(columnTasks, sortByDueDate);
    dispatch(sortTasksBy("dueDate", { columnId, tasks: sortedTasks }));
  };

  const handleSortByName = () => {
    const sortedTasks = getSortedListOrder(columnTasks, sortByName);
    dispatch(sortTasksBy("name", { columnId, tasks: sortedTasks }));
  };

  return (
    <>
      <ListButton label="Sort By Newest" onClick={handleSortByNewest}>
        Date Created (Newest First)
      </ListButton>
      <ListButton label="Sort By Oldest" onClick={handleSortByOldest}>
        Date Created (Oldest First)
      </ListButton>
      <ListButton label="Sort By Priority" onClick={handleSortByPriority}>
        Priority
      </ListButton>
      <ListButton label="Sort By Card Name" onClick={handleSortByName}>
        Card Name
      </ListButton>
      <ListButton label="Sort By Due Date" onClick={handleSortByDueDate}>
        Due Date
      </ListButton>
    </>
  );
};

SortOptionsButtonGroup.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default memo(SortOptionsButtonGroup);
