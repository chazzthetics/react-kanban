import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectTaskLabels } from "../../../app/redux/selectors";
import { LabelItem } from "./";

const LabelList = ({ taskId }) => {
  const taskLabels = useSelector(state => selectTaskLabels(state, taskId));

  return taskLabels
    ? taskLabels.map(taskLabel => (
        <LabelItem key={taskLabel.id} taskId={taskId} taskLabel={taskLabel} />
      ))
    : null;
};

export default LabelList;
