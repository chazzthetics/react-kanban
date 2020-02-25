import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { makeSelectTaskLabels } from "../../shared";
import { LabelItem } from "./";

const LabelList = ({ taskId }) => {
  const taskLabelsSelector = useMemo(makeSelectTaskLabels, []);
  const taskLabels = useSelector(state => taskLabelsSelector(state, taskId));

  return taskLabels
    ? taskLabels.map(taskLabel => (
        <LabelItem key={taskLabel.id} taskId={taskId} taskLabel={taskLabel} />
      ))
    : null;
};

export default memo(LabelList);
