import React from "react";
import { useTask } from "../../../hooks";
import { LabelItem } from "./";

const LabelList = ({ taskId }) => {
  const { taskLabels } = useTask(taskId);

  return taskLabels
    ? taskLabels.map(taskLabel => (
        <LabelItem key={taskLabel.id} taskId={taskId} taskLabel={taskLabel} />
      ))
    : null;
};

export default React.memo(LabelList);
