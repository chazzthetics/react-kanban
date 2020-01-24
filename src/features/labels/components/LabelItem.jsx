import React from "react";
import { useDispatch } from "react-redux";
import { taskLabelRemoved } from "../../tasks/slices";

const LabelItem = ({ taskId, taskLabel }) => {
  const dispatch = useDispatch();
  const handleRemoveLabelFromTask = labelId => {
    dispatch(taskLabelRemoved({ taskId, labelId }));
  };

  return (
    <div
      onClick={() => handleRemoveLabelFromTask(taskLabel.id)}
      style={{
        cursor: "pointer",
        height: "10px",
        padding: "10px",
        backgroundColor: `${taskLabel.color}`
      }}
    ></div>
  );
};

export default LabelItem;

// TODO: refactor/style
