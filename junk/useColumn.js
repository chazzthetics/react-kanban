import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  makeSelectColumn,
  makeSelectColumnTaskIdsLength
} from "../features/columns/slices";
import { makeSelectColumnTasks } from "../features/shared";

const useColumn = columnId => {
  const columnSelector = useMemo(makeSelectColumn, []);
  const { title, isLocked, isOpen, isEditing } = useSelector(state =>
    columnSelector(state, columnId)
  );

  const columnTasksSelector = useMemo(makeSelectColumnTasks, []);
  const columnTasks = useSelector(state =>
    columnTasksSelector(state, columnId)
  );

  //FIXME:
  const isDisabled = useMemo(() => columnTasks.some(task => task.isEditing), [
    columnTasks
  ]);

  const hasTasksSelector = useMemo(makeSelectColumnTaskIdsLength, []);
  const hasTasks = useSelector(state => hasTasksSelector(state, columnId));

  return {
    title,
    isLocked,
    isOpen,
    isEditing,
    columnTasks,
    isDisabled,
    hasTasks
  };
};

export default useColumn;
