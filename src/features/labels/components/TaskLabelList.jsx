import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { makeSelectTaskLabels } from "../../shared";
import { LabelItem } from "./";
import { Flex } from "@chakra-ui/core";

const LabelList = ({ taskId }) => {
  const taskLabelsSelector = useMemo(makeSelectTaskLabels, []);
  const taskLabels = useSelector(state => taskLabelsSelector(state, taskId));

  return (
    <Flex align="flex-start" direction="row" flexBasis="100%" maxW="180px">
      {taskLabels
        ? taskLabels.map(taskLabel => (
            <LabelItem
              key={taskLabel.id}
              taskId={taskId}
              taskLabel={taskLabel}
            />
          ))
        : null}
    </Flex>
  );
};

export default memo(LabelList);
