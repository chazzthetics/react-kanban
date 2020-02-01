import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { LabelItem } from "./";
import { makeSelectTaskLabels } from "../../shared/selectors";

const LabelList = ({ taskId }) => {
  const taskLabelSelector = useMemo(makeSelectTaskLabels, []);
  const taskLabels = useSelector(state => taskLabelSelector(state, taskId));

  return taskLabels
    ? taskLabels.map(taskLabel => (
        <LabelItem key={taskLabel.id} taskId={taskId} taskLabel={taskLabel} />
      ))
    : null;
};

export default LabelList;
