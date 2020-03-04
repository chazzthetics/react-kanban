import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { makeSelectTaskLabels } from "../../shared";
import { TaskLabelItem } from "./";
import { Flex } from "@chakra-ui/core";

const LabelList = ({ taskId }) => {
  const taskLabelsSelector = useMemo(makeSelectTaskLabels, []);
  const taskLabels = useSelector(state => taskLabelsSelector(state, taskId));

  return (
    <Flex align="flex-start" direction="row" flexBasis="100%" maxW="180px">
      {taskLabels
        ? taskLabels.map(taskLabel => (
            <TaskLabelItem
              key={taskLabel.id}
              taskId={taskId}
              taskLabel={taskLabel}
            />
          ))
        : null}
    </Flex>
  );
};

LabelList.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default memo(LabelList);
