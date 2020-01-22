import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTaskLabels } from "../../../app/redux/selectors";
import { taskLabelRemoved } from "../../tasks/slices";

const LabelList = ({ taskId }) => {
  const taskLabels = useSelector(state => selectTaskLabels(state, taskId));
  const dispatch = useDispatch();

  const handleRemoveLabelFromTask = labelId => {
    dispatch(taskLabelRemoved({ taskId, labelId }));
  };

  return taskLabels.map(taskLabel => (
    <div
      className="labels"
      style={{ width: "20px", height: "100%" }}
      key={taskLabel.id}
    >
      <div
        onClick={() => handleRemoveLabelFromTask(taskLabel.id)}
        style={{
          cursor: "pointer",
          height: "10px",
          padding: "10px",
          backgroundColor: `${taskLabel.color}`
        }}
      ></div>
    </div>
  ));
};

export default LabelList;
