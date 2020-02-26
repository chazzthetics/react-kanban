import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  makeSelectTask,
  makeSelectTaskLabelIds
} from "../features/tasks/slices";
import { makeSelectTaskLabels } from "../features/shared";

const useTask = taskId => {
  const taskSelector = useMemo(makeSelectTask, []);
  const { content, isEditing, completed } = useSelector(state =>
    taskSelector(state, taskId)
  );

  const taskLabelIdsSelector = useMemo(makeSelectTaskLabelIds, []);
  const taskLabelIds = useSelector(state =>
    taskLabelIdsSelector(state, taskId)
  );

  const taskLabelSelector = useMemo(makeSelectTaskLabels, []);
  const taskLabels = useSelector(state => taskLabelSelector(state, taskId));

  return { content, isEditing, completed, taskLabelIds, taskLabels };
};

export default useTask;
