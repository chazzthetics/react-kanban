import React from "react";
import { useSelector } from "react-redux";
import { selectTaskLabels } from "../../../app/redux/selectors";
import { LabelItem } from "./";

const LabelList = ({ taskId }) => {
  const taskLabels = useSelector(state => selectTaskLabels(state, taskId));

  return taskLabels.map(taskLabel => (
    <div
      className="labels"
      style={{ width: "20px", height: "100%" }}
      key={taskLabel.id}
    >
      <LabelItem taskId={taskId} taskLabel={taskLabel} />
    </div>
  ));
};

export default LabelList;

//TODO: refactor
